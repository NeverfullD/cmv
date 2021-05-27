import React from "react";
import { CModel } from "./Types";
import { BulirschStoerMethod, EulerMethod, Result, RungeKutta2Method, RungeKutta4Method, Solver } from "./Solver";
import MyChart from "./Chart";
import Graph from "./Graph";
import ParserModule from "./ParserModule";
import Settings from "./Settings";

interface IProps {}

interface IState {
    model: CModel;
    timeSteps: number[];
    currentTick: number;
    stepSize: number;
    solver: Solver;
}

export default class Main extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            model: { parameters: [], compartments: [] },
            currentTick: 0,
            timeSteps: [],
            stepSize: 0.1,
            solver: new EulerMethod(0, 0, { parameters: [], compartments: [] }),
        };
    }

    componentDidMount() {}

    setModel = (newModel: CModel) => {
        this.setState({
            model: newModel,
            currentTick: 0,
            timeSteps: [0],
            solver: new BulirschStoerMethod(this.state.stepSize, 0, newModel, 4),
            //solver: new EulerMethod(this.state.stepSize, 0, newModel),
            //solver: new RungeKutta2Method(this.state.stepSize, 0, newModel),
            //solver: new RungeKutta4Method(this.state.stepSize, 0, newModel),
        });
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

    applyResult(res: Result) {
        this.state.model.compartments.forEach((c) => {
            c.value.push(res.result.get(c.name)!);
        });
        //save Timestamps for variable step size
        this.state.timeSteps.push(res.timeStep);
    }

    //Main for solvers
    solveSteps(steps: number) {
        for (let i = 0; i < steps; i++) {
            //calculate Step
            this.applyResult(this.state.solver.execute());
        }
        //endCurrentTick
        this.setState({ currentTick: this.state.currentTick + steps });
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
