(this.webpackJsonptest=this.webpackJsonptest||[]).push([[0],{14:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),a=n(7),c=n.n(a),s=n(6),i=n(1),u=n(2),l=n(4),d=n(3),h=n(5),p=r.a.createContext(),f=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(d.a)(t).call(this,e))).nodeUpdate=function(e,t){n.setState((function(n){return n.nodes[e].left=t[0],n.nodes[e].top=t[1],n}))},n.nodeDelete=function(e){n.setState((function(t){t.edges.forEach((function(n,o){parseInt(n[0])!==e&&parseInt(n[1])!==e||(t.edges[o]=null)}));for(var n=0;n<t.edges.length;)null===t.edges[n]?t.edges.splice(n,1):n++;return t.nodes[e]=null,t.crosshair.display=!1,t}))},n.edgeDelete=function(e){n.setState((function(t){return t.edges.splice(e,1),t}))},n.crosshair=function(e,t,o){n.setState((function(n){return t&&(n.crosshair.left=t),o&&(n.crosshair.top=o),n.crosshair.display=e,n}))},n.paintAlgo=function(){var e=n.state.colorSeed,t=[],o=n.state.nodes.length,r=n.state.edges,a=new Array(o).fill(0);a.forEach((function(e,t){return a[t]=new Array(o)})),r.forEach((function(e){a[e[0]][e[1]]=1,a[e[1]][e[0]]=1})),n.state.nodes.forEach((function(e,n){if(e){t.push(e);for(var r=0,c=0;c<o;c++)1===a[n][c]&&r++;t[t.length-1].color=null,t[t.length-1].index=n,t[t.length-1].n=r}}));for(var c=0;c<t.length;c++){for(var s=c,i=c+1;i<t.length;i++)t[s].n<t[i].n&&(s=i);var u=[t[s],t[c]];t[c]=u[0],t[s]=u[1]}for(var l=1,d=0;d<t.length;){d=0;for(var h=0;h<t.length;h++)if(t[h].color)d++;else{for(var p=!0,f=0;f<t.length;f++)if(t[f].color&&t[f].color===l&&1===a[t[h].index][t[f].index]){p=!1;break}p&&(t[h].color=l)}l++}return t.forEach((function(n,o){t[o].color=[e[0][0]*n.color%e[1]+e[2],e[0][1]*n.color%e[1]+e[2],e[0][2]*n.color%e[1]+e[2]],t[o].textColor=[Math.min(t[o].color[0]+e[3],255),Math.min(t[o].color[1]+e[3],255),Math.min(t[o].color[2]+e[3],255)]})),n.setState({nodes:n.state.nodes}),l-2},n.colorSeedUpdate=function(e){n.setState({colorSeed:e}),n.paintAlgo()},n.drag=function(e,t,o,r){var a=arguments.length>4&&void 0!==arguments[4]&&arguments[4],c=document.ontouchend,s=document.ontouchmove;!0!==n.state.mobile&&(t.style.cursor="grabbing");var i=[0,0],u=1;if(!0===n.state.mobile&&(u*=n.state.scale),a&&(i[0]=t.offsetLeft+t.clientWidth/2-.8*u,i[1]=t.offsetTop+t.clientHeight/2-.8*u,n.crosshair(!0,i[0],i[1],t)),!0===n.state.mobile&&e.touches){var l=[e.touches[0].pageX-t.offsetLeft,e.touches[0].pageY-t.offsetTop];document.ontouchend=function(e){a&&n.crosshair(!1),document.removeEventListener("touchmove",d),document.ontouchmove=s,document.ontouchend=c};var d=function(e){e.preventDefault();var c=[e.touches[0].pageX-l[0],e.touches[0].pageY-l[1]];(c[0]<0||c[1]<0)&&"Node"===t.className?(n.nodeDelete(parseInt(t.innerText)),document.ontouchend()):(c[0]<0&&(c[0]=0),c[1]<0&&(c[1]=0),i[0]=c[0]+t.clientWidth/2-.8*u,i[1]=c[1]+t.clientHeight/2-.8*u,a&&n.crosshair(!0,i[0],i[1]),r(o,c))};document.addEventListener("touchmove",d,{passive:!1})}else{var h=[e.pageX-t.offsetLeft,e.pageY-t.offsetTop];document.onmousemove=function(e){var c=[e.pageX-h[0],e.pageY-h[1]];c[0]<0&&(c[0]=0),c[1]<0&&(c[1]=0),i[0]=c[0]+t.clientWidth/2-.8*u,i[1]=c[1]+t.clientHeight/2-.8*u,a&&n.crosshair(!0,i[0],i[1]),r(o,c)},document.onmouseup=function(e){t.style.cursor="grab",a&&n.crosshair(!1),document.onmousemove=function(){},document.onmouseup=function(){}}}},n.state={nodes:[],edges:[],crosshair:{enable:!0,display:!1,top:0,left:0},colorSeed:[[1867,4931,6073],131,110,80],mobile:!1,scale:2.7},n}return Object(h.a)(t,e),Object(u.a)(t,[{key:"addNode",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[0,0];this.setState((function(t){return t.nodes.push({left:e[0]>0?e[0]:0,top:e[1]>0?e[1]:0}),t}))}},{key:"addEdge",value:function(e,t){if(this.state.nodes[e]&&this.state.nodes[t]&&e!==t)return this.setState((function(n){return n.edges.push([e,t]),n})),"success";throw Error("\u0421\u0430\u0448\u0430 \u0418\u0417\u0412\u0418\u041d\u0418")}},{key:"render",value:function(){var e=this;return r.a.createElement(p.Provider,{value:{mobile:this.state.mobile,scale:this.state.scale}},r.a.createElement("div",{id:this.props.DOMElement.Nodes},this.state.nodes.map((function(t,n){return t?r.a.createElement(g,{key:n,index:n,nodes:e.state.nodes,update:e.nodeUpdate,delete:e.nodeDelete,drag:e.drag,color:t.color,textColor:t.textColor}):null}))),r.a.createElement("div",{id:this.props.DOMElement.Edges},this.state.edges.map((function(t,n){return r.a.createElement(m,{key:n,index:n,delete:e.edgeDelete,v1:e.state.nodes[t[0]],v2:e.state.nodes[t[1]]})}))),this.state.crosshair.enable&&this.state.crosshair.display?r.a.createElement(v,{left:this.state.crosshair.left,top:this.state.crosshair.top,target:this.state.crosshair.target}):null)}}]),t}(r.a.Component),g=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(d.a)(t).call(this,e))).drag=function(e){n.props.drag(e,e.target,Object(s.a)(n),(function(e,t){e.props.update(n.props.index,[t[0],t[1]])}),!0)},n}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.props.color,n=this.props.textColor;return r.a.createElement("div",{className:"Node",style:{left:this.props.nodes[this.props.index].left,top:this.props.nodes[this.props.index].top,backgroundColor:t?"rgb(".concat(t[0],", ").concat(t[1],", ").concat(t[2],")"):"",color:n?"rgb(".concat(n[0],", ").concat(n[1],", ").concat(n[2],")"):""},onTouchStart:this.drag,onMouseDown:function(t){e.context.mobile||e.drag(t)},onDoubleClick:function(t){t.preventDefault(),e.props.delete(e.props.index)},tabIndex:"3"},this.props.index)}}]),t}(r.a.Component);g.contextType=p;var m=function(e){function t(e){return Object(i.a)(this,t),Object(l.a)(this,Object(d.a)(t).call(this,e))}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=[this.props.v1,this.props.v2],n=t[0],o=t[1],a=n.left-o.left,c=n.top-o.top,s=Math.atan(c/a);a>=0&&(s+=Math.PI),s-=Math.PI/2;var i=1;return!0===this.context.mobile&&(i*=this.context.scale),r.a.createElement("div",{className:"Edge",style:{height:Math.sqrt(a*a+c*c),left:n.left+27*i/2-2*Math.cos(s)*i,top:n.top+27*i/2-2*Math.sin(s)*i,transform:"rotate(".concat(s,"rad)")},onDoubleClick:function(){return e.props.delete(e.props.index)}})}}]),t}(r.a.Component);m.contextType=p;var v=function(e){function t(e){return Object(i.a)(this,t),Object(l.a)(this,Object(d.a)(t).call(this,e))}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{id:"crosshairVert",style:{left:this.props.left}}),r.a.createElement("div",{id:"crosshairHorizontal",style:{top:this.props.top}}))}}]),t}(r.a.Component),b=function(e){function t(e){var n;Object(i.a)(this,t),(n=Object(l.a)(this,Object(d.a)(t).call(this,e))).focusOut=function(e,t){e.persist(),e.relatedTarget&&"Node"===e.relatedTarget.className&&(n["v".concat(t)].current.value=e.relatedTarget.innerText)},n.drag=function(e){"INPUT"!==e.target.tagName&&n.props.graph.drag(e,document.querySelector("#edge_bar"),Object(s.a)(n),(function(e,t){e.setState({left:t[0],top:t[1]})}))},n.addEdge=function(e){e.preventDefault();n.props.graph.addEdge(n.v1.current.value,n.v2.current.value)};var o=1;return!0===n.props.graph.state.mobile&&(o*=n.props.graph.state.scale),n.state={left:n.props.graph.state.mobile?document.body.clientWidth-130*o:(document.body.clientWidth-120)/2,top:10*o},n.v1=r.a.createRef(),n.v2=r.a.createRef(),n}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("form",{onMouseDown:this.drag,onTouchStart:this.drag,onSubmit:function(t){return e.addEdge(t)},id:"edge_bar",style:{left:this.state.left,top:this.state.top}},r.a.createElement("input",{ref:this.v1,placeholder:"0",onFocus:function(){e.v1.current.select(),e.v1.current.setAttribute("tabIndex",1),e.v2.current.setAttribute("tabIndex",2)},onBlur:function(t){return e.focusOut(t,1)}}),r.a.createElement("div",{onClick:function(){var t=[e.v2.current.value,e.v1.current.value];e.v1.current.value=t[0],e.v2.current.value=t[1]}},"+"),r.a.createElement("input",{ref:this.v2,placeholder:"1",onFocus:function(){e.v2.current.select(),e.v2.current.setAttribute("tabIndex",1),e.v1.current.setAttribute("tabIndex",2)},onBlur:function(t){return e.focusOut(t,2)}}),r.a.createElement("button",null,"\u0417'\u0454\u0434\u043d\u0430\u0442\u0438"))}}]),t}(r.a.Component),E=function(e){function t(e){var n;Object(i.a)(this,t),(n=Object(l.a)(this,Object(d.a)(t).call(this,e))).drag=function(e){n.props.graph.drag(e,e.target,Object(s.a)(n),(function(e,t){n.setState({left:t[0],top:t[1]})}))};var o=1;return!0===n.props.graph.state.mobile&&(o*=n.props.graph.state.scale),n.state={left:10*o,top:10*o},n}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("button",{onMouseDown:this.drag,onTouchStart:this.drag,onClick:this.props.graph.paintAlgo,style:{left:this.state.left,top:this.state.top}},"\u0424\u0430\u0440\u0431\u0443\u0432\u0430\u0442\u0438")}}]),t}(r.a.Component),O=c.a.render(r.a.createElement(f,{DOMElement:{Nodes:"node_container",Edges:"edge_container"}}),document.querySelector("#graph_container"));window.navigator.maxTouchPoints>0&&(document.querySelector("#graph_container").setAttribute("mobile",!0),document.querySelector("#edge_bar_container").setAttribute("mobile",!0),document.querySelector("#paint_button").setAttribute("mobile",!0),document.querySelector("#copyright").setAttribute("mobile",!0),O.setState({mobile:!0}));c.a.render(r.a.createElement(b,{graph:O}),document.querySelector("#edge_bar_container")),c.a.render(r.a.createElement(E,{graph:O}),document.querySelector("#paint_button"));var y,j=1;!0===O.state.mobile&&(j*=O.state.scale),document.onmousedown=function(e){!0===e.altKey&&O.addNode([e.pageX-27*j/2,e.pageY-27*j/2])},document.ondblclick=function(e){e.preventDefault(),e.target===document.body&&O.addNode([e.pageX-27*j/2,e.pageY-27*j/2])},document.ontouchstart=function(e){"BODY"===e.target.tagName&&1===e.touches.length&&(y=setTimeout((function(){O.addNode([e.touches[0].pageX-27*j/2,e.touches[0].pageY-27*j/2])}),300)),"Edge"===e.target.className&&1===e.touches.length&&(y=setTimeout((function(){var t=document.createEvent("Events");t.initEvent("dblclick",!0,!1),e.target.dispatchEvent(t)}),300))},document.ontouchmove=function(e){clearTimeout(y)},document.ontouchend=function(e){clearTimeout(y)}},9:function(e,t,n){e.exports=n(14)}},[[9,1,2]]]);
//# sourceMappingURL=main.2b1d7f99.chunk.js.map