(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{318:function(t,e,n){"use strict";(function(t){n.d(e,"a",(function(){return l}));var r=n(17),c=(n(104),n(27),n(41),n(11),n(79),n(61),"ESG 檢測儀：我們與永續轉型的距離");function o(t,content){var e,n=t.startsWith("og:")?"property":"name";return e={hid:t},Object(r.a)(e,n,t),Object(r.a)(e,"content",content),e}function l(e){var title=e.title,n=e.description,r=e.coverUrl,l=t.env.SITE_URL||"https://gcaa-org-tw.github.io/thaubing-esg";function f(t){return"string"==typeof t?t:"function"==typeof t?t.call(this):t.toString()}return function(){var t=f.bind(this),head={meta:[]},e="".concat(t(title=title||"")),m=e?"".concat(e," | ").concat(c):c;if(head.title=m,head.meta.push(o("og:title",m)),head.meta.push(o("twitter:title",m)),n){var h=t(n);head.meta.push(o("description",h)),head.meta.push(o("og:description",h)),head.meta.push(o("twitter:description",h))}if(r){var d=t(r);d&&(d.startsWith("/")?d="".concat(l).concat(d):d.startsWith("http")||(d="".concat(l,"/").concat(d)),head.meta.push(o("og:image",d)),head.meta.push(o("twitter:image",d)),head.meta.push(o("twitter:card","summary_large_image")))}if(this&&(title||n||r)){var v="".concat(l).concat(this.$route.path);head.meta.push(o("og:url",v))}return head}}}).call(this,n(134))},319:function(t,e,n){t.exports=n.p+"img/tree-bg.e3b5496.png"},320:function(t,e,n){var content=n(325);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(33).default)("cbe21e36",content,!0,{sourceMap:!1})},321:function(t,e,n){var content=n(327);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(33).default)("7c287b18",content,!0,{sourceMap:!1})},322:function(t,e,n){var content=n(329);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(33).default)("0ab0c482",content,!0,{sourceMap:!1})},324:function(t,e,n){"use strict";n(320)},325:function(t,e,n){var r=n(32)(!1);r.push([t.i,".chartPanel[data-v-78344390]  .c3-chart-line .c3-line{stroke-width:3px}",""]),t.exports=r},326:function(t,e,n){"use strict";n(321)},327:function(t,e,n){var r=n(32)(!1);r.push([t.i,"",""]),t.exports=r},328:function(t,e,n){"use strict";n(322)},329:function(t,e,n){var r=n(32)(!1);r.push([t.i,".chartPanel[data-v-4c988aa7]  .c3-chart-line .c3-line{stroke-width:3px}",""]),t.exports=r},331:function(t,e,n){var content=n(343);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(33).default)("78e1a788",content,!0,{sourceMap:!1})},334:function(t,e,n){"use strict";n.r(e);var r=n(300),c=n(302),o={mixins:[Object(c.a)(r.b,"環境違規")],computed:{c3Config:function(){return{data:{x:"x",columns:this.dumpSubCatStats(),type:"bar",types:{"違反環境法規次數":"line"},axes:{"違反環境法規金額":"y","違反環境法規次數":"y2"},colors:{"違反環境法規次數":"#555"}},point:{r:6},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{label:this.measureMap.違反環境法規金額.unit,tick:{format:this.genYFormatter()}},y2:{show:!0,label:this.measureMap.違反環境法規次數.unit,tick:{format:this.genYFormatter()}}}}}}},l=(n(324),n(47)),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("chart-panel",{attrs:{title:"違反環境法規",unit:["金額","次數"],"c3-config":t.c3Config}})}),[],!1,null,"78344390",null);e.default=component.exports;installComponents(component,{ChartPanel:n(301).default})},335:function(t,e,n){"use strict";n.r(e);var r=n(300),c=n(302),o={mixins:[Object(c.a)(r.b,"空氣污染物申報")],computed:{c3Config:function(){return{data:{x:"x",columns:this.dumpSubCatStats()},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{tick:{format:this.genYFormatter()}}}}}}},l=n(47),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("chart-panel",{attrs:{title:"空氣污染物","c3-config":t.c3Config}})}),[],!1,null,"7da437dd",null);e.default=component.exports;installComponents(component,{ChartPanel:n(301).default})},336:function(t,e,n){"use strict";n.r(e);var r=n(300),c=n(302),o={mixins:[Object(c.a)(r.d,"員工薪資")],computed:{c3Config:function(){return{data:{x:"x",columns:this.dumpSubCatStats(),type:"line"},ppoint:{r:6},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{label:this.measureMap.平均薪資.unit,tick:{format:this.genYFormatter(!0)}}}}}}},l=(n(326),n(47)),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("chart-panel",{attrs:{title:"員工薪資",unit:"仟元","c3-config":t.c3Config}})}),[],!1,null,"d69d0970",null);e.default=component.exports;installComponents(component,{ChartPanel:n(301).default})},337:function(t,e,n){"use strict";n.r(e);var r=n(300),c=n(302),o={mixins:[Object(c.a)(r.c,"營運狀況")],computed:{c3Config:function(){return{data:{x:"x",columns:this.dumpSubCatStats(),type:"bar",groups:[["營業成本","營業費用"]],types:{"淨利":"line"},axes:{"營業成本":"y","營業費用":"y","營業收入":"y","淨利":"y2"},colors:{"碳密集度":"#555"}},point:{r:6},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{label:this.measureMap.營業收入.unit,tick:{format:this.genYFormatter(!0)}},y2:{show:!0,label:this.measureMap.淨利.unit,tick:{format:this.genYFormatter(!0)}}}}}}},l=(n(328),n(47)),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("chart-panel",{attrs:{title:"營運狀況",unit:"仟元","c3-config":t.c3Config}})}),[],!1,null,"4c988aa7",null);e.default=component.exports;installComponents(component,{ChartPanel:n(301).default})},340:function(t,e,n){var r=n(2),c=n(341);r({target:"Number",stat:!0,forced:Number.parseInt!=c},{parseInt:c})},341:function(t,e,n){var r=n(4),c=n(3),o=n(9),l=n(195).trim,f=n(132),m=r.parseInt,h=r.Symbol,d=h&&h.iterator,v=/^[+-]?0[Xx]/,y=8!==m(f+"08")||22!==m(f+"0x16")||d&&!c((function(){m(Object(d))}));t.exports=y?function(t,e){var n=l(o(t));return m(n,e>>>0||(v.test(n)?16:10))}:m},342:function(t,e,n){"use strict";n(331)},343:function(t,e,n){var r=n(32),c=n(199),o=n(319),l=r(!1),f=c(o);l.push([t.i,".company__nav[data-v-0ccdc333]{background-image:url("+f+")}.company__subtitle[data-v-0ccdc333]{margin:3.25rem 0 1rem;color:#373737}",""]),t.exports=l},366:function(t,e,n){"use strict";n.r(e);var r=n(8),c=(n(50),n(200),n(340),n(303),n(318)),o={asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,c,o,l,f;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$content,r=t.params,c=t.redirect,e.prev=1,e.next=4,n("company",r.company).fetch();case 4:return o=e.sent,e.next=7,n("companyList").fetch();case 7:l=e.sent,e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),c("/");case 13:if(o){e.next=15;break}return e.abrupt("return");case 15:return f=l.body.find((function(t){return t.公司簡稱===r.company})),e.abrupt("return",{stats:o,company:f});case 17:case"end":return e.stop()}}),e,null,[[1,10]])})))()},head:Object(c.a)({title:function(){return this.$route.params.company}}),computed:{capital:function(){var t=this.stats.body.reduce((function(t,e){return"資本額"===e.項目&&e.年份>t.年份?e:t}),{"年份":"1970"});return Number.parseInt(t.數值).toLocaleString()||"？"}}},l=(n(342),n(47)),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"company"},[n("div",{staticClass:"company__nav pv3 no-repeat cover"},[n("div",{staticClass:"mw8 ph3 flex justify-between center"},[n("nuxt-link",{staticClass:"f3 fw5 white",attrs:{to:"/"}},[t._v("ESG 檢測儀")]),n("nuxt-link",{staticClass:"white dim",attrs:{to:"/about"}},[t._v("關於計畫")])],1)]),n("div",{staticClass:"mw8 center mt4 mb5 ph3"},[n("h1",{staticClass:"green fw5 f3"},[t._v(t._s(t.company.公司名稱))]),n("div",{staticClass:"green"},[t._v(t._s(t.company.自訂產業別)+" · 資本額 "+t._s(t.capital))]),n("div",{staticClass:"company__subtitle"},[t._v("Environment 環境保護相關數據")]),n("gh-gas-chart",{attrs:{stats:t.stats.body}}),n("penalty-chart",{attrs:{stats:t.stats.body}}),n("air-pollution-chart",{attrs:{stats:t.stats.body}}),n("div",{staticClass:"company__subtitle"},[t._v("Social 社會責任相關數據")]),n("salary-chart",{attrs:{stats:t.stats.body}}),n("div",{staticClass:"company__subtitle"},[t._v("Governance 治理相關數據")]),n("income-chart",{attrs:{stats:t.stats.body}})],1)])}),[],!1,null,"0ccdc333",null);e.default=component.exports;installComponents(component,{GhGasChart:n(363).default,PenaltyChart:n(334).default,AirPollutionChart:n(335).default,SalaryChart:n(336).default,IncomeChart:n(337).default})}}]);