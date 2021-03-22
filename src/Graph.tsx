import React from "react";
import "./Graph.css";

interface IProps {}

interface IState {}

export default class Graph extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return <div className="graph">Graph</div>;
    }
}
