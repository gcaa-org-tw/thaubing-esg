(window.webpackJsonp=window.webpackJsonp||[]).push([[7,3,4],{299:function(t,e,r){var content=r(315);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(33).default)("1e045332",content,!0,{sourceMap:!1})},300:function(t,e,r){"use strict";r.d(e,"b",(function(){return n})),r.d(e,"c",(function(){return c})),r.d(e,"d",(function(){return o}));var n=[{subCat:"溫室氣體排放",measure:"範疇一（直接排放）",unit:"公噸CO2e"},{subCat:"溫室氣體排放",measure:"範疇二（間接排放）",unit:"公噸CO2e"},{subCat:"溫室氣體排放",measure:"每單位營收排放量",unit:"公噸CO2e/億元"}],o=[{subCat:"員工薪資",measure:"平均薪資",unit:"仟元"},{subCat:"員工薪資",measure:"薪資中位數",unit:"仟元"}],c=[{subCat:"",measure:"資本額",unit:"元"},{subCat:"收入、成本與淨利",measure:"營業收入",unit:"仟元"},{subCat:"收入、成本與淨利",measure:"營業成本",unit:"仟元"},{subCat:"收入、成本與淨利",measure:"營業費用",unit:"仟元"},{subCat:"收入、成本與淨利",measure:"淨利",unit:"仟元"}];e.a={environment:n,governance:c,social:o}},301:function(t,e,r){"use strict";var n=r(10),o=r(4),c=r(103),f=r(16),l=r(13),d=r(198),h=r(102),v=r(196),m=r(3),C=r(77).f,_=r(36).f,y=r(15).f,O=r(304),j=r(195).trim,x="Number",E=o.Number,S=E.prototype,A=function(t){var e=v(t,"number");return"bigint"==typeof e?e:N(e)},N=function(t){var e,r,n,o,c,f,l,code,d=v(t,"number");if(h(d))throw TypeError("Cannot convert a Symbol value to a number");if("string"==typeof d&&d.length>2)if(43===(e=(d=j(d)).charCodeAt(0))||45===e){if(88===(r=d.charCodeAt(2))||120===r)return NaN}else if(48===e){switch(d.charCodeAt(1)){case 66:case 98:n=2,o=49;break;case 79:case 111:n=8,o=55;break;default:return+d}for(f=(c=d.slice(2)).length,l=0;l<f;l++)if((code=c.charCodeAt(l))<48||code>o)return NaN;return parseInt(c,n)}return+d};if(c(x,!E(" 0o1")||!E("0b1")||E("+0x1"))){for(var w,I=function(t){var e=arguments.length<1?0:E(A(t)),r=this;return r instanceof I&&m((function(){O(r)}))?d(Object(e),r,I):e},P=n?C(E):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),k=0;P.length>k;k++)l(E,w=P[k])&&!l(I,w)&&y(I,w,_(E,w));I.prototype=S,S.constructor=I,f(o,x,I)}},302:function(t,e,r){"use strict";r.r(e);r(101);var n={props:{title:{type:String,required:!0},unit:{type:[String,Array],required:!0},isSrcAudited:{type:Boolean,default:!0},tips:{type:String,default:""},c3Config:{type:Object,default:function(){return{}}}},computed:{unitStr:function(){return Array.isArray(this.unit)?this.unit.join(" · "):this.unit}}},o=(r(314),r(47)),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"chartPanel bg-white"},[r("div",{staticClass:"flex justify-between items-start mb1"},[r("div",{staticClass:"chartPanel__title fw6"},[t._v(t._s(t.title))]),t.isSrcAudited?r("div",{staticClass:"chartPanel__audit"},[t._v("來自政府、官方報告")]):r("div",{staticClass:"chartPanel__audit"},[t._v("來自企業 CSR 報告")])]),r("div",{staticClass:"mb3 pb2"},[t._v("單位："+t._s(t.unitStr))]),r("chart-content",{attrs:{config:t.c3Config}}),t.tips?r("div",{staticClass:"chartPanel__tips mt2"},[t._v(t._s(t.tips))]):t._e()],1)}),[],!1,null,"d884080e",null);e.default=component.exports;installComponents(component,{ChartContent:r(303).default})},303:function(t,e,r){"use strict";r.r(e);r(35),r(27),r(34),r(48),r(26),r(49);var n=r(17);function o(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function c(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f={props:{config:{type:Object,required:!0}},data:function(){return{c3Handler:null}},mounted:function(){if(this.config.data){var t=r(316);this.c3Handler=t.generate(c(c({},this.config),{},{bindto:this.$refs.chart}))}}},l=r(47),component=Object(l.a)(f,(function(){var t=this.$createElement;return(this._self._c||t)("div",{ref:"chart",staticClass:"chartContent"})}),[],!1,null,null,null);e.default=component.exports},304:function(t,e){var r=1..valueOf;t.exports=function(t){return r.call(t)}},305:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));r(34),r(35),r(26),r(306),r(301),r(308),r(313);var n=r(322);function o(t,e){return{props:{stats:{type:Array,required:!0}},computed:{measureMap:function(){return t.filter((function(t){return t.subCat===e})).reduce((function(map,t){return map[t.measure]=t,map}),{})}},methods:{genYFormatter:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=t?"$,d":",d";return Object(n.format)(e)},dumpSubCatStats:function(){var t={x:["x"]},r=Object.keys(this.measureMap);r.forEach((function(e){t[e]=[e]}));var n={};return this.stats.forEach((function(t){if(t.子分類===e){var r=t.年份;n[r]||(n[r]={}),n[r][t.項目]=Number.parseFloat(t.數值)}})),Object.keys(n).sort().forEach((function(e){t.x.push(new Date("".concat(e,"-01-01")));var o=n[e];r.forEach((function(e){t[e].push(o[e]||null)}))})),Object.values(t)}}}}},306:function(t,e,r){var n=r(2),o=r(307);n({target:"Number",stat:!0,forced:Number.parseFloat!=o},{parseFloat:o})},307:function(t,e,r){var n=r(4),o=r(3),c=r(9),f=r(195).trim,l=r(132),d=n.parseFloat,h=n.Symbol,v=h&&h.iterator,m=1/d(l+"-0")!=-1/0||v&&!o((function(){d(Object(v))}));t.exports=m?function(t){var e=f(c(t)),r=d(e);return 0===r&&"-"==e.charAt(0)?-0:r}:d},308:function(t,e,r){"use strict";var n=r(2),o=r(61),c=r(21),f=r(39),l=r(9),d=r(3),h=r(309),v=r(133),m=r(310),C=r(311),_=r(76),y=r(312),O=[],j=O.sort,x=d((function(){O.sort(void 0)})),E=d((function(){O.sort(null)})),S=v("sort"),A=!d((function(){if(_)return _<70;if(!(m&&m>3)){if(C)return!0;if(y)return y<603;var code,t,e,r,n="";for(code=65;code<76;code++){switch(t=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:e=3;break;case 68:case 71:e=4;break;default:e=2}for(r=0;r<47;r++)O.push({k:t+r,v:e})}for(O.sort((function(a,b){return b.v-a.v})),r=0;r<O.length;r++)t=O[r].k.charAt(0),n.charAt(n.length-1)!==t&&(n+=t);return"DGBEFHACIJK"!==n}}));n({target:"Array",proto:!0,forced:x||!E||!S||!A},{sort:function(t){void 0!==t&&o(t);var e=c(this);if(A)return void 0===t?j.call(e):j.call(e,t);var r,n,d=[],v=f(e);for(n=0;n<v;n++)n in e&&d.push(e[n]);for(d=h(d,function(t){return function(e,r){return void 0===r?-1:void 0===e?1:void 0!==t?+t(e,r)||0:l(e)>l(r)?1:-1}}(t)),r=d.length,n=0;n<r;)e[n]=d[n++];for(;n<v;)delete e[n++];return e}})},309:function(t,e){var r=Math.floor,n=function(t,e){var f=t.length,l=r(f/2);return f<8?o(t,e):c(n(t.slice(0,l),e),n(t.slice(l),e),e)},o=function(t,e){for(var element,r,n=t.length,i=1;i<n;){for(r=i,element=t[i];r&&e(t[r-1],element)>0;)t[r]=t[--r];r!==i++&&(t[r]=element)}return t},c=function(t,e,r){for(var n=t.length,o=e.length,c=0,f=0,l=[];c<n||f<o;)c<n&&f<o?l.push(r(t[c],e[f])<=0?t[c++]:e[f++]):l.push(c<n?t[c++]:e[f++]);return l};t.exports=n},310:function(t,e,r){var n=r(60).match(/firefox\/(\d+)/i);t.exports=!!n&&+n[1]},311:function(t,e,r){var n=r(60);t.exports=/MSIE|Trident/.test(n)},312:function(t,e,r){var n=r(60).match(/AppleWebKit\/(\d+)\./);t.exports=!!n&&+n[1]},313:function(t,e,r){var n=r(2),o=r(197).values;n({target:"Object",stat:!0},{values:function(t){return o(t)}})},314:function(t,e,r){"use strict";r(299)},315:function(t,e,r){var n=r(32)(!1);n.push([t.i,".chartPanel[data-v-d884080e]{padding:1.5rem;border-radius:.5rem;box-shadow:0 2px 4px rgba(0,0,0,.12)}.chartPanel__title[data-v-d884080e]{font-size:1.5rem;color:#49591c}.chartPanel__audit[data-v-d884080e]{color:#49591c}",""]),t.exports=n},320:function(t,e,r){var content=r(327);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(33).default)("7c287b18",content,!0,{sourceMap:!1})},326:function(t,e,r){"use strict";r(320)},327:function(t,e,r){var n=r(32)(!1);n.push([t.i,"",""]),t.exports=n},334:function(t,e,r){"use strict";r.r(e);var n=r(300),o=r(305),c={mixins:[Object(o.a)(n.d,"員工薪資")],computed:{c3Config:function(){return{data:{x:"x",columns:this.dumpSubCatStats(),type:"line"},ppoint:{r:6},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{label:this.measureMap.平均薪資.unit,tick:{format:this.genYFormatter(!0)}}}}}}},f=(r(326),r(47)),component=Object(f.a)(c,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("chart-panel",{attrs:{title:"員工薪資",unit:"仟元","c3-config":t.c3Config}})}),[],!1,null,"d69d0970",null);e.default=component.exports;installComponents(component,{ChartPanel:r(302).default})}}]);