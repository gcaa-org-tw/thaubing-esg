(window.webpackJsonp=window.webpackJsonp||[]).push([[37,15,16,17,18,19,20,21,26,28,29,31,32,33,35,36],{384:function(t,e,r){"use strict";r.d(e,"c",(function(){return C})),r.d(e,"e",(function(){return y})),r.d(e,"d",(function(){return v})),r.d(e,"a",(function(){return _})),r.d(e,"n",(function(){return P})),r.d(e,"h",(function(){return O})),r.d(e,"j",(function(){return L})),r.d(e,"i",(function(){return j})),r.d(e,"f",(function(){return w})),r.d(e,"k",(function(){return M})),r.d(e,"g",(function(){return S})),r.d(e,"b",(function(){return A})),r.d(e,"m",(function(){return T})),r.d(e,"l",(function(){return E}));r(30),r(45),r(46);var n=r(16),c=r(97),o=(r(51),r(64),r(37),r(36),r(13),r(29),r(382),r(390),r(52),r(244),r(240),r(99),r(393)),l=r(388),f=r(392),d=r(395);function h(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function m(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}new Date("2013-01-01"),new Date("2023-01-01");var C="-predict",y={MIN:120,MAX:200},v={START:2013,BASE:2019,END:2050},_={PNNL:"#358D53",IPCC:"#FACB3D"};function x(t){var e=Object(o.format)(t?".1%":".0%");return function(t){return e(t/100)}}var P=x(!0),N=[2013].concat(Object(c.a)(Object(l.range)(2015,v.END,5)),[v.END]).map((function(t){return new Date("".concat(t,"-01-01"))}));function O(t,e){if(e){var r=Object.keys(e.data.colors());if(e.show(),t){var c,o=m((c={},Object(n.a)(c,t,!0),Object(n.a)(c,"".concat(t).concat(C),!0),c),_);e.hide(r.filter((function(label){return!o[label]})))}}}function L(t){var e=t.stats,r=t.getUnitLabel,n=t.getUnitColor,o=t.isDashed,l=t.allUnits,f=void 0===l?null:l,h=t.handleClick,data={},m={},y=e.reduce((function(t,e){var n=e.年份,c=r(e);return t[n]||(t[n]={}),t[n][c]={tot:e.Tot變化,isDashed:o(e)},t}),{});d.forEach((function(t){y[t.year]||(y[t.year]={}),y[t.year].PNNL={tot:100*t.PNNL,isDashed:!1},y[t.year].IPCC={tot:100*t.IPCC,isDashed:!1}})),(f=f||Object.keys(y[v.BASE])).forEach((function(t){data[t]=[t],m[t]=n(t)})),m.PNNL=_.PNNL,m.IPCC=_.IPCC;var x=Object.keys(y).sort();x.forEach((function(t){f.forEach((function(e){var r=y[t][e]||{},n=void 0===r.tot?null:r.tot;if("isDashed"in r?r.isDashed:o(r)){var l="".concat(e).concat(C);if(!data[l]){var f=data[e].slice(1).fill(null),d=data[e].length-1;d>0&&(f[d-1]=data[e][d]),data[l]=[l].concat(Object(c.a)(f)),m[l]=m[e]}data[e].push(null),data[l].push(n)}else data[e].push(n)}))}));var P=["x"].concat(Object(c.a)(x.map((function(t){return"".concat(t,"-01-01")})))),N=[data.IPCC,data.PNNL],O=Object.keys(data).filter((function(t){return"IPCC"!==t&&"PNNL"!==t})).map((function(t){return data[t]}));return{x:"x",columns:[P].concat(N,Object(c.a)(O)),type:"line",types:{IPCC:"area",PNNL:"area"},colors:m,onclick:function(t,element){h&&h(t,element)}}}function j(t,e){return m({point:{r:2},grid:{y:{show:!0}},axis:{x:{type:"timeseries",tick:{values:N,format:"%Y"}},y:{max:t,tick:{format:x()}}},legend:{show:!1}},e)}function w(t){return t.body.map((function(t){return m(m({},t),{},{"年份":t.年份-0,"Tot數值":t.Tot數值-0,"Tot變化":t.Tot變化-0})}))}function I(t,e){var r=t-100;return r>0?'<div class="esgLegend__value esgLegend__value--raise">↑ '.concat(P(r),"</div>"):0===r?'<div class="esgLegend__value flex-none">&nbsp; --</div>':t>=e?'<div class="esgLegend__value esgLegend__value">↓ '.concat(P(-1*r),"</div>"):'<div class="esgLegend__value esgLegend__value--reduce">↓ '.concat(P(-1*r),"</div>")}function k(title,t,e,r){var n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",c="esgLegend";return n&&(c+=" esgLegend--".concat(n)),'\n<div class="'.concat(c,' flex items-center">\n<div class="esgLegend__label flex-none" style="background: ').concat(t,'"></div>\n<div class="esgLegend__name flex-auto truncate">').concat(title,"</div>\n").concat(I(e,r),"\n</div>\n")}function M(t){var e=t.isBau,r=t.findAnotherRow,n=t.findUnit;return function(data){var t=data[0].x.getFullYear(),c=data[0].id,o=!1;c.endsWith(C)&&(o=!0,c=c.slice(0,-1*C.length));var f=n(c);if(!f||!f.color)return"";var h=r(t,f),y=data[0].value,v=e?y:Object(l.get)(h,"Tot變化"),x="".concat(c).concat(o?" BAU":""),P="".concat(c," 目標"),N=e?Object(l.get)(h,"Tot變化"):y,O=d.find((function(e){return e.year===t}));return O=m(m({},O),{},{PNNL:100*O.PNNL,IPCC:100*O.IPCC}),'\n<div class="esgTp">\n<div class="esgTp__year lh-title">'.concat(t,'</div>\n<div class="esgTp__company">\n').concat(k(x,f.color,v,O.IPCC,o?"bau":"fact"),"\n").concat(void 0!==N?k(P,f.color,N,O.IPCC,"noLabel"):"",'\n</div>\n<div class="esgTp__roadmap">\n<div class="esgTp__roadmapTitle lh-title mb2">目標</div>\n').concat(k("IPCC",_.IPCC,O.IPCC,O.IPCC,"roadmap"),"\n").concat(k("PNNL",_.PNNL,O.PNNL,O.IPCC,"roadmap"),"\n<div>\n</div>\n")}}var S={computed:{companyAbbrMap:function(){var t=this;return Object.keys(this.companyMap).reduce((function(e,r){var n=t.companyMap[r];return e[n.公司簡稱]=n,e}),{})}}},A="per-industry";function T(i){return Object(o.interpolateCividis)((i+.7)/5)}var E={computed:{industries:function(){return[{label:"跨產業",code:A}].concat(Object(c.a)(f)).map((function(t,i){return m({},t)}))}},methods:{industryLink:function(t){return t===A?{name:"net-zero-overall"}:{name:"net-zero-industry",params:{industry:t},query:this.$route.query}}}}},389:function(t,e,r){var content=r(401);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("d51fc20c",content,!0,{sourceMap:!1})},390:function(t,e,r){var n=r(3),c=r(391),o=r(131);n({target:"Array",proto:!0},{fill:c}),o("fill")},391:function(t,e,r){"use strict";var n=r(40),c=r(102),o=r(48);t.exports=function(t){for(var e=n(this),r=o(e),l=arguments.length,f=c(l>1?arguments[1]:void 0,r),d=l>2?arguments[2]:void 0,h=void 0===d?r:c(d,r);h>f;)e[f++]=t;return e}},392:function(t){t.exports=JSON.parse('[{"label":"水泥工業","code":"01"},{"label":"食品工業","code":"02"},{"label":"石化業","code":"03"},{"label":"紡織纖維","code":"04"},{"label":"電機機械","code":"05"},{"label":"電器電纜","code":"06"},{"label":"玻璃陶瓷","code":"08"},{"label":"造紙工業","code":"09"},{"label":"鋼鐵工業","code":"10"},{"label":"橡膠工業","code":"11"},{"label":"汽車工業","code":"12"},{"label":"電子工業","code":"13"},{"label":"建材營造","code":"14"},{"label":"航運業","code":"15"},{"label":"觀光事業","code":"16"},{"label":"金融保險","code":"17"},{"label":"貿易百貨","code":"18"},{"label":"其他","code":"20"},{"label":"化學工業","code":"21"},{"label":"生技醫療業","code":"22"},{"label":"油電燃氣業","code":"23"},{"label":"半導體業","code":"24"},{"label":"電腦及週邊設備業","code":"25"},{"label":"光電業","code":"26"},{"label":"通信網路業","code":"27"},{"label":"電子零組件業","code":"28"},{"label":"電子通路業","code":"29"},{"label":"資訊服務業","code":"30"},{"label":"其他電子業","code":"31"},{"label":"文化創意業","code":"32"},{"label":"農業科技業","code":"33"},{"label":"電子商務","code":"34"},{"label":"管理股票","code":"98"}]')},394:function(t,e,r){var content=r(409);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("c8e0d78c",content,!0,{sourceMap:!1})},395:function(t){t.exports=JSON.parse('[{"year":2013,"PNNL":1.0072,"IPCC":1.0072},{"year":2014,"PNNL":1.0146,"IPCC":1.0146},{"year":2015,"PNNL":1.0105,"IPCC":1.0105},{"year":2016,"PNNL":1.0238,"IPCC":1.0238},{"year":2017,"PNNL":1.0417,"IPCC":1.0417},{"year":2018,"PNNL":1.0353,"IPCC":1.0353},{"year":2019,"PNNL":1,"IPCC":1},{"year":2020,"PNNL":0.9545,"IPCC":0.9609},{"year":2021,"PNNL":0.9091,"IPCC":0.9218},{"year":2022,"PNNL":0.8636,"IPCC":0.8827},{"year":2023,"PNNL":0.8182,"IPCC":0.8436},{"year":2024,"PNNL":0.7727,"IPCC":0.8045},{"year":2025,"PNNL":0.7273,"IPCC":0.7655},{"year":2026,"PNNL":0.6818,"IPCC":0.7264},{"year":2027,"PNNL":0.6364,"IPCC":0.6873},{"year":2028,"PNNL":0.5909,"IPCC":0.6482},{"year":2029,"PNNL":0.5455,"IPCC":0.6091},{"year":2030,"PNNL":0.5,"IPCC":0.57},{"year":2031,"PNNL":0.475,"IPCC":0.5495},{"year":2032,"PNNL":0.45,"IPCC":0.529},{"year":2033,"PNNL":0.425,"IPCC":0.5085},{"year":2034,"PNNL":0.4,"IPCC":0.488},{"year":2035,"PNNL":0.375,"IPCC":0.4675},{"year":2036,"PNNL":0.35,"IPCC":0.447},{"year":2037,"PNNL":0.325,"IPCC":0.4265},{"year":2038,"PNNL":0.3,"IPCC":0.406},{"year":2039,"PNNL":0.275,"IPCC":0.3855},{"year":2040,"PNNL":0.25,"IPCC":0.365},{"year":2041,"PNNL":0.225,"IPCC":0.3445},{"year":2042,"PNNL":0.2,"IPCC":0.324},{"year":2043,"PNNL":0.175,"IPCC":0.3035},{"year":2044,"PNNL":0.15,"IPCC":0.283},{"year":2045,"PNNL":0.125,"IPCC":0.2625},{"year":2046,"PNNL":0.1,"IPCC":0.242},{"year":2047,"PNNL":0.075,"IPCC":0.2215},{"year":2048,"PNNL":0.05,"IPCC":0.201},{"year":2049,"PNNL":0.025,"IPCC":0.1805},{"year":2050,"PNNL":0,"IPCC":0.16}]')},396:function(t){t.exports=JSON.parse('{"IPCC":"聯合國政府間氣候變化專門委員會（IPCC）於氣候變遷第六次評估報告（AR6）指出，全球溫室氣體排放量以2019年為基準年，應於2030年減排43％、於2050年減排84％。本站圖表依IPCC目標於2019年-2030年、2030年-2050年兩個區間內，進行線性推估，得到區間內每一年度之目標值。","PNNL":"綠色公民行動聯盟與美國西北太平洋實驗室（PNNL）合作，完成Low Emission Development Strategy for Taiwan研究報告。依據研究提出之模型，臺灣製造業以2019年為基準年，應於2030年減排50％，於2050年達成淨零碳排。本站圖表依PNNL製造業目標於2019年-2030年、2030年-2050年兩個區間內，進行線性推估，得到區間內每一年度之目標值。","BASE_YEAR_TITLE":"基準年","BASE_YEAR":"用意是讓不同企業的減碳成效能夠有相同的比較基準。在淨零路徑模擬器將2019年為基準年，以符合聯合國政府間氣候變化專門委員會（IPCC）所訂定的基準。","BAU_TITLE":"溫室氣體排放基線／一切照舊（Business As Usual, BAU）","BAU":"所謂的BAU是「不採取任何溫室氣體減量作為下，各個溫室氣體排放源的排放變化。」淨零路徑模擬器的排放量推估方式為：近四年排放量變化均值。","COMMITMENT_TITLE":"企業目標","COMMITMENT":"參照公開資訊觀測站－[溫室氣體排放及減量資訊](https://mops.twse.com.tw/mops/web/t152sb01)的資料，將企業的減碳目標規劃依2019做為基準年進行標準化處理後呈現。"}')},400:function(t,e,r){"use strict";r(389)},401:function(t,e,r){var n=r(27)(!1);n.push([t.i,".nzRemark__item[data-v-ad0f8cbc]:not(:last-child){margin-bottom:.5rem}",""]),t.exports=n},407:function(t,e,r){"use strict";r.r(e);var n=r(97),c=(r(13),r(51),r(64),r(41),r(247),r(396)),o={props:{fields:{type:Array,default:function(){return["BASE_YEAR"]},validator:function(t){return Array.isArray(t)&&t.every((function(t){return c[t]}))}}},computed:{fieldList:function(){var t=this;return this.fields.map((function(e,i){return{key:"".concat(e,"-").concat(i),title:c["".concat(e,"_TITLE")],remark:t.parseRemark(c[e])}}))}},methods:{parseRemark:function(line){var t=line.match(/([^[]+)\[([^\]]+)\]\(([^)]+)\)(.*)/);return t?[{tag:"span",text:t[1]},{tag:"a",text:t[2],href:t[3]}].concat(Object(n.a)(this.parseRemark(t[4]))):[{tag:"span",text:line}]}}},l=(r(400),r(39)),component=Object(l.a)(o,(function(){var t=this,e=t._self._c;return e("dl",{staticClass:"nzRemark f6"},t._l(t.fieldList,(function(r){return e("div",{key:r.key,staticClass:"nzRemark__item lh-copy flex"},[e("dt",{staticClass:"fw5 nowrap"},[t._v(t._s(r.title))]),e("span",[t._v("：")]),t._l(r.remark,(function(r,i){return e("dd",["a"===r.tag?e("a",{ref:"noopener",refInFor:!0,attrs:{href:r.href,target:"_blank"}},[t._v(t._s(r.text))]):e("span",[t._v(t._s(r.text))])])}))],2)})),0)}),[],!1,null,"ad0f8cbc",null);e.default=component.exports},408:function(t,e,r){"use strict";r(394)},409:function(t,e,r){var n=r(27)(!1);n.push([t.i,".esgFooter[data-v-11599e6b]{border-color:rgba(0,0,0,.062745098)}.esgFooter a[data-v-11599e6b]{color:#49591c;font-weight:500;text-decoration:underline}",""]),t.exports=n},413:function(t,e,r){"use strict";r.r(e);var n={computed:{buildTime:function(){return"2022-08-22T21:09:36Z"}}},c=(r(408),r(39)),component=Object(c.a)(n,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"esgFooter bt bw1 mv3 pv3 flex-ns justify-between tr tl-ns"},[t._m(0),e("div",{staticClass:"mt2 mt0-ns"},[t._m(1),e("div",{staticClass:"light-silver tr"},[t._v("更新時間： "+t._s(t.buildTime))])])])}),[function(){var t=this,e=t._self._c;return e("div",{staticClass:"mid-gray"},[e("div",{staticClass:"mb2"},[t._v("由"),e("a",{staticClass:"dim",attrs:{href:"http://www.gcaa.org.tw/"}},[t._v("綠色公民行動聯盟")]),t._v(" X "),e("a",{staticClass:"dim",attrs:{href:"https://thaubing.gcaa.org.tw/"}},[t._v("透明足跡計畫")]),t._v("推動")]),e("a",{staticClass:"dim",attrs:{href:"https://gcaa.neticrm.tw/civicrm/contribute/transact?reset=1&id=41&utm_source=Web&utm_content=ESG_donate&utm_campaign=TB3"}},[t._v("捐款支持")])])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"mid-gray"},[e("div",{staticClass:"mb2"},[e("a",{staticClass:"dim",attrs:{href:"https://github.com/gcaa-org-tw/thaubing-esg"}},[t._v("原始碼")]),t._v("以 MIT 釋出")]),e("div",[e("a",{staticClass:"dim",attrs:{href:"https://github.com/gcaa-org-tw/thaubing-esg/tree/main/data"}},[t._v("資料庫")]),t._v("以 "),e("a",{staticClass:"dim",attrs:{href:"https://creativecommons.org/licenses/by-nc/4.0/deed.zh_TW"}},[t._v("創用 CC 姓名標示-非商業性 4.0 國際 ")]),t._v("授權條款釋出")])])}],!1,null,"11599e6b",null);e.default=component.exports},415:function(t,e,r){"use strict";(function(t){r.d(e,"a",(function(){return l}));var n=r(16),c=(r(129),r(30),r(56),r(13),r(99),r(64),"ESG 檢測儀");function o(t,content){var e,r=t.startsWith("og:")?"property":"name";return e={hid:t},Object(n.a)(e,r,t),Object(n.a)(e,"content",content),e}function l(e){var title=e.title,r=e.description,n=e.coverUrl,l=t.env.SITE_URL||"https://thaubing-esg.gcaa.org.tw";function f(t){return"string"==typeof t?t:"function"==typeof t?t.call(this):t.toString()}return function(){var t=f.bind(this),head={meta:[]},e="".concat(t(title=title||"")),d=e?"".concat(e," | ").concat(c):c;if(head.title=d,head.meta.push(o("og:title",d)),head.meta.push(o("twitter:title",d)),r){var h=t(r);head.meta.push(o("description",h)),head.meta.push(o("og:description",h)),head.meta.push(o("twitter:description",h))}if(n){var m=t(n);m&&(m.startsWith("/")?m="".concat(l).concat(m):m.startsWith("http")||(m="".concat(l,"/").concat(m)),head.meta.push(o("og:image",m)),head.meta.push(o("twitter:image",m)),head.meta.push(o("twitter:card","summary_large_image")))}if(this&&(title||r||n)){var C="".concat(l).concat(this.$route.path);head.meta.push(o("og:url",C))}return head}}}).call(this,r(103))},418:function(t,e,r){var content=r(445);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("240cc10c",content,!0,{sourceMap:!1})},423:function(t,e,r){var content=r(448);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("584cef82",content,!0,{sourceMap:!1})},424:function(t,e,r){var content=r(450);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("21266f84",content,!0,{sourceMap:!1})},425:function(t,e,r){var content=r(452);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("5ff789d2",content,!0,{sourceMap:!1})},426:function(t,e,r){var content=r(454);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("06c5fb26",content,!0,{sourceMap:!1})},427:function(t,e,r){var content=r(456);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("d8755f92",content,!0,{sourceMap:!1})},428:function(t,e,r){var content=r(458);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("0e09fda0",content,!0,{sourceMap:!1})},429:function(t,e,r){var content=r(460);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("1474a6bf",content,!0,{sourceMap:!1})},430:function(t,e,r){var content=r(462);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("ba3992e6",content,!0,{sourceMap:!1})},431:function(t,e,r){var content=r(464);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("831d3c72",content,!0,{sourceMap:!1})},432:function(t,e,r){var content=r(466);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("099ef171",content,!0,{sourceMap:!1})},433:function(t,e,r){var content=r(468);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("cf8d9c30",content,!0,{sourceMap:!1})},444:function(t,e,r){"use strict";r(418)},445:function(t,e,r){var n=r(27)(!1);n.push([t.i,".singleCompany__chart[data-v-6c031bae]{height:22.5rem}",""]),t.exports=n},447:function(t,e,r){"use strict";r(423)},448:function(t,e,r){var n=r(27)(!1);n.push([t.i,".chartPanel[data-v-79797f5c]  .c3-chart-line .c3-line{stroke-width:3px}",""]),t.exports=n},449:function(t,e,r){"use strict";r(424)},450:function(t,e,r){var n=r(27)(!1);n.push([t.i,".chartPanel[data-v-f73fff02]  .c3-chart-line .c3-line{stroke-width:3px}",""]),t.exports=n},451:function(t,e,r){"use strict";r(425)},452:function(t,e,r){var n=r(27)(!1);n.push([t.i,".chartPanel[data-v-595b5ff3]  .c3-chart-line .c3-line{stroke-width:3px}",""]),t.exports=n},453:function(t,e,r){"use strict";r(426)},454:function(t,e,r){var n=r(27)(!1);n.push([t.i,".chartPanel[data-v-1b106016]  .c3-chart-line .c3-line{stroke-width:3px}",""]),t.exports=n},455:function(t,e,r){"use strict";r(427)},456:function(t,e,r){var n=r(27)(!1);n.push([t.i,".chartPanel[data-v-198290dd]  .c3-chart-line .c3-line{stroke-width:3px}",""]),t.exports=n},457:function(t,e,r){"use strict";r(428)},458:function(t,e,r){var n=r(27)(!1);n.push([t.i,".chartPanel[data-v-b96014f4]  .c3-chart-line .c3-line{stroke-width:3px}",""]),t.exports=n},459:function(t,e,r){"use strict";r(429)},460:function(t,e,r){var n=r(27)(!1);n.push([t.i,".chartPanel[data-v-179f0a74]  .c3-chart-line .c3-line{stroke-width:3px}",""]),t.exports=n},461:function(t,e,r){"use strict";r(430)},462:function(t,e,r){var n=r(27)(!1);n.push([t.i,"",""]),t.exports=n},463:function(t,e,r){"use strict";r(431)},464:function(t,e,r){var n=r(27)(!1);n.push([t.i,".chartPanel[data-v-5a2e628f]  .c3-chart-line .c3-line{stroke-width:3px}",""]),t.exports=n},465:function(t,e,r){"use strict";r(432)},466:function(t,e,r){var n=r(27)(!1);n.push([t.i,".chartPanel[data-v-23a2c74a]  .c3-chart-line .c3-line{stroke-width:3px}",""]),t.exports=n},467:function(t,e,r){"use strict";r(433)},468:function(t,e,r){var n=r(27)(!1);n.push([t.i,".chartPanel[data-v-72ff6106]  .c3-chart-line .c3-line{stroke-width:3px}",""]),t.exports=n},497:function(t,e,r){var content=r(533);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("1fdc8478",content,!0,{sourceMap:!1})},506:function(t,e,r){"use strict";r.r(e);r(37),r(30),r(45),r(29),r(46);var n=r(97),c=r(16),o=(r(240),r(13),r(51),r(36),r(64),r(129),r(41),r(81),r(388)),l=r(393),f=r(384);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m={BAU:{LABEL:"BAU",COLOR:Object(l.interpolateCividis)(0)},CI:{LABEL:"CI",COLOR:Object(l.interpolateCividis)(.75)}},C={mixins:[f.g],props:{bauStats:{type:Array,required:!0},ciStats:{type:Array,required:!0},company:{type:Object,required:!0}},data:function(){var t=this;return{c3Handler:null,genBauTooltip:Object(f.k)({isBau:!0,findUnit:function(){return{color:m.BAU.COLOR}},findAnotherRow:function(e){return t.ciStats.find((function(t){return t.年份===e}))}}),genCiTooltip:Object(f.k)({isBau:!1,findUnit:function(){return{color:m.BAU.COLOR}},findAnotherRow:function(e){return t.bauStats.find((function(t){return t.年份===e}))}})}},computed:{hasNoData:function(){return!this.bauStats.length},stats:function(){var t=this.bauStats.map((function(t){return h(h({},t),{},{label:m.BAU.LABEL,isPredicted:!!t.是預測值})})),e=this.ciStats.filter((function(t){return!t.是推估值})).map((function(t){return h(h({},t),{},{label:m.CI.LABEL,isPredicted:!0})}));return[].concat(Object(n.a)(t),Object(n.a)(e))},yMax:function(){return this.stats.reduce((function(t,e){return t===f.e.MAX?t:e.Tot變化>t?Math.min(e.Tot變化,f.e.MAX):t}),f.e.MIN)},chartData:function(){return Object(f.j)({stats:this.stats,getUnitLabel:function(t){return t.label},getUnitColor:function(label){return Object(o.get)(m,"".concat(label,".COLOR"),"")},isDashed:function(t){return!("isPredicted"in t)||!!t.isPredicted},allUnits:["IPCC","PNNL",m.BAU.LABEL,m.CI.LABEL]})},c3Config:function(){return Object(f.i)(this.yMax,{line:{connectNull:!0},tooltip:{grouped:!1,contents:this.genTooltip}})}},watch:{bauStats:function(){this.updateChart()}},mounted:function(){this.initChart()},methods:{initChart:function(){var t=r(399);this.c3Handler=t.generate(h(h({data:this.chartData},this.c3Config),{},{bindto:this.$refs.chart}))},updateChart:function(){this.c3Handler?(this.c3Handler.axis.max({y:this.yMax}),this.c3Handler.load({unload:!0,columns:this.chartData.columns})):this.initChart()},genTooltip:function(data){var label=data[0].id;if("IPCC"===label||"PNNL"===label)return"";var t=label.startsWith(m.BAU.LABEL),e=t?m.BAU.LABEL:m.CI.LABEL,r=label.replace(e,this.company.公司簡稱),n=[h(h({},data[0]),{},{id:r})];return t?this.genBauTooltip(n):this.genCiTooltip(n)}}},y=(r(444),r(39)),component=Object(y.a)(C,(function(){var t=this,e=t._self._c;return e("chart-panel",{attrs:{title:"淨零路徑"}},[e("div",{staticClass:"singleCompany",attrs:{slot:"chart"},slot:"chart"},[e("div",{staticClass:"singleCompany__chart relative"},[e("div",{ref:"chart",staticClass:"netZeroChart",class:{"netZeroChart--blur":t.hasNoData}}),t.hasNoData?e("div",{staticClass:"aspect-ratio--object flex items-center justify-center"},[e("div",{staticClass:"f3 fw5 gray pb4"},[t._v("無資料")])]):t._e()]),e("div",{staticClass:"mt2"},[e("net-zero-remark",{attrs:{fields:["BASE_YEAR","BAU","COMMITMENT"]}})],1)])])}),[],!1,null,"6c031bae",null);e.default=component.exports;installComponents(component,{NetZeroRemark:r(407).default,ChartPanel:r(379).default})},507:function(t,e,r){"use strict";r.r(e);var n=r(378),c=r(380),o={mixins:[Object(c.a)(n.b,"溫室氣體排放")],computed:{c3Config:function(){return{data:{x:"x",columns:this.dumpSubCatStats(),type:"bar",groups:[["範疇一直接排放","範疇二間接排放"]],axes:{"範疇一直接排放":"y","範疇二間接排放":"y","碳密集度":"y2"}},point:{r:6},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{label:this.measureMap.範疇二間接排放.unit,tick:{format:this.genYFormatter()}}}}}}},l=(r(447),r(39)),component=Object(l.a)(o,(function(){return(0,this._self._c)("chart-panel",{attrs:{title:"溫室氣體排放",unit:["公噸CO2e","公噸/億元"],"c3-config":this.c3Config}})}),[],!1,null,"79797f5c",null);e.default=component.exports;installComponents(component,{ChartPanel:r(379).default})},508:function(t,e,r){"use strict";r.r(e);var n=r(378),c=r(380),o={mixins:[Object(c.a)(n.b,"溫室氣體排放",!0)],computed:{c3Config:function(){return{data:{x:"x",columns:this.dumpSubCatStats(),type:"bar",groups:[["範疇一直接排放","範疇二間接排放","範疇三其他排放"]],types:{"碳密集度":"line"},axes:{"範疇一直接排放":"y","範疇二間接排放":"y","碳密集度":"y2"},colors:{"碳密集度":"#555"}},point:{r:6},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{label:this.measureMap.範疇二間接排放.unit,tick:{format:this.genYFormatter()}},y2:{show:!0,label:this.measureMap.碳密集度.unit,tick:{format:this.genYFormatter()}}}}}}},l=(r(449),r(39)),component=Object(l.a)(o,(function(){return(0,this._self._c)("chart-panel",{attrs:{title:"溫室氣體排放","is-self-report":!0,unit:["公噸CO2e","公噸/億元"],"c3-config":this.c3Config}})}),[],!1,null,"f73fff02",null);e.default=component.exports;installComponents(component,{ChartPanel:r(379).default})},509:function(t,e,r){"use strict";r.r(e);r(65);var n=r(378),c=r(380),o={mixins:[Object(c.a)(n.b,(function(t){return"能源使用狀況"===t.subCat&&["總用電量","能源密集度"].includes(t.measure)}))],computed:{c3Config:function(){return{data:{x:"x",columns:this.dumpSubCatStats(),type:"bar",types:{"能源密集度":"line"},axes:{"總用電量":"y","能源密集度":"y2"},colors:{"能源密集度":"#555"}},point:{r:6},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{label:this.measureMap.總用電量.unit,tick:{format:this.genYFormatter()}},y2:{show:!0,label:this.measureMap.能源密集度.unit,tick:{format:this.genYFormatter()}}}}}}},l=(r(451),r(39)),component=Object(l.a)(o,(function(){return(0,this._self._c)("chart-panel",{attrs:{title:"年度總用電量","is-self-report":!0,unit:["度","度/億元"],"c3-config":this.c3Config}})}),[],!1,null,"595b5ff3",null);e.default=component.exports;installComponents(component,{ChartPanel:r(379).default})},510:function(t,e,r){"use strict";r.r(e);r(65);var n=r(378),c=r(380),o={mixins:[Object(c.a)(n.b,(function(t){return"能源使用狀況"===t.subCat&&["再生能源設置量","再生能源發電量"].includes(t.measure)}))],computed:{c3Config:function(){return{data:{x:"x",columns:this.dumpSubCatStats(),type:"bar",types:{"再生能源設置量":"line"},axes:{"再生能源發電量":"y","再生能源設置量":"y2"},colors:{"再生能源設置量":"#555"}},point:{r:6},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{label:this.measureMap.再生能源發電量.unit,tick:{format:this.genYFormatter()}},y2:{show:!0,label:this.measureMap.再生能源設置量.unit,tick:{format:this.genYFormatter()}}}}}}},l=(r(453),r(39)),component=Object(l.a)(o,(function(){return(0,this._self._c)("chart-panel",{attrs:{title:"再生能源","is-self-report":!0,unit:["KW","度"],"c3-config":this.c3Config}})}),[],!1,null,"1b106016",null);e.default=component.exports;installComponents(component,{ChartPanel:r(379).default})},511:function(t,e,r){"use strict";r.r(e);var n=r(378),c=r(380),o={mixins:[Object(c.a)(n.b,"水資源",!0)],computed:{c3Config:function(){return{data:{x:"x",columns:this.dumpSubCatStats(),axes:{"回收水量":"y","耗用水量":"y","排放水量":"y","總取水量":"y2"},colors:{"總取水量":"#555"}},point:{r:6},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{label:this.measureMap.耗用水量.unit,tick:{format:this.genYFormatter()}},y2:{show:!0,label:this.measureMap.總取水量.unit,tick:{format:this.genYFormatter()}}}}}}},l=(r(455),r(39)),component=Object(l.a)(o,(function(){return(0,this._self._c)("chart-panel",{attrs:{title:"水資源","is-self-report":!0,unit:["噸"],"c3-config":this.c3Config}})}),[],!1,null,"198290dd",null);e.default=component.exports;installComponents(component,{ChartPanel:r(379).default})},512:function(t,e,r){"use strict";r.r(e);var n=r(378),c=r(380),o={mixins:[Object(c.a)(n.b,"廢棄物管理",!0)],computed:{c3Config:function(){return{data:{x:"x",columns:this.dumpSubCatStats(),type:"bar",groups:[["一般事業廢棄物","有害事業廢棄物","資源化再利用"]]},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{label:this.measureMap.一般事業廢棄物.unit,tick:{format:this.genYFormatter()}}}}}}},l=(r(457),r(39)),component=Object(l.a)(o,(function(){return(0,this._self._c)("chart-panel",{attrs:{title:"廢棄物管理","is-self-report":!0,unit:["噸"],"c3-config":this.c3Config}})}),[],!1,null,"b96014f4",null);e.default=component.exports;installComponents(component,{ChartPanel:r(379).default})},513:function(t,e,r){"use strict";r.r(e);r(13),r(29),r(397);var n=r(378),c=r(380),o={mixins:[Object(c.a)(n.b,(function(t){return"環境違規"===t.subCat&&t.onlyDetail}))],computed:{c3Config:function(){var t=this.dumpSubCatStats(),e={"違反環境法規金額-空氣":"因空氣污染遭裁罰金額","違反環境法規金額-水":"因水污染遭裁罰金額","違反環境法規金額-misc":"其他違規項目金額"};return t.forEach((function(t){e[t[0]]&&(t[0]=e[t[0]])})),{data:{x:"x",columns:t,type:"bar",groups:[Object.values(e)]},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{label:this.measureMap["違反環境法規金額-空氣"].unit,tick:{format:this.genYFormatter()}}}}}}},l=(r(459),r(39)),component=Object(l.a)(o,(function(){return(0,this._self._c)("chart-panel",{attrs:{title:"違反環境法規",unit:["金額"],"c3-config":this.c3Config}})}),[],!1,null,"179f0a74",null);e.default=component.exports;installComponents(component,{ChartPanel:r(379).default})},514:function(t,e,r){"use strict";r.r(e);r(129);var n=r(378),c=r(380),o={mixins:[Object(c.a)(n.b,(function(t){return t.subCat.startsWith("空氣污染物申報-一般空氣污染物")}))],computed:{c3Config:function(){return{data:{x:"x",columns:this.dumpSubCatStats()},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{tick:{format:this.genYFormatter()}}}}}}},l=r(39),component=Object(l.a)(o,(function(){return(0,this._self._c)("chart-panel",{attrs:{title:"一般空氣污染物",unit:["公噸"],"c3-config":this.c3Config}})}),[],!1,null,"6a6149ba",null);e.default=component.exports;installComponents(component,{ChartPanel:r(379).default})},515:function(t,e,r){"use strict";r.r(e);r(129);var n=r(378),c=r(380),o={mixins:[Object(c.a)(n.b,(function(t){return t.subCat.startsWith("空氣污染物申報-有害空氣污染物")}))],computed:{c3Config:function(){return{data:{x:"x",columns:this.dumpSubCatStats(),axes:{"戴奧辛":"y2"}},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{tick:{label:"公噸",format:this.genYFormatter()}},y2:{show:!0,label:"戴奧辛（公斤）",tick:{format:this.genYFormatter()}}}}}}},l=r(39),component=Object(l.a)(o,(function(){return(0,this._self._c)("chart-panel",{attrs:{title:"有害空氣污染物",unit:["公噸","公斤"],"c3-config":this.c3Config}})}),[],!1,null,"7f1a9ef3",null);e.default=component.exports;installComponents(component,{ChartPanel:r(379).default})},516:function(t,e,r){"use strict";r.r(e);var n=r(378),c=r(380),o={mixins:[Object(c.a)(n.d,"員工薪資")],computed:{c3Config:function(){return{data:{x:"x",columns:this.dumpSubCatStats(),type:"line"},ppoint:{r:6},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{label:this.measureMap.平均薪資.unit,tick:{format:this.genYFormatter(!0)}}}}}}},l=(r(461),r(39)),component=Object(l.a)(o,(function(){return(0,this._self._c)("chart-panel",{attrs:{title:"員工薪資",unit:"仟元","c3-config":this.c3Config}})}),[],!1,null,"1810776e",null);e.default=component.exports;installComponents(component,{ChartPanel:r(379).default})},517:function(t,e,r){"use strict";r.r(e);r(129);var n=r(378),c=r(380),o={mixins:[Object(c.a)(n.d,(function(t){return"員工組成"===t.subCat&&("正式員工"===t.measure||t.measure.startsWith("是否"))}))],computed:{c3Config:function(){return{data:{x:"x",columns:this.dumpSubCatStats(),type:"bar",types:{"正式員工":"line"},axes:{"正式員工":"y","是否聘用移工":"y2","是否聘用身障人士":"y2","是否聘用原住民":"y2"}},point:{r:6},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{label:this.measureMap.正式員工.unit,tick:{format:this.genYFormatter()}},y2:{show:!0,label:this.measureMap.是否聘用移工.unit,tick:{format:this.genYFormatter()}}}}}}},l=(r(463),r(39)),component=Object(l.a)(o,(function(){return(0,this._self._c)("chart-panel",{attrs:{title:"員工組成","is-self-report":!0,unit:["人"],"c3-config":this.c3Config}})}),[],!1,null,"5a2e628f",null);e.default=component.exports;installComponents(component,{ChartPanel:r(379).default})},518:function(t,e,r){"use strict";r.r(e);r(65);var n=r(393),c=r(378),o=r(380),l={mixins:[Object(o.a)(c.d,(function(t){return"員工組成"===t.subCat&&["性別比","新進率","離職率"].includes(t.measure)}))],computed:{c3Config:function(){return{data:{x:"x",columns:this.dumpSubCatStats(),axes:{"性別比":"y","新進率":"y2","離職率":"y2"}},point:{r:6},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{label:this.measureMap.性別比.unit},y2:{show:!0,label:this.measureMap.新進率.unit,tick:{format:Object(n.format)(".02%")}}}}}}},f=(r(465),r(39)),component=Object(f.a)(l,(function(){return(0,this._self._c)("chart-panel",{attrs:{title:"員工組成","is-self-report":!0,unit:["男/女","人/正式員工"],"c3-config":this.c3Config}})}),[],!1,null,"23a2c74a",null);e.default=component.exports;installComponents(component,{ChartPanel:r(379).default})},519:function(t,e,r){"use strict";r.r(e);var n=r(378),c=r(380),o={mixins:[Object(c.a)(n.c,"營運狀況")],computed:{c3Config:function(){return{data:{x:"x",columns:this.dumpSubCatStats(),type:"bar",groups:[["營業成本","營業費用"]],types:{"淨利":"line"},axes:{"營業成本":"y","營業費用":"y","營業收入":"y","淨利":"y2"},colors:{"碳密集度":"#555"}},point:{r:6},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{label:this.measureMap.營業收入.unit,tick:{format:this.genYFormatter(!0)}},y2:{show:!0,label:this.measureMap.淨利.unit,tick:{format:this.genYFormatter(!0)}}}}}}},l=(r(467),r(39)),component=Object(l.a)(o,(function(){return(0,this._self._c)("chart-panel",{attrs:{title:"營運狀況",unit:"仟元","c3-config":this.c3Config}})}),[],!1,null,"72ff6106",null);e.default=component.exports;installComponents(component,{ChartPanel:r(379).default})},530:function(t,e,r){var n=r(3),c=r(531);n({target:"Number",stat:!0,forced:Number.parseInt!=c},{parseInt:c})},531:function(t,e,r){var n=r(7),c=r(6),o=r(5),l=r(17),f=r(241).trim,d=r(160),h=n.parseInt,m=n.Symbol,C=m&&m.iterator,y=/^[+-]?0x/i,v=o(y.exec),_=8!==h(d+"08")||22!==h(d+"0x16")||C&&!c((function(){h(Object(C))}));t.exports=_?function(t,e){var r=f(l(t));return h(r,e>>>0||(v(y,r)?16:10))}:h},532:function(t,e,r){"use strict";r(497)},533:function(t,e,r){var n=r(27)(!1);n.push([t.i,".company__subtitle[data-v-d4a9bf94]{margin:3.25rem 0 1rem;color:#373737}@media screen and (min-width:60em){.charts[data-v-d4a9bf94]{display:grid;grid-template-columns:1fr 1fr;grid-column-gap:1.5rem;-moz-column-gap:1.5rem;column-gap:1.5rem;grid-row-gap:1.5rem;row-gap:1.5rem}}.charts__item[data-v-d4a9bf94]{height:24rem}.charts__item--two[data-v-d4a9bf94]{height:26rem;grid-column:1/3}",""]),t.exports=n},567:function(t,e,r){"use strict";r.r(e);var n=r(12),c=(r(55),r(240),r(13),r(530),r(381),r(415)),o=r(384),l={asyncData:function(t){return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,c,l,f,d,h,m,C,y;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.$content,n=t.params,c=t.redirect,l=t.store,f=null,e.next=4,r("companyList").fetch();case 4:return d=e.sent,h=d.body.find((function(t){return t.統編===n.company}))||{},m=h.公司簡稱,e.prev=7,e.next=10,r("company",m).fetch();case 10:f=e.sent,e.next=16;break;case 13:e.prev=13,e.t0=e.catch(7),c("/");case 16:if(f){e.next=18;break}return e.abrupt("return");case 18:return C=[],y=[],e.prev=20,e.next=23,r("company","".concat(m,"-bau")).fetch();case 23:return C=e.sent,C=Object(o.f)(C),e.next=27,r("company","".concat(m,"-net-zero-commitment")).fetch();case 27:y=e.sent,y=Object(o.f)(y),e.next=33;break;case 31:e.prev=31,e.t1=e.catch(20);case 33:return l.commit("setCompany",h),e.abrupt("return",{stats:f,company:h,bauStats:C,ciStats:y});case 35:case"end":return e.stop()}}),e,null,[[7,13],[20,31]])})))()},head:Object(c.a)({title:function(){return this.company.公司簡稱}}),computed:{capital:function(){var t=this.stats.body.reduce((function(t,e){return"資本額"===e.項目&&e.年份>t.年份?e:t}),{"年份":"1970"});return Number.parseInt(t.數值).toLocaleString()||"？"}}},f=(r(532),r(39)),component=Object(f.a)(l,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"company"},[e("div",{staticClass:"mw8 center mt4 ph3"},[e("h1",{staticClass:"green fw5 f3"},[t._v(t._s(t.company.公司名稱))]),e("div",{staticClass:"green"},[t._v(t._s(t.company.自訂產業別)+" · 資本額 "+t._s(t.capital)+" 元")]),e("div",{staticClass:"company__subtitle"},[e("net-zero-single-company",{attrs:{"bau-stats":t.bauStats,"ci-stats":t.ciStats,company:t.company}})],1),e("div",{staticClass:"company__subtitle"},[t._v("Environment 環境保護相關數據")]),e("div",{staticClass:"charts"},[e("div",{staticClass:"charts__item"},[e("gh-gas-chart",{attrs:{stats:t.stats.body}})],1),e("div",{staticClass:"charts__item"},[e("gh-gas-self-chart",{attrs:{stats:t.stats.body}})],1),e("div",{staticClass:"charts__item"},[e("power-usage-self-chart",{attrs:{stats:t.stats.body}})],1),e("div",{staticClass:"charts__item"},[e("re-power-self-chart",{attrs:{stats:t.stats.body}})],1),e("div",{staticClass:"charts__item"},[e("water-self-chart",{attrs:{stats:t.stats.body}})],1),e("div",{staticClass:"charts__item"},[e("waste-self-chart",{attrs:{stats:t.stats.body}})],1),e("div",{staticClass:"charts__item charts__item--two"},[e("penalty-chart",{attrs:{stats:t.stats.body}})],1),e("div",{staticClass:"charts__item charts__item"},[e("regular-air-pollution-chart",{attrs:{stats:t.stats.body}})],1),e("div",{staticClass:"charts__item charts__item"},[e("harmful-air-pollution-chart",{attrs:{stats:t.stats.body}})],1)]),e("div",{staticClass:"company__subtitle"},[t._v("Social 社會責任相關數據")]),e("div",{staticClass:"charts"},[e("div",{staticClass:"charts__item charts__item--two"},[e("salary-chart",{attrs:{stats:t.stats.body}})],1),e("div",{staticClass:"charts__item"},[e("crew-count-self-chart",{attrs:{stats:t.stats.body}})],1),e("div",{staticClass:"charts__item"},[e("crew-ratio-self-chart",{attrs:{stats:t.stats.body}})],1)]),e("div",{staticClass:"company__subtitle"},[t._v("Governance 治理相關數據")]),e("div",{staticClass:"charts mb4"},[e("div",{staticClass:"charts__item charts__item--two"},[e("income-chart",{attrs:{stats:t.stats.body}})],1)]),e("gcaa-footer")],1)])}),[],!1,null,"d4a9bf94",null);e.default=component.exports;installComponents(component,{NetZeroSingleCompany:r(506).default,GhGasChart:r(507).default,GhGasSelfChart:r(508).default,PowerUsageSelfChart:r(509).default,RePowerSelfChart:r(510).default,WaterSelfChart:r(511).default,WasteSelfChart:r(512).default,PenaltyChart:r(513).default,RegularAirPollutionChart:r(514).default,HarmfulAirPollutionChart:r(515).default,SalaryChart:r(516).default,CrewCountSelfChart:r(517).default,CrewRatioSelfChart:r(518).default,IncomeChart:r(519).default,GcaaFooter:r(413).default})}}]);