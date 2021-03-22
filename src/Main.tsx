import React from "react";
import Chart from "./Chart";
import Graph from "./Graph";
import Parser from "./Parser";
import Settings from "./Settings";

interface IProps {}

interface IState {}

export default class Main extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <div>
                Test
                <Parser />
                <Settings />
                <Chart />
                <Graph />
            </div>
        );
    }
}
