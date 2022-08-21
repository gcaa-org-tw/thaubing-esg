(window.webpackJsonp=window.webpackJsonp||[]).push([[2,12,13],{378:function(t,e,r){"use strict";r.d(e,"b",(function(){return c})),r.d(e,"c",(function(){return f})),r.d(e,"d",(function(){return l}));var n=r(97),o=(r(64),r(53),r(36),r(13),r(413)),c=[{subCat:"溫室氣體排放",measure:"範疇一直接排放",unit:"公噸CO2e",toFixed:2},{subCat:"溫室氣體排放",measure:"範疇二間接排放",unit:"公噸CO2e",toFixed:2},{subCat:"溫室氣體排放",measure:"直接＋間接排放",unit:"公噸CO2e",toFixed:2},{subCat:"溫室氣體排放",measure:"範疇一直接排放",isSelfReport:!0,unit:"公噸CO2e",toFixed:2},{subCat:"溫室氣體排放",measure:"範疇二間接排放",isSelfReport:!0,unit:"公噸CO2e",toFixed:2},{subCat:"溫室氣體排放",measure:"範疇三其他排放",isSelfReport:!0,unit:"公噸CO2e",toFixed:2},{subCat:"溫室氣體排放",measure:"直接＋間接排放",isSelfReport:!0,unit:"公噸CO2e",toFixed:2},{subCat:"溫室氣體排放",measure:"碳密集度",isSelfReport:!0,unit:"公噸CO2e/億元",toFixed:2},{subCat:"溫室氣體排放",measure:"碳定價",isSelfReport:!0,isFake:!0},{subCat:"能源使用狀況",measure:"總用電量",unit:"度",isSelfReport:!0},{subCat:"能源使用狀況",measure:"再生能源設置量",unit:"KW",isSelfReport:!0},{subCat:"能源使用狀況",measure:"再生能源發電量",unit:"度",isSelfReport:!0},{subCat:"能源使用狀況",measure:"能源密集度",unit:"度/億元",isSelfReport:!0},{subCat:"水資源",measure:"總取水量",unit:"噸",isSelfReport:!0},{subCat:"水資源",measure:"回收水量",unit:"噸",isSelfReport:!0},{subCat:"水資源",measure:"耗用水量",unit:"噸",isSelfReport:!0},{subCat:"水資源",measure:"排放水量",unit:"噸",isSelfReport:!0}].concat(Object(n.a)(o.filter((function(t){return t.subCat})).map((function(t){return{subCat:"空氣污染物申報-".concat(t.subCat),measure:t.label,unit:t.unit,toFixed:2,isAirPollution:!0}}))),[{subCat:"廢棄物管理",measure:"一般事業廢棄物",unit:"噸",isSelfReport:!0},{subCat:"廢棄物管理",measure:"有害事業廢棄物",unit:"噸",isSelfReport:!0},{subCat:"廢棄物管理",measure:"資源化再利用",unit:"噸",isSelfReport:!0},{subCat:"毒化物申報",measure:"毒化物",isFake:!0},{subCat:"環境違規",measure:"違反環境法規金額",unit:"元"},{subCat:"環境違規",measure:"違反環境法規金額-空氣",unit:"元",onlyDetail:!0},{subCat:"環境違規",measure:"違反環境法規金額-水",unit:"元",onlyDetail:!0},{subCat:"環境違規",measure:"違反環境法規金額-misc",unit:"元",onlyDetail:!0},{subCat:"環境違規",measure:"違反環境法規次數",unit:"次"}]),l=[{subCat:"員工組成",measure:"正式員工",isSelfReport:!0,unit:"人"},{subCat:"員工組成",measure:"性別比",isSelfReport:!0,unit:"男/女"},{subCat:"員工組成",measure:"新進率",isSelfReport:!0,unit:""},{subCat:"員工組成",measure:"離職率",isSelfReport:!0,unit:""},{subCat:"員工組成",measure:"是否聘用移工",isSelfReport:!0,unit:"人"},{subCat:"員工組成",measure:"是否聘用身障人士",isSelfReport:!0,unit:"人"},{subCat:"員工組成",measure:"是否聘用原住民",isSelfReport:!0,unit:"人"},{subCat:"員工薪資",measure:"平均薪資",unit:"仟元"},{subCat:"員工薪資",measure:"薪資中位數",unit:"仟元"},{subCat:"勞動違規",measure:"違反勞動法規紀錄",isFake:!0},{subCat:"職業健康",measure:"職災事故",isSelfReport:!0},{subCat:"職業健康",measure:"工安意外",isSelfReport:!0}],f=[{subCat:"資本額",measure:"資本額",unit:"元"},{subCat:"營運狀況",measure:"營業收入",unit:"仟元"},{subCat:"營運狀況",measure:"營業成本",unit:"仟元"},{subCat:"營運狀況",measure:"營業費用",unit:"仟元"},{subCat:"營運狀況",measure:"淨利",unit:"仟元"},{subCat:"是否產製CSR報告",measure:"是否編撰報告書",isSelfReport:!0},{subCat:"稅務透明度",measure:"營利事業所得稅稅額",isSelfReport:!0,unit:"元"},{subCat:"稅務透明度",measure:"政府補助、補貼金額",isSelfReport:!0,unit:"元"},{subCat:"稅務透明度",measure:"研發投入費用",isSelfReport:!0,unit:"元"},{subCat:"ISO認證",measure:"ISO 9001",isSelfReport:!0},{subCat:"ISO認證",measure:"ISO 14001",isSelfReport:!0},{subCat:"ISO認證",measure:"ISO 45001",isSelfReport:!0},{subCat:"ISO認證",measure:"ISO 50001",isSelfReport:!0}];e.a={environment:c,governance:f,social:l}},379:function(t,e,r){"use strict";r.r(e);r(133);var n={props:{title:{type:String,required:!0},unit:{type:[String,Array],default:""},isSelfReport:{type:Boolean,default:!1},tips:{type:String,default:""},c3Config:{type:Object,default:function(){return{}}}},computed:{unitStr:function(){return Array.isArray(this.unit)?this.unit.join(" · "):this.unit}}},o=(r(411),r(39)),component=Object(o.a)(n,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"chartPanel bg-white h-100"},[e("div",{staticClass:"flex justify-between items-start mb1"},[e("div",{staticClass:"chartPanel__title fw5"},[t._v(t._s(t.title))]),t.isSelfReport?e("div",{staticClass:"chartPanel__audit"},[t._v("來自企業 CSR 報告")]):e("div",{staticClass:"chartPanel__audit"},[t._v("來自政府、官方報告")])]),e("div",{staticClass:"mb3 pb2"},[t.unit?e("span",[t._v("單位："+t._s(t.unitStr))]):t._e()]),t._t("chart",(function(){return[e("chart-content",{attrs:{config:t.c3Config}})]})),t.tips?e("div",{staticClass:"chartPanel__tips mt2"},[t._v(t._s(t.tips))]):t._e()],2)}),[],!1,null,"35e0919d",null);e.default=component.exports;installComponents(component,{ChartContent:r(408).default})},380:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));r(36),r(13),r(37),r(29),r(414),r(381),r(382),r(383);var n=r(393);function o(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;if("string"==typeof e){var o=e;e=function(t){return t.subCat===o&&t.isSelfReport===r}}return{props:{stats:{type:Array,required:!0}},computed:{measureMap:function(){return t.filter(e).reduce((function(map,t){return map[t.measure]=t,map}),{})}},methods:{genYFormatter:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=t?"$,d":",d";return Object(n.format)(e)},dumpSubCatStats:function(){var t=this,e={x:["x"]},r=Object.keys(this.measureMap);r.forEach((function(t){e[t]=[t]}));var n={};return this.stats.forEach((function(e){if(e.項目 in t.measureMap&&!!t.measureMap[e.項目].isSelfReport==!!e.來自公司報告){var r=e.年份;n[r]||(n[r]={}),n[r][e.項目]=Number.parseFloat(e.數值)}})),Object.keys(n).sort().forEach((function(t){e.x.push(new Date("".concat(t,"-01-01")));var o=n[t];r.forEach((function(t){e[t].push(o[t]||null)}))})),Object.values(e)}}}}},381:function(t,e,r){"use strict";var n=r(15),o=r(7),c=r(5),l=r(130),f=r(22),m=r(18),C=r(242),h=r(54),d=r(99),v=r(243),S=r(6),O=r(98).f,_=r(49).f,y=r(21).f,R=r(384),x=r(241).trim,j="Number",I=o.Number,N=I.prototype,F=o.TypeError,E=c("".slice),w=c("".charCodeAt),P=function(t){var e=v(t,"number");return"bigint"==typeof e?e:A(e)},A=function(t){var e,r,n,o,c,l,f,code,m=v(t,"number");if(d(m))throw F("Cannot convert a Symbol value to a number");if("string"==typeof m&&m.length>2)if(m=x(m),43===(e=w(m,0))||45===e){if(88===(r=w(m,2))||120===r)return NaN}else if(48===e){switch(w(m,1)){case 66:case 98:n=2,o=49;break;case 79:case 111:n=8,o=55;break;default:return+m}for(l=(c=E(m,2)).length,f=0;f<l;f++)if((code=w(c,f))<48||code>o)return NaN;return parseInt(c,n)}return+m};if(l(j,!I(" 0o1")||!I("0b1")||I("+0x1"))){for(var D,k=function(t){var e=arguments.length<1?0:I(P(t)),r=this;return h(N,r)&&S((function(){R(r)}))?C(Object(e),r,k):e},M=n?O(I):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),T=0;M.length>T;T++)m(I,D=M[T])&&!m(k,D)&&y(k,D,_(I,D));k.prototype=N,N.constructor=k,f(o,j,k,{constructor:!0})}},382:function(t,e,r){"use strict";var n=r(3),o=r(5),c=r(51),l=r(40),f=r(48),m=r(245),C=r(17),h=r(6),d=r(244),v=r(159),S=r(386),O=r(387),_=r(100),y=r(388),R=[],x=o(R.sort),j=o(R.push),I=h((function(){R.sort(void 0)})),N=h((function(){R.sort(null)})),F=v("sort"),E=!h((function(){if(_)return _<70;if(!(S&&S>3)){if(O)return!0;if(y)return y<603;var code,t,e,r,n="";for(code=65;code<76;code++){switch(t=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:e=3;break;case 68:case 71:e=4;break;default:e=2}for(r=0;r<47;r++)R.push({k:t+r,v:e})}for(R.sort((function(a,b){return b.v-a.v})),r=0;r<R.length;r++)t=R[r].k.charAt(0),n.charAt(n.length-1)!==t&&(n+=t);return"DGBEFHACIJK"!==n}}));n({target:"Array",proto:!0,forced:I||!N||!F||!E},{sort:function(t){void 0!==t&&c(t);var e=l(this);if(E)return void 0===t?x(e):x(e,t);var r,n,o=[],h=f(e);for(n=0;n<h;n++)n in e&&j(o,e[n]);for(d(o,function(t){return function(e,r){return void 0===r?-1:void 0===e?1:void 0!==t?+t(e,r)||0:C(e)>C(r)?1:-1}}(t)),r=o.length,n=0;n<r;)e[n]=o[n++];for(;n<h;)m(e,n++);return e}})},383:function(t,e,r){var n=r(3),o=r(246).values;n({target:"Object",stat:!0},{values:function(t){return o(t)}})},384:function(t,e,r){var n=r(5);t.exports=n(1..valueOf)},386:function(t,e,r){var n=r(79).match(/firefox\/(\d+)/i);t.exports=!!n&&+n[1]},387:function(t,e,r){var n=r(79);t.exports=/MSIE|Trident/.test(n)},388:function(t,e,r){var n=r(79).match(/AppleWebKit\/(\d+)\./);t.exports=!!n&&+n[1]},396:function(t,e,r){var content=r(405);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("196923cf",content,!0,{sourceMap:!1})},399:function(t,e,r){var content=r(412);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("93f93ae4",content,!0,{sourceMap:!1})},404:function(t,e,r){"use strict";r(396)},405:function(t,e,r){var n=r(27)(!1);n.push([t.i,".chartContent__chart--blur[data-v-6299e406]{filter:blur(3px)}.chartContent__noData[data-v-6299e406]{background:hsla(0,0%,100%,.5019607843)}",""]),t.exports=n},408:function(t,e,r){"use strict";r.r(e);var n=r(16);r(36),r(13),r(52),r(37),r(30),r(45),r(29),r(46);function o(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function c(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var l={props:{config:{type:Object,required:!0}},data:function(){return{c3Handler:null}},computed:{hasNoData:function(){var t=this;return!!this.config.data&&this.config.data.columns.filter((function(e){return e.length>1&&e[0]!==t.config.data.x})).every((function(t){return t.slice(1).every((function(t){return null===t}))}))}},mounted:function(){if(this.config.data){var t=r(397);this.c3Handler=t.generate(c(c({},this.config),{},{bindto:this.$refs.chart}))}}},f=(r(404),r(39)),component=Object(f.a)(l,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"chartContent relative"},[e("div",{ref:"chart",staticClass:"chartContent__chart h-100",class:{"chartContent__chart--blur":t.hasNoData}}),t.hasNoData?e("div",{staticClass:"chartContent__noData aspect-ratio--object flex items-center justify-center"},[e("div",{staticClass:"f3 fw5 gray pb4"},[t._v("無資料")])]):t._e()])}),[],!1,null,"6299e406",null);e.default=component.exports},411:function(t,e,r){"use strict";r(399)},412:function(t,e,r){var n=r(27)(!1);n.push([t.i,".chartPanel[data-v-35e0919d]{padding:1.5rem;border-radius:.5rem;box-shadow:0 2px 4px rgba(0,0,0,.12)}.chartPanel__title[data-v-35e0919d]{font-size:1.5rem;color:#49591c}.chartPanel__audit[data-v-35e0919d]{color:#49591c}.chartPanel .chartContent[data-v-35e0919d]{height:calc(100% - 5rem)}",""]),t.exports=n},413:function(t){t.exports=JSON.parse('[{"column":"Trichloroethane","label":"1-1-1-三氯乙烷","subCat":"一般空氣污染物","unit":"公噸"},{"column":"Dichloroethane11","label":"1-1-二氯乙烷","subCat":"一般空氣污染物","unit":"公噸"},{"column":"NOx","label":"氮氧化物","subCat":"一般空氣污染物","unit":"公噸"},{"column":"SOx","label":"硫氧化物","subCat":"一般空氣污染物","unit":"公噸"},{"column":"TSP","label":"粒狀污染物","subCat":"一般空氣污染物","unit":"公噸"},{"column":"VOCs","label":"揮發性有機化合物","subCat":"一般空氣污染物","unit":"公噸"},{"column":"Dichloroethane12","label":"1-2-二氯乙烷","subCat":"有害空氣污染物","unit":"公噸"},{"column":"Benzene","label":"苯","subCat":"有害空氣污染物","unit":"公噸"},{"column":"CarbonTetrachloride","label":"四氯化碳","subCat":"有害空氣污染物","unit":"公噸"},{"column":"chloroform","label":"三氯甲烷","subCat":"有害空氣污染物","unit":"公噸"},{"column":"Styrene","label":"苯乙烯","subCat":"有害空氣污染物","unit":"公噸"},{"column":"Tetrachloroethylene","label":"四氯乙烯","subCat":"有害空氣污染物","unit":"公噸"},{"column":"Ethylbenzene","label":"乙苯","subCat":"有害空氣污染物","unit":"公噸"},{"column":"Methylenechloride","label":"二氯甲烷","subCat":"有害空氣污染物","unit":"公噸"},{"column":"Toluene","label":"甲苯","subCat":"有害空氣污染物","unit":"公噸"},{"column":"Trichloroethylene","label":"三氯乙烯","subCat":"有害空氣污染物","unit":"公噸"},{"column":"Xylene","label":"二甲苯","subCat":"有害空氣污染物","unit":"公噸"},{"column":"Dioxin","label":"戴奧辛","subCat":"有害空氣污染物","unit":"公斤"},{"column":"heavymetal","label":"重金屬","subCat":"有害空氣污染物","unit":"公噸"}]')},414:function(t,e,r){var n=r(3),o=r(438);n({target:"Number",stat:!0,forced:Number.parseFloat!=o},{parseFloat:o})},438:function(t,e,r){var n=r(7),o=r(6),c=r(5),l=r(17),f=r(241).trim,m=r(160),C=c("".charAt),h=n.parseFloat,d=n.Symbol,v=d&&d.iterator,S=1/h(m+"-0")!=-1/0||v&&!o((function(){h(Object(v))}));t.exports=S?function(t){var e=f(l(t)),r=h(e);return 0===r&&"-"==C(e,0)?-0:r}:h}}]);