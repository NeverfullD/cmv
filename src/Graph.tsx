import React from "react";
import "./Graph.css";

import ForceGraph2D from "react-force-graph-2d";

interface IProps {}

interface IState {
    data: any;
}

export default class Graph extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            data: {
                nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
                links: [
                    { source: 0, target: 1 },
                    { source: 3, target: 4 },
                    { source: 2, target: 4 },
                    { source: 3, target: 1 },
                ],
            },
        };
    }

    componentDidMount() {}

    onClick() {
        var tmp = this.state.data;
        tmp.links.push({ source: 2, target: 1 });
        console.log(tmp);

        this.setState({ data: tmp });
    }

    render() {
        return (
            <div className="graph">
                Graph
                <ForceGraph2D graphData={this.state.data} nodeLabel="id" width={500} height={500} />
                <button onClick={this.onClick.bind(this)}>Test</button>
            </div>
        );
    }
}
