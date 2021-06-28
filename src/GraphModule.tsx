import React from "react";
import ForceGraph2D, { NodeObject } from "react-force-graph-2d";

import "./GraphModule.css";
import { CompartmentModel } from "./Types";

interface IProps {
    model: CompartmentModel;
}

interface IState {
    data: { nodes: { id: string; value: number }[]; links: { source: string; target: string }[] };
}

export default class GraphModule extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        var data = this.generateInitialDataStructure();

        this.state = {
            data: data,
        };
    }

    generateInitialDataStructure() {
        var node: { id: string; value: number }[] = [];
        this.props.model.compartments.forEach((c) => {
            node.push({ id: c.name, value: c.value[c.value.length - 1] });
        });
        var link: { source: string; target: string }[] = [];
        this.props.model.compartments.forEach((c) => {
            c.ODE.symbols().forEach((sym) => link.push({ source: c.name, target: sym }));
        });
        return { nodes: node, links: link };
    }

    componentDidMount() {}

    getRandomInt = (max: number) => {
        return Math.floor(Math.random() * max);
    };

    nodePaint = (node: NodeObject, ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle =
            "#" +
            (
                (node
                    .id!.toString()
                    .split("")
                    .map((x) => x.codePointAt(0)!)
                    .reduce((a, b) => a + b) *
                    1234567) %
                Math.pow(2, 24)
            )
                .toString(16)
                .padStart(6, "0");
        ctx.beginPath();
        ctx.arc(node.x!, node.y!, 10, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.fillStyle = "#000000";
        ctx.font = "10px Sans-Serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.id!.toString(), node.x!, node.y!);
        // text
    };

    render() {
        return (
            <div className="graph">
                <ForceGraph2D
                    graphData={this.state.data}
                    nodeLabel="value"
                    nodeCanvasObject={(node, ctx) => this.nodePaint(node, ctx)}
                    width={600}
                    height={300}
                />
            </div>
        );
    }
}
