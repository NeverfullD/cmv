{{
  function makeFloat(o) {
    return parseFloat(o.join(""), 10);
  }
}}

model = param:parameter* _ comp:compartment+ {return {param, comp};}
compartment = "(" _ "comp" _ name:ident _ value:value _ calc:calc _ ")" _ {return {name, value, calc};}
parameter = "(" _ "param" _ name:ident _ value:value _ ")" _ {return {name, value};}
ident = ident:[A-Za-z]+ {return ident.join("")}
value = digits:[0-9\.]+ {return makeFloat(digits);}
_ "whitespace" = [ \t\n\r]*
calc = "{" calc:[^}]* "}" {return calc.join("")}