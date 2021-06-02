import React from "react";
import "./ParserModule.css";
import { CModel } from "./Types";
import { Parser, generate } from "peggy";
const Evaluator = require("expr-eval").Parser;

const modelGrammar = `{{
function makeFloat(o) {
    return parseFloat(o.join(""), 10);
}
}}

model = parameters:parameter* _ compartments:compartment+ {return {parameters, compartments};}
compartment = "(" _ "comp" _ name:ident _ value:value _ ODE:calc _ ")" _ {return {name, value:[value], ODE};}
parameter = "(" _ "param" _ name:ident _ value:value _ ")" _ {return {name, value};}
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
}

export default class ParserModule extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            value: `(param alpha 0.75)
(param beta 0.1)
(param N 10000)

(comp S 9999 {-alpha*S*I/N})
(comp I 1 {alpha*S*I/N - beta*I})
(comp R 0 {beta*I})`,
            parser: generate(modelGrammar),
            error: { hasError: false, message: "", location: "" },
        };
    }

    //Parse Model
    onClick(event: any) {
        //parse Input
        try {
            var model: CModel = this.state.parser.parse(this.state.value);
            //insert constants
            var constants = new Map();
            model.parameters.forEach((p) => constants.set(p.name, p.value));
            model.compartments.forEach((c) => (c.ODE = Evaluator.parse(c.ODE).simplify(Object.fromEntries(constants))));
            //set model
            this.props.setNewModel(model);
            //no error
            this.setState({ error: { hasError: false, message: "", location: "" } });
        } catch (error) {
            this.setState({
                error: {
                    hasError: true,
                    message: error.message,
                    location: "at line: " + error.location.start.line + " at column: " + error.location.start.column,
                },
            });

            console.log(error);
        }

        event.preventDefault();
    }

    handleChange(event: any) {
        this.setState({ value: event.target.value });
    }

    componentDidMount() {}

    renderError() {
        if (this.state.error.hasError) {
            return (
                <div>
                    Error: {this.state.error.message} at {this.state.error.location}
                </div>
            );
        }
    }

    render() {
        var error = this.renderError();
        return (
            <div className="parser">
                Parser
                {error}
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
