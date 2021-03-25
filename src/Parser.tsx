import React from "react";
import "./Parser.css";
var model = require("./model");

interface IProps {}

interface IState {}

export default class Parser extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    onClick() {
        var tree = model.parse("(comp A 10)(comp B 10)(param k 0.1)(react A B {A * k})");
        console.log(tree);
    }
    componentDidMount() {}

    render() {
        return (
            <div className="parser">
                <button onClick={this.onClick}>test</button>
                Parser
            </div>
        );
    }
}
