(window.webpackJsonp=window.webpackJsonp||[]).push([[9,4,5],{299:function(t,e,r){var content=r(315);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(33).default)("5cc7ceb3",content,!0,{sourceMap:!1})},300:function(t,e,r){"use strict";r.d(e,"b",(function(){return o})),r.d(e,"c",(function(){return l})),r.d(e,"d",(function(){return c}));var n=r(78),o=(r(61),r(39),[{subCat:"溫室氣體排放",measure:"範疇一直接排放",unit:"公噸CO2e",toFixed:2},{subCat:"溫室氣體排放",measure:"範疇二間接排放",unit:"公噸CO2e",toFixed:2},{subCat:"溫室氣體排放",measure:"碳密集度",unit:"公噸CO2e/億元",toFixed:2},{subCat:"能源使用",measure:"總用電量",isFake:!0},{subCat:"能源使用",measure:"再生能源用電量",isFake:!0},{subCat:"用水",measure:"用水量取水量",isFake:!0},{subCat:"廢棄物管理",measure:"廢棄物項目及量",isFake:!0}].concat(Object(n.a)([{column:"Benzene",label:"苯"},{column:"CarbonTetrachloride",label:"四氯化碳"},{column:"Dichloroethane11",label:"1-1-二氯乙烷"},{column:"Dichloroethane12",label:"1-2-二氯乙烷"},{column:"Dioxin",label:"戴奧辛"},{column:"Ethylbenzene",label:"乙苯"},{column:"Methylenechloride",label:"二氯甲烷"},{column:"NOx",label:"氮氧化物"},{column:"SOx",label:"硫氧化物"},{column:"Styrene",label:"苯乙烯"},{column:"TSP",label:"粒狀污染物"},{column:"Tetrachloroethylene",label:"四氯乙烯"},{column:"Toluene",label:"甲苯"},{column:"Trichloroethane",label:"三氯乙烷"},{column:"Trichloroethylene",label:"三氯乙烯"},{column:"VOCs",label:"揮發性有機化合物"},{column:"Xylene",label:"二甲苯"},{column:"chloroform",label:"三氯甲烷"},{column:"heavymetal",label:"重金屬"}].map((function(t){return{subCat:"污染管理",measure:t.label,toFixed:2,isAirPollution:!0}}))),[{subCat:"污染管理",measure:"排放水量",isFake:!0},{subCat:"污染管理",measure:"違反環境法規金額",unit:"元"},{subCat:"污染管理",measure:"違反環境法規次數",unit:"次"}])),c=[{subCat:"員工數",measure:"性別比",isFake:!0},{subCat:"員工數",measure:"本外勞比",isFake:!0},{subCat:"員工數",measure:"身障聘用",isFake:!0},{subCat:"員工數",measure:"原民聘用",isFake:!0},{subCat:"員工數",measure:"新進率／離職率",isFake:!0},{subCat:"員工薪資",measure:"平均薪資",unit:"仟元"},{subCat:"員工薪資",measure:"薪資中位數",unit:"仟元"},{subCat:"",measure:"工時",isFake:!0},{subCat:"",measure:"違反勞動法規紀錄",isFake:!0},{subCat:"職業健康與安全",measure:"重大職災",isFake:!0},{subCat:"職業健康與安全",measure:"工安事故",isFake:!0}],l=[{subCat:"",measure:"資本額",unit:"元"},{subCat:"是否產製CSR報告",measure:"是否揭露不利資訊",isFake:!0},{subCat:"收入、成本與淨利",measure:"營業收入",unit:"仟元"},{subCat:"收入、成本與淨利",measure:"營業成本",unit:"仟元"},{subCat:"收入、成本與淨利",measure:"營業費用",unit:"仟元"},{subCat:"收入、成本與淨利",measure:"淨利",unit:"仟元"},{subCat:"稅務透明度",measure:"租稅減免",isFake:!0},{subCat:"稅務透明度",measure:"補助、補貼",isFake:!0},{subCat:"",measure:"ISO認證",isFake:!0}];e.a={environment:o,governance:l,social:c}},301:function(t,e,r){"use strict";r.r(e);r(101);var n={props:{title:{type:String,required:!0},unit:{type:[String,Array],default:""},isSrcAudited:{type:Boolean,default:!0},tips:{type:String,default:""},c3Config:{type:Object,default:function(){return{}}}},computed:{unitStr:function(){return Array.isArray(this.unit)?this.unit.join(" · "):this.unit}}},o=(r(314),r(47)),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"chartPanel bg-white"},[r("div",{staticClass:"flex justify-between items-start mb1"},[r("div",{staticClass:"chartPanel__title fw5"},[t._v(t._s(t.title))]),t.isSrcAudited?r("div",{staticClass:"chartPanel__audit"},[t._v("來自政府、官方報告")]):r("div",{staticClass:"chartPanel__audit"},[t._v("來自企業 CSR 報告")])]),r("div",{staticClass:"mb3 pb2"},[t.unit?r("span",[t._v("單位："+t._s(t.unitStr))]):t._e()]),r("chart-content",{attrs:{config:t.c3Config}}),t.tips?r("div",{staticClass:"chartPanel__tips mt2"},[t._v(t._s(t.tips))]):t._e()],1)}),[],!1,null,"2b5033bc",null);e.default=component.exports;installComponents(component,{ChartContent:r(305).default})},302:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));r(34),r(35),r(26),r(306),r(303),r(308),r(313);var n=r(317);function o(t,e){if("string"==typeof e){var r=e;e=function(t){return t.subCat===r}}return{props:{stats:{type:Array,required:!0}},computed:{measureMap:function(){return t.filter(e).reduce((function(map,t){return map[t.measure]=t,map}),{})}},methods:{genYFormatter:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=t?"$,d":",d";return Object(n.format)(e)},dumpSubCatStats:function(){var t=this,e={x:["x"]},r=Object.keys(this.measureMap);r.forEach((function(t){e[t]=[t]}));var n={};return this.stats.forEach((function(e){if(e.項目 in t.measureMap){var r=e.年份;n[r]||(n[r]={}),n[r][e.項目]=Number.parseFloat(e.數值)}})),Object.keys(n).sort().forEach((function(t){e.x.push(new Date("".concat(t,"-01-01")));var o=n[t];r.forEach((function(t){e[t].push(o[t]||null)}))})),Object.values(e)}}}}},303:function(t,e,r){"use strict";var n=r(10),o=r(4),c=r(103),l=r(16),f=r(13),m=r(198),h=r(102),d=r(196),v=r(3),C=r(77).f,y=r(36).f,O=r(15).f,_=r(304),F=r(195).trim,x="Number",k=o.Number,S=k.prototype,j=function(t){var e=d(t,"number");return"bigint"==typeof e?e:E(e)},E=function(t){var e,r,n,o,c,l,f,code,m=d(t,"number");if(h(m))throw TypeError("Cannot convert a Symbol value to a number");if("string"==typeof m&&m.length>2)if(43===(e=(m=F(m)).charCodeAt(0))||45===e){if(88===(r=m.charCodeAt(2))||120===r)return NaN}else if(48===e){switch(m.charCodeAt(1)){case 66:case 98:n=2,o=49;break;case 79:case 111:n=8,o=55;break;default:return+m}for(l=(c=m.slice(2)).length,f=0;f<l;f++)if((code=c.charCodeAt(f))<48||code>o)return NaN;return parseInt(c,n)}return+m};if(c(x,!k(" 0o1")||!k("0b1")||k("+0x1"))){for(var A,N=function(t){var e=arguments.length<1?0:k(j(t)),r=this;return r instanceof N&&v((function(){_(r)}))?m(Object(e),r,N):e},P=n?C(k):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),I=0;P.length>I;I++)f(k,A=P[I])&&!f(N,A)&&O(N,A,y(k,A));N.prototype=S,S.constructor=N,l(o,x,N)}},304:function(t,e){var r=1..valueOf;t.exports=function(t){return r.call(t)}},305:function(t,e,r){"use strict";r.r(e);r(35),r(27),r(34),r(48),r(26),r(49);var n=r(17);function o(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function c(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var l={props:{config:{type:Object,required:!0}},data:function(){return{c3Handler:null}},mounted:function(){if(this.config.data){var t=r(316);this.c3Handler=t.generate(c(c({},this.config),{},{bindto:this.$refs.chart}))}}},f=r(47),component=Object(f.a)(l,(function(){var t=this.$createElement;return(this._self._c||t)("div",{ref:"chart",staticClass:"chartContent"})}),[],!1,null,null,null);e.default=component.exports},306:function(t,e,r){var n=r(2),o=r(307);n({target:"Number",stat:!0,forced:Number.parseFloat!=o},{parseFloat:o})},307:function(t,e,r){var n=r(4),o=r(3),c=r(9),l=r(195).trim,f=r(132),m=n.parseFloat,h=n.Symbol,d=h&&h.iterator,v=1/m(f+"-0")!=-1/0||d&&!o((function(){m(Object(d))}));t.exports=v?function(t){var e=l(c(t)),r=m(e);return 0===r&&"-"==e.charAt(0)?-0:r}:m},308:function(t,e,r){"use strict";var n=r(2),o=r(62),c=r(21),l=r(40),f=r(9),m=r(3),h=r(309),d=r(133),v=r(310),C=r(311),y=r(76),O=r(312),_=[],F=_.sort,x=m((function(){_.sort(void 0)})),k=m((function(){_.sort(null)})),S=d("sort"),j=!m((function(){if(y)return y<70;if(!(v&&v>3)){if(C)return!0;if(O)return O<603;var code,t,e,r,n="";for(code=65;code<76;code++){switch(t=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:e=3;break;case 68:case 71:e=4;break;default:e=2}for(r=0;r<47;r++)_.push({k:t+r,v:e})}for(_.sort((function(a,b){return b.v-a.v})),r=0;r<_.length;r++)t=_[r].k.charAt(0),n.charAt(n.length-1)!==t&&(n+=t);return"DGBEFHACIJK"!==n}}));n({target:"Array",proto:!0,forced:x||!k||!S||!j},{sort:function(t){void 0!==t&&o(t);var e=c(this);if(j)return void 0===t?F.call(e):F.call(e,t);var r,n,m=[],d=l(e);for(n=0;n<d;n++)n in e&&m.push(e[n]);for(m=h(m,function(t){return function(e,r){return void 0===r?-1:void 0===e?1:void 0!==t?+t(e,r)||0:f(e)>f(r)?1:-1}}(t)),r=m.length,n=0;n<r;)e[n]=m[n++];for(;n<d;)delete e[n++];return e}})},309:function(t,e){var r=Math.floor,n=function(t,e){var l=t.length,f=r(l/2);return l<8?o(t,e):c(n(t.slice(0,f),e),n(t.slice(f),e),e)},o=function(t,e){for(var element,r,n=t.length,i=1;i<n;){for(r=i,element=t[i];r&&e(t[r-1],element)>0;)t[r]=t[--r];r!==i++&&(t[r]=element)}return t},c=function(t,e,r){for(var n=t.length,o=e.length,c=0,l=0,f=[];c<n||l<o;)c<n&&l<o?f.push(r(t[c],e[l])<=0?t[c++]:e[l++]):f.push(c<n?t[c++]:e[l++]);return f};t.exports=n},310:function(t,e,r){var n=r(60).match(/firefox\/(\d+)/i);t.exports=!!n&&+n[1]},311:function(t,e,r){var n=r(60);t.exports=/MSIE|Trident/.test(n)},312:function(t,e,r){var n=r(60).match(/AppleWebKit\/(\d+)\./);t.exports=!!n&&+n[1]},313:function(t,e,r){var n=r(2),o=r(197).values;n({target:"Object",stat:!0},{values:function(t){return o(t)}})},314:function(t,e,r){"use strict";r(299)},315:function(t,e,r){var n=r(32)(!1);n.push([t.i,".chartPanel[data-v-2b5033bc]{padding:1.5rem;border-radius:.5rem;box-shadow:0 2px 4px rgba(0,0,0,.12)}.chartPanel__title[data-v-2b5033bc]{font-size:1.5rem;color:#49591c}.chartPanel__audit[data-v-2b5033bc]{color:#49591c}.chartPanel+.chartPanel[data-v-2b5033bc]{margin-top:1.5rem}",""]),t.exports=n},322:function(t,e,r){var content=r(330);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(33).default)("7c287b18",content,!0,{sourceMap:!1})},329:function(t,e,r){"use strict";r(322)},330:function(t,e,r){var n=r(32)(!1);n.push([t.i,"",""]),t.exports=n},339:function(t,e,r){"use strict";r.r(e);var n=r(300),o=r(302),c={mixins:[Object(o.a)(n.d,"員工薪資")],computed:{c3Config:function(){return{data:{x:"x",columns:this.dumpSubCatStats(),type:"line"},ppoint:{r:6},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{label:this.measureMap.平均薪資.unit,tick:{format:this.genYFormatter(!0)}}}}}}},l=(r(329),r(47)),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("chart-panel",{attrs:{title:"員工薪資",unit:"仟元","c3-config":t.c3Config}})}),[],!1,null,"d69d0970",null);e.default=component.exports;installComponents(component,{ChartPanel:r(301).default})}}]);