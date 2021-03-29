import React from "react";
import "./Parser.css";
import { CModel } from "./Types";

var model = require("./model");

interface IProps {
    setNewModel: (newModel: CModel) => void;
}

interface IState {
    value: string;
}

export default class Parser extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            value: "(comp A 10)(comp B 10)(param k 0.1)(react A B {A * k})",
        };
    }

    //Parse Model
    cModel: CModel = { compartments: [], parameters: [], reactions: [] };
    makeCompartment(elements: any) {
        var comp = { name: elements.elements[4].text, value: [+elements.elements[6].text] };
        this.cModel.compartments.push(comp);
    }
    makeParameter(elements: any) {
        var param = { name: elements.elements[4].text, value: +elements.elements[6].text };
        this.cModel.parameters.push(param);
    }
    makeReaction(elements: any) {
        var react = {
            orig: elements.elements[4].text,
            dest: elements.elements[6].text,
            value: elements.elements[8].text,
        };
        this.cModel.reactions.push(react);
    }

    onClick(event: any) {
        //parse Input
        this.cModel = { compartments: [], parameters: [], reactions: [] };
        var tree = model.parse(this.state.value);
        tree.elements[0].elements.forEach(this.makeCompartment.bind(this));
        tree.elements[2].elements.forEach(this.makeParameter.bind(this));
        tree.elements[4].elements.forEach(this.makeReaction.bind(this));

        //console.log(this.cModel);
        this.props.setNewModel(this.cModel);

        event.preventDefault();
    }

    handleChange(event: any) {
        this.setState({ value: event.target.value });
    }

    componentDidMount() {}

    render() {
        return (
            <div className="parser">
                Parser
                <form onSubmit={this.onClick.bind(this)}>
                    <label>
                        Model:
                        <br />
                        <textarea
                            className="parserText"
                            value={this.state.value}
                            onChange={this.handleChange.bind(this)}
                        />
                    </label>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
