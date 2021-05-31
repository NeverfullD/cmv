import React from "react";
import "./Settings.css";

interface IProps {
    onSimulate: (n: number) => void;
    changeStepSize: (stepSize: number) => void;
    stepSize: number;
    selectedSolver: string;
    changeSelectedSolver: (selectedSolver: string) => void;
}

interface IState {
    steps: string;
    stepSize: string;
}

export default class Settings extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { steps: "", stepSize: "" };
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
    onSimulate1000 = () => {
        this.props.onSimulate(1000);
    };
    onSimulate = () => {
        this.props.onSimulate(parseInt(this.state.steps));
    };

    onChangeStepSize = () => {
        this.props.changeStepSize(parseFloat(this.state.stepSize));
    };

    handleChangeSteps = (event: any) => {
        this.setState({ steps: event.target.value });
    };

    handleChangeStepSize = (event: any) => {
        this.setState({ stepSize: event.target.value });
    };

    handleSelectedSolver = (event: any) => {
        this.props.changeSelectedSolver(event.target.value);
    };

    componentDidMount() {}

    render() {
        return (
            <div className="settings">
                Settings
                <br />
                <button onClick={this.onSimulate1}>Simulate 1</button>
                <button onClick={this.onSimulate10}>Simulate 10</button>
                <button onClick={this.onSimulate100}>Simulate 100</button>
                <button onClick={this.onSimulate1000}>Simulate 1000</button>
                <button onClick={this.onSimulate}>Simulate: </button>
                <input type="text" value={this.state.steps} onChange={this.handleChangeSteps} />
                <br />
                <button onClick={this.onChangeStepSize}>Change Step Size (currently: {this.props.stepSize}): </button>
                <input type="text" value={this.state.stepSize} onChange={this.handleChangeStepSize} />
                <br />
                <label>Choose a Solver:</label>
                <select value={this.props.selectedSolver} onChange={this.handleSelectedSolver}>
                    <option value="euler">Euler</option>
                    <option value="rungeKutta2">Runge-Kutta 2.Order</option>
                    <option value="rungeKutta4">Runge-Kutta 4.Order</option>
                    <option value="bulirschStoer">Bulirsch-Stoer</option>
                </select>
            </div>
        );
    }
}
