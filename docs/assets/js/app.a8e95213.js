(function(e){function t(t){for(var a,i,s=t[0],u=t[1],l=t[2],p=0,d=[];p<s.length;p++)i=s[p],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&d.push(r[i][0]),r[i]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(e[a]=u[a]);c&&c(t);while(d.length)d.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,s=1;s<n.length;s++){var u=n[s];0!==r[u]&&(a=!1)}a&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var a={},r={app:0},o=[];function i(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=a,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var c=u;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var a=n("85ec"),r=n.n(a);r.a},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("a026"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Banner",{attrs:{cloudname:"pictures77"}})],1)},o=[],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"banner"},[e.show?n("div",{staticClass:"top full"},[n("p",[e._v(" This web page is to be used for instructional purposes. The data entered is stored as meta data with your image on the course's Cloudinary account. We ask that you don't share the link to this site publicly. You can remove your data from this page by supplying the first name and last name associated with your picture. This will open your email app and it will be forwarded to training for deletion. ")]),n("p",[e._v(" To delete your image and data from this page, provide first name and last name used to create Student id: "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.firstName,expression:"firstName"}],attrs:{type:"text",placeholder:"First Name"},domProps:{value:e.firstName},on:{input:function(t){t.target.composing||(e.firstName=t.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.lastName,expression:"lastName"}],attrs:{type:"text",id:"delete-lname",placeholder:"Last name"},domProps:{value:e.lastName},on:{input:function(t){t.target.composing||(e.lastName=t.target.value)}}}),n("a",{staticClass:"email-body",attrs:{href:e.emailBody}},[e._v("Delete")])]),n("a",{staticClass:"close-msg",attrs:{href:"#"},on:{click:function(t){e.show=!1}}},[e._v("OK")])]):e._e()])},s=[],u=(n("99af"),{name:"HelloWorld",props:["cloudname"],data:function(){return{show:!0,firstName:"",lastName:""}},computed:{emailBody:function(){var e=this.firstName||"first name not provided",t=this.lastName||"last name not provided";return"mailto:support@cloudinary.com?subject=Remove me from Student ID Website&body=Delete ".concat(e," ").concat(t," from Student ID application for cloud ").concat(this.cloudname)}}}),l=u,c=(n("ff1c"),n("2877")),p=Object(c["a"])(l,i,s,!1,null,"52657a80",null),d=p.exports,f={name:"App",components:{Banner:d}},m=f,v=(n("034f"),Object(c["a"])(m,r,o,!1,null,null,null)),h=v.exports;a["a"].config.productionTip=!1,new a["a"]({render:function(e){return e(h)}}).$mount("#app")},"85ec":function(e,t,n){},e1e9:function(e,t,n){},ff1c:function(e,t,n){"use strict";var a=n("e1e9"),r=n.n(a);r.a}});
//# sourceMappingURL=app.a8e95213.js.map