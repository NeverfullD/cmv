import React from "react";
import { CModel } from "./Types";
import MyChart from "./Chart";
import Graph from "./Graph";
import ParserModule from "./ParserModule";
import Settings from "./Settings";

const Evaluator = require("expr-eval").Parser;

interface IProps {}

interface IState {
    model: CModel;
    timeSteps: number[];
    stepSize: number;
    currentTick: number;
}

export default class Main extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            model: { parameters: [], compartments: [] },
            stepSize: 0.1,
            currentTick: 0,
            timeSteps: [],
        };
    }

    componentDidMount() {}

    setModel = (newModel: CModel) => {
        this.setState({ model: newModel, currentTick: 0, timeSteps: [0] });
    };

    onClick = () => {
        console.log(this.state.model);
    };

    onSimulate = (n: number) => {
        this.solveSteps(n);
    };

    changeStepSize = (stepSize: number) => {
        this.setState({ stepSize: stepSize });
    };

    //solvers
    //Runge-Kutta solver 2 Order
    rungeKutta2(variables: Map<string, number>) {
        var middleVariables = new Map(variables); //contains variable values at half point of the step
        this.state.model.compartments.forEach((c) => {
            var k1 = this.evaluateExpression(c.ODE, variables) * (this.state.stepSize / 2);
            middleVariables.set(c.name, c.value[c.value.length - 1] + k1);
        });
        console.log(variables);
        console.log(middleVariables);

        this.state.model.compartments.forEach((c) => {
            var k2 = this.evaluateExpression(c.ODE, middleVariables) * this.state.stepSize;
            c.value.push(c.value[c.value.length - 1] + k2);
        });
    }

    euler(variables: Map<string, number>) {
        this.state.model.compartments.forEach((c) => {
            var res = this.evaluateExpression(c.ODE, variables) * this.state.stepSize;
            c.value.push(c.value[c.value.length - 1] + res);
        });
    }

    //Main for solvers
    solveSteps(steps: number) {
        for (let i = 0; i < steps; i++) {
            var variables = new Map();
            this.state.model.compartments.forEach((c) => variables.set(c.name, c.value[this.state.currentTick + i]));
            this.state.model.parameters.forEach((p) => variables.set(p.name, p.value)); //TODO insert Constant at parse time
            //calculate Step
            //this.euler(variables);
            this.rungeKutta2(variables);
            //save Timestamps for variable step size
            this.state.timeSteps.push(this.state.timeSteps[this.state.currentTick + i] + this.state.stepSize);
        }
        //endCurrentTick
        this.setState({ currentTick: this.state.currentTick + steps });
    }

    evaluateExpression(exp: string, variables: Map<string, number>): number {
        return Evaluator.evaluate(exp, Object.fromEntries(variables));
    }

    render() {
        return (
            <div>
                Test
                <button onClick={this.onClick}>Test</button>
                <a href="https://github.com/NeverfullD/cmv">to Github</a>
                <ParserModule setNewModel={this.setModel} />
                <Settings
                    onSimulate={this.onSimulate}
                    changeStepSize={this.changeStepSize}
                    stepSize={this.state.stepSize}
                />
                <MyChart
                    model={this.state.model}
                    timeSteps={this.state.timeSteps}
                    currentTick={this.state.currentTick}
                    key={this.state.currentTick + "chart"}
                />
                <Graph model={this.state.model} key={this.state.currentTick + "graph"} />
            </div>
        );
    }
}
