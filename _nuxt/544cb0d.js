(window.webpackJsonp=window.webpackJsonp||[]).push([[9,3,4,5,6,7],{299:function(t,e,r){var content=r(315);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(33).default)("1e045332",content,!0,{sourceMap:!1})},300:function(t,e,r){"use strict";r.d(e,"b",(function(){return c})),r.d(e,"c",(function(){return l})),r.d(e,"d",(function(){return o}));var n=r(79),c=(r(61),[{subCat:"溫室氣體排放",measure:"範疇一直接排放",unit:"公噸CO2e"},{subCat:"溫室氣體排放",measure:"範疇二間接排放",unit:"公噸CO2e"},{subCat:"溫室氣體排放",measure:"碳密集度",unit:"公噸CO2e/億元"},{subCat:"能源使用",measure:"總用電量",isFake:!0},{subCat:"能源使用",measure:"再生能源用電量",isFake:!0},{subCat:"用水",measure:"用水量取水量",isFake:!0},{subCat:"廢棄物管理",measure:"廢棄物項目及量",isFake:!0}].concat(Object(n.a)([{subCat:"污染管理",measure:"空氣污染物",unit:""}]),[{subCat:"污染管理",measure:"排放水量",isFake:!0},{subCat:"污染管理",measure:"違反環境法規金額",isFake:!0},{subCat:"污染管理",measure:"違反環境法規次數",isFake:!0}])),o=[{subCat:"員工數",measure:"性別比",isFake:!0},{subCat:"員工數",measure:"本外勞比",isFake:!0},{subCat:"員工數",measure:"身障聘用",isFake:!0},{subCat:"員工數",measure:"原民聘用",isFake:!0},{subCat:"員工數",measure:"新進率／離職率",isFake:!0},{subCat:"員工薪資",measure:"平均薪資",unit:"仟元"},{subCat:"員工薪資",measure:"薪資中位數",unit:"仟元"},{subCat:"",measure:"工時",isFake:!0},{subCat:"",measure:"違反勞動法規紀錄",isFake:!0},{subCat:"職業健康與安全",measure:"重大職災",isFake:!0},{subCat:"職業健康與安全",measure:"工安事故",isFake:!0}],l=[{subCat:"",measure:"資本額",unit:"元"},{subCat:"是否產製CSR報告",measure:"是否揭露不利資訊",isFake:!0},{subCat:"收入、成本與淨利",measure:"營業收入",unit:"仟元"},{subCat:"收入、成本與淨利",measure:"營業成本",unit:"仟元"},{subCat:"收入、成本與淨利",measure:"營業費用",unit:"仟元"},{subCat:"收入、成本與淨利",measure:"淨利",unit:"仟元"},{subCat:"稅務透明度",measure:"租稅減免",isFake:!0},{subCat:"稅務透明度",measure:"補助、補貼",isFake:!0},{subCat:"",measure:"ISO認證",isFake:!0}];e.a={environment:c,governance:l,social:o}},301:function(t,e,r){"use strict";var n=r(10),c=r(4),o=r(103),l=r(16),f=r(13),m=r(198),d=r(102),h=r(196),v=r(3),C=r(77).f,y=r(36).f,_=r(15).f,x=r(304),O=r(195).trim,k="Number",j=c.Number,w=j.prototype,S=function(t){var e=h(t,"number");return"bigint"==typeof e?e:F(e)},F=function(t){var e,r,n,c,o,l,f,code,m=h(t,"number");if(d(m))throw TypeError("Cannot convert a Symbol value to a number");if("string"==typeof m&&m.length>2)if(43===(e=(m=O(m)).charCodeAt(0))||45===e){if(88===(r=m.charCodeAt(2))||120===r)return NaN}else if(48===e){switch(m.charCodeAt(1)){case 66:case 98:n=2,c=49;break;case 79:case 111:n=8,c=55;break;default:return+m}for(l=(o=m.slice(2)).length,f=0;f<l;f++)if((code=o.charCodeAt(f))<48||code>c)return NaN;return parseInt(o,n)}return+m};if(o(k,!j(" 0o1")||!j("0b1")||j("+0x1"))){for(var E,I=function(t){var e=arguments.length<1?0:j(S(t)),r=this;return r instanceof I&&v((function(){x(r)}))?m(Object(e),r,I):e},N=n?C(j):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),A=0;N.length>A;A++)f(j,E=N[A])&&!f(I,E)&&_(I,E,y(j,E));I.prototype=w,w.constructor=I,l(c,k,I)}},302:function(t,e,r){"use strict";r.r(e);r(101);var n={props:{title:{type:String,required:!0},unit:{type:[String,Array],required:!0},isSrcAudited:{type:Boolean,default:!0},tips:{type:String,default:""},c3Config:{type:Object,default:function(){return{}}}},computed:{unitStr:function(){return Array.isArray(this.unit)?this.unit.join(" · "):this.unit}}},c=(r(314),r(47)),component=Object(c.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"chartPanel bg-white"},[r("div",{staticClass:"flex justify-between items-start mb1"},[r("div",{staticClass:"chartPanel__title fw6"},[t._v(t._s(t.title))]),t.isSrcAudited?r("div",{staticClass:"chartPanel__audit"},[t._v("來自政府、官方報告")]):r("div",{staticClass:"chartPanel__audit"},[t._v("來自企業 CSR 報告")])]),r("div",{staticClass:"mb3 pb2"},[t._v("單位："+t._s(t.unitStr))]),r("chart-content",{attrs:{config:t.c3Config}}),t.tips?r("div",{staticClass:"chartPanel__tips mt2"},[t._v(t._s(t.tips))]):t._e()],1)}),[],!1,null,"d884080e",null);e.default=component.exports;installComponents(component,{ChartContent:r(303).default})},303:function(t,e,r){"use strict";r.r(e);r(35),r(27),r(34),r(48),r(26),r(49);var n=r(17);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function o(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var l={props:{config:{type:Object,required:!0}},data:function(){return{c3Handler:null}},mounted:function(){if(this.config.data){var t=r(316);this.c3Handler=t.generate(o(o({},this.config),{},{bindto:this.$refs.chart}))}}},f=r(47),component=Object(f.a)(l,(function(){var t=this.$createElement;return(this._self._c||t)("div",{ref:"chart",staticClass:"chartContent"})}),[],!1,null,null,null);e.default=component.exports},304:function(t,e){var r=1..valueOf;t.exports=function(t){return r.call(t)}},305:function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));r(34),r(35),r(26),r(306),r(301),r(308),r(313);var n=r(322);function c(t,e){return{props:{stats:{type:Array,required:!0}},computed:{measureMap:function(){return t.filter((function(t){return t.subCat===e})).reduce((function(map,t){return map[t.measure]=t,map}),{})}},methods:{genYFormatter:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=t?"$,d":",d";return Object(n.format)(e)},dumpSubCatStats:function(){var t={x:["x"]},r=Object.keys(this.measureMap);r.forEach((function(e){t[e]=[e]}));var n={};return this.stats.forEach((function(t){if(t.子分類===e){var r=t.年份;n[r]||(n[r]={}),n[r][t.項目]=Number.parseFloat(t.數值)}})),Object.keys(n).sort().forEach((function(e){t.x.push(new Date("".concat(e,"-01-01")));var c=n[e];r.forEach((function(e){t[e].push(c[e]||null)}))})),Object.values(t)}}}}},306:function(t,e,r){var n=r(2),c=r(307);n({target:"Number",stat:!0,forced:Number.parseFloat!=c},{parseFloat:c})},307:function(t,e,r){var n=r(4),c=r(3),o=r(9),l=r(195).trim,f=r(132),m=n.parseFloat,d=n.Symbol,h=d&&d.iterator,v=1/m(f+"-0")!=-1/0||h&&!c((function(){m(Object(h))}));t.exports=v?function(t){var e=l(o(t)),r=m(e);return 0===r&&"-"==e.charAt(0)?-0:r}:m},308:function(t,e,r){"use strict";var n=r(2),c=r(62),o=r(21),l=r(39),f=r(9),m=r(3),d=r(309),h=r(133),v=r(310),C=r(311),y=r(76),_=r(312),x=[],O=x.sort,k=m((function(){x.sort(void 0)})),j=m((function(){x.sort(null)})),w=h("sort"),S=!m((function(){if(y)return y<70;if(!(v&&v>3)){if(C)return!0;if(_)return _<603;var code,t,e,r,n="";for(code=65;code<76;code++){switch(t=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:e=3;break;case 68:case 71:e=4;break;default:e=2}for(r=0;r<47;r++)x.push({k:t+r,v:e})}for(x.sort((function(a,b){return b.v-a.v})),r=0;r<x.length;r++)t=x[r].k.charAt(0),n.charAt(n.length-1)!==t&&(n+=t);return"DGBEFHACIJK"!==n}}));n({target:"Array",proto:!0,forced:k||!j||!w||!S},{sort:function(t){void 0!==t&&c(t);var e=o(this);if(S)return void 0===t?O.call(e):O.call(e,t);var r,n,m=[],h=l(e);for(n=0;n<h;n++)n in e&&m.push(e[n]);for(m=d(m,function(t){return function(e,r){return void 0===r?-1:void 0===e?1:void 0!==t?+t(e,r)||0:f(e)>f(r)?1:-1}}(t)),r=m.length,n=0;n<r;)e[n]=m[n++];for(;n<h;)delete e[n++];return e}})},309:function(t,e){var r=Math.floor,n=function(t,e){var l=t.length,f=r(l/2);return l<8?c(t,e):o(n(t.slice(0,f),e),n(t.slice(f),e),e)},c=function(t,e){for(var element,r,n=t.length,i=1;i<n;){for(r=i,element=t[i];r&&e(t[r-1],element)>0;)t[r]=t[--r];r!==i++&&(t[r]=element)}return t},o=function(t,e,r){for(var n=t.length,c=e.length,o=0,l=0,f=[];o<n||l<c;)o<n&&l<c?f.push(r(t[o],e[l])<=0?t[o++]:e[l++]):f.push(o<n?t[o++]:e[l++]);return f};t.exports=n},310:function(t,e,r){var n=r(60).match(/firefox\/(\d+)/i);t.exports=!!n&&+n[1]},311:function(t,e,r){var n=r(60);t.exports=/MSIE|Trident/.test(n)},312:function(t,e,r){var n=r(60).match(/AppleWebKit\/(\d+)\./);t.exports=!!n&&+n[1]},313:function(t,e,r){var n=r(2),c=r(197).values;n({target:"Object",stat:!0},{values:function(t){return c(t)}})},314:function(t,e,r){"use strict";r(299)},315:function(t,e,r){var n=r(32)(!1);n.push([t.i,".chartPanel[data-v-d884080e]{padding:1.5rem;border-radius:.5rem;box-shadow:0 2px 4px rgba(0,0,0,.12)}.chartPanel__title[data-v-d884080e]{font-size:1.5rem;color:#49591c}.chartPanel__audit[data-v-d884080e]{color:#49591c}",""]),t.exports=n},317:function(t,e,r){"use strict";(function(t){r.d(e,"a",(function(){return l}));var n=r(17),c=(r(104),r(27),r(40),r(11),r(78),r(61),"ESG 檢測儀：我們與永續轉型的距離");function o(t,content){var e,r=t.startsWith("og:")?"property":"name";return e={hid:t},Object(n.a)(e,r,t),Object(n.a)(e,"content",content),e}function l(e){var title=e.title,r=e.description,n=e.coverUrl,l=t.env.SITE_URL||"https://gcaa-org-tw.github.io/thaubing-esg";function f(t){return"string"==typeof t?t:"function"==typeof t?t.call(this):t.toString()}return function(){var t=f.bind(this),head={meta:[]},e="".concat(t(title=title||"")),m=e?"".concat(e," | ").concat(c):c;if(head.title=m,head.meta.push(o("og:title",m)),head.meta.push(o("twitter:title",m)),r){var d=t(r);head.meta.push(o("description",d)),head.meta.push(o("og:description",d)),head.meta.push(o("twitter:description",d))}if(n){var h=t(n);h&&(h.startsWith("/")?h="".concat(l).concat(h):h.startsWith("http")||(h="".concat(l,"/").concat(h)),head.meta.push(o("og:image",h)),head.meta.push(o("twitter:image",h)),head.meta.push(o("twitter:card","summary_large_image")))}if(this&&(title||r||n)){var v="".concat(l).concat(this.$route.path);head.meta.push(o("og:url",v))}return head}}}).call(this,r(134))},318:function(t,e,r){t.exports=r.p+"img/tree-bg.e3b5496.png"},319:function(t,e,r){var content=r(325);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(33).default)("28a1d65a",content,!0,{sourceMap:!1})},320:function(t,e,r){var content=r(327);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(33).default)("7c287b18",content,!0,{sourceMap:!1})},321:function(t,e,r){var content=r(329);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(33).default)("1c58c81c",content,!0,{sourceMap:!1})},324:function(t,e,r){"use strict";r(319)},325:function(t,e,r){var n=r(32)(!1);n.push([t.i,".chartPanel[data-v-f917f156]  .c3-chart-line .c3-line{stroke-width:3px}",""]),t.exports=n},326:function(t,e,r){"use strict";r(320)},327:function(t,e,r){var n=r(32)(!1);n.push([t.i,"",""]),t.exports=n},328:function(t,e,r){"use strict";r(321)},329:function(t,e,r){var n=r(32)(!1);n.push([t.i,".chartPanel[data-v-625bb501]  .c3-chart-line .c3-line{stroke-width:3px}",""]),t.exports=n},331:function(t,e,r){var content=r(341);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(33).default)("6080006e",content,!0,{sourceMap:!1})},333:function(t,e,r){"use strict";r.r(e);var n=r(300),c=r(305),o={mixins:[Object(c.a)(n.b,"溫室氣體排放")],computed:{c3Config:function(){return{data:{x:"x",columns:this.dumpSubCatStats(),type:"bar",groups:[["範疇一直接排放","範疇二間接排放"]],types:{"碳密集度":"line"},axes:{"範疇一直接排放":"y","範疇二間接排放":"y","碳密集度":"y2"},colors:{"碳密集度":"#555"}},point:{r:6},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{label:this.measureMap.範疇二間接排放.unit,tick:{format:this.genYFormatter()}},y2:{show:!0,label:this.measureMap.碳密集度.unit,tick:{format:this.genYFormatter()}}}}}}},l=(r(324),r(47)),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("chart-panel",{attrs:{title:"溫室氣體排放",unit:["公噸CO2e","公噸/億元"],"c3-config":t.c3Config}})}),[],!1,null,"f917f156",null);e.default=component.exports;installComponents(component,{ChartPanel:r(302).default})},334:function(t,e,r){"use strict";r.r(e);var n=r(300),c=r(305),o={mixins:[Object(c.a)(n.d,"員工薪資")],computed:{c3Config:function(){return{data:{x:"x",columns:this.dumpSubCatStats(),type:"line"},ppoint:{r:6},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{label:this.measureMap.平均薪資.unit,tick:{format:this.genYFormatter(!0)}}}}}}},l=(r(326),r(47)),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("chart-panel",{attrs:{title:"員工薪資",unit:"仟元","c3-config":t.c3Config}})}),[],!1,null,"d69d0970",null);e.default=component.exports;installComponents(component,{ChartPanel:r(302).default})},335:function(t,e,r){"use strict";r.r(e);var n=r(300),c=r(305),o={mixins:[Object(c.a)(n.c,"收入、成本與淨利")],computed:{c3Config:function(){return{data:{x:"x",columns:this.dumpSubCatStats(),type:"bar",groups:[["營業成本","營業費用"]],types:{"淨利":"line"},axes:{"營業成本":"y","營業費用":"y","營業收入":"y","淨利":"y2"},colors:{"碳密集度":"#555"}},point:{r:6},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{label:this.measureMap.營業收入.unit,tick:{format:this.genYFormatter(!0)}},y2:{show:!0,label:this.measureMap.淨利.unit,tick:{format:this.genYFormatter(!0)}}}}}}},l=(r(328),r(47)),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("chart-panel",{attrs:{title:"收入、成本與淨利",unit:"仟元","c3-config":t.c3Config}})}),[],!1,null,"625bb501",null);e.default=component.exports;installComponents(component,{ChartPanel:r(302).default})},338:function(t,e,r){var n=r(2),c=r(339);n({target:"Number",stat:!0,forced:Number.parseInt!=c},{parseInt:c})},339:function(t,e,r){var n=r(4),c=r(3),o=r(9),l=r(195).trim,f=r(132),m=n.parseInt,d=n.Symbol,h=d&&d.iterator,v=/^[+-]?0[Xx]/,C=8!==m(f+"08")||22!==m(f+"0x16")||h&&!c((function(){m(Object(h))}));t.exports=C?function(t,e){var r=l(o(t));return m(r,e>>>0||(v.test(r)?16:10))}:m},340:function(t,e,r){"use strict";r(331)},341:function(t,e,r){var n=r(32),c=r(199),o=r(318),l=n(!1),f=c(o);l.push([t.i,".company__nav[data-v-7b8e3271]{background-image:url("+f+")}.company__subtitle[data-v-7b8e3271]{margin:3.25rem 0 1rem;color:#373737}",""]),t.exports=l},360:function(t,e,r){"use strict";r.r(e);var n=r(8),c=(r(50),r(200),r(338),r(301),r(317)),o={asyncData:function(t){return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,c,o,l,f;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.$content,n=t.params,c=t.redirect,e.prev=1,e.next=4,r("company",n.company).fetch();case 4:return o=e.sent,e.next=7,r("companyList").fetch();case 7:l=e.sent,e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),c("/");case 13:if(o){e.next=15;break}return e.abrupt("return");case 15:return f=l.body.find((function(t){return t.公司簡稱===n.company})),e.abrupt("return",{stats:o,company:f});case 17:case"end":return e.stop()}}),e,null,[[1,10]])})))()},head:Object(c.a)({title:function(){return this.$route.params.company}}),computed:{capital:function(){var t=this.stats.body.reduce((function(t,e){return"資本額"===e.項目&&e.年份>t.年份?e:t}),{"年份":"1970"});return Number.parseInt(t.數值).toLocaleString()||"？"}}},l=(r(340),r(47)),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"company"},[r("div",{staticClass:"company__nav pv3 no-repeat cover"},[r("div",{staticClass:"mw8 flex justify-between center"},[r("nuxt-link",{staticClass:"f3 fw5 white",attrs:{to:"/"}},[t._v("ESG 檢測儀")]),r("nuxt-link",{staticClass:"white dim",attrs:{to:"/about"}},[t._v("關於計畫")])],1)]),r("div",{staticClass:"mw8 center mt4 mb5"},[r("h1",{staticClass:"green fw5 f3"},[t._v(t._s(t.company.公司名稱))]),r("div",{staticClass:"green"},[t._v(t._s(t.company.自訂產業別)+" · 資本額 "+t._s(t.capital))]),r("div",{staticClass:"company__subtitle"},[t._v("Environment 環境保護相關數據")]),r("gh-gas-chart",{attrs:{stats:t.stats.body}}),r("div",{staticClass:"company__subtitle"},[t._v("Social 社會責任相關數據")]),r("salary-chart",{attrs:{stats:t.stats.body}}),r("div",{staticClass:"company__subtitle"},[t._v("Governance 治理相關數據")]),r("income-chart",{attrs:{stats:t.stats.body}})],1)])}),[],!1,null,"7b8e3271",null);e.default=component.exports;installComponents(component,{GhGasChart:r(333).default,SalaryChart:r(334).default,IncomeChart:r(335).default})}}]);