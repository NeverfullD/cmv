import React from "react";
import "./ParserModule.css";
import { CModel } from "./Types";
import { Parser, generate } from "peggy";

var modelGrammar = `{{
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

interface IState {
    value: string;
    parser: Parser;
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
        };
    }

    //Parse Model
    onClick(event: any) {
        //parse Input
        this.props.setNewModel(this.state.parser.parse(this.state.value));
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
