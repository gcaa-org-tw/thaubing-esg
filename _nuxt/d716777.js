(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{379:function(e,t,n){"use strict";var r=n(15),c=n(7),o=n(5),l=n(129),d=n(22),f=n(18),C=n(242),N=n(54),P=n(99),y=n(244),v=n(6),h=n(98).f,I=n(49).f,L=n(21).f,O=n(381),m=n(241).trim,j="Number",_=c.Number,w=_.prototype,D=c.TypeError,E=o("".slice),x=o("".charCodeAt),A=function(e){var t=y(e,"number");return"bigint"==typeof t?t:T(t)},T=function(e){var t,n,r,c,o,l,d,code,f=y(e,"number");if(P(f))throw D("Cannot convert a Symbol value to a number");if("string"==typeof f&&f.length>2)if(f=m(f),43===(t=x(f,0))||45===t){if(88===(n=x(f,2))||120===n)return NaN}else if(48===t){switch(x(f,1)){case 66:case 98:r=2,c=49;break;case 79:case 111:r=8,c=55;break;default:return+f}for(l=(o=E(f,2)).length,d=0;d<l;d++)if((code=x(o,d))<48||code>c)return NaN;return parseInt(o,r)}return+f};if(l(j,!_(" 0o1")||!_("0b1")||_("+0x1"))){for(var S,k=function(e){var t=arguments.length<1?0:_(A(e)),n=this;return N(w,n)&&v((function(){O(n)}))?C(Object(t),n,k):t},M=r?h(_):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),F=0;M.length>F;F++)f(_,S=M[F])&&!f(k,S)&&L(k,S,I(_,S));k.prototype=w,w.constructor=k,d(c,j,k,{constructor:!0})}},381:function(e,t,n){var r=n(5);e.exports=r(1..valueOf)},402:function(e,t,n){"use strict";n.d(t,"c",(function(){return P})),n.d(t,"e",(function(){return y})),n.d(t,"d",(function(){return v})),n.d(t,"a",(function(){return h})),n.d(t,"o",(function(){return L})),n.d(t,"h",(function(){return m})),n.d(t,"j",(function(){return j})),n.d(t,"i",(function(){return _})),n.d(t,"f",(function(){return w})),n.d(t,"l",(function(){return E})),n.d(t,"k",(function(){return x})),n.d(t,"g",(function(){return A})),n.d(t,"b",(function(){return T})),n.d(t,"n",(function(){return S})),n.d(t,"m",(function(){return k}));n(31),n(45),n(46);var r=n(17),c=n(97),o=(n(51),n(64),n(38),n(37),n(13),n(30),n(384),n(406),n(52),n(248),n(243),n(101),n(399)),l=n(403),d=n(408),f=n(409);function C(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function N(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?C(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):C(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}new Date("2013-01-01"),new Date("2023-01-01");var P="-predict",y={MIN:120,MAX:200},v={START:2013,BASE:2019,END:2050},h={PNNL:"#358D53",IPCC:"#FACB3D"};function I(e){var t=Object(o.format)(e?".1%":".0%");return function(e){return t(e/100)}}var L=I(!0),O=[2013].concat(Object(c.a)(Object(l.range)(2015,v.END,5)),[v.END]).map((function(e){return new Date("".concat(e,"-01-01"))}));function m(e,t){if(t){var n=Object.keys(t.data.colors());if(t.show(),e){var c,o=N((c={},Object(r.a)(c,e,!0),Object(r.a)(c,"".concat(e).concat(P),!0),c),h);t.hide(n.filter((function(label){return!o[label]})))}}}function j(e){var t=e.stats,n=e.getUnitLabel,r=e.getUnitColor,o=e.isDashed,l=e.allUnits,d=void 0===l?null:l,C=e.handleClick,data={},N={},y=t.reduce((function(e,t){var r=t.年份,c=n(t);return e[r]||(e[r]={}),e[r][c]={tot:t.Tot變化,isDashed:o(t,r,c)},e}),{});f.forEach((function(e){y[e.year]||(y[e.year]={}),y[e.year].PNNL={tot:100*e.PNNL,isDashed:!1},y[e.year].IPCC={tot:100*e.IPCC,isDashed:!1}})),(d=d||Object.keys(y[v.BASE])).forEach((function(e){data[e]=[e],N[e]=r(e)})),N.PNNL=h.PNNL,N.IPCC=h.IPCC;var I=Object.keys(y).sort();I.forEach((function(e){d.forEach((function(t){var n=y[e][t]||{},r=void 0===n.tot?null:n.tot;if("isDashed"in n?n.isDashed:o(n,e,t)){var l="".concat(t).concat(P);if(!data[l]){var d=data[t].slice(1).fill(null),f=data[t].length-1;f>0&&(d[f-1]=data[t][f]),data[l]=[l].concat(Object(c.a)(d)),N[l]=N[t]}data[t].push(null),data[l].push(r)}else data[t].push(r)}))}));var L=["x"].concat(Object(c.a)(I.map((function(e){return"".concat(e,"-01-01")})))),O=[data.IPCC,data.PNNL],m=Object.keys(data).filter((function(e){return"IPCC"!==e&&"PNNL"!==e})).map((function(e){return data[e]}));return{x:"x",columns:[L].concat(O,Object(c.a)(m)),type:"line",types:{IPCC:"area",PNNL:"area"},colors:N,onclick:function(e,element){C&&C(e,element)}}}function _(e,t){return N({point:{r:2},grid:{y:{show:!0}},axis:{x:{type:"timeseries",tick:{values:O,format:"%Y"}},y:{max:e,tick:{format:I()}}},legend:{show:!1}},t)}function w(e){return e.body.map((function(e){return N(N({},e),{},{"年份":e.年份-0,"Tot數值":e.Tot數值-0,"Tot變化":e.Tot變化-0})}))}function D(e,t){var n=e-100;return n>0?'<div class="esgLegend__value esgLegend__value--raise">↑ '.concat(L(n),"</div>"):0===n?'<div class="esgLegend__value flex-none">&nbsp; --</div>':e>=t?'<div class="esgLegend__value esgLegend__value">↓ '.concat(L(-1*n),"</div>"):'<div class="esgLegend__value esgLegend__value--reduce">↓ '.concat(L(-1*n),"</div>")}function E(title,e,t,n){var r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",c="esgLegend";return r&&(c+=" esgLegend--".concat(r)),'\n<div class="'.concat(c,' flex items-center">\n<div class="esgLegend__label flex-none" style="background: ').concat(e,'"></div>\n<div class="esgLegend__name flex-auto truncate">').concat(title,"</div>\n").concat(D(t,n),"\n</div>\n")}function x(e){var t=e.isBau,n=e.findAnotherRow,r=e.findUnit;return function(data){var e=data[0].x.getFullYear(),c=data[0].id,o=!1;c.endsWith(P)&&(o=!0,c=c.slice(0,-1*P.length));var d=r(c);if(!d||!d.color)return"";var C=n(e,d),y=data[0].value,v=t?y:Object(l.get)(C,"Tot變化"),I="".concat(c).concat(o?" BAU":""),L="".concat(c," 目標"),O=t?Object(l.get)(C,"Tot變化"):y,m=f.find((function(t){return t.year===e}));return m=N(N({},m),{},{PNNL:100*m.PNNL,IPCC:100*m.IPCC}),'\n<div class="esgTp">\n<div class="esgTp__year lh-title">'.concat(e,'</div>\n<div class="esgTp__company">\n').concat(E(I,d.color,v,m.IPCC,o?"bau":"fact"),"\n").concat(void 0!==O?E(L,d.color,O,m.IPCC,"noLabel"):"",'\n</div>\n<div class="esgTp__roadmap">\n<div class="esgTp__roadmapTitle lh-title mb2">目標</div>\n').concat(E("IPCC",h.IPCC,m.IPCC,m.IPCC,"roadmap"),"\n").concat(E("PNNL",h.PNNL,m.PNNL,m.IPCC,"roadmap"),"\n<div>\n</div>\n")}}var A={computed:{companyAbbrMap:function(){var e=this;return Object.keys(this.companyMap).reduce((function(t,n){var r=e.companyMap[n];return t[r.公司簡稱]=r,t}),{})}}},T="per-industry";function S(i){return Object(o.interpolateCividis)((i+.7)/5)}var k={computed:{industries:function(){return[{label:"跨產業",code:T}].concat(Object(c.a)(d)).map((function(e,i){return N({},e)}))}},methods:{industryLink:function(e){return e===T?{name:"net-zero-overall"}:{name:"net-zero-industry",params:{industry:e},query:this.$route.query}}}}},406:function(e,t,n){var r=n(3),c=n(407),o=n(132);r({target:"Array",proto:!0},{fill:c}),o("fill")},407:function(e,t,n){"use strict";var r=n(40),c=n(102),o=n(48);e.exports=function(e){for(var t=r(this),n=o(t),l=arguments.length,d=c(l>1?arguments[1]:void 0,n),f=l>2?arguments[2]:void 0,C=void 0===f?n:c(f,n);C>d;)t[d++]=e;return t}},408:function(e){e.exports=JSON.parse('[{"label":"水泥工業","code":"01"},{"label":"食品工業","code":"02"},{"label":"石化業","code":"03"},{"label":"紡織纖維","code":"04"},{"label":"電機機械","code":"05"},{"label":"電器電纜","code":"06"},{"label":"玻璃陶瓷","code":"08"},{"label":"造紙工業","code":"09"},{"label":"鋼鐵工業","code":"10"},{"label":"橡膠工業","code":"11"},{"label":"汽車工業","code":"12"},{"label":"電子工業","code":"13"},{"label":"建材營造","code":"14"},{"label":"航運業","code":"15"},{"label":"觀光事業","code":"16"},{"label":"金融保險","code":"17"},{"label":"貿易百貨","code":"18"},{"label":"其他","code":"20"},{"label":"化學工業","code":"21"},{"label":"生技醫療業","code":"22"},{"label":"油電燃氣業","code":"23"},{"label":"半導體業","code":"24"},{"label":"電腦及週邊設備業","code":"25"},{"label":"光電業","code":"26"},{"label":"通信網路業","code":"27"},{"label":"電子零組件業","code":"28"},{"label":"電子通路業","code":"29"},{"label":"資訊服務業","code":"30"},{"label":"其他電子業","code":"31"},{"label":"文化創意業","code":"32"},{"label":"農業科技業","code":"33"},{"label":"電子商務","code":"34"},{"label":"管理股票","code":"98"}]')},409:function(e){e.exports=JSON.parse('[{"year":2013,"PNNL":1.0072,"IPCC":1.0072},{"year":2014,"PNNL":1.0146,"IPCC":1.0146},{"year":2015,"PNNL":1.0105,"IPCC":1.0105},{"year":2016,"PNNL":1.0238,"IPCC":1.0238},{"year":2017,"PNNL":1.0417,"IPCC":1.0417},{"year":2018,"PNNL":1.0353,"IPCC":1.0353},{"year":2019,"PNNL":1,"IPCC":1},{"year":2020,"PNNL":0.9545,"IPCC":0.9609},{"year":2021,"PNNL":0.9091,"IPCC":0.9218},{"year":2022,"PNNL":0.8636,"IPCC":0.8827},{"year":2023,"PNNL":0.8182,"IPCC":0.8436},{"year":2024,"PNNL":0.7727,"IPCC":0.8045},{"year":2025,"PNNL":0.7273,"IPCC":0.7655},{"year":2026,"PNNL":0.6818,"IPCC":0.7264},{"year":2027,"PNNL":0.6364,"IPCC":0.6873},{"year":2028,"PNNL":0.5909,"IPCC":0.6482},{"year":2029,"PNNL":0.5455,"IPCC":0.6091},{"year":2030,"PNNL":0.5,"IPCC":0.57},{"year":2031,"PNNL":0.475,"IPCC":0.5495},{"year":2032,"PNNL":0.45,"IPCC":0.529},{"year":2033,"PNNL":0.425,"IPCC":0.5085},{"year":2034,"PNNL":0.4,"IPCC":0.488},{"year":2035,"PNNL":0.375,"IPCC":0.4675},{"year":2036,"PNNL":0.35,"IPCC":0.447},{"year":2037,"PNNL":0.325,"IPCC":0.4265},{"year":2038,"PNNL":0.3,"IPCC":0.406},{"year":2039,"PNNL":0.275,"IPCC":0.3855},{"year":2040,"PNNL":0.25,"IPCC":0.365},{"year":2041,"PNNL":0.225,"IPCC":0.3445},{"year":2042,"PNNL":0.2,"IPCC":0.324},{"year":2043,"PNNL":0.175,"IPCC":0.3035},{"year":2044,"PNNL":0.15,"IPCC":0.283},{"year":2045,"PNNL":0.125,"IPCC":0.2625},{"year":2046,"PNNL":0.1,"IPCC":0.242},{"year":2047,"PNNL":0.075,"IPCC":0.2215},{"year":2048,"PNNL":0.05,"IPCC":0.201},{"year":2049,"PNNL":0.025,"IPCC":0.1805},{"year":2050,"PNNL":0,"IPCC":0.16}]')},473:function(e,t,n){var content=n(518);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(28).default)("32631e45",content,!0,{sourceMap:!1})},517:function(e,t,n){"use strict";n(473)},518:function(e,t,n){var r=n(27)(!1);r.push([e.i,".indBau[data-v-c0cd0d42]{height:22.5rem}",""]),e.exports=r},550:function(e,t,n){"use strict";n.r(t);var r=n(17),c=(n(379),n(248),n(52),n(243),n(13),n(38),n(31),n(37),n(45),n(30),n(46),n(403)),o=n(402);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var f={mixins:[o.g],props:{bauStats:{type:Array,required:!0},ciStats:{type:Array,required:!0},companyMap:{type:Object,required:!0},yMax:{type:Number,required:!0},activeCompany:{default:null,validator:function(e){return!e||e.公司簡稱}}},data:function(){return{c3Handler:null}},computed:{chartData:function(){var e=this;return Object(o.j)({stats:this.bauStats,getUnitLabel:function(t){return e.companyMap[t.統編].公司簡稱},getUnitColor:function(t){return Object(c.get)(e.companyAbbrMap,"".concat(t,".color"),"")},isDashed:function(e){return!!e.是預測值},handleClick:function(t,element){var label=t.id;label.endsWith(o.c)&&(label=label.slice(0,-1*o.c.length)),e.$emit("open-company",label)}})},c3Config:function(){var e=this;return Object(o.i)(this.yMax,{tooltip:{grouped:!1,contents:Object(o.k)({isBau:!0,findUnit:function(t){return e.companyAbbrMap[t]},findAnotherRow:function(t,n){return e.ciStats.find((function(e){return e.年份===t&&e.統編===n.統編}))}})}})}},watch:{bauStats:function(){this.updateChart()},activeCompany:function(){var e=Object(c.get)(this.activeCompany,"公司簡稱");Object(o.h)(e,this.c3Handler),e?this.$refs.chart.classList.add("netZeroChart--hasFocused"):this.$refs.chart.classList.remove("netZeroChart--hasFocused")}},mounted:function(){this.initChart()},methods:{initChart:function(){var e=n(401);this.c3Handler=e.generate(d(d({data:this.chartData},this.c3Config),{},{bindto:this.$refs.chart}))},updateChart:function(){this.c3Handler?(this.c3Handler.axis.max({y:this.yMax}),this.c3Handler.load({unload:!0,columns:this.chartData.columns}),Object(o.h)(null,this.c3Handler)):this.initChart()}}},C=(n(517),n(29)),component=Object(C.a)(f,(function(){var e=this._self._c;return e("div",{staticClass:"indBau relative"},[e("div",{ref:"chart",staticClass:"netZeroChart h-100"})])}),[],!1,null,"c0cd0d42",null);t.default=component.exports}}]);