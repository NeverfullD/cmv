import React from "react";
import { CModel } from "./Types";
import MyChart from "./Chart";
import Graph from "./Graph";
import Parser from "./Parser";
import Settings from "./Settings";

interface IProps {}

interface IState {
    model: CModel;
}

export default class Main extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            model: { compartments: [], parameters: [], reactions: [] },
        };
    }

    componentDidMount() {}

    setModel = (newModel: CModel) => {
        this.setState({ model: newModel });
    };

    onClick() {
        console.log(this.state.model);
    }

    render() {
        return (
            <div>
                Test
                <button onClick={this.onClick.bind(this)}>Test</button>
                <Parser setNewModel={this.setModel} />
                <Settings />
                <MyChart />
                <Graph />
            </div>
        );
    }
}
