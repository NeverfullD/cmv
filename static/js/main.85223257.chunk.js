(this.webpackJsonpcmv=this.webpackJsonpcmv||[]).push([[0],{3:function(e){e.exports=JSON.parse('{"q":"Compartment Model Visualizer","r":"Write a Model","e":"How to Write a Model","g":"Or Load a Model","h":"Write DSL Here","f":"Load Model into Simulator","j":"Reload Model and Reset Simulator","k":"Save Model","o":"Solver","m":"Set Step Size","l":"Set Max Error Rate","p":"Time Control","n":"Simulate for","c":"Download","b":"Download Data","d":"Model Topography","a":"Data Preview","i":[{"name":"Custom","value":""},{"name":"SIR","value":"param alpha 0.75\\nparam beta 0.1\\nparam N 10000\\n\\ncomp S 9999 {-alpha*S*I/N}\\ncomp I 1 {alpha*S*I/N - beta*I}\\ncomp R 0 {beta*I}"}]}')},46:function(e,t,a){},47:function(e,t,a){},50:function(e,t,a){},63:function(e,t,a){},64:function(e,t,a){},77:function(e,t,a){},78:function(e,t,a){"use strict";a.r(t);var r,n=a(2),s=a.n(n),i=a(29),o=a.n(i),c=(a(46),a(4)),l=a(5),u=a(6),h=a(7);a(47);!function(e){e[e.manualStepSize=0]="manualStepSize",e[e.errorControlled=1]="errorControlled"}(r||(r={}));var p=function(){function e(t,a,r){Object(c.a)(this,e),this.stepSize=void 0,this.timeStep=void 0,this.model=void 0,this.solverType=void 0,this.stepSize=t,this.timeStep=a,this.model=r}return Object(l.a)(e,[{key:"evaluateExpression",value:function(e,t){return e.evaluate(Object.fromEntries(t))}},{key:"generateVariables",value:function(){var e=new Map;return this.model.compartments.forEach((function(t){return e.set(t.name,t.value[t.value.length-1])})),e}}]),e}(),m=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),i=0;i<n;i++)s[i]=arguments[i];return(e=t.call.apply(t,[this].concat(s))).solverType=r.manualStepSize,e}return Object(l.a)(a,[{key:"execute",value:function(){var e=this,t=this.generateVariables(),a=new Map;return this.model.compartments.forEach((function(r){var n=e.evaluateExpression(r.ODE,t)*e.stepSize;a.set(r.name,r.value[r.value.length-1]+n)})),this.timeStep=this.timeStep+this.stepSize,{result:a,timeStep:this.timeStep}}}]),a}(p),d=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),i=0;i<n;i++)s[i]=arguments[i];return(e=t.call.apply(t,[this].concat(s))).solverType=r.manualStepSize,e}return Object(l.a)(a,[{key:"execute",value:function(){var e=this,t=this.generateVariables(),a=new Map,r=new Map(t);return this.model.compartments.forEach((function(a){var n=e.evaluateExpression(a.ODE,t)*(e.stepSize/2);r.set(a.name,a.value[a.value.length-1]+n)})),this.model.compartments.forEach((function(t){var n=e.evaluateExpression(t.ODE,r)*e.stepSize;a.set(t.name,t.value[t.value.length-1]+n)})),this.timeStep=this.timeStep+this.stepSize,{result:a,timeStep:this.timeStep}}}]),a}(p),v=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"calculateStep",value:function(e,t){var a=this,r=new Map,n=new Map(e),s=new Map;return this.model.compartments.forEach((function(r){var i=a.evaluateExpression(r.ODE,e)*t;n.set(r.name,e.get(r.name)+i/2),s.set(r.name,[i])})),this.model.compartments.forEach((function(r){var i=a.evaluateExpression(r.ODE,n)*t;n.set(r.name,e.get(r.name)+i/2),s.get(r.name).push(i)})),this.model.compartments.forEach((function(r){var i=a.evaluateExpression(r.ODE,n)*t;n.set(r.name,e.get(r.name)+i),s.get(r.name).push(i)})),this.model.compartments.forEach((function(e){var r=a.evaluateExpression(e.ODE,n)*t;s.get(e.name).push(r)})),this.model.compartments.forEach((function(t){r.set(t.name,e.get(t.name)+1/6*s.get(t.name)[0]+2/6*s.get(t.name)[1]+2/6*s.get(t.name)[2]+1/6*s.get(t.name)[3])})),r}}]),a}(p),S=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),i=0;i<n;i++)s[i]=arguments[i];return(e=t.call.apply(t,[this].concat(s))).solverType=r.manualStepSize,e}return Object(l.a)(a,[{key:"execute",value:function(){var e=this.generateVariables();return this.timeStep=this.timeStep+this.stepSize,{result:this.calculateStep(e,this.stepSize),timeStep:this.timeStep}}}]),a}(v),f=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e,n,s,i){var o;return Object(c.a)(this,a),(o=t.call(this,e,n,s)).solverType=r.errorControlled,o.error=void 0,o.maxError=void 0,o.error=0,o.maxError=i,o}return Object(l.a)(a,[{key:"execute",value:function(){var e=[],t=this.generateVariables();do{this.error<this.maxError/4?this.stepSize=2*this.stepSize:this.error>this.maxError&&(this.stepSize=this.stepSize/2);var a=this.calculateStep(t,this.stepSize),r=this.calculateStep(this.calculateStep(t,this.stepSize/2),this.stepSize/2);Array.from(a.values()).forEach((function(t,a){e.push(Math.abs(Array.from(r.values())[a]-t))})),this.error=e.reduce((function(e,t){return e+t}),0)/e.length}while(this.error>this.maxError);return this.timeStep=this.timeStep+this.stepSize,{result:r,timeStep:this.timeStep}}}]),a}(v),j=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e,n,s,i,o){var l;return Object(c.a)(this,a),(l=t.call(this,e,n,s)).solverType=r.errorControlled,l.error=void 0,l.depth=void 0,l.maxError=void 0,l.error=0,l.depth=i,l.maxError=o,l}return Object(l.a)(a,[{key:"execute",value:function(){var e=this,t=this.generateVariables(),a=[];do{this.error<this.maxError/2?this.depth>2?this.depth=this.depth-1:(this.stepSize=2*this.stepSize,this.depth=this.depth+1):this.error>this.maxError&&(this.depth<8?this.depth=this.depth+1:(this.stepSize=this.stepSize/2,this.depth=this.depth-1));for(var r=[],n=function(n){a[n]=[];for(var s=function(s){0===s?a[n][s]=e.modifiedMidpointMethod(t,2*(n+1)):(i=new Map,e.model.compartments.forEach((function(t){var o=a[n][s-1].get(t.name)+(a[n][s-1].get(t.name)-a[n-1][s-1].get(t.name))/(Math.pow(n/(n-1),2*s)-1);i.set(t.name,o),s===n&&n===e.depth-1&&r.push(Math.abs((a[n][s-1].get(t.name)-a[n-1][s-1].get(t.name))/(Math.pow(n/(n-1),2*s)-1)))})),a[n][s]=i)},o=0;o<=n;o++)s(o)},s=0;s<this.depth;s++){var i;n(s)}this.error=r.reduce((function(e,t){return e+t}),0)/r.length}while(this.error>this.maxError);return this.timeStep=this.timeStep+this.stepSize,{result:a[a.length-1][a[a.length-1].length-1],timeStep:this.timeStep}}},{key:"modifiedMidpointMethod",value:function(e,t){var a=this,r=this.stepSize/t,n=new Map(e),s=new Map,i=new Map;this.model.compartments.forEach((function(e){var t=a.evaluateExpression(e.ODE,n),i=e.value[e.value.length-1]+r*t;n.set(e.name,i),s.set(e.name,[e.value[e.value.length-1],i])}));for(var o=function(e){a.model.compartments.forEach((function(t){var i=a.evaluateExpression(t.ODE,n),o=s.get(t.name)[e-1]+2*r*i;n.set(t.name,o),s.get(t.name).push(o)}))},c=1;c<t;c++)o(c);return this.model.compartments.forEach((function(e){var o=a.evaluateExpression(e.ODE,n),c=.5*(s.get(e.name)[t]+s.get(e.name)[t-1]+r*o);i.set(e.name,c)})),i}}]),a}(p),b=a(32),g=(a(50),a(3)),O=a(1),x=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(c.a)(this,a);for(var r=arguments.length,n=new Array(r),s=0;s<r;s++)n[s]=arguments[s];return(e=t.call.apply(t,[this].concat(n))).renderChart=function(){return Object(O.jsx)(b.a,{width:"100%",height:"500px",chartType:"LineChart",loader:Object(O.jsx)("div",{children:"Loading Chart"}),data:e.props.data,options:{hAxis:{title:"Time"},vAxis:{title:"Value"}}})},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return Object(O.jsxs)("div",{className:"chart",children:[g.a,this.props.currentTick>0?this.renderChart():Object(O.jsx)("br",{})]})}}]),a}(s.a.Component),E=a(39),M=(a(63),function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var r;Object(c.a)(this,a),(r=t.call(this,e)).getRandomInt=function(e){return Math.floor(Math.random()*e)},r.nodePaint=function(e,t){t.fillStyle="#"+(1234567*e.id.toString().split("").map((function(e){return e.codePointAt(0)})).reduce((function(e,t){return e+t}))%Math.pow(2,24)).toString(16).padStart(6,"0"),t.beginPath(),t.arc(e.x,e.y,10,0,2*Math.PI,!1),t.fill(),t.fillStyle="#000000",t.font="10px Sans-Serif",t.textAlign="center",t.textBaseline="middle",t.fillText(e.id.toString(),e.x,e.y)};var n=r.generateInitialDataStructure();return r.state={data:n},r}return Object(l.a)(a,[{key:"generateInitialDataStructure",value:function(){var e=[];this.props.model.compartments.forEach((function(t){e.push({id:t.name,value:t.value[t.value.length-1]})}));var t=[];return this.props.model.compartments.forEach((function(e){e.ODE.symbols().forEach((function(a){return t.push({source:e.name,target:a})}))})),{nodes:e,links:t}}},{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this;return Object(O.jsxs)("div",{className:"graph",children:[g.d,Object(O.jsx)(E.a,{graphData:this.state.data,nodeLabel:"value",nodeCanvasObject:function(t,a){return e.nodePaint(t,a)},width:600,height:300})]})}}]),a}(s.a.Component)),y=(a(64),a(38)),k=a(76).Parser,z=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var r;Object(c.a)(this,a),(r=t.call(this,e)).onLoadModel=function(e){try{var t=r.state.parser.parse(r.state.value),a=new Map;t.parameters.forEach((function(e){return a.set(e.name,e.value)})),t.compartments.forEach((function(e){return e.ODE=k.parse(e.ODE).simplify(Object.fromEntries(a))})),r.props.setNewModel(t),r.setState({error:{hasError:!1,message:"",location:""}});var n=new Map;t.compartments.forEach((function(e){return n.set(e.name,e.value[0])})),t.compartments.forEach((function(e){try{e.ODE.evaluate(Object.fromEntries(n))}catch(t){r.setState({error:{hasError:!0,message:t.message,location:"ODE for "+e.name}}),console.log(t)}})),r.setState({loadedModel:!0})}catch(s){void 0!==s.location&&r.setState({error:{hasError:!0,message:s.message,location:"at line: "+s.location.start.line+" at column: "+s.location.start.column}}),console.log(s)}e.preventDefault()},r.handleSelectedModel=function(e){r.setState({selectedModel:e.target.value,value:g.i.concat(r.state.customModels)[e.target.value].value})},r.onSaveModel=function(){r.state.customModels.push({name:"Custom Model "+r.state.customModels.length,value:r.state.value}),localStorage.setItem("savedModels",JSON.stringify(r.state.customModels)),r.setState({selectedModel:r.state.customModels.length+1})};var n=localStorage.getItem("savedModels");return r.state={value:"",parser:Object(y.generate)('{{\nfunction makeFloat(o) {\n    return parseFloat(o.join(""), 10);\n}\n}}\n\nmodel = parameters:parameter* _ compartments:compartment+ {return {parameters, compartments};}\ncompartment = "comp" _ name:ident _ value:value _ ODE:calc _ {return {name, value:[value], ODE};}\nparameter = "param" _ name:ident _ value:value _ {return {name, value};}\nident = ident:[A-Za-z]+ {return ident.join("")}\nvalue = digits:[0-9.]+ {return makeFloat(digits);}\n_ "whitespace" = [ \\t\\n\\r]*\ncalc = "{" calc:[^}]* "}" {return calc.join("")}'),error:{hasError:!1,message:"",location:""},loadedModel:!1,selectedModel:0,customModels:n?JSON.parse(n):[]},r}return Object(l.a)(a,[{key:"handleChange",value:function(e){this.setState({value:e.target.value,selectedModel:0})}},{key:"componentDidMount",value:function(){}},{key:"renderError",value:function(){if(this.state.error.hasError)return Object(O.jsxs)("div",{children:["Error: ",this.state.error.message," at ",this.state.error.location]})}},{key:"generateDropdownOptions",value:function(){var e=[];return g.i.concat(this.state.customModels).forEach((function(t,a){return e.push(Object(O.jsx)("option",{value:a,children:t.name},a))})),e}},{key:"render",value:function(){var e=this.renderError();return Object(O.jsxs)("div",{className:"parser",children:[g.r,": ",Object(O.jsx)("a",{href:"https://github.com/NeverfullD/cmv",children:g.e}),Object(O.jsx)("br",{}),g.g,":"," ",Object(O.jsx)("select",{value:this.state.selectedModel,onChange:this.handleSelectedModel,children:this.generateDropdownOptions()}),Object(O.jsx)("br",{}),Object(O.jsx)("textarea",{className:"parserText",placeholder:g.h,value:this.state.value,onChange:this.handleChange.bind(this)}),Object(O.jsx)("br",{}),Object(O.jsx)("button",{onClick:this.onLoadModel,children:this.state.loadedModel?g.j:g.f}),Object(O.jsx)("button",{onClick:this.onSaveModel,children:g.k}),Object(O.jsx)("br",{}),e]})}}]),a}(s.a.Component),C=(a(77),function(){function e(){Object(c.a)(this,e)}return Object(l.a)(e,null,[{key:"exportToCsv",value:function(e,t){var a=t.map((function(e){return e.join(",")})).join("\n"),r=new Blob([a],{type:"text/csv;charset=utf-8;"});if(navigator.msSaveBlob)navigator.msSaveBlob(r,e);else{var n=document.createElement("a");if(void 0!==n.download){var s=URL.createObjectURL(r);n.setAttribute("href",s),n.setAttribute("download",e),n.style.visibility="hidden",document.body.appendChild(n),n.click(),document.body.removeChild(n)}}}}]),e}()),w=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var r;return Object(c.a)(this,a),(r=t.call(this,e)).onSimulate1=function(){r.props.onSimulate(1)},r.onSimulate10=function(){r.props.onSimulate(10)},r.onSimulate100=function(){r.props.onSimulate(100)},r.onSimulate=function(){r.props.onSimulate(parseInt(r.state.steps))},r.handleChangeSteps=function(e){r.setState({steps:e.target.value})},r.onChangeStepSize=function(){r.props.changeStepSize(parseFloat(r.state.stepSize))},r.handleChangeStepSize=function(e){r.setState({stepSize:e.target.value})},r.onChangeMaxError=function(){r.props.changeMaxError(parseFloat(r.state.maxError))},r.handleChangeMaxError=function(e){r.setState({maxError:e.target.value})},r.handleSelectedSolver=function(e){r.props.changeSelectedSolver(e.target.value)},r.onGetData=function(){C.exportToCsv("data.csv",r.props.data)},r.state={steps:"",stepSize:e.stepSize.toString(),maxError:e.maxError.toString()},r}return Object(l.a)(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e;return this.props.selectedSolverType===r.manualStepSize?e=[Object(O.jsx)("br",{}),Object(O.jsx)("input",{type:"text",value:this.state.stepSize,onChange:this.handleChangeStepSize}),Object(O.jsx)("button",{onClick:this.onChangeStepSize,children:g.m})]:this.props.selectedSolverType===r.errorControlled&&(e=[Object(O.jsx)("br",{}),Object(O.jsx)("input",{type:"text",value:this.state.maxError,onChange:this.handleChangeMaxError}),Object(O.jsx)("button",{onClick:this.onChangeMaxError,children:g.l})]),Object(O.jsxs)("div",{className:"settings",children:[Object(O.jsxs)("div",{children:[g.o,Object(O.jsx)("br",{}),Object(O.jsxs)("select",{value:this.props.selectedSolver,onChange:this.handleSelectedSolver,children:[Object(O.jsx)("option",{value:"euler",children:"Euler"}),Object(O.jsx)("option",{value:"rungeKutta2",children:"Runge-Kutta 2.Order"}),Object(O.jsx)("option",{value:"rungeKutta4",children:"Runge-Kutta 4.Order"}),Object(O.jsx)("option",{value:"rungeKutta4Automatic",children:"Runge-Kutta 4.Order Automatic"}),Object(O.jsx)("option",{value:"bulirschStoer",children:"Bulirsch-Stoer"})]}),e]}),Object(O.jsxs)("div",{children:[g.p,Object(O.jsx)("br",{}),Object(O.jsxs)("button",{onClick:this.onSimulate1,children:[g.n," 1"]}),Object(O.jsx)("button",{onClick:this.onSimulate10,children:"10"}),Object(O.jsx)("button",{onClick:this.onSimulate100,children:"100"}),Object(O.jsx)("br",{}),Object(O.jsxs)("button",{onClick:this.onSimulate,children:[g.n," "]}),Object(O.jsx)("input",{type:"text",value:this.state.steps,onChange:this.handleChangeSteps}),Object(O.jsx)("br",{})]}),Object(O.jsxs)("div",{children:[g.c,Object(O.jsx)("br",{}),Object(O.jsxs)("button",{onClick:this.onGetData,children:[g.b," "]}),Object(O.jsx)("br",{})]})]})}}]),a}(s.a.Component),D=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var r;return Object(c.a)(this,a),(r=t.call(this,e)).setModel=function(e){r.setState({model:e,currentTick:0,timeSteps:[0],solver:r.getSolver(r.state.selectedSolver,0,e)})},r.onSimulate=function(e){r.solveTime(e)},r.changeStepSize=function(e){r.setState({stepSize:e})},r.changeMaxError=function(e){r.setState({maxError:e})},r.changeSelectedSolver=function(e){r.setState({selectedSolver:e,solver:r.getSolver(e,r.state.timeSteps[r.state.timeSteps.length-1],r.state.model)})},r.state={model:{parameters:[],compartments:[]},currentTick:-1,timeSteps:[],stepSize:.1,maxError:.001,solver:new m(0,0,{parameters:[],compartments:[]}),selectedSolver:"euler"},r}return Object(l.a)(a,[{key:"componentDidMount",value:function(){}},{key:"getSolver",value:function(e,t,a){switch(e){case"euler":return new m(this.state.stepSize,t,a);case"rungeKutta2":return new d(this.state.stepSize,t,a);case"rungeKutta4":return new S(this.state.stepSize,t,a);case"rungeKutta4Automatic":return new f(this.state.stepSize,t,a,this.state.maxError);case"bulirschStoer":return new j(this.state.stepSize,t,a,4,this.state.maxError);default:return new m(this.state.stepSize,t,a)}}},{key:"applyResult",value:function(e){this.state.model.compartments.forEach((function(t){t.value.push(e.result.get(t.name))})),this.state.timeSteps.push(e.timeStep)}},{key:"solveTime",value:function(e){for(var t=0,a=this.state.timeSteps[this.state.timeSteps.length-1]+e;this.state.timeSteps[this.state.timeSteps.length-1]<a;)this.applyResult(this.state.solver.execute()),t++;this.setState({currentTick:this.state.currentTick+t})}},{key:"generateData",value:function(){var e=this,t=["x"];this.state.model.compartments.forEach((function(e){return t.push(e.name)}));for(var a=[t],r=function(t){s=[e.state.timeSteps[t]],e.state.model.compartments.forEach((function(e){return s.push(e.value[t])})),a.push(s)},n=0;n<=this.state.currentTick;n++){var s;r(n)}return a}},{key:"render",value:function(){var e=this.generateData();return Object(O.jsxs)("div",{className:"main",children:[Object(O.jsx)("h2",{children:g.q}),Object(O.jsx)(z,{setNewModel:this.setModel}),Object(O.jsx)(M,{model:this.state.model},this.state.currentTick+"graph"),Object(O.jsx)(w,{onSimulate:this.onSimulate,changeStepSize:this.changeStepSize,changeMaxError:this.changeMaxError,stepSize:this.state.stepSize,maxError:this.state.maxError,selectedSolver:this.state.selectedSolver,selectedSolverType:this.state.solver.solverType,changeSelectedSolver:this.changeSelectedSolver,data:e}),Object(O.jsx)(x,{data:e,timeSteps:this.state.timeSteps,currentTick:this.state.currentTick},this.state.currentTick+"chart")]})}}]),a}(s.a.Component),T=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,87)).then((function(t){var a=t.getCLS,r=t.getFID,n=t.getFCP,s=t.getLCP,i=t.getTTFB;a(e),r(e),n(e),s(e),i(e)}))};o.a.render(Object(O.jsx)(s.a.StrictMode,{children:Object(O.jsx)(D,{})}),document.getElementById("root")),T()}},[[78,1,2]]]);
//# sourceMappingURL=main.85223257.chunk.js.map