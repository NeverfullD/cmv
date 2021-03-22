import React from "react";
import "./Chart.css";

interface IProps {}

interface IState {}

export default class Chart extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return <div className="chart">Chart</div>;
    }
}
