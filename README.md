# CMV - Compartment Model Visualizer

A project built with React to simulate and visualize compartment models.

## model DSL

Copartments:\
(comp A 5)\
keyword name value

const:\
(param k 0.1)\
keyword name value

ODE:\
(react A B {A \* k})

Example

```lisp
(comp A 5)
(comp B 5)
(param k 0.1)
(react A B {A * k})
```

## TODO

-   Rework parser
    -   change format of ODE
-   Add Runge Kutta
-   Add Bolrisch stoer
-   Add Styling
