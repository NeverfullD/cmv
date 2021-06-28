import { Expression } from "expr-eval";

export interface CompartmentModel {
    parameters: Parameter[];
    compartments: Compartment[];
}

export interface Compartment {
    name: string;
    value: number[];
    ODE: Expression;
}

export interface Parameter {
    name: string;
    value: number;
}
