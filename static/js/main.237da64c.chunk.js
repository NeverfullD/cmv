(this.webpackJsonpcmv=this.webpackJsonpcmv||[]).push([[0],{45:function(e,t,a){},48:function(e,t,a){},61:function(e,t,a){},62:function(e,t,a){},74:function(e,t,a){},76:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a.n(n),i=a(28),r=a.n(i),o=(a(45),a(5)),u=a(6),c=a(7),l=a(8),p=a(31),h=(a(48),a(2)),m=function(e){Object(c.a)(a,e);var t=Object(l.a)(a);function a(e){var n;Object(o.a)(this,a);var s=(n=t.call(this,e)).generateData();return n.state={data:s},n}return Object(u.a)(a,[{key:"generateData",value:function(){var e=this,t=[],a=["x"];this.props.model.compartments.forEach((function(e){return a.push(e.name)})),t.push(a);for(var n=function(a){i=[e.props.timeSteps[a]],e.props.model.compartments.forEach((function(e){return i.push(e.value[a])})),t.push(i)},s=0;s<=this.props.currentTick;s++){var i;n(s)}return t}},{key:"componentDidMount",value:function(){}},{key:"onClick",value:function(){}},{key:"render",value:function(){return Object(h.jsxs)("div",{className:"chart",children:["Chart",Object(h.jsx)(p.a,{width:"600px",height:"400px",chartType:"LineChart",loader:Object(h.jsx)("div",{children:"Loading Chart"}),data:this.state.data,options:{hAxis:{title:"Time"},vAxis:{title:"Value"}},rootProps:{"data-testid":"2"}})]})}}]),a}(s.a.Component),v=a(38),d=(a(61),function(e){Object(c.a)(a,e);var t=Object(l.a)(a);function a(e){var n;Object(o.a)(this,a);var s=(n=t.call(this,e)).generateInitialDataStructure();return n.state={data:s},n}return Object(u.a)(a,[{key:"generateInitialDataStructure",value:function(){var e=[];this.props.model.compartments.forEach((function(t){e.push({id:t.name,size:t.value[t.value.length-1]})}));return{nodes:e,links:[]}}},{key:"componentDidMount",value:function(){}},{key:"onClick",value:function(){}},{key:"render",value:function(){return Object(h.jsxs)("div",{className:"graph",children:["Graph",Object(h.jsx)(v.a,{graphData:this.state.data,nodeLabel:"id",nodeVal:function(e){return e.size},width:500,height:500})]})}}]),a}(s.a.Component)),f=(a(62),a(37)),j=function(e){Object(c.a)(a,e);var t=Object(l.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={value:"(param alpha 0.75)\n(param beta 0.1)\n(param N 10000)\n\n(comp S 9999 {-alpha*S*I/N})\n(comp I 1 {alpha*S*I/N - beta*I})\n(comp R 0 {beta*I})",parser:Object(f.generate)('{{\nfunction makeFloat(o) {\n    return parseFloat(o.join(""), 10);\n}\n}}\n\nmodel = parameters:parameter* _ compartments:compartment+ {return {parameters, compartments};}\ncompartment = "(" _ "comp" _ name:ident _ value:value _ ODE:calc _ ")" _ {return {name, value:[value], ODE};}\nparameter = "(" _ "param" _ name:ident _ value:value _ ")" _ {return {name, value};}\nident = ident:[A-Za-z]+ {return ident.join("")}\nvalue = digits:[0-9.]+ {return makeFloat(digits);}\n_ "whitespace" = [ \\t\\n\\r]*\ncalc = "{" calc:[^}]* "}" {return calc.join("")}')},n}return Object(u.a)(a,[{key:"onClick",value:function(e){this.props.setNewModel(this.state.parser.parse(this.state.value)),e.preventDefault()}},{key:"handleChange",value:function(e){this.setState({value:e.target.value})}},{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return Object(h.jsxs)("div",{className:"parser",children:["Parser",Object(h.jsxs)("form",{onSubmit:this.onClick.bind(this),children:[Object(h.jsxs)("label",{children:["Model:",Object(h.jsx)("br",{}),Object(h.jsx)("textarea",{className:"parserText",value:this.state.value,onChange:this.handleChange.bind(this)})]}),Object(h.jsx)("br",{}),Object(h.jsx)("input",{type:"submit",value:"Submit"})]})]})}}]),a}(s.a.Component),S=(a(74),function(e){Object(c.a)(a,e);var t=Object(l.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).onSimulate1=function(){n.props.onSimulate(1)},n.onSimulate10=function(){n.props.onSimulate(10)},n.onSimulate100=function(){n.props.onSimulate(100)},n.onSimulate1000=function(){n.props.onSimulate(1e3)},n.onSimulate=function(){n.props.onSimulate(parseInt(n.state.steps))},n.onChangeStepSize=function(){n.props.changeStepSize(parseFloat(n.state.stepSize))},n.handleChangeSteps=function(e){n.setState({steps:e.target.value})},n.handleChangeStepSize=function(e){n.setState({stepSize:e.target.value})},n.state={steps:"",stepSize:""},n}return Object(u.a)(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return Object(h.jsxs)("div",{className:"settings",children:["Settings",Object(h.jsx)("br",{}),Object(h.jsx)("button",{onClick:this.onSimulate1,children:"Simulate 1"}),Object(h.jsx)("button",{onClick:this.onSimulate10,children:"Simulate 10"}),Object(h.jsx)("button",{onClick:this.onSimulate100,children:"Simulate 100"}),Object(h.jsx)("button",{onClick:this.onSimulate1000,children:"Simulate 1000"}),Object(h.jsx)("button",{onClick:this.onSimulate,children:"Simulate: "}),Object(h.jsx)("input",{type:"text",value:this.state.steps,onChange:this.handleChangeSteps}),Object(h.jsx)("br",{}),Object(h.jsxs)("button",{onClick:this.onChangeStepSize,children:["Change Step Size (currently: ",this.props.stepSize,"): "]}),Object(h.jsx)("input",{type:"text",value:this.state.stepSize,onChange:this.handleChangeStepSize})]})}}]),a}(s.a.Component)),b=a(75).Parser,O=function(e){Object(c.a)(a,e);var t=Object(l.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).setModel=function(e){n.setState({model:e,currentTick:0,timeSteps:[0]})},n.onClick=function(){console.log(n.state.model)},n.onSimulate=function(e){n.solveSteps(e)},n.changeStepSize=function(e){n.setState({stepSize:e})},n.state={model:{parameters:[],compartments:[]},stepSize:.1,currentTick:0,timeSteps:[]},n}return Object(u.a)(a,[{key:"componentDidMount",value:function(){}},{key:"rungeKutta2",value:function(e){var t=this,a=new Map(e);this.state.model.compartments.forEach((function(n){var s=t.evaluateExpression(n.ODE,e)*(t.state.stepSize/2);a.set(n.name,n.value[n.value.length-1]+s)})),this.state.model.compartments.forEach((function(e){var n=t.evaluateExpression(e.ODE,a)*t.state.stepSize;e.value.push(e.value[e.value.length-1]+n)}))}},{key:"rungeKutta4",value:function(e){var t=this,a=new Map(e),n=new Map;this.state.model.compartments.forEach((function(s){var i=t.evaluateExpression(s.ODE,e)*t.state.stepSize;a.set(s.name,s.value[s.value.length-1]+i/2),n.set(s.name,[i])})),this.state.model.compartments.forEach((function(e){var s=t.evaluateExpression(e.ODE,a)*t.state.stepSize;a.set(e.name,e.value[e.value.length-1]+s/2),n.get(e.name).push(s)})),this.state.model.compartments.forEach((function(e){var s=t.evaluateExpression(e.ODE,a)*t.state.stepSize;a.set(e.name,e.value[e.value.length-1]+s),n.get(e.name).push(s)})),this.state.model.compartments.forEach((function(e){var s=t.evaluateExpression(e.ODE,a)*t.state.stepSize;n.get(e.name).push(s)})),this.state.model.compartments.forEach((function(e){e.value.push(e.value[e.value.length-1]+1/6*n.get(e.name)[0]+2/6*n.get(e.name)[1]+2/6*n.get(e.name)[2]+1/6*n.get(e.name)[3])}))}},{key:"euler",value:function(e){var t=this;this.state.model.compartments.forEach((function(a){var n=t.evaluateExpression(a.ODE,e)*t.state.stepSize;a.value.push(a.value[a.value.length-1]+n)}))}},{key:"modifiedMidpointMethod",value:function(e,t){var a=this,n=this.state.stepSize/t,s=new Map(e),i=new Map;this.state.model.compartments.forEach((function(e){var t=a.evaluateExpression(e.ODE,s),r=e.value[e.value.length-1]+n*t;s.set(e.name,r),i.set(e.name,[e.value[e.value.length-1],r])}));for(var r=function(e){a.state.model.compartments.forEach((function(t){var r=a.evaluateExpression(t.ODE,s),o=i.get(t.name)[e-1]+2*n*r;s.set(t.name,o),i.get(t.name).push(o)}))},o=1;o<t;o++)r(o);this.state.model.compartments.forEach((function(e){var r=a.evaluateExpression(e.ODE,s),o=.5*(i.get(e.name)[t]+i.get(e.name)[t-1]+n*r);e.value.push(o)}))}},{key:"solveSteps",value:function(e){for(var t=this,a=function(e){s=new Map,t.state.model.compartments.forEach((function(a){return s.set(a.name,a.value[t.state.currentTick+e])})),t.state.model.parameters.forEach((function(e){return s.set(e.name,e.value)})),t.modifiedMidpointMethod(s,8),t.state.timeSteps.push(t.state.timeSteps[t.state.currentTick+e]+t.state.stepSize)},n=0;n<e;n++){var s;a(n)}this.setState({currentTick:this.state.currentTick+e})}},{key:"evaluateExpression",value:function(e,t){return b.evaluate(e,Object.fromEntries(t))}},{key:"render",value:function(){return Object(h.jsxs)("div",{children:["Test",Object(h.jsx)("button",{onClick:this.onClick,children:"Test"}),Object(h.jsx)("a",{href:"https://github.com/NeverfullD/cmv",children:"to Github"}),Object(h.jsx)(j,{setNewModel:this.setModel}),Object(h.jsx)(S,{onSimulate:this.onSimulate,changeStepSize:this.changeStepSize,stepSize:this.state.stepSize}),Object(h.jsx)(m,{model:this.state.model,timeSteps:this.state.timeSteps,currentTick:this.state.currentTick},this.state.currentTick+"chart"),Object(h.jsx)(d,{model:this.state.model},this.state.currentTick+"graph")]})}}]),a}(s.a.Component),g=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,85)).then((function(t){var a=t.getCLS,n=t.getFID,s=t.getFCP,i=t.getLCP,r=t.getTTFB;a(e),n(e),s(e),i(e),r(e)}))};r.a.render(Object(h.jsx)(s.a.StrictMode,{children:Object(h.jsx)(O,{})}),document.getElementById("root")),g()}},[[76,1,2]]]);
//# sourceMappingURL=main.237da64c.chunk.js.map