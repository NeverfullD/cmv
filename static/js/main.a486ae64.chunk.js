(this.webpackJsonpcmv=this.webpackJsonpcmv||[]).push([[0],{46:function(e,t,a){},49:function(e,t,a){},5:function(e){e.exports=JSON.parse('{"title":"Compartment Model Visualizer","writeModelTitle":"Write a Model","howToWriteModelTitle":"How to Write a Model","loadModelTitle":"Or Load a Model","modelTextAreaPlaceholder":"Write DSL Here","loadModelButton":"Load Model into Simulator","reloadModelButton":"Reload Model and Reset Simulator","saveModelButton":"Save Model","solverTitle":"Solver","setStepSizeButton":"Set Step Size","setMaxErrorButton":"Set Max Error Rate","timeControlTitle":"Time Control","simulateForButton":"Simulate for","models":[{"name":"Custom","value":""},{"name":"SIR","value":"param alpha 0.75\\nparam beta 0.1\\nparam N 10000\\n\\ncomp S 9999 {-alpha*S*I/N}\\ncomp I 1 {alpha*S*I/N - beta*I}\\ncomp R 0 {beta*I}"}]}')},62:function(e,t,a){},63:function(e,t,a){},76:function(e,t,a){},77:function(e,t,a){"use strict";a.r(t);var r=a(2),n=a.n(r),s=a(29),o=a.n(s),i=(a(46),a(3)),c=a(4),l=a(6),u=a(7),h=function(){function e(t,a,r){Object(i.a)(this,e),this.stepSize=void 0,this.timeStep=void 0,this.model=void 0,this.stepSize=t,this.timeStep=a,this.model=r}return Object(c.a)(e,[{key:"evaluateExpression",value:function(e,t){return e.evaluate(Object.fromEntries(t))}},{key:"generateVariables",value:function(){var e=new Map;return this.model.compartments.forEach((function(t){return e.set(t.name,t.value[t.value.length-1])})),e}}]),e}(),p=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"execute",value:function(){var e=this,t=this.generateVariables(),a=new Map;return this.model.compartments.forEach((function(r){var n=e.evaluateExpression(r.ODE,t)*e.stepSize;a.set(r.name,r.value[r.value.length-1]+n)})),this.timeStep=this.timeStep+this.stepSize,{result:a,timeStep:this.timeStep}}}]),a}(h),m=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"execute",value:function(){var e=this,t=this.generateVariables(),a=new Map,r=new Map(t);return this.model.compartments.forEach((function(a){var n=e.evaluateExpression(a.ODE,t)*(e.stepSize/2);r.set(a.name,a.value[a.value.length-1]+n)})),this.model.compartments.forEach((function(t){var n=e.evaluateExpression(t.ODE,r)*e.stepSize;a.set(t.name,t.value[t.value.length-1]+n)})),this.timeStep=this.timeStep+this.stepSize,{result:a,timeStep:this.timeStep}}}]),a}(h),d=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"calculateStep",value:function(e,t){var a=this,r=new Map,n=new Map(e),s=new Map;return this.model.compartments.forEach((function(r){var o=a.evaluateExpression(r.ODE,e)*t;n.set(r.name,e.get(r.name)+o/2),s.set(r.name,[o])})),this.model.compartments.forEach((function(r){var o=a.evaluateExpression(r.ODE,n)*t;n.set(r.name,e.get(r.name)+o/2),s.get(r.name).push(o)})),this.model.compartments.forEach((function(r){var o=a.evaluateExpression(r.ODE,n)*t;n.set(r.name,e.get(r.name)+o),s.get(r.name).push(o)})),this.model.compartments.forEach((function(e){var r=a.evaluateExpression(e.ODE,n)*t;s.get(e.name).push(r)})),this.model.compartments.forEach((function(t){r.set(t.name,e.get(t.name)+1/6*s.get(t.name)[0]+2/6*s.get(t.name)[1]+2/6*s.get(t.name)[2]+1/6*s.get(t.name)[3])})),r}}]),a}(h),v=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"execute",value:function(){var e=this.generateVariables();return this.timeStep=this.timeStep+this.stepSize,{result:this.calculateStep(e,this.stepSize),timeStep:this.timeStep}}}]),a}(d),S=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e,r,n,s){var o;return Object(i.a)(this,a),(o=t.call(this,e,r,n)).error=void 0,o.maxError=void 0,o.error=0,o.maxError=s,o}return Object(c.a)(a,[{key:"execute",value:function(){var e=[],t=this.generateVariables();do{this.error<this.maxError/4?this.stepSize=2*this.stepSize:this.error>this.maxError&&(this.stepSize=this.stepSize/2);var a=this.calculateStep(t,this.stepSize),r=this.calculateStep(this.calculateStep(t,this.stepSize/2),this.stepSize/2);Array.from(a.values()).forEach((function(t,a){e.push(Math.abs(Array.from(r.values())[a]-t))})),this.error=e.reduce((function(e,t){return e+t}),0)/e.length}while(this.error>this.maxError);return this.timeStep=this.timeStep+this.stepSize,{result:r,timeStep:this.timeStep}}}]),a}(d),f=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e,r,n,s,o){var c;return Object(i.a)(this,a),(c=t.call(this,e,r,n)).error=void 0,c.depth=void 0,c.maxError=void 0,c.error=0,c.depth=s,c.maxError=o,c}return Object(c.a)(a,[{key:"execute",value:function(){var e=this,t=this.generateVariables(),a=[];do{this.error<this.maxError/2?this.depth>2?this.depth=this.depth-1:(this.stepSize=2*this.stepSize,this.depth=this.depth+1):this.error>this.maxError&&(this.depth<8?this.depth=this.depth+1:(this.stepSize=this.stepSize/2,this.depth=this.depth-1));for(var r=[],n=function(n){a[n]=[];for(var s=function(s){0===s?a[n][s]=e.modifiedMidpointMethod(t,2*(n+1)):(o=new Map,e.model.compartments.forEach((function(t){var i=a[n][s-1].get(t.name)+(a[n][s-1].get(t.name)-a[n-1][s-1].get(t.name))/(Math.pow(n/(n-1),2*s)-1);o.set(t.name,i),s===n&&n===e.depth-1&&r.push(Math.abs((a[n][s-1].get(t.name)-a[n-1][s-1].get(t.name))/(Math.pow(n/(n-1),2*s)-1)))})),a[n][s]=o)},i=0;i<=n;i++)s(i)},s=0;s<this.depth;s++){var o;n(s)}this.error=r.reduce((function(e,t){return e+t}),0)/r.length}while(this.error>this.maxError);return this.timeStep=this.timeStep+this.stepSize,{result:a[a.length-1][a[a.length-1].length-1],timeStep:this.timeStep}}},{key:"modifiedMidpointMethod",value:function(e,t){var a=this,r=this.stepSize/t,n=new Map(e),s=new Map,o=new Map;this.model.compartments.forEach((function(e){var t=a.evaluateExpression(e.ODE,n),o=e.value[e.value.length-1]+r*t;n.set(e.name,o),s.set(e.name,[e.value[e.value.length-1],o])}));for(var i=function(e){a.model.compartments.forEach((function(t){var o=a.evaluateExpression(t.ODE,n),i=s.get(t.name)[e-1]+2*r*o;n.set(t.name,i),s.get(t.name).push(i)}))},c=1;c<t;c++)i(c);return this.model.compartments.forEach((function(e){var i=a.evaluateExpression(e.ODE,n),c=.5*(s.get(e.name)[t]+s.get(e.name)[t-1]+r*i);o.set(e.name,c)})),o}}]),a}(h),j=a(32),b=(a(49),function(){function e(){Object(i.a)(this,e)}return Object(c.a)(e,null,[{key:"exportToCsv",value:function(e,t){var a=t.map((function(e){return e.join(",")})).join("\n"),r=new Blob([a],{type:"text/csv;charset=utf-8;"});if(navigator.msSaveBlob)navigator.msSaveBlob(r,e);else{var n=document.createElement("a");if(void 0!==n.download){var s=URL.createObjectURL(r);n.setAttribute("href",s),n.setAttribute("download",e),n.style.visibility="hidden",document.body.appendChild(n),n.click(),document.body.removeChild(n)}}}}]),e}()),g=a(1),O=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var r;Object(i.a)(this,a),(r=t.call(this,e)).onClickGetData=function(){b.exportToCsv("data.csv",r.state.data)};var n=r.generateData();return r.state={data:n},r}return Object(c.a)(a,[{key:"generateData",value:function(){var e=this,t=["x"];this.props.model.compartments.forEach((function(e){return t.push(e.name)}));for(var a=[t],r=function(t){s=[e.props.timeSteps[t]],e.props.model.compartments.forEach((function(e){return s.push(e.value[t])})),a.push(s)},n=0;n<=this.props.currentTick;n++){var s;r(n)}return a}},{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return Object(g.jsxs)("div",{className:"chart",children:["Chart",Object(g.jsx)(j.a,{width:"600px",height:"400px",chartType:"LineChart",loader:Object(g.jsx)("div",{children:"Loading Chart"}),data:this.state.data,options:{hAxis:{title:"Time"},vAxis:{title:"Value"}},rootProps:{"data-testid":"2"}}),Object(g.jsx)("button",{onClick:this.onClickGetData,children:"Get Data"})]})}}]),a}(n.a.Component),x=a(39),E=(a(62),function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var r;Object(i.a)(this,a);var n=(r=t.call(this,e)).generateInitialDataStructure();return r.state={data:n},r}return Object(c.a)(a,[{key:"generateInitialDataStructure",value:function(){var e=[];this.props.model.compartments.forEach((function(t){e.push({id:t.name,size:10})}));var t=[];return this.props.model.compartments.forEach((function(e){e.ODE.symbols().forEach((function(a){return t.push({source:e.name,target:a})}))})),{nodes:e,links:t}}},{key:"componentDidMount",value:function(){}},{key:"onClick",value:function(){}},{key:"render",value:function(){return Object(g.jsxs)("div",{className:"graph",children:["Graph",Object(g.jsx)(x.a,{graphData:this.state.data,nodeLabel:"id",nodeVal:function(e){return e.size},width:500,height:500})]})}}]),a}(n.a.Component)),M=(a(63),a(38)),k=a(5),C=a.t(k,2),z=a(75).Parser,y=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var r;Object(i.a)(this,a),(r=t.call(this,e)).onLoadModel=function(e){try{var t=r.state.parser.parse(r.state.value),a=new Map;t.parameters.forEach((function(e){return a.set(e.name,e.value)})),t.compartments.forEach((function(e){return e.ODE=z.parse(e.ODE).simplify(Object.fromEntries(a))})),r.props.setNewModel(t),r.setState({error:{hasError:!1,message:"",location:""}});var n=new Map;t.compartments.forEach((function(e){return n.set(e.name,e.value[0])})),t.compartments.forEach((function(e){try{e.ODE.evaluate(Object.fromEntries(n))}catch(t){r.setState({error:{hasError:!0,message:t.message,location:"ODE for "+e.name}}),console.log(t)}})),r.setState({loadedModel:!0})}catch(s){void 0!==s.location&&r.setState({error:{hasError:!0,message:s.message,location:"at line: "+s.location.start.line+" at column: "+s.location.start.column}}),console.log(s)}e.preventDefault()},r.handleSelectedModel=function(e){r.setState({selectedModel:e.target.value,value:k.models.concat(r.state.customModels)[e.target.value].value})},r.onSaveModel=function(){r.state.customModels.push({name:"Custom Model "+r.state.customModels.length,value:r.state.value}),localStorage.setItem("savedModels",JSON.stringify(r.state.customModels)),r.setState({selectedModel:r.state.customModels.length+1})};var n=localStorage.getItem("savedModels");return r.state={value:"",parser:Object(M.generate)('{{\nfunction makeFloat(o) {\n    return parseFloat(o.join(""), 10);\n}\n}}\n\nmodel = parameters:parameter* _ compartments:compartment+ {return {parameters, compartments};}\ncompartment = "comp" _ name:ident _ value:value _ ODE:calc _ {return {name, value:[value], ODE};}\nparameter = "param" _ name:ident _ value:value _ {return {name, value};}\nident = ident:[A-Za-z]+ {return ident.join("")}\nvalue = digits:[0-9.]+ {return makeFloat(digits);}\n_ "whitespace" = [ \\t\\n\\r]*\ncalc = "{" calc:[^}]* "}" {return calc.join("")}'),error:{hasError:!1,message:"",location:""},loadedModel:!1,selectedModel:0,customModels:n?JSON.parse(n):[]},r}return Object(c.a)(a,[{key:"handleChange",value:function(e){this.setState({value:e.target.value})}},{key:"componentDidMount",value:function(){}},{key:"renderError",value:function(){if(this.state.error.hasError)return Object(g.jsxs)("div",{children:["Error: ",this.state.error.message," at ",this.state.error.location]})}},{key:"generateDropdownOptions",value:function(){var e=[];return k.models.concat(this.state.customModels).forEach((function(t,a){return e.push(Object(g.jsx)("option",{value:a,children:t.name},a))})),e}},{key:"render",value:function(){var e=this.renderError();return Object(g.jsxs)("div",{className:"parser",children:[k.writeModelTitle,": ",Object(g.jsx)("a",{href:"https://github.com/NeverfullD/cmv",children:k.howToWriteModelTitle}),Object(g.jsx)("br",{}),k.loadModelTitle,":"," ",Object(g.jsx)("select",{value:this.state.selectedModel,onChange:this.handleSelectedModel,children:this.generateDropdownOptions()}),Object(g.jsx)("br",{}),Object(g.jsx)("textarea",{className:"parserText",placeholder:k.modelTextAreaPlaceholder,value:this.state.value,onChange:this.handleChange.bind(this)}),Object(g.jsx)("br",{}),Object(g.jsx)("button",{onClick:this.onLoadModel,children:this.state.loadedModel?k.reloadModelButton:k.loadModelButton}),Object(g.jsx)("button",{onClick:this.onSaveModel,children:k.saveModelButton}),Object(g.jsx)("br",{}),e]})}}]),a}(n.a.Component),w=(a(76),function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var r;return Object(i.a)(this,a),(r=t.call(this,e)).onSimulate1=function(){r.props.onSimulate(1)},r.onSimulate10=function(){r.props.onSimulate(10)},r.onSimulate100=function(){r.props.onSimulate(100)},r.onSimulate=function(){r.props.onSimulate(parseInt(r.state.steps))},r.handleChangeSteps=function(e){r.setState({steps:e.target.value})},r.onChangeStepSize=function(){r.props.changeStepSize(parseFloat(r.state.stepSize))},r.handleChangeStepSize=function(e){r.setState({stepSize:e.target.value})},r.onChangeMaxError=function(){r.props.changeMaxError(parseFloat(r.state.maxError))},r.handleChangeMaxError=function(e){r.setState({maxError:e.target.value})},r.handleSelectedSolver=function(e){r.props.changeSelectedSolver(e.target.value)},r.state={steps:"",stepSize:e.stepSize.toString(),maxError:e.maxError.toString()},r}return Object(c.a)(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e;return"euler"===this.props.selectedSolver||"rungeKutta2"===this.props.selectedSolver||"rungeKutta4"===this.props.selectedSolver?e=[Object(g.jsx)("br",{}),Object(g.jsx)("input",{type:"text",value:this.state.stepSize,onChange:this.handleChangeStepSize}),Object(g.jsx)("button",{onClick:this.onChangeStepSize,children:k.setStepSizeButton})]:"rungeKutta4Automatic"!==this.props.selectedSolver&&"bulirschStoer"!==this.props.selectedSolver||(e=[Object(g.jsx)("br",{}),Object(g.jsx)("input",{type:"text",value:this.state.maxError,onChange:this.handleChangeMaxError}),Object(g.jsx)("button",{onClick:this.onChangeMaxError,children:k.setMaxErrorButton})]),Object(g.jsxs)("div",{className:"settings",children:[Object(g.jsxs)("div",{children:[k.solverTitle,Object(g.jsx)("br",{}),Object(g.jsxs)("select",{value:this.props.selectedSolver,onChange:this.handleSelectedSolver,children:[Object(g.jsx)("option",{value:"euler",children:"Euler"}),Object(g.jsx)("option",{value:"rungeKutta2",children:"Runge-Kutta 2.Order"}),Object(g.jsx)("option",{value:"rungeKutta4",children:"Runge-Kutta 4.Order"}),Object(g.jsx)("option",{value:"rungeKutta4Automatic",children:"Runge-Kutta 4.Order Automatic"}),Object(g.jsx)("option",{value:"bulirschStoer",children:"Bulirsch-Stoer"})]}),e]}),Object(g.jsxs)("div",{children:[k.timeControlTitle,Object(g.jsx)("br",{}),Object(g.jsxs)("button",{onClick:this.onSimulate1,children:[k.simulateForButton," 1"]}),Object(g.jsx)("button",{onClick:this.onSimulate10,children:"10"}),Object(g.jsx)("button",{onClick:this.onSimulate100,children:"100"}),Object(g.jsx)("br",{}),Object(g.jsxs)("button",{onClick:this.onSimulate,children:[k.simulateForButton," "]}),Object(g.jsx)("input",{type:"text",value:this.state.steps,onChange:this.handleChangeSteps}),Object(g.jsx)("br",{})]})]})}}]),a}(n.a.Component)),D=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var r;return Object(i.a)(this,a),(r=t.call(this,e)).onClick=function(){console.log(C)},r.setModel=function(e){r.setState({model:e,currentTick:0,timeSteps:[0],solver:r.getSolver(r.state.selectedSolver,0,e)})},r.onSimulate=function(e){r.solveTime(e)},r.changeStepSize=function(e){r.setState({stepSize:e})},r.changeMaxError=function(e){r.setState({maxError:e})},r.changeSelectedSolver=function(e){r.setState({selectedSolver:e,solver:r.getSolver(e,r.state.timeSteps[r.state.timeSteps.length-1],r.state.model)})},r.state={model:{parameters:[],compartments:[]},currentTick:0,timeSteps:[],stepSize:.1,maxError:.001,solver:new p(0,0,{parameters:[],compartments:[]}),selectedSolver:"euler"},r}return Object(c.a)(a,[{key:"componentDidMount",value:function(){}},{key:"getSolver",value:function(e,t,a){switch(e){case"euler":return new p(this.state.stepSize,t,a);case"rungeKutta2":return new m(this.state.stepSize,t,a);case"rungeKutta4":return new v(this.state.stepSize,t,a);case"rungeKutta4Automatic":return new S(this.state.stepSize,t,a,this.state.maxError);case"bulirschStoer":return new f(this.state.stepSize,t,a,4,this.state.maxError);default:return new p(this.state.stepSize,t,a)}}},{key:"applyResult",value:function(e){this.state.model.compartments.forEach((function(t){t.value.push(e.result.get(t.name))})),this.state.timeSteps.push(e.timeStep)}},{key:"solveTime",value:function(e){for(var t=0,a=this.state.timeSteps[this.state.timeSteps.length-1]+e;this.state.timeSteps[this.state.timeSteps.length-1]<a;)this.applyResult(this.state.solver.execute()),t++;this.setState({currentTick:this.state.currentTick+t})}},{key:"render",value:function(){return Object(g.jsxs)("div",{children:[Object(g.jsx)("button",{onClick:this.onClick,children:"Test"}),Object(g.jsx)("h2",{children:k.title}),Object(g.jsx)(y,{setNewModel:this.setModel}),Object(g.jsx)(w,{onSimulate:this.onSimulate,changeStepSize:this.changeStepSize,changeMaxError:this.changeMaxError,stepSize:this.state.stepSize,maxError:this.state.maxError,selectedSolver:this.state.selectedSolver,changeSelectedSolver:this.changeSelectedSolver}),Object(g.jsx)(O,{model:this.state.model,timeSteps:this.state.timeSteps,currentTick:this.state.currentTick},this.state.currentTick+"chart"),Object(g.jsx)(E,{model:this.state.model},this.state.currentTick+"graph")]})}}]),a}(n.a.Component),T=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,86)).then((function(t){var a=t.getCLS,r=t.getFID,n=t.getFCP,s=t.getLCP,o=t.getTTFB;a(e),r(e),n(e),s(e),o(e)}))};o.a.render(Object(g.jsx)(n.a.StrictMode,{children:Object(g.jsx)(D,{})}),document.getElementById("root")),T()}},[[77,1,2]]]);
//# sourceMappingURL=main.a486ae64.chunk.js.map