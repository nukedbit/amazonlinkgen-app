(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{34:function(e,t,n){e.exports=n.p+"static/media/amazon-link-builder.2a3800a7.png"},50:function(e,t,n){e.exports=n(58)},55:function(e,t,n){},56:function(e,t,n){},58:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(18),i=n.n(r),l=(n(55),n(56),n(31)),c=n(32),s=n(45),m=n(33),u=n(46),d=n(80),h=n(81),g=n(76),p=n(85),f=n(44),E=n(9),k=n(34),b=n.n(k),w=n(35),v=n.n(w),y=new RegExp("(https://.*amazon.[^/]*)"),C=new RegExp("(?:[/dp/]|$)([A-Z0-9]{10})"),x=function(e){function t(e){var n;Object(l.a)(this,t),(n=Object(s.a)(this,Object(m.a)(t).call(this,e))).getStore=function(e){var t=y.exec(e);return null===t||0===t.length?null:t.entries().next().value[1]},n.getAsin=function(e){var t=e.match(C);return console.log("match",t),t?t[1]:null},n.generateUrl=function(){if(!E.isEmpty(n.state.url)&&!E.isEmpty(n.state.code)){var e=n.getStore(n.state.url),t=n.getAsin(n.state.url);if(!E.isEmpty(e)&&!E.isEmpty(t)){var a="".concat(e,"/dp/product/").concat(t,"?tag=").concat(n.state.code);n.setState({link:a})}}n.storeCode()},n.onCheckboxChange=function(e,t){null!==t&&n.setState({rememberCode:t},function(){!1===t&&localStorage.removeItem("code"),n.storeCode()})},n.showLink=function(){var e=n.state.link;return E.isEmpty(e)?null:o.a.createElement(h.a,{horizontal:!0,tokens:{childrenGap:50}},o.a.createElement("a",{href:e,target:"_blank"},e),o.a.createElement(g.a,{onClick:function(){var e=n.state.link;v()(e)}},"Copy"))},n.storeCode=function(){var e=n.state,t=e.code;e.rememberCode&&localStorage.setItem("code",t)};var a=localStorage.getItem("code");return n.state={columnProps:{tokens:{childrenGap:15},styles:{root:{width:"500px"}}},rememberCode:!E.isEmpty(a),code:a,link:null},n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.state,n=t.columnProps,a=t.url,r=t.code;return o.a.createElement(h.a,{horizontalAlign:"center",tokens:{childrenGap:20},styles:{root:{width:"100%",padding:"2rem"}}},o.a.createElement(h.a,{horizontalAlign:"center",tokens:{childrenGap:20}},o.a.createElement("img",{src:b.a,style:{width:"100px"}}),o.a.createElement("h1",null,"Amazon Affiliate link builder")),o.a.createElement(h.a,Object.assign({horizontalAlign:"stretch"},n),o.a.createElement(d.a,{styles:{root:{width:"100%"}},label:"Amazon URL",onChange:function(t,n){return e.setState({url:n})}}),o.a.createElement(d.a,{label:"Tracking Id",value:r,onChange:function(t,n){e.setState({code:n}),e.storeCode()}})),o.a.createElement(h.a,Object.assign({horizontalAlign:"center"},n),o.a.createElement(p.a,{checked:!E.isEmpty(r),label:"Remember affiliate code (in the browser no data is sent anywhere)",onChange:this.onCheckboxChange}),o.a.createElement(f.a,{disabled:E.isEmpty(a)||E.isEmpty(r),text:"Generate",onClick:this.generateUrl}),this.showLink()))}}]),t}(o.a.Component),A=function(){return o.a.createElement(x,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[50,1,2]]]);
//# sourceMappingURL=main.84884334.chunk.js.map