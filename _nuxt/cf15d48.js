(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{157:function(e,t,n){"use strict";var r=n(2),o=n(236);r.a.component("VueIntersect",o.a),t.a=function(e){e.app.$plausible.enableAutoPageviews()}},201:function(e,t,n){var content=n(345);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(28).default)("473b049e",content,!0,{sourceMap:!1})},202:function(e,t,n){var content=n(347);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(28).default)("38e0c140",content,!0,{sourceMap:!1})},203:function(e,t,n){var content=n(349);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(28).default)("39837ce7",content,!0,{sourceMap:!1})},239:function(e,t,n){"use strict";var r=n(226),o=n.n(r),c={data:function(){return{konamiHandler:null}},mounted:function(){var e=this;this.konamiHandler=new o.a((function(){e.toggleGuanshiyinn()}))},beforeDestroy:function(){this.konamiHandler&&this.konamiHandler.unload()},methods:{toggleGuanshiyinn:function(){this.$store.commit("setGuanshiyinn",!this.$store.state.isGuanshiyinn)}}},l=(n(344),n(29)),component=Object(l.a)(c,(function(){var e=this._self._c;return e("div",{staticClass:"gcaaEsg pb3"},[e("esg-navbar"),e("nuxt")],1)}),[],!1,null,null,null);t.a=component.exports;installComponents(component,{EsgNavbar:n(251).default})},240:function(e,t,n){"use strict";var r=n(29),component=Object(r.a)({},(function(){return(0,this._self._c)("nuxt")}),[],!1,null,null,null);t.a=component.exports},250:function(e,t,n){e.exports=n.p+"img/logo.b151b9e.png"},251:function(e,t,n){"use strict";n.r(t);var r=[function(){var e=this._self._c;return e("a",{staticClass:"esgNavbar__officialSite absolute",attrs:{href:"https://thaubing.gcaa.org.tw/"}},[e("img",{attrs:{src:n(250)}})])}],o=(n(38),n(31),n(37),n(13),n(45),n(30),n(46),n(17)),c=n(62);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var m={computed:d(d({},Object(c.b)({isReallyGuanshiyinn:"isGuanshiyinn"})),{},{isGuanshiyinn:function(){return!0}})},f=(n(346),n(29)),component=Object(f.a)(m,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"esgNavbar esgContainer pt3 relative no-repeat cover",class:{pb3:!e.isGuanshiyinn}},[t("div",{staticClass:"flex justify-between items-start"},[t("nuxt-link",{attrs:{to:"/"}},[e.isGuanshiyinn?[t("div",{staticClass:"esgNavbar__title"},[e._v("ESG 檢測儀")])]:[t("h1",{staticClass:"esgNavbar__title fw7 mt0"},[e._v("ESG 檢測儀")]),t("p",{staticClass:"esgNavbar__desp"},[e._v("打造永續環境資料庫，推動企業永續發展。")])]],2),t("div",{staticClass:"esgNavbar__articles flex items-center"},[t("nuxt-link",{staticClass:"dn db-ns dim",attrs:{to:"/about/"}},[e._v("關於計畫")]),t("nuxt-link",{staticClass:"dn db-ns dim",attrs:{to:"/blog/"}},[e._v("專欄文章")]),t("nuxt-link",{staticClass:"dn db-ns dim",attrs:{to:"/terms-of-service/"}},[e._v("免責聲明")]),t("a",{staticClass:"esgNavbar__cta dim db",attrs:{href:"https://gcaa.neticrm.tw/civicrm/contribute/transact?reset=1&id=41&utm_source=Web&utm_content=ESG_donate&utm_campaign=TB3"}},[e._v("捐款支持")])],1)],1),e._t("default",(function(){return[e._m(0),e.isGuanshiyinn?t("div",{staticClass:"esgNavbar__toolbar flex relative"},[t("div",{staticClass:"esgMenu"},[t("div",{staticClass:"esgMenu__item flex"},[t("menu-item",{attrs:{title:"ESG 資料庫",icon:"db","route-name":"industry-industry"}}),t("menu-item",{attrs:{title:"淨零路徑模擬器",icon:"net-zero","route-name":"net-zero-industry"}})],1)])]):e._e()]}))],2)}),r,!1,null,"40cf83e7",null);t.default=component.exports;installComponents(component,{MenuItem:n(259).default})},256:function(e,t,n){e.exports=n.p+"img/tree-bg.c47ba4d.webp"},259:function(e,t,n){"use strict";n.r(t);n(32),n(64);var r={props:{title:{type:String,required:!0},icon:{type:String,required:!0},routeName:{type:String,required:!0}},computed:{to:function(){var e=this.$route.params.industry;return e||(e=this.$store.state.company.上市上櫃產業編碼||"03"),{name:this.routeName,params:{industry:e}}},isActive:function(){return this.$route.name===this.routeName},iconPath:function(){var e=this.isActive?"-active":"-default";return"/logo/".concat(this.icon).concat(e,".svg")}}},o=(n(348),n(29)),component=Object(o.a)(r,(function(){var e=this,t=e._self._c;return t("nuxt-link",{staticClass:"menuItem flex items-center",attrs:{to:e.to}},[t("img",{staticClass:"menuItem__icon mr2",attrs:{src:e.iconPath,alt:e.title}}),e._v(e._s(e.title))])}),[],!1,null,"758ac5f6",null);t.default=component.exports},260:function(e,t,n){n(261),e.exports=n(262)},338:function(e,t,n){var content=n(339);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(28).default)("383355a5",content,!0,{sourceMap:!1})},339:function(e,t,n){var r=n(27)(!1);r.push([e.i,'body,html{font-family:"Lato","Noto Sans TC",sans-serif;line-height:1.4;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}a{text-decoration:none}.green{color:#49591c}:root{--screen-space:1rem}@media screen and (min-width:120em){:root{--screen-space:8.125rem}}@media screen and (min-width:90em)and (max-width:120em){:root{--screen-space:5rem}}@media screen and (min-width:60em)and (max-width:90em){:root{--screen-space:2rem}}.esgContainer,.thinContainer{padding-left:1rem;padding-left:var(--screen-space);padding-right:1rem;padding-right:var(--screen-space)}.thinContainer{max-width:92rem;max-width:calc(90rem + var(--screen-space)*2)}',""]),e.exports=r},340:function(e,t,n){var content=n(341);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(28).default)("a044854e",content,!0,{sourceMap:!1})},341:function(e,t,n){var r=n(27)(!1);r.push([e.i,'.netZeroChart--blur{filter:blur(3px);opacity:.5}.netZeroChart svg>g:nth-child(3){display:none}.netZeroChart .c3-grid .c3-ygrid{stroke:#bbb;stroke-dasharray:0}.netZeroChart .c3-xgrid-focus{stroke-dasharray:5 4}.netZeroChart .c3-xgrid-focus .c3-line{stroke-width:2px}.netZeroChart .c3-chart-lines .c3-circle._expanded_{display:inline;fill:currentColor;stroke:none}.netZeroChart .c3-chart-lines .c3-chart-line[class*=-predict] .c3-lines path{stroke-dasharray:7 5}.netZeroChart .c3-chart-lines .c3-chart-line[style*="opacity: 0"]{opacity:.3!important;display:inline!important;display:initial!important}.netZeroChart .c3-axis .tick line,.netZeroChart .c3-axis path.domain{stroke:#bbb}.netZeroChart .c3-axis.c3-axis-x .tick text{display:block!important}.netZeroChart .c3-axis.c3-axis-y .tick line{display:none;stroke:#bbb}.netZeroChart .c3-target-IPCC .c3-lines,.netZeroChart .c3-target-PNNL .c3-lines{display:none}.netZeroChart .c3-target-IPCC .c3-areas path,.netZeroChart .c3-target-PNNL .c3-areas path{opacity:.25!important}.netZeroChart .c3-target-IPCC .c3-circles,.netZeroChart .c3-target-PNNL .c3-circles{display:none}.netZeroChart--hasFocused .c3-chart-lines .c3-chart-line[style*="opacity: 1"] .c3-lines path.c3-line{stroke-width:2px}.netZeroChart .esgLegend+.esgLegend{margin-top:.75rem}.esgLegend__label{height:.125rem;width:1rem;margin-right:.375rem}.esgLegend__name,.esgLegend__value{font-size:.875rem;line-height:1rem}.esgLegend__value{color:#000;white-space:nowrap;text-align:right}.esgLegend__value--raise{color:#f20000}.esgLegend__value--reduce{color:#35811c}.esgLegend--bau .esgLegend__label{position:relative}.esgLegend--bau .esgLegend__label:after,.esgLegend--bau .esgLegend__label:before{content:" ";position:absolute;width:3px;height:.125rem;background:#fff}.esgLegend--bau .esgLegend__label:before{left:3px}.esgLegend--bau .esgLegend__label:after{right:3px}.esgLegend--noLabel .esgLegend__label{opacity:0}.esgLegend--roadmap .esgLegend__label{height:.625rem;opacity:.25}.esgLegend--roadmap .esgLegend__value{color:#000}.esgTp{padding:.75rem 1rem 1.25rem;border:1px solid #555;border-radius:.25rem;box-shadow:0 2px 14px rgba(0,0,0,.08);background:hsla(0,0%,100%,.8509803922);width:14rem}.esgTp__year{font-weight:600}.esgTp__company{margin:1.25rem 0}',""]),e.exports=r},344:function(e,t,n){"use strict";n(201)},345:function(e,t,n){var r=n(27)(!1);r.push([e.i,"body{background:#ebedeb;min-height:100vh}",""]),e.exports=r},346:function(e,t,n){"use strict";n(202)},347:function(e,t,n){var r=n(27),o=n(164),c=n(256),l=r(!1),d=o(c);l.push([e.i,".esgNavbar[data-v-40cf83e7]{background-image:url("+d+");color:#fff;line-height:1.4}.esgNavbar a[data-v-40cf83e7]{color:#fff}.esgNavbar__desp[data-v-40cf83e7]{font-size:1.5rem;margin:1rem 0 1.75rem}.esgNavbar__officialSite[data-v-40cf83e7]{right:var(--screen-space);bottom:1rem}.esgNavbar__articles a[data-v-40cf83e7]:not(:last-child){margin-right:1rem}.esgNavbar a.esgNavbar__cta[data-v-40cf83e7]{color:#49591c;line-height:1.5;padding:.125rem .5rem;background:#ebedeb;border-radius:.125rem}.esgNavbar__toolbar[data-v-40cf83e7]{margin-top:3.5rem}",""]),e.exports=l},348:function(e,t,n){"use strict";n(203)},349:function(e,t,n){var r=n(27)(!1);r.push([e.i,".menuItem[data-v-758ac5f6]{background:rgba(235,237,235,.5019607843);border-top-left-radius:.875rem;border-top-right-radius:.875rem;padding:.375rem 1rem;line-height:1.5;color:#fff}.menuItem__icon[data-v-758ac5f6]{height:1.75rem;width:1.75rem}.menuItem.nuxt-link-active[data-v-758ac5f6]{background:#ebedeb;color:#1f231e}.menuItem[data-v-758ac5f6]:not(:last-child){margin-right:.375rem}@media screen and (min-width:60em){.menuItem[data-v-758ac5f6]{font-size:1.625rem}}",""]),e.exports=r},350:function(e,t,n){"use strict";n.r(t),n.d(t,"state",(function(){return r})),n.d(t,"mutations",(function(){return o}));var r=function(){return{isGuanshiyinn:!1,company:{}}},o={setGuanshiyinn:function(e,t){e.isGuanshiyinn=t},setCompany:function(e,t){e.company=t}}}},[[260,45,8,46]]]);