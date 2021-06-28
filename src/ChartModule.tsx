import React from "react";
import Chart from "react-google-charts";

import "./ChartModule.css";
import { CsvDataService } from "./CSVDataService";
import { CompartmentModel } from "./Types";

import * as config from "./config.json";

interface IProps {
    model: CompartmentModel;
    timeSteps: number[];
    currentTick: number;
}

interface IState {
    data: [any[]];
}

export default class ChartModule extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        var data = this.generateData();
        this.state = {
            data: data,
        };
    }

    generateData() {
        var header: any[] = ["x"];
        this.props.model.compartments.forEach((c) => header.push(c.name));

        var data: [any[]] = [header];

        for (let i = 0; i <= this.props.currentTick; i++) {
            var dataPoint = [this.props.timeSteps[i]];
            this.props.model.compartments.forEach((c) => dataPoint.push(c.value[i]));
            data.push(dataPoint);
        }
        //console.log(data);

        return data;
    }

    componentDidMount() {}

    onClickGetData = () => {
        CsvDataService.exportToCsv("data.csv", this.state.data);
    };

    renderChart = () => {
        return (
            <Chart
                width={"100%"}
                height={"500px"}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={this.state.data}
                options={{
                    hAxis: {
                        title: "Time",
                    },
                    vAxis: {
                        title: "Value",
                    },
                }}
            />
        );
    };

    render() {
        return (
            <div className="chart">
                <button onClick={this.onClickGetData}>{config.getData}</button>
                {this.props.currentTick > 0 ? this.renderChart() : <br />}
            </div>
        );
    }
}
