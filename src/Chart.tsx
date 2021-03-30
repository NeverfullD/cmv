import React from "react";
import Chart from "react-google-charts";

import "./Chart.css";
import { CModel } from "./Types";

interface IProps {
    model: CModel;
    stepSize: number;
    currentTick: number;
}

interface IState {
    data: any[];
}

export default class MyChart extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        var data = this.generateData();
        this.state = {
            data: data,
        };
    }

    generateData() {
        var data: any[] = [];
        var header = ["x"];
        this.props.model.compartments.forEach((c) => header.push(c.name));
        data.push(header);
        for (let i = 0; i <= this.props.currentTick; i++) {
            var dataPoint = [i * this.props.stepSize];
            this.props.model.compartments.forEach((c) => dataPoint.push(c.value[i]));
            data.push(dataPoint);
        }
        console.log(data);

        return data;
    }

    componentDidMount() {}

    onClick() {}

    render() {
        return (
            <div className="chart">
                Chart
                <Chart
                    width={"600px"}
                    height={"400px"}
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
                    rootProps={{ "data-testid": "2" }}
                />
                {
                    //<button onClick={this.onClick.bind(this)}>Test</button>
                }
            </div>
        );
    }
}
