(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{380:function(e,t,r){"use strict";var n=r(15),o=r(7),c=r(5),l=r(130),d=r(22),f=r(18),N=r(242),C=r(54),P=r(99),v=r(243),y=r(6),h=r(98).f,I=r(49).f,L=r(21).f,O=r(384),m=r(241).trim,j="Number",_=o.Number,w=_.prototype,x=o.TypeError,E=c("".slice),D=c("".charCodeAt),A=function(e){var t=v(e,"number");return"bigint"==typeof t?t:T(t)},T=function(e){var t,r,n,o,c,l,d,code,f=v(e,"number");if(P(f))throw x("Cannot convert a Symbol value to a number");if("string"==typeof f&&f.length>2)if(f=m(f),43===(t=D(f,0))||45===t){if(88===(r=D(f,2))||120===r)return NaN}else if(48===t){switch(D(f,1)){case 66:case 98:n=2,o=49;break;case 79:case 111:n=8,o=55;break;default:return+f}for(l=(c=E(f,2)).length,d=0;d<l;d++)if((code=D(c,d))<48||code>o)return NaN;return parseInt(c,n)}return+f};if(l(j,!_(" 0o1")||!_("0b1")||_("+0x1"))){for(var M,S=function(e){var t=arguments.length<1?0:_(A(e)),r=this;return C(w,r)&&y((function(){O(r)}))?N(Object(t),r,S):t},k=n?h(_):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),B=0;k.length>B;B++)f(_,M=k[B])&&!f(S,M)&&L(S,M,I(_,M));S.prototype=w,w.constructor=S,d(o,j,S,{constructor:!0})}},382:function(e,t,r){"use strict";var n=r(3),o=r(5),c=r(51),l=r(40),d=r(48),f=r(245),N=r(17),C=r(6),P=r(244),v=r(159),y=r(386),h=r(387),I=r(100),L=r(388),O=[],m=o(O.sort),j=o(O.push),_=C((function(){O.sort(void 0)})),w=C((function(){O.sort(null)})),x=v("sort"),E=!C((function(){if(I)return I<70;if(!(y&&y>3)){if(h)return!0;if(L)return L<603;var code,e,t,r,n="";for(code=65;code<76;code++){switch(e=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:t=3;break;case 68:case 71:t=4;break;default:t=2}for(r=0;r<47;r++)O.push({k:e+r,v:t})}for(O.sort((function(a,b){return b.v-a.v})),r=0;r<O.length;r++)e=O[r].k.charAt(0),n.charAt(n.length-1)!==e&&(n+=e);return"DGBEFHACIJK"!==n}}));n({target:"Array",proto:!0,forced:_||!w||!x||!E},{sort:function(e){void 0!==e&&c(e);var t=l(this);if(E)return void 0===e?m(t):m(t,e);var r,n,o=[],C=d(t);for(n=0;n<C;n++)n in t&&j(o,t[n]);for(P(o,function(e){return function(t,r){return void 0===r?-1:void 0===t?1:void 0!==e?+e(t,r)||0:N(t)>N(r)?1:-1}}(e)),r=o.length,n=0;n<r;)t[n]=o[n++];for(;n<C;)f(t,n++);return t}})},383:function(e,t,r){var n=r(3),o=r(246).values;n({target:"Object",stat:!0},{values:function(e){return o(e)}})},384:function(e,t,r){var n=r(5);e.exports=n(1..valueOf)},385:function(e,t,r){"use strict";r.d(t,"d",(function(){return v})),r.d(t,"c",(function(){return y})),r.d(t,"a",(function(){return h})),r.d(t,"k",(function(){return L})),r.d(t,"h",(function(){return m})),r.d(t,"g",(function(){return j})),r.d(t,"e",(function(){return _})),r.d(t,"i",(function(){return E})),r.d(t,"f",(function(){return D})),r.d(t,"b",(function(){return A})),r.d(t,"j",(function(){return T}));r(30),r(36),r(45),r(46);var n=r(16),o=r(97),c=(r(53),r(64),r(13),r(29),r(37),r(382),r(390),r(52),r(383),r(247),r(240),r(393)),l=r(389),d=r(392),f=r(395);function N(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function C(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?N(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):N(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}new Date("2013-01-01"),new Date("2023-01-01");var P="-predict",v={MIN:120,MAX:200},y={START:2013,BASE:2019,END:2050},h={PNNL:"#358D53",IPCC:"#FACB3D"};function I(e){var t=Object(c.format)(e?".1%":".0%");return function(e){return t(e/100)}}var L=I(!0),O=[2013].concat(Object(o.a)(Object(l.range)(2015,y.END,5)),[y.END]).map((function(e){return new Date("".concat(e,"-01-01"))}));function m(e){var t=e.stats,r=e.getUnitLabel,n=e.getUnitColor,c=e.isDashed,data={},l={},d=t.reduce((function(e,t){var n=t.年份,o=r(t);return e[n]||(e[n]={}),e[n][o]={tot:t.Tot變化,isDashed:c(t)},e}),{});f.forEach((function(e){d[e.year]||(d[e.year]={}),d[e.year].PNNL={tot:100*e.PNNL,isDashed:!1},d[e.year].IPCC={tot:100*e.IPCC,isDashed:!1}}));var N=Object.keys(d[y.BASE]);N.forEach((function(e){data[e]=[e],l[e]=n(e)})),l.PNNL=h.PNNL,l.IPCC=h.IPCC;var C=Object.keys(d).sort();return C.forEach((function(e){N.forEach((function(t){var r=d[e][t],n=r&&void 0!==r.tot?r.tot:null;if(r)if(r.isDashed){var c="".concat(t).concat(P);if(!data[c]){var f=data[t].slice(1).fill(null),N=data[t].length-1;f[N-1]=data[t][N],data[c]=[c].concat(Object(o.a)(f)),l[c]=l[t]}data[t].push(null),data[c].push(n)}else data[t].push(n);else data[t].push(null)}))})),{x:"x",columns:[["x"].concat(Object(o.a)(C.map((function(e){return"".concat(e,"-01-01")}))))].concat(Object(o.a)(Object.values(data))),type:"line",types:{IPCC:"area",PNNL:"area"},colors:l}}function j(e,t){return C({point:{r:2},grid:{y:{show:!0}},axis:{x:{type:"timeseries",tick:{values:O,format:"%Y"}},y:{max:e,tick:{format:I()}}},legend:{show:!1}},t)}function _(e){return e.body.map((function(e){return C(C({},e),{},{"年份":e.年份-0,"Tot數值":e.Tot數值-0,"Tot變化":e.Tot變化-0})}))}function w(e,t){var r=e-100;return r>0?'<div class="esgLegend__value esgLegend__value--raise">↑ '.concat(L(r),"</div>"):0===r?'<div class="esgLegend__value flex-none">&nbsp; --</div>':e>=t?'<div class="esgLegend__value esgLegend__value">↓ '.concat(L(-1*r),"</div>"):'<div class="esgLegend__value esgLegend__value--reduce">↓ '.concat(L(-1*r),"</div>")}function x(title,e,t,r){var n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",o="esgLegend";return n&&(o+=" esgLegend--".concat(n)),'\n<div class="'.concat(o,' flex items-center">\n<div class="esgLegend__label flex-none" style="background: ').concat(e,'"></div>\n<div class="esgLegend__name flex-auto truncate">').concat(title,"</div>\n").concat(w(t,r),"\n</div>\n")}function E(e){var t=e.isBau,r=e.findAnotherRow,n=e.findUnit;return function(data){var e=data[0].x.getFullYear(),o=data[0].id,c=!1;o.endsWith(P)&&(c=!0,o=o.slice(0,-1*P.length));var d=n(o);if(!d||!d.color)return"";var N=r(e,d),v=data[0].value,y=t?v:Object(l.get)(N,"Tot變化"),I="".concat(o).concat(c?" BAU":""),L="".concat(o," 目標"),O=t?Object(l.get)(N,"Tot變化"):v,m=f.find((function(t){return t.year===e}));return m=C(C({},m),{},{PNNL:100*m.PNNL,IPCC:100*m.IPCC}),'\n<div class="esgTp">\n<div class="esgTp__year lh-title">'.concat(e,'</div>\n<div class="esgTp__company">\n').concat(x(I,d.color,y,m.IPCC,c?"bau":"fact"),"\n").concat(void 0!==O?x(L,d.color,O,m.IPCC,"noLabel"):"",'\n</div>\n<div class="esgTp__roadmap">\n<div class="esgTp__roadmapTitle lh-title mb2">目標</div>\n').concat(x("IPCC",h.IPCC,m.IPCC,m.IPCC,"roadmap"),"\n").concat(x("PNNL",h.PNNL,m.PNNL,m.IPCC,"roadmap"),"\n<div>\n</div>\n")}}var D={computed:{companyAbbrMap:function(){var e=this;return Object.keys(this.companyMap).reduce((function(t,r){var n=e.companyMap[r];return t[n.公司簡稱]=n,t}),{})}}},A="per-industry",T={computed:{industries:function(){var e=[{label:"跨產業",code:A}].concat(Object(o.a)(d)),t=e.length;return e.map((function(e,i){return C(C({},e),{},{color:Object(c.interpolateCividis)(i/t)})}))}},methods:{industryLink:function(e){return e===A?{name:"net-zero-overall"}:{name:"net-zero-industry",params:{industry:e},query:this.$route.query}}}}},386:function(e,t,r){var n=r(79).match(/firefox\/(\d+)/i);e.exports=!!n&&+n[1]},387:function(e,t,r){var n=r(79);e.exports=/MSIE|Trident/.test(n)},388:function(e,t,r){var n=r(79).match(/AppleWebKit\/(\d+)\./);e.exports=!!n&&+n[1]},390:function(e,t,r){var n=r(3),o=r(391),c=r(131);n({target:"Array",proto:!0},{fill:o}),c("fill")},391:function(e,t,r){"use strict";var n=r(40),o=r(101),c=r(48);e.exports=function(e){for(var t=n(this),r=c(t),l=arguments.length,d=o(l>1?arguments[1]:void 0,r),f=l>2?arguments[2]:void 0,N=void 0===f?r:o(f,r);N>d;)t[d++]=e;return t}},392:function(e){e.exports=JSON.parse('[{"label":"水泥工業","code":"01"},{"label":"食品工業","code":"02"},{"label":"石化業","code":"03"},{"label":"紡織纖維","code":"04"},{"label":"電機機械","code":"05"},{"label":"電器電纜","code":"06"},{"label":"玻璃陶瓷","code":"08"},{"label":"造紙工業","code":"09"},{"label":"鋼鐵工業","code":"10"},{"label":"橡膠工業","code":"11"},{"label":"汽車工業","code":"12"},{"label":"電子工業","code":"13"},{"label":"建材營造","code":"14"},{"label":"航運業","code":"15"},{"label":"觀光事業","code":"16"},{"label":"金融保險","code":"17"},{"label":"貿易百貨","code":"18"},{"label":"其他","code":"20"},{"label":"化學工業","code":"21"},{"label":"生技醫療業","code":"22"},{"label":"油電燃氣業","code":"23"},{"label":"半導體業","code":"24"},{"label":"電腦及週邊設備業","code":"25"},{"label":"光電業","code":"26"},{"label":"通信網路業","code":"27"},{"label":"電子零組件業","code":"28"},{"label":"電子通路業","code":"29"},{"label":"資訊服務業","code":"30"},{"label":"其他電子業","code":"31"},{"label":"文化創意業","code":"32"},{"label":"農業科技業","code":"33"},{"label":"電子商務","code":"34"},{"label":"管理股票","code":"98"}]')},395:function(e){e.exports=JSON.parse('[{"year":2013,"PNNL":1.0072,"IPCC":1.0072},{"year":2014,"PNNL":1.0146,"IPCC":1.0146},{"year":2015,"PNNL":1.0105,"IPCC":1.0105},{"year":2016,"PNNL":1.0238,"IPCC":1.0238},{"year":2017,"PNNL":1.0417,"IPCC":1.0417},{"year":2018,"PNNL":1.0353,"IPCC":1.0353},{"year":2019,"PNNL":1,"IPCC":1},{"year":2020,"PNNL":0.9545,"IPCC":0.9609},{"year":2021,"PNNL":0.9091,"IPCC":0.9218},{"year":2022,"PNNL":0.8636,"IPCC":0.8827},{"year":2023,"PNNL":0.8182,"IPCC":0.8436},{"year":2024,"PNNL":0.7727,"IPCC":0.8045},{"year":2025,"PNNL":0.7273,"IPCC":0.7655},{"year":2026,"PNNL":0.6818,"IPCC":0.7264},{"year":2027,"PNNL":0.6364,"IPCC":0.6873},{"year":2028,"PNNL":0.5909,"IPCC":0.6482},{"year":2029,"PNNL":0.5455,"IPCC":0.6091},{"year":2030,"PNNL":0.5,"IPCC":0.57},{"year":2031,"PNNL":0.475,"IPCC":0.5495},{"year":2032,"PNNL":0.45,"IPCC":0.529},{"year":2033,"PNNL":0.425,"IPCC":0.5085},{"year":2034,"PNNL":0.4,"IPCC":0.488},{"year":2035,"PNNL":0.375,"IPCC":0.4675},{"year":2036,"PNNL":0.35,"IPCC":0.447},{"year":2037,"PNNL":0.325,"IPCC":0.4265},{"year":2038,"PNNL":0.3,"IPCC":0.406},{"year":2039,"PNNL":0.275,"IPCC":0.3855},{"year":2040,"PNNL":0.25,"IPCC":0.365},{"year":2041,"PNNL":0.225,"IPCC":0.3445},{"year":2042,"PNNL":0.2,"IPCC":0.324},{"year":2043,"PNNL":0.175,"IPCC":0.3035},{"year":2044,"PNNL":0.15,"IPCC":0.283},{"year":2045,"PNNL":0.125,"IPCC":0.2625},{"year":2046,"PNNL":0.1,"IPCC":0.242},{"year":2047,"PNNL":0.075,"IPCC":0.2215},{"year":2048,"PNNL":0.05,"IPCC":0.201},{"year":2049,"PNNL":0.025,"IPCC":0.1805},{"year":2050,"PNNL":0,"IPCC":0.16}]')},492:function(e,t,r){var content=r(524);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(28).default)("2dbbe31d",content,!0,{sourceMap:!1})},523:function(e,t,r){"use strict";r(492)},524:function(e,t,r){var n=r(27)(!1);n.push([e.i,".overviewBau[data-v-d2af4960]{height:22.5rem}",""]),e.exports=n},554:function(e,t,r){"use strict";r.r(t);var n=r(16),o=(r(380),r(13),r(383),r(37),r(30),r(36),r(45),r(29),r(46),r(389)),c=r(385);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var f={props:{bauStats:{type:Array,required:!0},industryMap:{type:Object,required:!0},yMax:{type:Number,required:!0}},data:function(){return{c3Handler:null}},computed:{industryNameMap:function(){return Object.values(this.industryMap).reduce((function(e,t){return e[t.label]=t,e}),{})},chartData:function(){var e=this;return Object(c.h)({stats:this.bauStats,getUnitLabel:function(t){return e.industryMap[t.產業別].label},getUnitColor:function(t){return Object(o.get)(e.industryNameMap,"".concat(t,".color"),"")},isDashed:function(e){return!!e.是預測值}})},c3Config:function(){var e=this;return Object(c.g)(this.yMax,{tooltip:{grouped:!1,contents:Object(c.i)({isBau:!0,findUnit:function(t){return e.industryNameMap[t]},findAnotherRow:function(){return null}})}})}},watch:{bauStats:function(){this.updateChart()}},mounted:function(){this.initChart()},methods:{initChart:function(){var e=r(398);this.c3Handler=e.generate(d(d({data:this.chartData},this.c3Config),{},{bindto:this.$refs.chart}))},updateChart:function(){this.c3Handler?(this.c3Handler.axis.max({y:this.yMax}),this.c3Handler.load({unload:!0,columns:this.chartData.columns})):this.initChart()}}},N=(r(523),r(39)),component=Object(N.a)(f,(function(){var e=this._self._c;return e("div",{staticClass:"overviewBau relative"},[e("div",{ref:"chart",staticClass:"netZeroChart h-100"})])}),[],!1,null,"d2af4960",null);t.default=component.exports}}]);