(this["webpackJsonpexample-react-ts-rxdb-bootstrap-table2"]=this["webpackJsonpexample-react-ts-rxdb-bootstrap-table2"]||[]).push([[0],{1310:function(e,t){},1336:function(e,t){},1354:function(e,t){},1356:function(e,t){},1368:function(e,t){},1370:function(e,t){},1381:function(e,t){},1383:function(e,t){},1393:function(e,t){},1454:function(e,t,n){"use strict";n.r(t);var a,r=n(0),c=n.n(r),o=n(53),s=n.n(o),u=(n(236),n(13)),l=n.n(u),i=n(24),d=n(36),p=n(1460),m=n(225),f=n(201),b=n(76),h=n.n(b),v=function(){var e=Object(i.a)(l.a.mark((function e(t,n,a,r,c){var o,s,u,i,d,p,m,b,v,g,x,O;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o=performance.now(),s=[],c||(c=Math.max(100,Math.ceil(n/200))),console.log("inserting data in chunks of ",c),u=Array(Math.floor(n/c)).fill(c),n%c>0&&u.push(n%c),console.log("chunk arry",u),i=0,d=Object(f.a)(u),e.prev=9,d.s();case 11:if((p=d.n()).done){e.next=25;break}for(m=p.value,b=[],v=0;v<m;v++)b.push({name:h.a.name.findName(),phone:h.a.phone.phoneNumber(),address:h.a.address.streetAddress(),area:h.a.address.countryCode()});return g=performance.now(),e.next=18,null===t||void 0===t?void 0:t.users.bulkInsert(b);case 18:e.sent,x=performance.now(),s.push(x-g),a(+((i+=m)/n*100).toFixed(1));case 23:e.next=11;break;case 25:e.next=30;break;case 27:e.prev=27,e.t0=e.catch(9),d.e(e.t0);case 30:return e.prev=30,d.f(),e.finish(30);case 33:O=performance.now(),console.log("".concat(null===t||void 0===t?void 0:t.adapter,": Time Taken to add ").concat(n," users : ").concat((O-o).toFixed(1),"ms")),console.log("Pass: ".concat(s.length,", time: ").concat(s.reduce((function(e,t){return e+t}),0).toFixed(1),",min: ").concat(Math.min.apply(Math,s).toFixed(1),",max: ").concat(Math.max.apply(Math,s).toFixed(1),",avg: ").concat((s.reduce((function(e,t){return e+t}),0)/s.length).toFixed(1),",  ")),r&&r([+s.reduce((function(e,t){return e+t}),0).toFixed(2),i]);case 37:case"end":return e.stop()}}),e,null,[[9,27,30,33]])})));return function(t,n,a,r,c){return e.apply(this,arguments)}}(),g=function(){return performance.now()},x=function(e,t){var n=performance.now();return console.log("fun: ".concat(t," took ").concat((n-e).toFixed(2),"ms")),+(n-e).toFixed(2)},O=n(208),E=n(209),j=n(226),w=n(211),y=[];Object(p.a)(O.a),Object(p.a)(E.a),Object(p.a)(j.a),Object(p.a)(w.a),Object(p.a)(n(1455)),Object(p.a)(n(1456)),Object(p.a)(n(1453));Object(m.b)("localstorage").then((function(e){console.log("RXJS -> Adapter -> localstorage status :",e),e&&-1===y.indexOf("localstorage")&&y.push("localstorage")})),Object(m.b)("idb").then((function(e){console.log("RXJS -> Adapter -> idb status :",e),e&&-1===y.indexOf("idb")&&y.push("idb")})),Object(m.b)("memory").then((function(e){console.log("RXJS -> Adapter -> memory status :",e),e&&-1===y.indexOf("memory")&&y.push("memory")})),Object(m.b)("leveldb").then((function(e){console.log("RXJS -> Adapter -> leveldb status :",e),e&&-1===y.indexOf("leveldb")&&y.push("leveldb")}));var k=[{name:"users",schema:{title:"vendor schema",description:"describes a vendor",version:0,keyCompression:!1,type:"object",properties:{name:{type:"string"},phone:{type:"string",primary:!0},address:{type:"string"},area:{type:"string"}},required:["name","phone","address"]},statics:{getCount:function(){var e=this;return Object(i.a)(l.a.mark((function t(){var n,a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=g(),t.next=3,e.find().exec();case 3:return a=t.sent,console.log("Total users Count: ",a.length),x(n,"getCount - ".concat(a.length)),t.abrupt("return",a.length);case 7:case"end":return t.stop()}}),t)})))()},getCountPouch:function(){var e=this;return Object(i.a)(l.a.mark((function t(){var n,a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=g(),t.next=3,e.pouch.allDocs().catch((function(e){console.log("failed alldocs",e)}));case 3:return a=t.sent,console.log("Total users Count: ",a.rows.length),x(n,"getCountPouch - ".concat(a.rows.length)),t.abrupt("return",a.rows.length);case 7:case"end":return t.stop()}}),t)})))()},getCountWithInfo:function(){var e=this;return Object(i.a)(l.a.mark((function t(){var n,a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=g(),t.next=3,e.pouch.info();case 3:return a=t.sent,console.log("Total users Count: ",a.doc_count),x(n,"getCountWithInfo - ".concat(a.doc_count)),t.abrupt("return",a.doc_count);case 7:case"end":return t.stop()}}),t)})))()},getDocs:function(e){var t=arguments,n=this;return Object(i.a)(l.a.mark((function a(){var r,c,o,s,u;return l.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return r=t.length>1&&void 0!==t[1]?t[1]:1,c=t.length>2?t[2]:void 0,o=g(),a.next=5,n.find().skip(e*(r-1)).limit(e).exec();case 5:return s=a.sent,console.log("retrived ".concat(s.length," docs from users (skipped : ").concat(r*e,")")),u=x(o,"getDocs - ".concat(s.length," items")),c&&c([u,s.length]),a.abrupt("return",s);case 10:case"end":return a.stop()}}),a)})))()},getDocsPouch:function(e){var t=arguments,n=this;return Object(i.a)(l.a.mark((function e(){var a,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.length>1&&void 0!==t[1]?t[1]:0,a=g(),e.next=4,n.pouch.allDocs({include_docs:!0});case 4:return r=e.sent,x(a,"getDocsPouch - ".concat(r.length," items")),e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})))()},addDocs:function(e,t){var n=this;return Object(i.a)(l.a.mark((function a(){var r,c,o;return l.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return r=g(),a.next=3,n.bulkInsert(e);case 3:return c=a.sent,o=x(r,"addDocs - ".concat(e.length," items")),t&&t([o,e.length]),a.abrupt("return",c);case 7:case"end":return a.stop()}}),a)})))()}}}],S=function(){var e=Object(i.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("DatabaseService: creating database.."),e.next=3,Object(m.c)({name:"testdb",adapter:t,password:"passpasspass",multiInstance:!1,eventReduce:!0});case 3:return n=e.sent,console.dir(n),console.log("DatabaseService: created database"),e.next=8,Promise.all(k.map((function(e){return n.collection(e)})));case 8:return e.abrupt("return",n);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),P=function(){var e=Object(i.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a){e.next=2;break}return e.abrupt("return",!1);case 2:return e.next=4,a;case 4:return t=e.sent,e.next=7,t.destroy();case 7:return e.next=9,t.remove();case 9:return e.abrupt("return",!0);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),C=function(){var e=Object(i.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.warn("re-creating database with adapter '".concat(t,"'")),e.next=3,P();case 3:return a=S(t),e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),D=function(){var e=Object(i.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a||(a=S(t)),e.abrupt("return",a);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),F=n(1470),N=n(1463),T=n(1464),A=n(1462),R=n(224),I=n(1467),z=n(1469),B=n(1465),M=n(1466),J=n(1468),L=n(70),W=n.n(L),X=n(221),_=n.n(X);var q=function(e){var t=e.data,n=e.page,a=e.sizePerPage,r=e.onTableChange,o=e.totalSize,s=[{dataField:"name",text:"Name"},{dataField:"phone",text:"Phone No"},{dataField:"address",text:"Address"},{dataField:"area",text:"Area"}];return c.a.createElement("div",null,c.a.createElement(L.PaginationProvider,{pagination:W()({custom:!0,page:n,sizePerPage:a,totalSize:o})},(function(e){var n=e.paginationProps,a=e.paginationTableProps;return c.a.createElement("div",null,c.a.createElement("div",null),c.a.createElement(A.a,null,c.a.createElement(R.a,null,c.a.createElement(_.a,Object.assign({remote:!0,bootstrap4:!0},a,{keyField:"phone",data:t,columns:s,onTableChange:r})))),c.a.createElement(A.a,null,c.a.createElement(R.a,null,c.a.createElement(L.SizePerPageDropdownStandalone,n)),c.a.createElement(R.a,{className:"align-items-center"},c.a.createElement(L.PaginationTotalStandalone,n)),c.a.createElement(R.a,null,c.a.createElement("div",{className:"float-right"},c.a.createElement(L.PaginationListStandalone,n)))))})))};var Q=function(){var e=Object(r.useState)(),t=Object(d.a)(e,2),n=t[0],a=t[1],o=Object(r.useState)(),s=Object(d.a)(o,2),u=s[0],p=s[1],m=Object(r.useState)(0),f=Object(d.a)(m,2),b=f[0],h=f[1],g=Object(r.useState)(100),x=Object(d.a)(g,2),O=x[0],E=x[1],j=Object(r.useState)(0),w=Object(d.a)(j,2),y=w[0],k=w[1],S=Object(r.useState)(10),P=Object(d.a)(S,2),L=P[0],W=P[1],X=Object(r.useState)(1),_=Object(d.a)(X,2),Q=_[0],U=_[1],$=Object(r.useState)("memory"),G=Object(d.a)($,2),H=G[0],K=G[1],V=Object(r.useState)([!1,""]),Y=Object(d.a)(V,2),Z=Y[0],ee=Y[1],te=Object(r.useRef)(null),ne=Object(r.useState)([334.54,20]),ae=Object(d.a)(ne,2),re=ae[0],ce=ae[1],oe=Object(r.useState)([334.54,20]),se=Object(d.a)(oe,2),ue=se[0],le=se[1],ie=Object(r.useState)(["idb","memory","websql"]),de=Object(d.a)(ie,2),pe=de[0];de[1],Object(r.useEffect)((function(){function e(){return(e=Object(i.a)(l.a.mark((function e(){var t,n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return ee([!0,"initializing database"]),e.next=3,D(H);case 3:return n=e.sent,p(n),e.next=7,v(n,100,k,le);case 7:return e.next=9,null===n||void 0===n||null===(t=n.users)||void 0===t?void 0:t.getDocs(10,1,ce);case 9:r=e.sent,a(r),ee([!1,""]);case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[H]);var me=function(){var e=Object(i.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,null===u||void 0===u||null===(t=u.users)||void 0===t?void 0:t.getDocs(L,Q,ce);case 2:if(e.t0=e.sent,e.t0){e.next=5;break}e.t0=[];case 5:n=e.t0,a(n);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),fe=function(){var e=Object(i.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return k(0),U(1),W(10),a([]),h(0),e.next=7,D(H);case 7:return t=e.sent,p(t),e.next=11,me();case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(r.useEffect)((function(){null===u||void 0===u||u.users.getDocs(L,Q,ce).then((function(e){a(e)})).catch((function(e){console.error("Failed to get users",e)}))}),[u,Q,L]),Object(r.useEffect)((function(){function e(){return(e=Object(i.a)(l.a.mark((function e(){var t,n,a,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D(H);case 2:return r=e.sent,e.next=5,null===r||void 0===r||null===(t=r.users)||void 0===t?void 0:t.getCount().then((function(e){h(e)}));case 5:return e.next=7,null===r||void 0===r||null===(n=r.users)||void 0===n?void 0:n.getCountPouch().then((function(e){h(e)}));case 7:return e.next=9,null===r||void 0===r||null===(a=r.users)||void 0===a?void 0:a.getCountWithInfo().then((function(e){h(e)}));case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[H,n]);var be={idb:"IndexedDB",memory:"In Memmory",websql:"Web SQL",leveldb:"Level DB",localstorage:"Local Storage"},he=function(){var e=Object(i.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),k(0),e.t0=u,!e.t0){e.next=6;break}return e.next=6,v(u,O,k,le);case 6:E(100),me();case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ve=c.a.createElement(F.a,{now:y,label:"".concat(y,"%")});return c.a.createElement(N.a,{className:"p-3"},c.a.createElement("div",{ref:te},c.a.createElement(T.a,{style:{textAlign:"center"}},c.a.createElement("h1",{className:"header"},"RxDB (",be[H],") with React"))),c.a.createElement(A.a,null,c.a.createElement(R.a,null,c.a.createElement(I.a,{onSubmit:he},c.a.createElement(I.a.Row,{className:"align-items-center"},c.a.createElement(R.a,{xs:"auto"},c.a.createElement(I.a.Control,{className:"mb-1",id:"inlineFormInput",placeholder:"Enter No",value:O,onChange:function(e){e.preventDefault(),E(+e.target.value),k(0)}})),c.a.createElement(R.a,{xs:"auto"},c.a.createElement(z.a,{variant:"success",type:"submit",className:"mb-2"},"Add ",O," Users"),c.a.createElement("br",null),ve),c.a.createElement(R.a,null," ")))),c.a.createElement(R.a,null,Z[0]?c.a.createElement(A.a,null,c.a.createElement(B.a,{animation:"border",role:"status"},c.a.createElement("span",{className:"sr-only"},"Loading...",Z[1]))):c.a.createElement(M.a,{"aria-label":"Adapters"},pe.map((function(e){return c.a.createElement(z.a,{key:e,onClick:Object(i.a)(l.a.mark((function t(){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return ee([!0,"updating adapter ".concat(e)]),t.next=3,C(e);case 3:K(e);case 4:case"end":return t.stop()}}),t)}))),variant:e===H?"info":"outline-info"},be[e])})))),c.a.createElement(R.a,{xs:"auto"},c.a.createElement(z.a,{variant:"primary",className:"mb-2",onClick:function(){fe()}},"Reload")," ",c.a.createElement(z.a,{variant:"outline-danger",className:"mb-2",onClick:function(){fe()}},"Delete DB")," ",c.a.createElement("p",null,"(",null===n||void 0===n?void 0:n.length,"/",b,") Fetched")),c.a.createElement(R.a,{xs:"auto"})),c.a.createElement(A.a,null,c.a.createElement(R.a,null,c.a.createElement(J.a,{style:{marginTop:"16px"}},c.a.createElement(J.a.Body,null,"Latest Read Time : ",re[0],"ms for ",re[1]," ","docs"))),c.a.createElement(R.a,null,c.a.createElement(J.a,{style:{marginTop:"16px"}},c.a.createElement(J.a.Body,null,"Latest Write Time : ",ue[0],"ms for"," ",ue[1]," docs")))),c.a.createElement(A.a,null,c.a.createElement(R.a,{style:{marginTop:"16px"}},c.a.createElement(q,{data:n||[],page:Q,sizePerPage:L,totalSize:b,onTableChange:function(e,t){var n=t.page,a=t.sizePerPage;U(n),W(a)}}))),c.a.createElement(A.a,null,c.a.createElement(R.a,null,c.a.createElement(J.a,{style:{marginTop:"16px"}},c.a.createElement(J.a.Body,null," ","First Doc : ",JSON.stringify(n&&n[0]))))))};var U=function(){return c.a.createElement(Q,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(1450),n(1451);s.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(U,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},231:function(e,t,n){e.exports=n(1454)},236:function(e,t,n){}},[[231,1,2]]]);
//# sourceMappingURL=main.40c11412.chunk.js.map