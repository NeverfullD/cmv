import React from "react";
import ForceGraph2D, { NodeObject } from "react-force-graph-2d";

import "./Graph.css";
import { CModel } from "./Types";

interface NodeType extends NodeObject {
    size: number;
}

interface IProps {
    model: CModel;
}

interface IState {
    data: { nodes: { id: any; size: number }[]; links: { source: any; target: any }[] };
}

export default class Graph extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        var data = this.generateInitialDataStructure();
        console.log(data);

        this.state = {
            data: data,
        };
    }

    generateInitialDataStructure() {
        var node: { id: any; size: number }[] = [];
        this.props.model.compartments.forEach((c) => {
            node.push({ id: c.name, size: c.value[0] });
        });
        var link: { source: any; target: any }[] = [];
        this.props.model.reactions.forEach((c) => {
            link.push({ source: c.orig, target: c.dest });
        });
        return { nodes: node, links: link };
    }

    componentDidMount() {}

    onClick() {
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
