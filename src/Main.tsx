import React from "react";
import { CModel } from "./Types";
import MyChart from "./Chart";
import Graph from "./Graph";
import Parser from "./Parser";
import Settings from "./Settings";

const Evaluator = require("expr-eval").Parser;

interface IProps {}

interface IState {
    model: CModel;
    stepSize: number;
    currentTick: number;
}

export default class Main extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            model: { compartments: [], parameters: [], reactions: [] },
            stepSize: 0.1,
            currentTick: 0,
        };
    }

    componentDidMount() {}

    setModel = (newModel: CModel) => {
        this.setState({ model: newModel, currentTick: 0 });
    };

    onClick = () => {
        console.log(this.state.model);
    };

    onSimulate = () => {
        this.solveSteps(1);
    };

    onSimulate100 = () => {
        this.solveSteps(100);
    };

    //simple Solver
    solveSteps(steps: number) {
        for (let i = 0; i < steps; i++) {
            var delta = new Map();
            var variables = new Map();
            this.state.model.compartments.forEach((c) => variables.set(c.name, c.value[this.state.currentTick + i]));
            this.state.model.parameters.forEach((p) => variables.set(p.name, p.value));
            this.state.model.compartments.forEach((c) => delta.set(c.name, c.value[this.state.currentTick + i]));
            //calculate Delta
            this.state.model.reactions.forEach((r) => {
                var res = this.evaluateExpression(r.value, variables) * this.state.stepSize;
                delta.set(r.dest, delta.get(r.dest) + res);
                delta.set(r.orig, delta.get(r.orig) - res);
            });
            //apply Delta
            this.state.model.compartments.forEach((c) => c.value.push(delta.get(c.name)));
        }
        //endCurrentTick
        this.setState({ currentTick: this.state.currentTick + steps });
    }

    evaluateExpression(exp: string, variables: Map<string, number>): number {
        return Evaluator.evaluate(exp, Object.fromEntries(variables));
    }

    render() {
        return (
            <div>
                Test
                <button onClick={this.onClick}>Test</button>
                <button onClick={this.onSimulate}>Simple Simulate</button>
                <button onClick={this.onSimulate100}>Simple Simulate 100</button>
                <Parser setNewModel={this.setModel} />
                <Settings />
                <MyChart
                    model={this.state.model}
                    stepSize={this.state.stepSize}
                    currentTick={this.state.currentTick}
                    key={this.state.currentTick + "chart"}
                />
                <Graph model={this.state.model} key={this.state.currentTick + "graph"} />
            </div>
        );
    }
}
