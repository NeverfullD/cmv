# CMV - Compartment Model Visualizer

A project built with React to simulate and visualize compartment models.

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
