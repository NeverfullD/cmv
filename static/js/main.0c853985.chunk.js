(this.webpackJsonpcmv=this.webpackJsonpcmv||[]).push([[0],{3:function(e){e.exports=JSON.parse('{"r":"Compartment Model Visualizer","s":"Write a Model","f":"How to Write a Model","h":"Or Load a Model","i":"Write DSL Here","g":"Load Model into Simulator","k":"Reload Model and Reset Simulator","l":"Save Model","p":"Solver","n":"Set Step Size","m":"Set Max Error Rate","q":"Time Control","o":"Simulate for","d":"Download","c":"Download Data","e":"Model Topography","b":"Data Preview","a":"There is no data to display at the moment.","j":[{"name":"Custom","modelText":""},{"name":"SIR","modelText":"param alpha 0.75\\nparam beta 0.1\\nparam N 10000\\n\\ncomp S 9999 {-alpha*S*I/N}\\ncomp I 1 {alpha*S*I/N - beta*I}\\ncomp R 0 {beta*I}"},{"name":"ode1","modelText":"param rate 1\\n\\ncomp u 1 {-rate*u}"},{"name":"ode_order2","modelText":"comp ut 1 {-1 * u}\\ncomp u 0 {ut}"},{"name":"ode_implicit","modelText":"comp t 0 {1}\\ncomp v 1 {t}\\ncomp u 2 {2*t}"},{"name":"ode_comp3","modelText":"param V 0.07\\nparam PS1 0.05\\nparam PS2 0.02\\n\\ncomp C1 5 {PS1/V*(C2 - C1)}\\ncomp C2 3 {PS1/V*(C1 - C2) + PS2/V*(C3-C2)}\\ncomp C3 0 {PS2/V*(C2 - C3)}"}]}')},46:function(e,t,a){},47:function(e,t,a){},50:function(e,t,a){},63:function(e,t,a){},64:function(e,t,a){},77:function(e,t,a){},78:function(e,t,a){"use strict";a.r(t);var n,r=a(2),o=a.n(r),s=a(29),i=a.n(s),c=(a(46),a(4)),l=a(5),u=a(6),h=a(7);a(47);!function(e){e[e.manualStepSize=0]="manualStepSize",e[e.errorControlled=1]="errorControlled"}(n||(n={}));var m=function(){function e(t,a,n){Object(c.a)(this,e),this.stepSize=void 0,this.timeStep=void 0,this.model=void 0,this.solverType=void 0,this.stepSize=t,this.timeStep=a,this.model=n}return Object(l.a)(e,[{key:"evaluateExpression",value:function(e,t){return e.evaluate(Object.fromEntries(t))}},{key:"generateVariables",value:function(){var e=new Map;return this.model.compartments.forEach((function(t){return e.set(t.name,t.value[t.value.length-1])})),e}}]),e}(),p=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(c.a)(this,a);for(var r=arguments.length,o=new Array(r),s=0;s<r;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))).solverType=n.manualStepSize,e}return Object(l.a)(a,[{key:"execute",value:function(){var e=this,t=this.generateVariables(),a=new Map;return this.model.compartments.forEach((function(n){var r=e.evaluateExpression(n.ODE,t)*e.stepSize;a.set(n.name,n.value[n.value.length-1]+r)})),this.timeStep=this.timeStep+this.stepSize,{result:a,timeStep:this.timeStep}}}]),a}(m),d=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(c.a)(this,a);for(var r=arguments.length,o=new Array(r),s=0;s<r;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))).solverType=n.manualStepSize,e}return Object(l.a)(a,[{key:"execute",value:function(){var e=this,t=this.generateVariables(),a=new Map,n=new Map(t);return this.model.compartments.forEach((function(a){var r=e.evaluateExpression(a.ODE,t)*(e.stepSize/2);n.set(a.name,a.value[a.value.length-1]+r)})),this.model.compartments.forEach((function(t){var r=e.evaluateExpression(t.ODE,n)*e.stepSize;a.set(t.name,t.value[t.value.length-1]+r)})),this.timeStep=this.timeStep+this.stepSize,{result:a,timeStep:this.timeStep}}}]),a}(m),v=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"calculateStep",value:function(e,t){var a=this,n=new Map,r=new Map(e),o=new Map;return this.model.compartments.forEach((function(n){var s=a.evaluateExpression(n.ODE,e)*t;r.set(n.name,e.get(n.name)+s/2),o.set(n.name,[s])})),this.model.compartments.forEach((function(n){var s=a.evaluateExpression(n.ODE,r)*t;r.set(n.name,e.get(n.name)+s/2),o.get(n.name).push(s)})),this.model.compartments.forEach((function(n){var s=a.evaluateExpression(n.ODE,r)*t;r.set(n.name,e.get(n.name)+s),o.get(n.name).push(s)})),this.model.compartments.forEach((function(e){var n=a.evaluateExpression(e.ODE,r)*t;o.get(e.name).push(n)})),this.model.compartments.forEach((function(t){n.set(t.name,e.get(t.name)+1/6*o.get(t.name)[0]+2/6*o.get(t.name)[1]+2/6*o.get(t.name)[2]+1/6*o.get(t.name)[3])})),n}}]),a}(m),S=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(c.a)(this,a);for(var r=arguments.length,o=new Array(r),s=0;s<r;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))).solverType=n.manualStepSize,e}return Object(l.a)(a,[{key:"execute",value:function(){var e=this.generateVariables();return this.timeStep=this.timeStep+this.stepSize,{result:this.calculateStep(e,this.stepSize),timeStep:this.timeStep}}}]),a}(v),f=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e,r,o,s){var i;return Object(c.a)(this,a),(i=t.call(this,e,r,o)).solverType=n.errorControlled,i.error=void 0,i.maxError=void 0,i.error=0,i.maxError=s,i}return Object(l.a)(a,[{key:"execute",value:function(){var e=[],t=this.generateVariables();do{this.error<this.maxError/4?this.stepSize=2*this.stepSize:this.error>this.maxError&&(this.stepSize=this.stepSize/2);var a=this.calculateStep(t,this.stepSize),n=this.calculateStep(this.calculateStep(t,this.stepSize/2),this.stepSize/2);Array.from(a.values()).forEach((function(t,a){e.push(Math.abs(Array.from(n.values())[a]-t))})),this.error=e.reduce((function(e,t){return e+t}),0)/e.length}while(this.error>this.maxError);return this.timeStep=this.timeStep+this.stepSize,{result:n,timeStep:this.timeStep}}}]),a}(v),j=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e,r,o,s,i){var l;return Object(c.a)(this,a),(l=t.call(this,e,r,o)).solverType=n.errorControlled,l.error=void 0,l.depth=void 0,l.maxError=void 0,l.maxDepth=8,l.error=0,l.depth=s,l.maxError=i,l}return Object(l.a)(a,[{key:"execute",value:function(){var e=this,t=this.generateVariables(),a=[];do{this.error<this.maxError/2?this.depth>2?this.depth=this.depth-1:(this.stepSize=2*this.stepSize,this.depth=this.depth+1):this.error>this.maxError&&(this.depth<this.maxDepth?this.depth=this.depth+1:(this.stepSize=this.stepSize/2,this.depth=this.depth-1));for(var n=[],r=function(r){a[r]=[];for(var o=function(o){0===o?a[r][o]=e.modifiedMidpointMethod(t,2*(r+1)):(s=new Map,e.model.compartments.forEach((function(t){var i=a[r][o-1].get(t.name)+(a[r][o-1].get(t.name)-a[r-1][o-1].get(t.name))/(Math.pow(r/(r-1),2*o)-1);s.set(t.name,i),o===r&&r===e.depth-1&&n.push(Math.abs((a[r][o-1].get(t.name)-a[r-1][o-1].get(t.name))/(Math.pow(r/(r-1),2*o)-1)))})),a[r][o]=s)},i=0;i<=r;i++)o(i)},o=0;o<this.depth;o++){var s;r(o)}this.error=n.reduce((function(e,t){return e+t}),0)/n.length}while(this.error>this.maxError);return this.timeStep=this.timeStep+this.stepSize,{result:a[a.length-1][a[a.length-1].length-1],timeStep:this.timeStep}}},{key:"modifiedMidpointMethod",value:function(e,t){var a=this,n=this.stepSize/t,r=new Map(e),o=new Map,s=new Map;this.model.compartments.forEach((function(e){var t=a.evaluateExpression(e.ODE,r),s=e.value[e.value.length-1]+n*t;r.set(e.name,s),o.set(e.name,[e.value[e.value.length-1],s])}));for(var i=function(e){a.model.compartments.forEach((function(t){var s=a.evaluateExpression(t.ODE,r),i=o.get(t.name)[e-1]+2*n*s;r.set(t.name,i),o.get(t.name).push(i)}))},c=1;c<t;c++)i(c);return this.model.compartments.forEach((function(e){var i=a.evaluateExpression(e.ODE,r),c=.5*(o.get(e.name)[t]+o.get(e.name)[t-1]+n*i);s.set(e.name,c)})),s}}]),a}(m),b=a(32),g=(a(50),a(3)),x=a(1),O=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).renderChart=function(){return Object(x.jsx)(b.a,{width:"100%",height:"500px",chartType:"LineChart",loader:Object(x.jsx)("div",{children:"Loading Chart"}),data:e.props.data,options:{hAxis:{title:"Time"},vAxis:{title:"Value"}}})},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return Object(x.jsxs)("div",{className:"chart",children:[g.b,this.props.currentTick>0?this.renderChart():Object(x.jsxs)("div",{children:[Object(x.jsx)("br",{}),g.a]})]})}}]),a}(o.a.Component),E=a(39),M=(a(63),function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var n;Object(c.a)(this,a),(n=t.call(this,e)).getRandomInt=function(e){return Math.floor(Math.random()*e)},n.nodePaint=function(e,t){t.fillStyle="#"+(1234567*e.id.toString().split("").map((function(e){return e.codePointAt(0)})).reduce((function(e,t){return e+t}))%Math.pow(2,24)).toString(16).padStart(6,"0"),t.beginPath(),t.arc(e.x,e.y,10,0,2*Math.PI,!1),t.fill(),t.fillStyle="#000000",t.font="10px Sans-Serif",t.textAlign="center",t.textBaseline="middle",t.fillText(e.id.toString(),e.x,e.y)};var r=n.generateInitialDataStructure();return n.state={data:r},n}return Object(l.a)(a,[{key:"generateInitialDataStructure",value:function(){var e=[],t=[];this.props.model.compartments.forEach((function(a){e.push({id:a.name,value:a.value[a.value.length-1]}),t.push(a.name)}));var a=[];return this.props.model.compartments.forEach((function(e){e.ODE.symbols().forEach((function(n){t.includes(n)&&a.push({source:e.name,target:n})}))})),{nodes:e,links:a}}},{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this;return Object(x.jsxs)("div",{className:"graph",children:[g.e,Object(x.jsx)(E.a,{graphData:this.state.data,nodeLabel:"value",nodeCanvasObject:function(t,a){return e.nodePaint(t,a)},width:600,height:300})]})}}]),a}(o.a.Component)),y=(a(64),a(38)),C=a(76).Parser,k=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var n;Object(c.a)(this,a),(n=t.call(this,e)).onLoadModel=function(e){try{var t=n.state.parser.parse(n.state.modelText),a=new Map;t.parameters.forEach((function(e){return a.set(e.name,e.value)})),t.compartments.forEach((function(e){return e.ODE=C.parse(e.ODE).simplify(Object.fromEntries(a))})),n.props.setNewModel(t),n.setState({error:{hasError:!1,message:"",location:""}});var r=new Map;t.compartments.forEach((function(e){return r.set(e.name,e.value[0])})),t.compartments.forEach((function(e){try{e.ODE.evaluate(Object.fromEntries(r))}catch(t){n.setState({error:{hasError:!0,message:t.message,location:"ODE for "+e.name}}),console.log(t)}})),n.setState({loadedModel:!0})}catch(o){void 0!==o.location&&n.setState({error:{hasError:!0,message:o.message,location:"at line: "+o.location.start.line+" at column: "+o.location.start.column}}),console.log(o)}e.preventDefault()},n.onChangeModelText=function(e){n.setState({modelText:e.target.value,selectedModel:0})},n.handleSelectedModel=function(e){n.setState({selectedModel:e.target.value,modelText:g.j.concat(n.state.customModels)[e.target.value].modelText})},n.onSaveModel=function(){n.state.customModels.push({name:"Custom Model "+n.state.customModels.length,modelText:n.state.modelText}),localStorage.setItem("savedModels",JSON.stringify(n.state.customModels)),n.setState({selectedModel:n.state.customModels.length+1})};var r=localStorage.getItem("savedModels");return n.state={modelText:"",parser:Object(y.generate)('{{\nfunction makeFloat(o) {\n    return parseFloat(o.join(""), 10);\n}\n}}\n\nmodel = parameters:parameter* _ compartments:compartment+ {return {parameters, compartments};}\ncompartment = "comp" _ name:ident _ value:value _ ODE:calc _ {return {name, value:[value], ODE};}\nparameter = "param" _ name:ident _ value:value _ {return {name, value};}\nident = ident:[A-Za-z0-9]+ {return ident.join("")}\nvalue = digits:[0-9.-]+ {return makeFloat(digits);}\n_ "whitespace" = [ \\t\\n\\r]*\ncalc = "{" calc:[^}]* "}" {return calc.join("")}'),error:{hasError:!1,message:"",location:""},loadedModel:!1,selectedModel:0,customModels:r?JSON.parse(r):[]},n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){}},{key:"renderError",value:function(){if(this.state.error.hasError)return Object(x.jsxs)("div",{children:["Error: ",this.state.error.message," at ",this.state.error.location]})}},{key:"generateDropdownOptions",value:function(){var e=[];return g.j.concat(this.state.customModels).forEach((function(t,a){return e.push(Object(x.jsx)("option",{value:a,children:t.name},a))})),e}},{key:"render",value:function(){var e=this.renderError();return Object(x.jsxs)("div",{className:"parser",children:[g.s,": ",Object(x.jsx)("a",{href:"https://github.com/NeverfullD/cmv",children:g.f}),Object(x.jsx)("br",{}),g.h,":"," ",Object(x.jsx)("select",{value:this.state.selectedModel,onChange:this.handleSelectedModel,children:this.generateDropdownOptions()}),Object(x.jsx)("br",{}),Object(x.jsx)("textarea",{className:"parserText",placeholder:g.i,value:this.state.modelText,onChange:this.onChangeModelText}),Object(x.jsx)("br",{}),Object(x.jsx)("button",{onClick:this.onLoadModel,children:this.state.loadedModel?g.k:g.g}),Object(x.jsx)("button",{onClick:this.onSaveModel,children:g.l}),Object(x.jsx)("br",{}),e]})}}]),a}(o.a.Component),z=(a(77),function(){function e(){Object(c.a)(this,e)}return Object(l.a)(e,null,[{key:"exportToCsv",value:function(e,t){var a=t.map((function(e){return e.join(",")})).join("\n"),n=new Blob([a],{type:"text/csv;charset=utf-8;"});if(navigator.msSaveBlob)navigator.msSaveBlob(n,e);else{var r=document.createElement("a");if(void 0!==r.download){var o=URL.createObjectURL(n);r.setAttribute("href",o),r.setAttribute("download",e),r.style.visibility="hidden",document.body.appendChild(r),r.click(),document.body.removeChild(r)}}}}]),e}()),T=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).onSimulate1=function(){n.props.onSimulate(1)},n.onSimulate10=function(){n.props.onSimulate(10)},n.onSimulate100=function(){n.props.onSimulate(100)},n.onSimulate=function(){n.props.onSimulate(parseFloat(n.state.time))},n.handleChangeSteps=function(e){n.setState({time:e.target.value})},n.onChangeStepSize=function(){n.props.changeStepSize(parseFloat(n.state.stepSize))},n.handleChangeStepSize=function(e){n.setState({stepSize:e.target.value})},n.onChangeMaxError=function(){n.props.changeMaxError(parseFloat(n.state.maxError))},n.handleChangeMaxError=function(e){n.setState({maxError:e.target.value})},n.handleSelectedSolver=function(e){n.props.changeSelectedSolver(e.target.value)},n.onGetData=function(){z.exportToCsv("data.csv",n.props.data)},n.state={time:"",stepSize:e.stepSize.toString(),maxError:e.maxError.toString()},n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e;return this.props.selectedSolverType===n.manualStepSize?e=[Object(x.jsx)("br",{}),Object(x.jsx)("input",{type:"text",value:this.state.stepSize,onChange:this.handleChangeStepSize}),Object(x.jsx)("button",{onClick:this.onChangeStepSize,children:g.n})]:this.props.selectedSolverType===n.errorControlled&&(e=[Object(x.jsx)("br",{}),Object(x.jsx)("input",{type:"text",value:this.state.maxError,onChange:this.handleChangeMaxError}),Object(x.jsx)("button",{onClick:this.onChangeMaxError,children:g.m})]),Object(x.jsxs)("div",{className:"settings",children:[Object(x.jsxs)("div",{children:[g.p,Object(x.jsx)("br",{}),Object(x.jsxs)("select",{value:this.props.selectedSolver,onChange:this.handleSelectedSolver,children:[Object(x.jsx)("option",{value:"euler",children:"Euler"}),Object(x.jsx)("option",{value:"rungeKutta2",children:"Runge-Kutta 2.Order"}),Object(x.jsx)("option",{value:"rungeKutta4",children:"Runge-Kutta 4.Order"}),Object(x.jsx)("option",{value:"rungeKutta4Automatic",children:"Runge-Kutta 4.Order Automatic"}),Object(x.jsx)("option",{value:"bulirschStoer",children:"Bulirsch-Stoer"})]}),e]}),Object(x.jsxs)("div",{children:[g.q,Object(x.jsx)("br",{}),Object(x.jsxs)("button",{onClick:this.onSimulate1,children:[g.o," 1"]}),Object(x.jsx)("button",{onClick:this.onSimulate10,children:"10"}),Object(x.jsx)("button",{onClick:this.onSimulate100,children:"100"}),Object(x.jsx)("br",{}),Object(x.jsxs)("button",{onClick:this.onSimulate,children:[g.o," "]}),Object(x.jsx)("input",{type:"text",value:this.state.time,onChange:this.handleChangeSteps}),Object(x.jsx)("br",{})]}),Object(x.jsxs)("div",{children:[g.d,Object(x.jsx)("br",{}),Object(x.jsxs)("button",{onClick:this.onGetData,children:[g.c," "]}),Object(x.jsx)("br",{})]})]})}}]),a}(o.a.Component),w=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).setModel=function(e){n.setState({model:e,currentTick:0,timeSteps:[0],solver:n.getSolver(n.state.selectedSolver,0,e)})},n.onSimulate=function(e){n.solveTime(e)},n.changeStepSize=function(e){n.setState({stepSize:e})},n.changeMaxError=function(e){n.setState({maxError:e})},n.changeSelectedSolver=function(e){n.setState({selectedSolver:e,solver:n.getSolver(e,n.state.timeSteps[n.state.timeSteps.length-1],n.state.model)})},n.state={model:{parameters:[],compartments:[]},currentTick:-1,timeSteps:[],stepSize:.1,maxError:.001,solver:new p(0,0,{parameters:[],compartments:[]}),selectedSolver:"euler"},n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){}},{key:"getSolver",value:function(e,t,a){switch(e){case"euler":return new p(this.state.stepSize,t,a);case"rungeKutta2":return new d(this.state.stepSize,t,a);case"rungeKutta4":return new S(this.state.stepSize,t,a);case"rungeKutta4Automatic":return new f(.1,t,a,this.state.maxError);case"bulirschStoer":return new j(.1,t,a,4,this.state.maxError);default:return new p(this.state.stepSize,t,a)}}},{key:"applyResult",value:function(e){this.state.model.compartments.forEach((function(t){t.value.push(e.result.get(t.name))})),this.state.timeSteps.push(e.timeStep)}},{key:"solveTime",value:function(e){for(var t=0,a=this.state.timeSteps[this.state.timeSteps.length-1]+e;this.state.timeSteps[this.state.timeSteps.length-1]<a;)this.applyResult(this.state.solver.execute()),t++;this.setState({currentTick:this.state.currentTick+t})}},{key:"generateData",value:function(){var e=this,t=["x"];this.state.model.compartments.forEach((function(e){return t.push(e.name)}));for(var a=[t],n=function(t){o=[e.state.timeSteps[t]],e.state.model.compartments.forEach((function(e){return o.push(e.value[t])})),a.push(o)},r=0;r<=this.state.currentTick;r++){var o;n(r)}return a}},{key:"render",value:function(){var e=this.generateData();return Object(x.jsxs)("div",{className:"main",children:[Object(x.jsx)("h2",{children:g.r}),Object(x.jsx)(k,{setNewModel:this.setModel}),Object(x.jsx)(M,{model:this.state.model},this.state.currentTick+"graph"),Object(x.jsx)(T,{onSimulate:this.onSimulate,changeStepSize:this.changeStepSize,changeMaxError:this.changeMaxError,stepSize:this.state.stepSize,maxError:this.state.maxError,selectedSolver:this.state.selectedSolver,selectedSolverType:this.state.solver.solverType,changeSelectedSolver:this.changeSelectedSolver,data:e}),Object(x.jsx)(O,{data:e,currentTick:this.state.currentTick},this.state.currentTick+"chart")]})}}]),a}(o.a.Component),D=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,87)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,o=t.getLCP,s=t.getTTFB;a(e),n(e),r(e),o(e),s(e)}))};i.a.render(Object(x.jsx)(o.a.StrictMode,{children:Object(x.jsx)(w,{})}),document.getElementById("root")),D()}},[[78,1,2]]]);
//# sourceMappingURL=main.0c853985.chunk.js.map