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
    data: { nodes: { id: string; size: number }[]; links: { source: string; target: string }[] };
}

export default class Graph extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        var data = this.generateInitialDataStructure();
        //console.log(data);

        this.state = {
            data: data,
        };
    }

    generateInitialDataStructure() {
        var node: { id: string; size: number }[] = [];
        this.props.model.compartments.forEach((c) => {
            node.push({ id: c.name, size: c.value[c.value.length - 1] });
        });
        var link: { source: string; target: string }[] = [];
        //this.props.model.reactions.forEach((c) => {            link.push({ source: c.orig, target: c.dest });        });
        return { nodes: node, links: link };
    }

    componentDidMount() {}

    onClick() {}

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
                {
                    //<button onClick={this.onClick.bind(this)}>Test</button>
                }
            </div>
        );
    }
}
