export interface CModel {
    compartments: Compartment[];
    parameters: Parameter[];
    reactions: Reaction[];
}

export interface Compartment {
    name: string;
    value: number[];
}

export interface Parameter {
    name: string;
    value: number;
}

export interface Reaction {
    orig: string;
    dest: string;
    value: string;
}
