import React from "react";
import "./ParserModule.css";
import { CModel } from "./Types";
import { Parser, generate } from "peggy";
import * as config from "./config.json";

const Evaluator = require("expr-eval").Parser;

const modelGrammar = `{{
function makeFloat(o) {
    return parseFloat(o.join(""), 10);
}
}}

model = parameters:parameter* _ compartments:compartment+ {return {parameters, compartments};}
compartment = "comp" _ name:ident _ value:value _ ODE:calc _ {return {name, value:[value], ODE};}
parameter = "param" _ name:ident _ value:value _ {return {name, value};}
ident = ident:[A-Za-z]+ {return ident.join("")}
value = digits:[0-9.]+ {return makeFloat(digits);}
_ "whitespace" = [ \\t\\n\\r]*
calc = "{" calc:[^}]* "}" {return calc.join("")}`;

interface IProps {
    setNewModel: (newModel: CModel) => void;
}

interface ParseError {
    hasError: boolean;
    message: string;
    location: string;
}

interface IState {
    value: string;
    parser: Parser;
    error: ParseError;
    loadedModel: boolean;
    selectedModel: number;
    customModels: { name: string; value: string }[];
}

export default class ParserModule extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        var retrievedModels = localStorage.getItem("savedModels");
        this.state = {
            value: "",
            parser: generate(modelGrammar),
            error: { hasError: false, message: "", location: "" },
            loadedModel: false,
            selectedModel: 0,
            customModels: retrievedModels ? JSON.parse(retrievedModels) : [],
        };
    }

    //Parse Model
    onLoadModel = (event: any) => {
        //parse Input
        try {
            var model: CModel = this.state.parser.parse(this.state.value);
            //insert constants
            var constants = new Map();
            model.parameters.forEach((p) => constants.set(p.name, p.value));
            model.compartments.forEach((c) => (c.ODE = Evaluator.parse(c.ODE).simplify(Object.fromEntries(constants))));
            //set model
            this.props.setNewModel(model);
            //error control
            this.setState({ error: { hasError: false, message: "", location: "" } });

            var variables = new Map();
            model.compartments.forEach((p) => variables.set(p.name, p.value[0]));
            model.compartments.forEach((c) => {
                try {
                    c.ODE.evaluate(Object.fromEntries(variables));
                } catch (error) {
                    this.setState({ error: { hasError: true, message: error.message, location: "ODE for " + c.name } });
                    console.log(error);
                }
            });
            this.setState({ loadedModel: true });
        } catch (error) {
            if (error.location !== undefined)
                this.setState({
                    error: {
                        hasError: true,
                        message: error.message,
                        location:
                            "at line: " + error.location.start.line + " at column: " + error.location.start.column,
                    },
                });
            console.log(error);
        }
        event.preventDefault();
    };

    handleChange(event: any) {
        this.setState({ value: event.target.value, selectedModel: 0 });
    }

    componentDidMount() {}

    handleSelectedModel = (event: any) => {
        this.setState({
            selectedModel: event.target.value,
            value: config.models.concat(this.state.customModels)[event.target.value].value,
        });
    };

    onSaveModel = () => {
        this.state.customModels.push({
            name: "Custom Model " + this.state.customModels.length,
            value: this.state.value,
        });
        localStorage.setItem("savedModels", JSON.stringify(this.state.customModels));
        this.setState({ selectedModel: this.state.customModels.length + 1 });
    };

    renderError() {
        if (this.state.error.hasError) {
            return (
                <div>
                    Error: {this.state.error.message} at {this.state.error.location}
                </div>
            );
        }
    }

    generateDropdownOptions() {
        var options: any[] = [];
        config.models.concat(this.state.customModels).forEach((model, i) =>
            options.push(
                <option key={i} value={i}>
                    {model.name}
                </option>,
            ),
        );

        return options;
    }

    render() {
        var error = this.renderError();

        return (
            <div className="parser">
                {config.writeModelTitle}: <a href="https://github.com/NeverfullD/cmv">{config.howToWriteModelTitle}</a>
                <br />
                {config.loadModelTitle}:{" "}
                <select value={this.state.selectedModel} onChange={this.handleSelectedModel}>
                    {this.generateDropdownOptions()}
                </select>
                <br />
                <textarea
                    className="parserText"
                    placeholder={config.modelTextAreaPlaceholder}
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                />
                <br />
                <button onClick={this.onLoadModel}>
                    {this.state.loadedModel ? config.reloadModelButton : config.loadModelButton}
                </button>
                <button onClick={this.onSaveModel}>{config.saveModelButton}</button>
                <br />
                {error}
            </div>
        );
    }
}
