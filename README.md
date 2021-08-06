# CMV - Compartment Model Visualizer

A project built with React to simulate and visualize compartment models.

[To the Simulator](https://neverfulld.github.io/cmv/)

## model DSL

How to Describe the Model for the Simulation.

The model consists of two parts:

constant Parameters:

```
param k 0.1
```

Following the pattern:\
keyword name value

Compartments:

```
comp A 5 {k*A}
```

Following the pattern:\
keyword name value ODE

The Parameters must be written above the compartments.

Example

```
param alpha 0.75
param beta 0.1
param N 10000

comp S 9999 {-alpha*S*I/N}
comp I 1 {alpha*S*I/N - beta*I}
comp R 0 {beta*I}
```

Model DSL Syntax Definition:

```
model = parameters:parameter* _ compartments:compartment+
compartment = "comp" _ name:ident _ value:value _ ODE:calc _
parameter = "param" _ name:ident _ value:value _
ident = ident:[A-Za-z0-9]+
value = digits:[0-9.-]+
_ "whitespace" = [ \\t\\n\\r]*
calc = "{" calc:[^}]* "}"
```
