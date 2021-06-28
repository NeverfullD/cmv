import React from "react";
import { CModel } from "./Types";
import {
    BulirschStoerMethod,
    EulerMethod,
    Result,
    RungeKutta2Method,
    RungeKutta4AutomaticMethod,
    RungeKutta4Method,
    Solver,
} from "./Solver";
import ChartModule from "./ChartModule";
import GraphModule from "./GraphModule";
import ParserModule from "./ParserModule";
import SettingsModule from "./SettingsModule";
import * as config from "./config.json";

interface IProps {}

interface IState {
    model: CModel;
    timeSteps: number[];
    currentTick: number;
    stepSize: number;
    maxError: number;
    solver: Solver;
    selectedSolver: string;
}

export default class Main extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            model: { parameters: [], compartments: [] },
            currentTick: -1,
            timeSteps: [],
            stepSize: 0.1,
            maxError: 0.001,
            solver: new EulerMethod(0, 0, { parameters: [], compartments: [] }),
            selectedSolver: "euler",
        };
    }

    componentDidMount() {}

    onClick = () => {
        //console.log(this.state);
        console.log(config);
    };

    //handle Settings
    setModel = (newModel: CModel) => {
        this.setState({
            model: newModel,
            currentTick: 0,
            timeSteps: [0],
            solver: this.getSolver(this.state.selectedSolver, 0, newModel),
        });
    };

    onSimulate = (n: number) => {
        this.solveTime(n);
    };

    changeStepSize = (stepSize: number) => {
        this.setState({ stepSize: stepSize });
    };

    changeMaxError = (maxError: number) => {
        this.setState({ maxError: maxError });
    };

    changeSelectedSolver = (selectedSolver: string) => {
        this.setState({
            selectedSolver: selectedSolver,
            solver: this.getSolver(
                selectedSolver,
                this.state.timeSteps[this.state.timeSteps.length - 1],
                this.state.model,
            ),
        });
    };

    getSolver(selectedSolver: string, timeStep: number, model: CModel): Solver {
        switch (selectedSolver) {
            case "euler":
                return new EulerMethod(this.state.stepSize, timeStep, model);
            case "rungeKutta2":
                return new RungeKutta2Method(this.state.stepSize, timeStep, model);
            case "rungeKutta4":
                return new RungeKutta4Method(this.state.stepSize, timeStep, model);
            case "rungeKutta4Automatic":
                return new RungeKutta4AutomaticMethod(this.state.stepSize, timeStep, model, this.state.maxError);
            case "bulirschStoer":
                return new BulirschStoerMethod(this.state.stepSize, timeStep, model, 4, this.state.maxError);
            default:
                return new EulerMethod(this.state.stepSize, timeStep, model);
        }
    }

    //simulation Core
    applyResult(res: Result) {
        this.state.model.compartments.forEach((c) => {
            c.value.push(res.result.get(c.name)!);
        });
        //save Timestamps for variable step size
        this.state.timeSteps.push(res.timeStep);
    }

    //Main for solvers
    solveTime(time: number) {
        var steps = 0;
        var endTime = this.state.timeSteps[this.state.timeSteps.length - 1] + time;
        while (this.state.timeSteps[this.state.timeSteps.length - 1] < endTime) {
            //calculate Step
            this.applyResult(this.state.solver.execute());
            steps++;
        }
        //endCurrentTick
        this.setState({ currentTick: this.state.currentTick + steps });
    }

    render() {
        return (
            <div>
                <button onClick={this.onClick}>Test</button>
                <h2>{config.title}</h2>
                <ParserModule setNewModel={this.setModel} />
                <SettingsModule
                    onSimulate={this.onSimulate}
                    changeStepSize={this.changeStepSize}
                    changeMaxError={this.changeMaxError}
                    stepSize={this.state.stepSize}
                    maxError={this.state.maxError}
                    selectedSolver={this.state.selectedSolver}
                    selectedSolverType={this.state.solver.solverType}
                    changeSelectedSolver={this.changeSelectedSolver}
                />
                <ChartModule
                    model={this.state.model}
                    timeSteps={this.state.timeSteps}
                    currentTick={this.state.currentTick}
                    key={this.state.currentTick + "chart"}
                />
                <GraphModule model={this.state.model} key={this.state.currentTick + "graph"} />
            </div>
        );
    }
}
