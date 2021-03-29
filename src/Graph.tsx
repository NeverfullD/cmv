import React from "react";
import "./Graph.css";

import ForceGraph2D, { NodeObject } from "react-force-graph-2d";

interface NodeType extends NodeObject {
    size: number;
}

interface IProps {}

interface IState {
    data: { nodes: { id: number; size: number }[]; links: { source: number; target: number }[] };
}

export default class Graph extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            data: {
                nodes: [
                    { id: 0, size: 1 },
                    { id: 1, size: 2 },
                    { id: 2, size: 3 },
                    { id: 3, size: 4 },
                    { id: 4, size: 5 },
                ],
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
        console.log(tmp);

        this.setState({
            data: {
                nodes: [
                    { id: 0, size: 10 },
                    { id: 1, size: 2 },
                    { id: 2, size: 3 },
                    { id: 3, size: 4 },
                    { id: 4, size: 5 },
                ],
                links: [
                    { source: 0, target: 1 },
                    { source: 3, target: 4 },
                    { source: 2, target: 4 },
                    { source: 3, target: 1 },
                ],
            },
        });
    }

    render() {
        return (
            <div className="graph">
                Graph
                <ForceGraph2D
                    graphData={this.state.data}
                    nodeLabel="id"
                    nodeVal={(node) => (node as NodeType).size}
                    width={500}
                    height={500}
                />
                <button onClick={this.onClick.bind(this)}>Test</button>
            </div>
        );
    }
}
