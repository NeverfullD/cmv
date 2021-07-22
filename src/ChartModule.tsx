import React from "react";
import Chart from "react-google-charts";
import "./ChartModule.css";
import * as config from "./config.json";

interface IProps {
    data: [any[]];
    currentTick: number;
}

interface IState {}

export default class ChartModule extends React.Component<IProps, IState> {
    componentDidMount() {}

    renderChart = () => {
        return (
            <Chart
                width={"100%"}
                height={"500px"}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={this.props.data}
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
                {config.chartTitle}
                {this.props.currentTick > 0 ? (
                    this.renderChart()
                ) : (
                    <div>
                        <br />
                        {config.chartNoDataAvailable}
                    </div>
                )}
            </div>
        );
    }
}
