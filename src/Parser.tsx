import React from "react";
import "./Parser.css";
var model = require("./model");
var actions = {
    makeCompartment: function (input: any, start: any, end: any, elements: any) {
        console.log(elements);
        console.log("ident: " + elements[4].text);
        console.log("value " + elements[6].text);
    },
    makeParameter: function (input: any, start: any, end: any, elements: any) {
        console.log(elements);
        console.log("ident: " + elements[4].text);
        console.log("value " + elements[6].text);
    },
    makeReaction: function (input: any, start: any, end: any, elements: any) {
        console.log(elements);
        console.log("orig: " + elements[4].text);
        console.log("dest: " + elements[6].text);
        console.log("value " + elements[8].text);
    },
};

interface CModel {
    compartments: Compartment[];
    parameters: Parameter[];
    reactions: Reaction[];
}

interface Compartment {
    name: string;
    value: number;
}

interface Parameter {
    name: string;
    value: number;
}

interface Reaction {
    orig: string;
    dest: string;
    value: string;
}

interface IProps {}

interface IState {
    model: CModel;
    value: string;
}

export default class Parser extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            model: { compartments: [], parameters: [], reactions: [] },
            value: "(comp A 10)(comp B 10)(param k 0.1)(react A B {A * k})",
        };
    }

    //Parse Model
    cModel: CModel = { compartments: [], parameters: [], reactions: [] };
    makeCompartment(elements: any) {
        var comp = { name: elements.elements[4].text, value: +elements.elements[6].text };
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
        this.setState({ model: this.cModel });
        //console.log(this.state.model);

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
