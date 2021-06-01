import { Expression } from "expr-eval";
import { CModel } from "./Types";

export interface Result {
    result: Map<string, number>;
    timeStep: number;
}

export abstract class Solver {
    stepSize: number;
    timeStep: number;
    model: CModel;

    constructor(stepSize: number, timeStep: number, model: CModel) {
        this.stepSize = stepSize;
        this.timeStep = timeStep;
        this.model = model;
    }

    abstract execute(): Result;

    evaluateExpression(exp: Expression, variables: Map<string, number>): number {
        return exp.evaluate(Object.fromEntries(variables));
    }

    generateVariables() {
        var variables: Map<string, number> = new Map();
        this.model.compartments.forEach((c) => variables.set(c.name, c.value[c.value.length - 1]));
        return variables;
    }
}

export class EulerMethod extends Solver {
    execute() {
        var variables = this.generateVariables();
        var res: Map<string, number> = new Map();
        this.model.compartments.forEach((c) => {
            var k = this.evaluateExpression(c.ODE, variables) * this.stepSize;
            res.set(c.name, c.value[c.value.length - 1] + k);
        });
        this.timeStep = this.timeStep + this.stepSize;
        return {
            result: res,
            timeStep: this.timeStep,
        };
    }
}

export class RungeKutta2Method extends Solver {
    execute() {
        var variables = this.generateVariables();
        var res: Map<string, number> = new Map();
        var interVariables = new Map(variables); //contains variable values at half point of the step
        this.model.compartments.forEach((c) => {
            var k1 = this.evaluateExpression(c.ODE, variables) * (this.stepSize / 2);
            interVariables.set(c.name, c.value[c.value.length - 1] + k1);
        });

        this.model.compartments.forEach((c) => {
            var k2 = this.evaluateExpression(c.ODE, interVariables) * this.stepSize;
            res.set(c.name, c.value[c.value.length - 1] + k2);
        });
        this.timeStep = this.timeStep + this.stepSize;
        return {
            result: res,
            timeStep: this.timeStep,
        };
    }
}

export class RungeKutta4Method extends Solver {
    execute() {
        var variables = this.generateVariables();
        var res: Map<string, number> = new Map();
        var interVariables = new Map(variables); //contains variables for intermediary steps
        var allK = new Map();
        //calc k1
        this.model.compartments.forEach((c) => {
            var k1 = this.evaluateExpression(c.ODE, variables) * this.stepSize;
            interVariables.set(c.name, c.value[c.value.length - 1] + k1 / 2);
            allK.set(c.name, [k1]);
        });
        //calc k2
        this.model.compartments.forEach((c) => {
            var k2 = this.evaluateExpression(c.ODE, interVariables) * this.stepSize;
            interVariables.set(c.name, c.value[c.value.length - 1] + k2 / 2);
            allK.get(c.name).push(k2);
        });
        //calc k3
        this.model.compartments.forEach((c) => {
            var k3 = this.evaluateExpression(c.ODE, interVariables) * this.stepSize;
            interVariables.set(c.name, c.value[c.value.length - 1] + k3);
            allK.get(c.name).push(k3);
        });
        //calc k4
        this.model.compartments.forEach((c) => {
            var k4 = this.evaluateExpression(c.ODE, interVariables) * this.stepSize;
            allK.get(c.name).push(k4);
        });
        //calc y_n+1
        this.model.compartments.forEach((c) => {
            res.set(
                c.name,
                c.value[c.value.length - 1] +
                    (1 / 6) * allK.get(c.name)[0] + //k1
                    (2 / 6) * allK.get(c.name)[1] + //k2
                    (2 / 6) * allK.get(c.name)[2] + //k3
                    (1 / 6) * allK.get(c.name)[3], //k4
            );
        });
        this.timeStep = this.timeStep + this.stepSize;
        return {
            result: res,
            timeStep: this.timeStep,
        };
    }
}

export class RungeKutta4AutomaticMethod extends Solver {
    error: number;

    constructor(stepSize: number, timeStep: number, model: CModel) {
        super(stepSize, timeStep, model);
        this.error = 0;
    }

    execute() {
        var errors: number[] = [];
        const maxError = 0.01;
        var variables = this.generateVariables();
        do {
            //error control handling
            //small error increase stepSize
            if (this.error < maxError / 4) {
                this.stepSize = this.stepSize * 2;
            }
            //big error decrease stepSize
            else if (this.error > maxError) {
                this.stepSize = this.stepSize / 2;
            }
            var resOneStep = this.calculateStep(variables, this.stepSize);
            var resTwoStep = this.calculateStep(this.calculateStep(variables, this.stepSize / 2), this.stepSize / 2);

            Array.from(resOneStep.values()).forEach((v, i) => {
                errors.push(Math.abs(Array.from(resTwoStep.values())[i] - v));
            });
            this.error = errors.reduce((p, c) => p + c, 0) / errors.length;
        } while (this.error > maxError);

        this.timeStep = this.timeStep + this.stepSize;
        return {
            result: resTwoStep,
            timeStep: this.timeStep,
        };
    }

