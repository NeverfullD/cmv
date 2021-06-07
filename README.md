# CMV - Compartment Model Visualizer

A project built with React to simulate and visualize compartment models.

## model DSL

How to Describe the Model for the Simulation.

const:\
(param k 0.1)\
keyword name value

Copartments:\
(comp A 5 {k\*A})\
keyword name value ODE

Example

```lisp
(param alpha 0.75)
(param beta 0.1)
(param N 10000)

(comp S 9999 {-alpha*S*I/N})
(comp I 1 {alpha*S*I/N - beta*I})
(comp R 0 {beta*I})
```

## TODO

-   Visualization
    -   add text to graph
    -   change settings depending on solver
-   Technical
    -   Initialize chart to remove error message
    -   add configuration file
