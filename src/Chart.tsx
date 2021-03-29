import React from "react";
import Chart from "react-google-charts";
import "./Chart.css";

interface IProps {}

interface IState {
    data: any[];
}

export default class MyChart extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            data: [
                ["x", "dogs", "cats"],
                [0, 0, 0],
                [1, 10, 5],
                [2, 23, 15],
                [3, 17, 9],
                [4, 18, 10],
                [5, 9, 5],
                [6, 11, 3],
                [7, 27, 19],
            ],
        };
    }

    componentDidMount() {}

    onClick() {
        var tmp = this.state.data;
        tmp.push([8, 10, 12]);
        this.setState({ data: tmp });
    }

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
                            title: "Popularity",
                        },
                    }}
                    rootProps={{ "data-testid": "2" }}
                />
                <button onClick={this.onClick.bind(this)}>Test</button>
            </div>
        );
    }
}
