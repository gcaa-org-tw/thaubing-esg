(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{380:function(e,t,r){"use strict";var n=r(15),o=r(7),c=r(5),l=r(130),d=r(22),f=r(18),N=r(242),v=r(54),C=r(99),P=r(243),y=r(6),L=r(98).f,I=r(49).f,h=r(21).f,_=r(384),m=r(241).trim,O="Number",j=o.Number,E=j.prototype,x=o.TypeError,D=c("".slice),T=c("".charCodeAt),A=function(e){var t=P(e,"number");return"bigint"==typeof t?t:w(t)},w=function(e){var t,r,n,o,c,l,d,code,f=P(e,"number");if(C(f))throw x("Cannot convert a Symbol value to a number");if("string"==typeof f&&f.length>2)if(f=m(f),43===(t=T(f,0))||45===t){if(88===(r=T(f,2))||120===r)return NaN}else if(48===t){switch(T(f,1)){case 66:case 98:n=2,o=49;break;case 79:case 111:n=8,o=55;break;default:return+f}for(l=(c=D(f,2)).length,d=0;d<l;d++)if((code=T(c,d))<48||code>o)return NaN;return parseInt(c,n)}return+f};if(l(O,!j(" 0o1")||!j("0b1")||j("+0x1"))){for(var k,S=function(e){var t=arguments.length<1?0:j(A(e)),r=this;return v(E,r)&&y((function(){_(r)}))?N(Object(t),r,S):t},M=n?L(j):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),F=0;M.length>F;F++)f(j,k=M[F])&&!f(S,k)&&h(S,k,I(j,k));S.prototype=E,E.constructor=S,d(o,O,S,{constructor:!0})}},382:function(e,t,r){"use strict";var n=r(3),o=r(5),c=r(51),l=r(40),d=r(48),f=r(245),N=r(17),v=r(6),C=r(244),P=r(159),y=r(386),L=r(387),I=r(100),h=r(388),_=[],m=o(_.sort),O=o(_.push),j=v((function(){_.sort(void 0)})),E=v((function(){_.sort(null)})),x=P("sort"),D=!v((function(){if(I)return I<70;if(!(y&&y>3)){if(L)return!0;if(h)return h<603;var code,e,t,r,n="";for(code=65;code<76;code++){switch(e=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:t=3;break;case 68:case 71:t=4;break;default:t=2}for(r=0;r<47;r++)_.push({k:e+r,v:t})}for(_.sort((function(a,b){return b.v-a.v})),r=0;r<_.length;r++)e=_[r].k.charAt(0),n.charAt(n.length-1)!==e&&(n+=e);return"DGBEFHACIJK"!==n}}));n({target:"Array",proto:!0,forced:j||!E||!x||!D},{sort:function(e){void 0!==e&&c(e);var t=l(this);if(D)return void 0===e?m(t):m(t,e);var r,n,o=[],v=d(t);for(n=0;n<v;n++)n in t&&O(o,t[n]);for(C(o,function(e){return function(t,r){return void 0===r?-1:void 0===t?1:void 0!==e?+e(t,r)||0:N(t)>N(r)?1:-1}}(e)),r=o.length,n=0;n<r;)t[n]=o[n++];for(;n<v;)f(t,n++);return t}})},383:function(e,t,r){var n=r(3),o=r(246).values;n({target:"Object",stat:!0},{values:function(e){return o(e)}})},384:function(e,t,r){var n=r(5);e.exports=n(1..valueOf)},385:function(e,t,r){"use strict";r.d(t,"d",(function(){return P})),r.d(t,"c",(function(){return y})),r.d(t,"a",(function(){return L})),r.d(t,"k",(function(){return h})),r.d(t,"h",(function(){return m})),r.d(t,"g",(function(){return O})),r.d(t,"e",(function(){return j})),r.d(t,"i",(function(){return D})),r.d(t,"f",(function(){return T})),r.d(t,"b",(function(){return A})),r.d(t,"j",(function(){return w}));r(30),r(36),r(45),r(46);var n=r(16),o=r(97),c=(r(53),r(64),r(13),r(29),r(37),r(382),r(390),r(52),r(383),r(247),r(240),r(393)),l=r(389),d=r(392),f=r(395);function N(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function v(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?N(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):N(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}new Date("2013-01-01"),new Date("2023-01-01");var C="-predict",P={MIN:120,MAX:200},y={START:2013,BASE:2019,END:2050},L={PNNL:"#358D53",IPCC:"#FACB3D"};function I(e){var t=Object(c.format)(e?".1%":".0%");return function(e){return t(e/100)}}var h=I(!0),_=[2013].concat(Object(o.a)(Object(l.range)(2015,y.END,5)),[y.END]).map((function(e){return new Date("".concat(e,"-01-01"))}));function m(e){var t=e.stats,r=e.getUnitLabel,n=e.getUnitColor,c=e.isDashed,data={},l={},d=t.reduce((function(e,t){var n=t.年份,o=r(t);return e[n]||(e[n]={}),e[n][o]={tot:t.Tot變化,isDashed:c(t)},e}),{});f.forEach((function(e){d[e.year]||(d[e.year]={}),d[e.year].PNNL={tot:100*e.PNNL,isDashed:!1},d[e.year].IPCC={tot:100*e.IPCC,isDashed:!1}}));var N=Object.keys(d[y.BASE]);N.forEach((function(e){data[e]=[e],l[e]=n(e)})),l.PNNL=L.PNNL,l.IPCC=L.IPCC;var v=Object.keys(d).sort();return v.forEach((function(e){N.forEach((function(t){var r=d[e][t],n=r&&void 0!==r.tot?r.tot:null;if(r)if(r.isDashed){var c="".concat(t).concat(C);if(!data[c]){var f=data[t].slice(1).fill(null),N=data[t].length-1;f[N-1]=data[t][N],data[c]=[c].concat(Object(o.a)(f)),l[c]=l[t]}data[t].push(null),data[c].push(n)}else data[t].push(n);else data[t].push(null)}))})),{x:"x",columns:[["x"].concat(Object(o.a)(v.map((function(e){return"".concat(e,"-01-01")}))))].concat(Object(o.a)(Object.values(data))),type:"line",types:{IPCC:"area",PNNL:"area"},colors:l}}function O(e,t){return v({point:{r:2},grid:{y:{show:!0}},axis:{x:{type:"timeseries",tick:{values:_,format:"%Y"}},y:{max:e,tick:{format:I()}}},legend:{show:!1}},t)}function j(e){return e.body.map((function(e){return v(v({},e),{},{"年份":e.年份-0,"Tot數值":e.Tot數值-0,"Tot變化":e.Tot變化-0})}))}function E(e,t){var r=e-100;return r>0?'<div class="esgLegend__value esgLegend__value--raise">↑ '.concat(h(r),"</div>"):0===r?'<div class="esgLegend__value flex-none">&nbsp; --</div>':e>=t?'<div class="esgLegend__value esgLegend__value">↓ '.concat(h(-1*r),"</div>"):'<div class="esgLegend__value esgLegend__value--reduce">↓ '.concat(h(-1*r),"</div>")}function x(title,e,t,r){var n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",o="esgLegend";return n&&(o+=" esgLegend--".concat(n)),'\n<div class="'.concat(o,' flex items-center">\n<div class="esgLegend__label flex-none" style="background: ').concat(e,'"></div>\n<div class="esgLegend__name flex-auto truncate">').concat(title,"</div>\n").concat(E(t,r),"\n</div>\n")}function D(e){var t=e.isBau,r=e.findAnotherRow,n=e.findUnit;return function(data){var e=data[0].x.getFullYear(),o=data[0].id,c=!1;o.endsWith(C)&&(c=!0,o=o.slice(0,-1*C.length));var d=n(o);if(!d||!d.color)return"";var N=r(e,d),P=data[0].value,y=t?P:Object(l.get)(N,"Tot變化"),I="".concat(o).concat(c?" BAU":""),h="".concat(o," 目標"),_=t?Object(l.get)(N,"Tot變化"):P,m=f.find((function(t){return t.year===e}));return m=v(v({},m),{},{PNNL:100*m.PNNL,IPCC:100*m.IPCC}),'\n<div class="esgTp">\n<div class="esgTp__year lh-title">'.concat(e,'</div>\n<div class="esgTp__company">\n').concat(x(I,d.color,y,m.IPCC,c?"bau":"fact"),"\n").concat(void 0!==_?x(h,d.color,_,m.IPCC,"noLabel"):"",'\n</div>\n<div class="esgTp__roadmap">\n<div class="esgTp__roadmapTitle lh-title mb2">目標</div>\n').concat(x("IPCC",L.IPCC,m.IPCC,m.IPCC,"roadmap"),"\n").concat(x("PNNL",L.PNNL,m.PNNL,m.IPCC,"roadmap"),"\n<div>\n</div>\n")}}var T={computed:{companyAbbrMap:function(){var e=this;return Object.keys(this.companyMap).reduce((function(t,r){var n=e.companyMap[r];return t[n.公司簡稱]=n,t}),{})}}},A="per-industry",w={computed:{industries:function(){var e=[{label:"跨產業",code:A}].concat(Object(o.a)(d)),t=e.length;return e.map((function(e,i){return v(v({},e),{},{color:Object(c.interpolateCividis)(i/t)})}))}},methods:{industryLink:function(e){return e===A?{name:"net-zero-overall"}:{name:"net-zero-industry",params:{industry:e},query:this.$route.query}}}}},386:function(e,t,r){var n=r(79).match(/firefox\/(\d+)/i);e.exports=!!n&&+n[1]},387:function(e,t,r){var n=r(79);e.exports=/MSIE|Trident/.test(n)},388:function(e,t,r){var n=r(79).match(/AppleWebKit\/(\d+)\./);e.exports=!!n&&+n[1]},390:function(e,t,r){var n=r(3),o=r(391),c=r(131);n({target:"Array",proto:!0},{fill:o}),c("fill")},391:function(e,t,r){"use strict";var n=r(40),o=r(101),c=r(48);e.exports=function(e){for(var t=n(this),r=c(t),l=arguments.length,d=o(l>1?arguments[1]:void 0,r),f=l>2?arguments[2]:void 0,N=void 0===f?r:o(f,r);N>d;)t[d++]=e;return t}},392:function(e){e.exports=JSON.parse('[{"label":"水泥工業","code":"01"},{"label":"食品工業","code":"02"},{"label":"石化業","code":"03"},{"label":"紡織纖維","code":"04"},{"label":"電機機械","code":"05"},{"label":"電器電纜","code":"06"},{"label":"玻璃陶瓷","code":"08"},{"label":"造紙工業","code":"09"},{"label":"鋼鐵工業","code":"10"},{"label":"橡膠工業","code":"11"},{"label":"汽車工業","code":"12"},{"label":"電子工業","code":"13"},{"label":"建材營造","code":"14"},{"label":"航運業","code":"15"},{"label":"觀光事業","code":"16"},{"label":"金融保險","code":"17"},{"label":"貿易百貨","code":"18"},{"label":"其他","code":"20"},{"label":"化學工業","code":"21"},{"label":"生技醫療業","code":"22"},{"label":"油電燃氣業","code":"23"},{"label":"半導體業","code":"24"},{"label":"電腦及週邊設備業","code":"25"},{"label":"光電業","code":"26"},{"label":"通信網路業","code":"27"},{"label":"電子零組件業","code":"28"},{"label":"電子通路業","code":"29"},{"label":"資訊服務業","code":"30"},{"label":"其他電子業","code":"31"},{"label":"文化創意業","code":"32"},{"label":"農業科技業","code":"33"},{"label":"電子商務","code":"34"},{"label":"管理股票","code":"98"}]')},395:function(e){e.exports=JSON.parse('[{"year":2013,"PNNL":1.0072,"IPCC":1.0072},{"year":2014,"PNNL":1.0146,"IPCC":1.0146},{"year":2015,"PNNL":1.0105,"IPCC":1.0105},{"year":2016,"PNNL":1.0238,"IPCC":1.0238},{"year":2017,"PNNL":1.0417,"IPCC":1.0417},{"year":2018,"PNNL":1.0353,"IPCC":1.0353},{"year":2019,"PNNL":1,"IPCC":1},{"year":2020,"PNNL":0.9545,"IPCC":0.9609},{"year":2021,"PNNL":0.9091,"IPCC":0.9218},{"year":2022,"PNNL":0.8636,"IPCC":0.8827},{"year":2023,"PNNL":0.8182,"IPCC":0.8436},{"year":2024,"PNNL":0.7727,"IPCC":0.8045},{"year":2025,"PNNL":0.7273,"IPCC":0.7655},{"year":2026,"PNNL":0.6818,"IPCC":0.7264},{"year":2027,"PNNL":0.6364,"IPCC":0.6873},{"year":2028,"PNNL":0.5909,"IPCC":0.6482},{"year":2029,"PNNL":0.5455,"IPCC":0.6091},{"year":2030,"PNNL":0.5,"IPCC":0.57},{"year":2031,"PNNL":0.475,"IPCC":0.5495},{"year":2032,"PNNL":0.45,"IPCC":0.529},{"year":2033,"PNNL":0.425,"IPCC":0.5085},{"year":2034,"PNNL":0.4,"IPCC":0.488},{"year":2035,"PNNL":0.375,"IPCC":0.4675},{"year":2036,"PNNL":0.35,"IPCC":0.447},{"year":2037,"PNNL":0.325,"IPCC":0.4265},{"year":2038,"PNNL":0.3,"IPCC":0.406},{"year":2039,"PNNL":0.275,"IPCC":0.3855},{"year":2040,"PNNL":0.25,"IPCC":0.365},{"year":2041,"PNNL":0.225,"IPCC":0.3445},{"year":2042,"PNNL":0.2,"IPCC":0.324},{"year":2043,"PNNL":0.175,"IPCC":0.3035},{"year":2044,"PNNL":0.15,"IPCC":0.283},{"year":2045,"PNNL":0.125,"IPCC":0.2625},{"year":2046,"PNNL":0.1,"IPCC":0.242},{"year":2047,"PNNL":0.075,"IPCC":0.2215},{"year":2048,"PNNL":0.05,"IPCC":0.201},{"year":2049,"PNNL":0.025,"IPCC":0.1805},{"year":2050,"PNNL":0,"IPCC":0.16}]')},438:function(e,t,r){"use strict";r.r(t);r(380),r(65);var n=r(385),o={props:{title:{type:String,required:!0},value:{type:Number,default:-1},color:{type:String,default:"#000"},type:{type:String,default:"fact",validator:function(e){return["bau","fact","noLabel","roadmap"].includes(e)}}},computed:{valueDiff:function(){return this.value-100},valueLabel:function(){return 0!==this.valueDiff?Object(n.k)(Math.abs(this.valueDiff)):" 0"},valueClass:function(){return this.valueDiff>0?"esgLegend__value--raise":this.valueDiff<0?"esgLegend__value--reduce":""}}},c=r(39),component=Object(c.a)(o,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"esgLegend flex items-center",class:["esgLegend--".concat(e.type)]},[t("div",{staticClass:"esgLegend__label flex-none",style:{background:e.color}}),t("div",{staticClass:"esgLegend__name flex-auto truncate"},[e._v(e._s(e.title))]),e.value>=0?t("div",{staticClass:"esgLegend__value flex-none",class:e.valueClass},[e._v(e._s(e.valueLabel))]):e._e()])}),[],!1,null,null,null);t.default=component.exports}}]);