import React from "react";
import "./Parser.css";

interface IProps {}

interface IState {}

export default class Parser extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return <div className="parser">Parser</div>;
    }
}
