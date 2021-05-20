export interface CModel {
    parameters: Parameter[];
    compartments: Compartment[];
}

export interface Compartment {
    name: string;
    value: number[];
    ODE: string;
}

export interface Parameter {
    name: string;
    value: number;
}