    calculateStep(variables: Map<string, number>, stepSize: number) {
        var res: Map<string, number> = new Map();
        var interVariables = new Map(variables); //contains variables for intermediary steps
        var allK = new Map();
        //calc k1
        this.model.compartments.forEach((c) => {
            var k1 = this.evaluateExpression(c.ODE, variables) * stepSize;
            interVariables.set(c.name, variables.get(c.name)! + k1 / 2);
            allK.set(c.name, [k1]);
        });
        //calc k2
        this.model.compartments.forEach((c) => {
            var k2 = this.evaluateExpression(c.ODE, interVariables) * stepSize;
            interVariables.set(c.name, variables.get(c.name)! + k2 / 2);
            allK.get(c.name).push(k2);
        });
        //calc k3
        this.model.compartments.forEach((c) => {
            var k3 = this.evaluateExpression(c.ODE, interVariables) * stepSize;
            interVariables.set(c.name, variables.get(c.name)! + k3);
            allK.get(c.name).push(k3);
        });
        //calc k4
        this.model.compartments.forEach((c) => {
            var k4 = this.evaluateExpression(c.ODE, interVariables) * stepSize;
            allK.get(c.name).push(k4);
        });
        //calc y_n+1
        this.model.compartments.forEach((c) => {
            res.set(
                c.name,
                variables.get(c.name)! +
                    (1 / 6) * allK.get(c.name)[0] + //k1
                    (2 / 6) * allK.get(c.name)[1] + //k2
                    (2 / 6) * allK.get(c.name)[2] + //k3
                    (1 / 6) * allK.get(c.name)[3], //k4
            );
        });
        return res;
    }
}

export class BulirschStoerMethod extends Solver {
    error: number;
    depth: number;

    constructor(stepSize: number, timeStep: number, model: CModel, depth: number) {
        super(stepSize, timeStep, model);
        this.error = 0;
        this.depth = depth;
    }

    //Bulirsch-Stoer Method
    execute() {
        var variables = this.generateVariables();
        const maxError = 0.001;
        const maxDepth = 8; // how many rows to be calculated

        var triangleMatrix: Map<string, number>[][] = [];

        //error controlling loop
        do {
            //error control handling
            //small error decrease depth or increase stepSize
            if (this.error < maxError / 2) {
                if (this.depth > 2) {
                    this.depth = this.depth - 1;
                } else {
                    this.stepSize = this.stepSize * 2;
                    this.depth = this.depth + 1;
                }
            }
            //big error increase depth or decrease stepSize
            else if (this.error > maxError) {
                if (this.depth < maxDepth) {
                    this.depth = this.depth + 1;
                } else {
                    this.stepSize = this.stepSize / 2;
                    this.depth = this.depth - 1;
                }
            }

            var errors: number[] = [];
            for (let n = 0; n < this.depth; n++) {
                //rows
                triangleMatrix[n] = [];
                for (let m = 0; m <= n; m++) {
                    //columns
                    if (m === 0) {
                        //steps = 2(i+1)
                        triangleMatrix[n][m] = this.modifiedMidpointMethod(variables, 2 * (n + 1));
                    } else {
                        //extrapolation
                        var Rnm: Map<string, number> = new Map();
                        this.model.compartments.forEach((c) => {
                            var val =
                                triangleMatrix[n][m - 1].get(c.name)! +
                                (triangleMatrix[n][m - 1].get(c.name)! - triangleMatrix[n - 1][m - 1].get(c.name)!) /
                                    ((n / (n - 1)) ** (2 * m) - 1);
                            Rnm.set(c.name, val);

                            //error control
                            //only take error from best estimate
                            if (m === n && n === this.depth - 1) {
                                errors.push(
                                    Math.abs(
                                        (triangleMatrix[n][m - 1].get(c.name)! -
                                            triangleMatrix[n - 1][m - 1].get(c.name)!) /
                                            ((n / (n - 1)) ** (2 * m) - 1),
                                    ),
                                );
                            }
                        }); //end forEach
                        triangleMatrix[n][m] = Rnm;
                    } //end elsif
                } //end inner loop
            } //end outer loop
            this.error = errors.reduce((p, c) => p + c, 0) / errors.length;
        } while (this.error > maxError); //end error control loop
        this.timeStep = this.timeStep + this.stepSize;
        return {
            result: triangleMatrix[triangleMatrix.length - 1][triangleMatrix[triangleMatrix.length - 1].length - 1],
            timeStep: this.timeStep,
        };
    }

    //modified midpoint method
    modifiedMidpointMethod(variables: Map<string, number>, n: number) {
        //stepSize == H
        //h == H/n
        var h = this.stepSize / n;
        var interVariables = new Map(variables); //contains variables for intermediary steps
        var midpoints: Map<string, number[]> = new Map();
        var lastPoint: Map<string, number> = new Map();

        //z0 == yn == current state
        //z1 = z0 + h * f(x, z0)
        this.model.compartments.forEach((c) => {
            var k = this.evaluateExpression(c.ODE, interVariables);
            var z1 = c.value[c.value.length - 1] + h * k;

            interVariables.set(c.name, z1);
            midpoints.set(c.name, [c.value[c.value.length - 1], z1]);
        });

        //zm+1 = zm−1 + 2h ∗ f(x + m ∗ h, zm) with m = 1, 2, ..., n − 1
        for (let m = 1; m < n; m++) {
            this.model.compartments.forEach((c) => {
                var k = this.evaluateExpression(c.ODE, interVariables);
                var zm1 = midpoints.get(c.name)![m - 1] + 2 * h * k;

                interVariables.set(c.name, zm1);
                midpoints.get(c.name)!.push(zm1);
            });
        }

        //y(x + H) ≈ yn ≡ 1/2*(zn + zn−1 + h ∗ f(x + H, zn))
        this.model.compartments.forEach((c) => {
            var k = this.evaluateExpression(c.ODE, interVariables);
            var zm = (1 / 2) * (midpoints.get(c.name)![n] + midpoints.get(c.name)![n - 1] + h * k);
            lastPoint.set(c.name, zm);
        });
        return lastPoint;
    }
}
