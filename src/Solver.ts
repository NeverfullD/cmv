import { CModel } from "./Types";

const Evaluator = require("expr-eval").Parser;

export interface Result {
    result: Map<string, number>;
    timeStep: number;
}

export interface Solver {
    execute(variables: Map<string, number>): Result;
}

export class BulirschStoerMethod implements Solver {
    stepSize: number;
    timeStep: number;
    error: number;
    depth: number;
    model: CModel;

    constructor(stepSize: number, timeStep: number, depth: number, model: CModel) {
        this.stepSize = stepSize;
        this.timeStep = timeStep;
        this.error = 0;
        this.depth = depth;
        this.model = model;
    }

    //Bulirsch-Stoer Method
    execute(variables: Map<string, number>) {
        const maxError = 0.001;
        const maxDepth = 8; // how many rows to be calculated

        var triangleMatrix: Map<string, number>[][] = [];

        //error controlling loop
        do {
            //error control handling
            //small error decrease depth or increase stepSize
            if (this.error < maxError / 2) {
                console.log("small error");

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
        console.log(this.error);
        console.log(this.stepSize);
        console.log(this.depth);
        console.log({
            result: triangleMatrix[triangleMatrix.length - 1][triangleMatrix[triangleMatrix.length - 1].length - 1],
            timeStep: this.timeStep,
        });

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

    evaluateExpression(exp: string, variables: Map<string, number>): number {
        return Evaluator.evaluate(exp, Object.fromEntries(variables));
    }
}
