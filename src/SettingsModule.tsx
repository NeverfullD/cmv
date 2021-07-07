import React from "react";
import "./SettingsModule.css";
import * as config from "./config.json";
import { SolverType } from "./Solver";
import { CsvDataService } from "./CSVDataService";

interface IProps {
    onSimulate: (n: number) => void;
    changeStepSize: (stepSize: number) => void;
    changeMaxError: (maxError: number) => void;
    stepSize: number;
    maxError: number;
    selectedSolver: string;
    selectedSolverType: SolverType;
    changeSelectedSolver: (selectedSolver: string) => void;
    data: [any[]];
}

interface IState {
    time: string;
    stepSize: string;
    maxError: string;
}

export default class SettingsModule extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { time: "", stepSize: props.stepSize.toString(), maxError: props.maxError.toString() };
    }

    onSimulate1 = () => {
        this.props.onSimulate(1);
    };
    onSimulate10 = () => {
        this.props.onSimulate(10);
    };
    onSimulate100 = () => {
        this.props.onSimulate(100);
    };
    onSimulate = () => {
        this.props.onSimulate(parseFloat(this.state.time));
    };

    handleChangeSteps = (event: any) => {
        this.setState({ time: event.target.value });
    };

    onChangeStepSize = () => {
        this.props.changeStepSize(parseFloat(this.state.stepSize));
    };
    handleChangeStepSize = (event: any) => {
        this.setState({ stepSize: event.target.value });
    };

    onChangeMaxError = () => {
        this.props.changeMaxError(parseFloat(this.state.maxError));
    };
    handleChangeMaxError = (event: any) => {
        this.setState({ maxError: event.target.value });
    };

    handleSelectedSolver = (event: any) => {
        this.props.changeSelectedSolver(event.target.value);
    };

    onGetData = () => {
        CsvDataService.exportToCsv("data.csv", this.props.data);
    };

    componentDidMount() {}

    render() {
        var settings;

        if (this.props.selectedSolverType === SolverType.manualStepSize) {
            settings = [
                <br />,
                <input type="text" value={this.state.stepSize} onChange={this.handleChangeStepSize} />,
                <button onClick={this.onChangeStepSize}>{config.setStepSizeButton}</button>,
            ];
        } else if (this.props.selectedSolverType === SolverType.errorControlled) {
            settings = [
                <br />,
                <input type="text" value={this.state.maxError} onChange={this.handleChangeMaxError} />,
                <button onClick={this.onChangeMaxError}>{config.setMaxErrorButton}</button>,
            ];
        }

        return (
            <div className="settings">
                <div>
                    {config.solverTitle}
                    <br />
                    <select value={this.props.selectedSolver} onChange={this.handleSelectedSolver}>
                        <option value="euler">Euler</option>
                        <option value="rungeKutta2">Runge-Kutta 2.Order</option>
                        <option value="rungeKutta4">Runge-Kutta 4.Order</option>
                        <option value="rungeKutta4Automatic">Runge-Kutta 4.Order Automatic</option>
                        <option value="bulirschStoer">Bulirsch-Stoer</option>
                    </select>
                    {settings}
                </div>
                <div>
                    {config.timeControlTitle}
                    <br />
                    <button onClick={this.onSimulate1}>{config.simulateForButton} 1</button>
                    <button onClick={this.onSimulate10}>10</button>
                    <button onClick={this.onSimulate100}>100</button>
                    <br />
                    <button onClick={this.onSimulate}>{config.simulateForButton} </button>
                    <input type="text" value={this.state.time} onChange={this.handleChangeSteps} />
                    <br />
                </div>
                <div>
                    {config.getDataTitle}
                    <br />
                    <button onClick={this.onGetData}>{config.getDataButton} </button>
                    <br />
                </div>
            </div>
        );
    }
}
