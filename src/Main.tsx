import React from "react";
import "./Main.css";
import { CompartmentModel } from "./Types";
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
    model: CompartmentModel;
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

    //handle Settings
    setModel = (newModel: CompartmentModel) => {
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

    getSolver(selectedSolver: string, timeStep: number, model: CompartmentModel): Solver {
        switch (selectedSolver) {
            case "euler":
                return new EulerMethod(this.state.stepSize, timeStep, model);
            case "rungeKutta2":
                return new RungeKutta2Method(this.state.stepSize, timeStep, model);
            case "rungeKutta4":
                return new RungeKutta4Method(this.state.stepSize, timeStep, model);
            case "rungeKutta4Automatic":
                return new RungeKutta4AutomaticMethod(0.1, timeStep, model, this.state.maxError);
            case "bulirschStoer":
                return new BulirschStoerMethod(0.1, timeStep, model, 4, this.state.maxError);
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

    generateData() {
        var header: any[] = ["x"];
        this.state.model.compartments.forEach((c) => header.push(c.name));

        var data: [any[]] = [header];

        for (let i = 0; i <= this.state.currentTick; i++) {
            var dataPoint = [this.state.timeSteps[i]];
            this.state.model.compartments.forEach((c) => dataPoint.push(c.value[i]));
            data.push(dataPoint);
        }
        return data;
    }

    render() {
        var data = this.generateData();

        return (
            <div className="main">
                <h2>{config.title}</h2>
                <ParserModule setNewModel={this.setModel} />
                <GraphModule model={this.state.model} key={this.state.currentTick + "graph"} />
                <SettingsModule
                    onSimulate={this.onSimulate}
                    changeStepSize={this.changeStepSize}
                    changeMaxError={this.changeMaxError}
                    stepSize={this.state.stepSize}
                    maxError={this.state.maxError}
                    selectedSolver={this.state.selectedSolver}
                    selectedSolverType={this.state.solver.solverType}
                    changeSelectedSolver={this.changeSelectedSolver}
                    data={data}
                />
                <ChartModule data={data} currentTick={this.state.currentTick} key={this.state.currentTick + "chart"} />
            </div>
        );
    }
}
