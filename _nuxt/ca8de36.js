(window.webpackJsonp=window.webpackJsonp||[]).push([[42,16],{386:function(t,e,r){var n=r(3),o=r(245).values;n({target:"Object",stat:!0},{values:function(t){return o(t)}})},388:function(t,e,r){var n=r(3),o=r(392);n({target:"Number",stat:!0,forced:Number.parseFloat!=o},{parseFloat:o})},392:function(t,e,r){var n=r(7),o=r(6),c=r(5),l=r(16),d=r(241).trim,f=r(158),v=c("".charAt),m=n.parseFloat,h=n.Symbol,_=h&&h.iterator,y=1/m(f+"-0")!=-1/0||_&&!o((function(){m(Object(_))}));t.exports=y?function(t){var e=d(l(t)),r=m(e);return 0===r&&"-"==v(e,0)?-0:r}:m},400:function(t,e,r){var content=r(405);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("6e1e522f",content,!0,{sourceMap:!1})},404:function(t,e,r){"use strict";r(400)},405:function(t,e,r){var n=r(27)(!1);n.push([t.i,".esgFooter[data-v-73084c53]{border-color:rgba(0,0,0,.062745098)}.esgFooter a[data-v-73084c53]{color:#49591c;font-weight:500;text-decoration:underline}",""]),t.exports=n},408:function(t){t.exports=JSON.parse('[{"label":"水泥工業","code":"01"},{"label":"食品工業","code":"02"},{"label":"石化業","code":"03"},{"label":"紡織纖維","code":"04"},{"label":"電機機械","code":"05"},{"label":"電器電纜","code":"06"},{"label":"玻璃陶瓷","code":"08"},{"label":"造紙工業","code":"09"},{"label":"鋼鐵工業","code":"10"},{"label":"橡膠工業","code":"11"},{"label":"汽車工業","code":"12"},{"label":"電子工業","code":"13"},{"label":"建材營造","code":"14"},{"label":"航運業","code":"15"},{"label":"觀光事業","code":"16"},{"label":"金融保險","code":"17"},{"label":"貿易百貨","code":"18"},{"label":"其他","code":"20"},{"label":"化學工業","code":"21"},{"label":"生技醫療業","code":"22"},{"label":"油電燃氣業","code":"23"},{"label":"半導體業","code":"24"},{"label":"電腦及週邊設備業","code":"25"},{"label":"光電業","code":"26"},{"label":"通信網路業","code":"27"},{"label":"電子零組件業","code":"28"},{"label":"電子通路業","code":"29"},{"label":"資訊服務業","code":"30"},{"label":"其他電子業","code":"31"},{"label":"文化創意業","code":"32"},{"label":"農業科技業","code":"33"},{"label":"電子商務","code":"34"},{"label":"管理股票","code":"98"}]')},410:function(t,e,r){"use strict";r.r(e);var n={computed:{buildTime:function(){return"2023-06-15T11:16:38Z"}}},o=(r(404),r(29)),component=Object(o.a)(n,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"esgFooter bt bw1 mt3 pt3 pb4 flex-ns justify-between tr tl-ns"},[t._m(0),e("div",{staticClass:"mt2 mt0-ns"},[t._m(1),e("div",{staticClass:"light-silver tr"},[t._v("更新時間： "+t._s(t.buildTime))])])])}),[function(){var t=this,e=t._self._c;return e("div",{staticClass:"mid-gray"},[e("div",{staticClass:"mb2"},[t._v("由"),e("a",{staticClass:"dim",attrs:{href:"http://www.gcaa.org.tw/"}},[t._v("綠色公民行動聯盟")]),t._v(" X "),e("a",{staticClass:"dim",attrs:{href:"https://thaubing.gcaa.org.tw/"}},[t._v("透明足跡計畫")]),t._v("推動")]),e("a",{staticClass:"dim",attrs:{href:"https://gcaa.neticrm.tw/civicrm/contribute/transact?reset=1&id=41&utm_source=Web&utm_content=ESG_donate&utm_campaign=TB3"}},[t._v("捐款支持")])])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"mid-gray"},[e("div",{staticClass:"mb2"},[e("a",{staticClass:"dim",attrs:{href:"https://github.com/gcaa-org-tw/thaubing-esg"}},[t._v("原始碼")]),t._v("以 MIT 釋出")]),e("div",[e("a",{staticClass:"dim",attrs:{href:"https://github.com/gcaa-org-tw/thaubing-esg/tree/main/data"}},[t._v("資料庫")]),t._v("以 "),e("a",{staticClass:"dim",attrs:{href:"https://creativecommons.org/licenses/by-nc/4.0/deed.zh_TW"}},[t._v("創用 CC 姓名標示-非商業性 4.0 國際 ")]),t._v("授權條款釋出")])])}],!1,null,"73084c53",null);e.default=component.exports},414:function(t,e,r){"use strict";(function(t){r.d(e,"a",(function(){return l}));var n=r(17),o=(r(131),r(31),r(56),r(13),r(101),r(64),"ESG 檢測儀");function c(t,content){var e,r=t.startsWith("og:")?"property":"name";return e={hid:t},Object(n.a)(e,r,t),Object(n.a)(e,"content",content),e}function l(e){var title=e.title,r=e.description,n=e.coverUrl,l=t.env.SITE_URL||"https://thaubing-esg.gcaa.org.tw";function d(t){return"string"==typeof t?t:"function"==typeof t?t.call(this):t.toString()}return function(){var t=d.bind(this),head={meta:[]},e="".concat(t(title=title||"")),f=e?"".concat(e," | ").concat(o):o;if(head.title=f,head.meta.push(c("og:title",f)),head.meta.push(c("twitter:title",f)),r){var v=t(r);head.meta.push(c("description",v)),head.meta.push(c("og:description",v)),head.meta.push(c("twitter:description",v))}if(n){var m=t(n);m&&(m.startsWith("/")?m="".concat(l).concat(m):m.startsWith("http")||(m="".concat(l,"/").concat(m)),head.meta.push(c("og:image",m)),head.meta.push(c("twitter:image",m)),head.meta.push(c("twitter:card","summary_large_image")))}if(this&&(title||r||n)){var h="".concat(l).concat(this.$route.path);head.meta.push(c("og:url",h))}return head}}}).call(this,r(103))},462:function(t,e,r){var content=r(513);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("734c7d10",content,!0,{sourceMap:!1})},508:function(t,e,r){"use strict";var n=r(3),o=r(509),c=r(40),l=r(48),d=r(67),f=r(134);n({target:"Array",proto:!0},{flat:function(){var t=arguments.length?arguments[0]:void 0,e=c(this),r=l(e),n=f(e,0);return n.length=o(n,e,e,r,0,void 0===t?1:d(t)),n}})},509:function(t,e,r){"use strict";var n=r(104),o=r(48),c=r(163),l=r(66),d=function(t,e,source,r,f,v,m,h){for(var element,_,y=f,w=0,C=!!m&&l(m,h);w<r;)w in source&&(element=C?C(source[w],w,e):source[w],v>0&&n(element)?(_=o(element),y=d(t,e,element,_,y,v-1)-1):(c(y+1),t[y]=element),y++),w++;return y};t.exports=d},510:function(t,e,r){r(132)("flat")},511:function(t){t.exports=JSON.parse('{"a":{"E":["碳密集度","能源密集度"]}}')},512:function(t,e,r){"use strict";r(462)},513:function(t,e,r){var n=r(27)(!1);n.push([t.i,".invTellerWrapper[data-v-740ad5e8]{width:100%;max-height:50vh;overflow:auto}@media screen and (min-width:60em){.invTellerWrapper[data-v-740ad5e8]{max-height:none}}.invTeller[data-v-740ad5e8]{display:grid;grid-row-gap:.375rem;row-gap:.375rem;max-width:80rem;min-width:48rem;position:relative}.invTeller__measureHead[data-v-740ad5e8]{grid-column:1/span 2;left:0;z-index:1}.invTeller__fundHead[data-v-740ad5e8],.invTeller__measureHead[data-v-740ad5e8]{padding:.375rem .625rem;position:-webkit-sticky;position:sticky;top:0;background:#ebedeb}.invTeller__stat[data-v-740ad5e8]{background:#fff;height:2rem}.invTeller__stat[data-v-740ad5e8],.invTeller__unit[data-v-740ad5e8]{position:-webkit-sticky;position:sticky;left:0}.invTeller__statVal[data-v-740ad5e8]{background:#c1c1c1;color:#000}.invTeller__statVal--red[data-v-740ad5e8]{background:#e24243;color:#fff}.invTeller__statVal--green[data-v-740ad5e8]{background:#6fac45}.invTeller__statVal--yellow[data-v-740ad5e8]{background:#facb3d}.invTeller__company[data-v-740ad5e8]{padding:0 .5rem;position:-webkit-sticky;position:sticky;left:min(20rem,25vw)}.invTeller__fundFlag[data-v-740ad5e8]{padding:0 .625rem}.invTeller__fundFlag[data-v-740ad5e8]:last-child{border-top-right-radius:.25rem;border-bottom-right-radius:.25rem}.invTeller__flag[data-v-740ad5e8]{color:#c1c1c1;background:#c1c1c1;width:1.25rem;height:1.25rem;border:2px solid rgba(0,0,0,.1);border-radius:100%}.invTeller__flag--red[data-v-740ad5e8]{color:#e24243;background:#e24243}.invTeller__flag--yellow[data-v-740ad5e8]{color:#facb3d;background:#facb3d}.invTeller__flag--green[data-v-740ad5e8]{color:#6fac45;background:#6fac45}.invTeller__switch[data-v-740ad5e8]{line-height:1.5;color:#35811c;border:none}",""]),t.exports=n},529:function(t,e,r){var content=r(579);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("703b18f6",content,!0,{sourceMap:!1})},548:function(t,e,r){"use strict";r.r(e);r(32);var n=r(97),o=(r(243),r(13),r(445),r(42),r(446),r(447),r(448),r(449),r(450),r(451),r(452),r(453),r(454),r(455),r(456),r(457),r(458),r(459),r(460),r(461),r(43),r(508),r(510),r(51),r(38),r(131),r(52),r(65),r(80),r(388),r(379),r(386),r(30),r(426),r(384),r(383)),c=r(511).a.E,l={props:{stats:{type:Array,required:!0},companyMap:{type:Object,required:!0},quartile:{type:Object,required:!0},year:{type:String,default:"2019"}},data:function(){return{orderBy:c[0]}},computed:{hasNoData:function(){return!this.quartile[this.year]},unit:function(){var t=this;return o.b.find((function(e){return e.measure===t.orderBy})).unit},invStyle:function(){return{gridTemplateColumns:"min(20rem, 25vw) 4rem repeat(".concat(this.fundList.length,", 1fr)")}},curMaxStatVal:function(){return this.sortedStats[0].E[this.orderBy]},orderOptions:function(){return c},fundList:function(){return Object(n.a)(new Set(this.investmentDataPerCompany.map((function(t){return Object.keys(t.X)})).flat())).map((function(t){return t.startsWith("中國信託")?{cat:"中國信託",name:t}:{cat:t.slice(0,2),name:t}}))},investmentDataPerCompany:function(){var t=this,e=this.stats.reduce((function(e,r){var n=r.統編,o=t.companyMap[n];if(r.年份!==t.year||!o)return e;if("X"===r.分類||r.來自公司報告&&c.includes(r.項目)){e[n]||(e[n]={X:{},E:{},company:o});var l=r.數值;"E"===r.分類&&(l=Number.parseFloat(l)),e[n][r.分類][r.項目]=l}return e}),{}),r=this.quartile[this.year].E;return Object.values(e).map((function(t){return t.color={},c.forEach((function(e){var n=t.E[e];Number.isNaN(n)||void 0===n?(t.E[e]=0,t.color[e]="unknown"):n>=r[e].thirdForth?t.color[e]="red":n>=r[e].oneForth?t.color[e]="yellow":t.color[e]="green"})),t}))},sortedStats:function(){var t=this.orderBy;return Object(n.a)(this.investmentDataPerCompany).sort((function(a,b){return b.E[t]-a.E[t]}))}},methods:{printValue:function(t){return"unknown"===t.color[this.orderBy]?"未揭露":(Math.round(100*t.E[this.orderBy])/100).toLocaleString()},switchOrder:function(){var t=this;this.orderBy=c.find((function(e){return e!==t.orderBy}))},fundName:function(t){var e=Math.round(t.name.length/2);return[t.name.slice(0,e),t.name.slice(e)]},barClass:function(t){return["invTeller__statVal--".concat(t.color[this.orderBy])]},barStyle:function(t){return"unknown"===t.color[this.orderBy]?{width:"6.5rem"}:{width:"".concat(100*t.E[this.orderBy]/this.curMaxStatVal,"%")}},flagClass:function(t){return["invTeller__flag--".concat(t.color[this.orderBy])]}}},d=(r(512),r(29)),component=Object(d.a)(l,(function(){var t=this,e=t._self._c;return t.hasNoData?t._e():e("div",{staticClass:"invTellerWrapper"},[t.fundList.length?e("div",{staticClass:"invTeller",style:t.invStyle},[e("div",{staticClass:"invTeller__measureHead"},t._l(t.orderOptions,(function(r){return e("button",{staticClass:"invTeller__switch bg-transparent w-100-ns f3 fw6 mb2 pointer db pa0 tl",class:[r===t.orderBy?"o-100":"o-50"],on:{click:t.switchOrder}},[t._v(t._s(r))])})),0),t._l(t.fundList,(function(r){return e("div",{staticClass:"invTeller__fundHead black"},[e("div",{staticClass:"fw6"},[t._v(t._s(r.cat))]),t._l(t.fundName(r),(function(line){return e("div",{staticClass:"fw4"},[t._v(t._s(line))])}))],2)})),t._l(t.sortedStats,(function(r){return[e("div",{staticClass:"invTeller__stat bg-white br2 br--left"},[e("div",{staticClass:"invTeller__statVal br2 h-100 ml-auto fw6 pr1 flex items-center justify-end",class:t.barClass(r),style:t.barStyle(r)},[t._v(t._s(t.printValue(r)))])]),e("div",{staticClass:"invTeller__company bg-white flex items-center"},[e("company-abbr",{attrs:{company:r.company}})],1),t._l(t.fundList,(function(n){return e("div",{staticClass:"invTeller__fundFlag bg-white flex items-center"},[r.X[n.name]?e("div",{staticClass:"invTeller__flag",class:t.flagClass(r)},[t._v("T")]):t._e()])}))]})),e("div",{staticClass:"invTeller__unit tr"},[t._v(t._s(t.unit))])],2):t._e()])}),[],!1,null,"740ad5e8",null);e.default=component.exports;installComponents(component,{CompanyAbbr:r(475).default})},578:function(t,e,r){"use strict";r(529)},579:function(t,e,r){var n=r(27)(!1);n.push([t.i,".industry__nav[data-v-2a8afa2f]{margin-top:2.25rem;margin-bottom:1.125rem}.industry__title[data-v-2a8afa2f]{font-size:3rem;margin-top:1rem;margin-bottom:0}.industry__typeSelector[data-v-2a8afa2f]{width:8rem}.industry__typeSelector[data-v-2a8afa2f]  .dropdown-menu{min-width:8rem}.industry__typeSelector[data-v-2a8afa2f]  .dropdown-trigger{width:100%}.industry__typeSelector[data-v-2a8afa2f]  .dropdown-trigger button{border:none;outline:none;background:transparent}.industry__typeSelector[data-v-2a8afa2f]  .dropdown-content{background:#333}.industry__typeSelector[data-v-2a8afa2f]  .has-link a{padding:.5rem;color:#fff;font-size:1.5rem}.industry__typeSelector[data-v-2a8afa2f]  .has-link a:hover{background:#555;color:#fff}.industry__footer[data-v-2a8afa2f]{margin:1.5rem 0}.industry__cta[data-v-2a8afa2f]{background:#49591c}.industry__cta[data-v-2a8afa2f]:hover{background:#35811c}",""]),t.exports=n},603:function(t,e,r){"use strict";r.r(e);r(38),r(31),r(45),r(46);var n=r(97),o=r(17),c=r(12),l=(r(55),r(37),r(13),r(243),r(384),r(445),r(42),r(446),r(447),r(448),r(449),r(450),r(451),r(452),r(453),r(454),r(455),r(456),r(457),r(458),r(459),r(460),r(461),r(43),r(51),r(64),r(386),r(30),r(388),r(379),r(32),r(62)),d=r(414),f=r(408);function v(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function m(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var h={asyncData:function(t){return Object(c.a)(regeneratorRuntime.mark((function e(){var r,n,o,c,l,d,f;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.$content,n=t.params,o=t.redirect,e.prev=1,e.next=4,r("industry",n.industry).fetch();case 4:return c=e.sent,e.next=7,r("industry","".concat(n.industry,"-quartile")).fetch();case 7:return l=e.sent,e.next=10,r("companyList").fetch();case 10:return d=e.sent,f=d.body.filter((function(t){return t.上市上櫃產業編碼===n.industry})),e.abrupt("return",{stats:c,quartile:l,companyList:f});case 15:return e.prev=15,e.t0=e.catch(1),o("/"),e.abrupt("return",{stats:[],companyList:[],quartile:{}});case 19:case"end":return e.stop()}}),e,null,[[1,15]])})))()},head:Object(d.a)({title:function(){return this.industry.label}}),computed:m(m({},Object(l.b)({isGuanshiyinn:"isGuanshiyinn"})),{},{industry:function(){var code=this.$route.params.industry||"03",t=f.find((function(t){return t.code===code}));return t||f[0]},year:function(){return this.$route.query.year||"2020"},yearList:function(){return Object(n.a)(new Set(this.stats.body.map((function(t){return t.年份})))).filter((function(t){return t>=2011})).sort((function(a,b){return b-a}))},downloadLink:function(){return"".concat(this.$router.options.base,"content/industry/").concat(this.industry.code,".csv")},industries:function(){return f},companyMap:function(){return this.companyList.reduce((function(map,t){return map[t.統編]=t,map}),{})},companyStats:function(){var t=this,e=Object.values(this.companyMap).reduce((function(map,t){return map[t.統編]={company:t,stats:{}},map}),{});return this.stats.body.forEach((function(r){var n=e[r.統編];n&&r.年份===t.year&&(r.value=Number.parseFloat(r.數值),n.stats["".concat(r.子分類,"-").concat(r.項目,"-").concat(r.來自公司報告)]=r)})),Object.values(e)},activeQuartile:function(){return this.quartile[this.year]||{}}}),beforeDestroy:function(){var html=document.querySelector("html");html.classList.contains("is-clipped-touch")&&html.classList.remove("is-clipped-touch")},methods:{industryLink:function(t){return{name:this.$route.name,query:{year:this.year},params:{industry:t}}},yearLink:function(t){return{name:this.$route.name,query:{year:t},params:this.$route.params}},trackDownload:function(){this.$plausible.trackEvent("download",{props:{type:"industry",id:"industry-".concat(this.industry.code),link:this.downloadLink}})}}},_=(r(578),r(29)),component=Object(_.a)(h,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"industry"},[e("div",{staticClass:"industry__nav esgContainer flex items-end"},[e("div",{staticClass:"mr5"},[e("div",{staticClass:"f6 o-60 mb1"},[t._v("產業")]),e("b-dropdown",{staticClass:"industry__typeSelector",attrs:{"aria-role":"menu",scrollable:!0,"max-height":"22rem"}},[e("template",{slot:"trigger"},[e("button",{staticClass:"flex justify-between items-center w-100 pointer"},[e("div",{staticClass:"black f3 flex-auto tl"},[t._v(t._s(t.industry.label))]),e("i",{staticClass:"fas fa-sort flex-none"})])]),t._l(t.industries,(function(r){return e("b-dropdown-item",{key:r.code,attrs:{"aria-role":"menuitem","has-link":!0}},[e("nuxt-link",{attrs:{to:t.industryLink(r.code)}},[t._v(t._s(r.label))])],1)}))],2)],1),e("div",[e("div",{staticClass:"f6 o-60 mb1"},[t._v("資料年份")]),e("b-dropdown",{staticClass:"industry__typeSelector",attrs:{"aria-role":"menu"}},[e("template",{slot:"trigger"},[e("button",{staticClass:"flex justify-between items-center w-100 pointer"},[e("div",{staticClass:"black f3 flex-auto tl"},[t._v(t._s(t.year))]),e("i",{staticClass:"fas fa-sort flex-none"})])]),t._l(t.yearList,(function(r){return e("b-dropdown-item",{key:r,attrs:{"aria-role":"menuitem","has-link":!0}},[e("nuxt-link",{attrs:{to:t.yearLink(r)}},[t._v(t._s(r))])],1)}))],2)],1)]),t.isGuanshiyinn?e("div",{staticClass:"industry__fund esgContainer"},[e("investment-teller",{attrs:{stats:t.stats.body,quartile:t.quartile,"company-map":t.companyMap,year:t.year}})],1):t._e(),e("annual-stats-table",{attrs:{"company-stats":t.companyStats,quartile:t.activeQuartile}}),e("div",{staticClass:"industry__footer flex items-center justify-end esgContainer"},[e("a",{staticClass:"industry__cta db br2 pv2 ph3 fw7 white",attrs:{href:t.downloadLink,target:"_blank",rel:"noopener"},on:{click:t.trackDownload}},[t._v("下載此頁資料")])]),e("div",{staticClass:"esgContainer"},[e("gcaa-footer")],1)],1)}),[],!1,null,"2a8afa2f",null);e.default=component.exports;installComponents(component,{InvestmentTeller:r(548).default,AnnualStatsTable:r(595).default,GcaaFooter:r(410).default})}}]);