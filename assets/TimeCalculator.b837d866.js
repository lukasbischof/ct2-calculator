import{a as m,T as u,k as h,o as g,i as s,b as e,t as b}from"./index.abf51158.js";import{I as t}from"./Input.4ebe9e2b.js";import{F as a}from"./FormRow.7ca19c31.js";const f=b("<div><h1>Zeitrechner</h1><form></form></div>"),k=()=>{const[n,d]=m(u.new(h.from_seconds(0))),o=(c,i)=>{d(n().update(c,i))};return g(()=>n().free()),(()=>{const c=f.cloneNode(!0),i=c.firstChild,r=i.nextSibling;return s(r,e(a,{label:"Sekunden",labelFor:"seconds",get children(){return e(t,{class:"form-control",id:"seconds",value:()=>n().seconds(),onChange:l=>o("seconds",l)})}}),null),s(r,e(a,{label:"Millisekunden",labelFor:"milliseconds",get children(){return e(t,{class:"form-control",id:"milliseconds",value:()=>n().milliseconds(),onChange:l=>o("milliseconds",l)})}}),null),s(r,e(a,{label:"Mikrosekunden",labelFor:"microseconds",get children(){return e(t,{class:"form-control",id:"microseconds",value:()=>n().microseconds(),onChange:l=>o("microseconds",l)})}}),null),s(r,e(a,{label:"Nanosekunden",labelFor:"nanoseconds",get children(){return e(t,{class:"form-control",id:"nanoseconds",value:()=>n().nanoseconds(),onChange:l=>o("nanoseconds",l)})}}),null),s(r,e(a,{label:"Hertz",labelFor:"hertz",get children(){return e(t,{class:"form-control",id:"hertz",value:()=>n().hertz(),onChange:l=>o("hertz",l)})}}),null),s(r,e(a,{label:"Kilohertz",labelFor:"kilohertz",get children(){return e(t,{class:"form-control",id:"kilohertz",value:()=>n().kilohertz(),onChange:l=>o("kilohertz",l)})}}),null),s(r,e(a,{label:"Megahertz",labelFor:"megahertz",get children(){return e(t,{class:"form-control",id:"megahertz",value:()=>n().megahertz(),onChange:l=>o("megahertz",l)})}}),null),c})()};export{k as default};