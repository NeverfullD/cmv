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
        var interVariables = new Map(variables); //contains variable values at half point of the step
        this.state.model.compartments.forEach((c) => {
            var k1 = this.evaluateExpression(c.ODE, variables) * (this.state.stepSize / 2);
            interVariables.set(c.name, c.value[c.value.length - 1] + k1);
        });

        this.state.model.compartments.forEach((c) => {
            var k2 = this.evaluateExpression(c.ODE, interVariables) * this.state.stepSize;
            c.value.push(c.value[c.value.length - 1] + k2);
        });
    }

    //Runge-Kutta solver 4 Order
    rungeKutta4(variables: Map<string, number>) {
        var interVariables = new Map(variables); //contains variables for intermediary steps
        var allK = new Map();
        //calc k1
        this.state.model.compartments.forEach((c) => {
            var k1 = this.evaluateExpression(c.ODE, variables) * this.state.stepSize;
            interVariables.set(c.name, c.value[c.value.length - 1] + k1 / 2);
            allK.set(c.name, [k1]);
        });
        //calc k2
        this.state.model.compartments.forEach((c) => {
            var k2 = this.evaluateExpression(c.ODE, interVariables) * this.state.stepSize;
            interVariables.set(c.name, c.value[c.value.length - 1] + k2 / 2);
            allK.get(c.name).push(k2);
        });
        //calc k3
        this.state.model.compartments.forEach((c) => {
            var k3 = this.evaluateExpression(c.ODE, interVariables) * this.state.stepSize;
            interVariables.set(c.name, c.value[c.value.length - 1] + k3);
            allK.get(c.name).push(k3);
        });
        //calc k4
        this.state.model.compartments.forEach((c) => {
            var k4 = this.evaluateExpression(c.ODE, interVariables) * this.state.stepSize;
            allK.get(c.name).push(k4);
        });
        //calc y_n+1
        this.state.model.compartments.forEach((c) => {
            c.value.push(
                c.value[c.value.length - 1] +
                    (1 / 6) * allK.get(c.name)[0] + //k1
                    (2 / 6) * allK.get(c.name)[1] + //k2
                    (2 / 6) * allK.get(c.name)[2] + //k3
                    (1 / 6) * allK.get(c.name)[3], //k4
            );
        });
    }

    euler(variables: Map<string, number>) {
        this.state.model.compartments.forEach((c) => {
            var res = this.evaluateExpression(c.ODE, variables) * this.state.stepSize;
            c.value.push(c.value[c.value.length - 1] + res);
        });
    }

    //modified midpoint method
    modifiedMidpointMethod(variables: Map<string, number>, n: number) {
        //stepSize == H
        //h == H/n
        var h = this.state.stepSize / n;
        var interVariables = new Map(variables); //contains variables for intermediary steps
        var midpoints: Map<string, number[]> = new Map();

        //z0 == yn == current state
        //z1 = z0 + h * f(x, z0)
        this.state.model.compartments.forEach((c) => {
            var k = this.evaluateExpression(c.ODE, interVariables);
            var z1 = c.value[c.value.length - 1] + h * k;

            interVariables.set(c.name, z1);
            midpoints.set(c.name, [c.value[c.value.length - 1], z1]);
        });

        //zm+1 = zm−1 + 2h ∗ f(x + m ∗ h, zm) with m = 1, 2, ..., n − 1
        for (let m = 1; m < n; m++) {
            this.state.model.compartments.forEach((c) => {
                var k = this.evaluateExpression(c.ODE, interVariables);
                var zm1 = midpoints.get(c.name)![m - 1] + 2 * h * k;

                interVariables.set(c.name, zm1);
                midpoints.get(c.name)!.push(zm1);
            });
        }

        //y(x + H) ≈ yn ≡ 1/2*(zn + zn−1 + h ∗ f(x + H, zn))
        this.state.model.compartments.forEach((c) => {
            var k = this.evaluateExpression(c.ODE, interVariables);
            var zm = (1 / 2) * (midpoints.get(c.name)![n] + midpoints.get(c.name)![n - 1] + h * k);
            c.value.push(zm);
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
            //this.rungeKutta2(variables);
            //this.rungeKutta4(variables);
            this.modifiedMidpointMethod(variables, 8);
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
