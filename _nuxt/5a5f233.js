(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{434:function(e,t,r){"use strict";r.r(t);r(381),r(65);var n=r(385),o={props:{title:{type:String,required:!0},value:{type:Number,default:-1},color:{type:String,default:"#000"},type:{type:String,default:"fact",validator:function(e){return["bau","fact","noLabel","roadmap"].includes(e)}}},computed:{valueDiff:function(){return this.value-100},valueLabel:function(){return 0!==this.valueDiff?Object(n.l)(Math.abs(this.valueDiff)):" 0"},valueClass:function(){return this.valueDiff>0?"esgLegend__value--raise":this.valueDiff<0?"esgLegend__value--reduce":""}}},c=r(39),component=Object(c.a)(o,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"esgLegend flex items-center",class:["esgLegend--".concat(e.type)]},[t("div",{staticClass:"esgLegend__label flex-none",style:{background:e.color}}),t("div",{staticClass:"esgLegend__name flex-auto truncate"},[e._v(e._s(e.title))]),e.value>=0?t("div",{staticClass:"esgLegend__value flex-none",class:e.valueClass},[e._v(e._s(e.valueLabel))]):e._e()])}),[],!1,null,null,null);t.default=component.exports},487:function(e,t,r){var content=r(519);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(28).default)("7fa262e8",content,!0,{sourceMap:!1})},518:function(e,t,r){"use strict";r(487)},519:function(e,t,r){var n=r(27)(!1);n.push([e.i,".netZero__nav[data-v-2642c506]{margin-top:2.25rem;margin-bottom:1.125rem}.netZero__typeSelector[data-v-2642c506]{width:8rem}.netZero__typeSelector[data-v-2642c506]  .dropdown-menu{min-width:8rem}.netZero__typeSelector[data-v-2642c506]  .dropdown-trigger{width:100%}.netZero__typeSelector[data-v-2642c506]  .dropdown-trigger button{border:none;outline:none;background:transparent}.netZero__typeSelector[data-v-2642c506]  .dropdown-content{background:#333}.netZero__typeSelector[data-v-2642c506]  .has-link a{padding:.5rem;color:#fff;font-size:1.5rem}.netZero__typeSelector[data-v-2642c506]  .has-link a:hover{background:#555;color:#fff}.netZero__filter[data-v-2642c506]{margin:1.75rem 0 2.25rem}.netZero__filterItem[data-v-2642c506]{line-height:1.18;color:rgba(74,127,46,.7019607843);padding-bottom:.375rem;border-bottom:1px solid transparent}.netZero__filterItem--active[data-v-2642c506]{color:#35811c;border-color:#35811c}.netZero__filterItem[data-v-2642c506]:not(:last-child){margin-right:1.75rem}@media screen and (min-width:60em){.netZero__filterItem[data-v-2642c506]{font-size:1.375rem}}.netZero__legend[data-v-2642c506]{margin:2.25rem auto 2.5rem}.netZero__legendRow[data-v-2642c506]{display:grid;grid-template-columns:repeat(auto-fit,6rem);grid-row-gap:.5rem;row-gap:.5rem;grid-column-gap:1rem;-moz-column-gap:1rem;column-gap:1rem}.netZero__legendRow+.netZero__legendRow[data-v-2642c506]{margin-top:1.25rem}.netZero__chart[data-v-2642c506]{margin:2.5rem auto}.netZero__chart h2[data-v-2642c506]{font-size:1.375rem;margin-bottom:1.75rem;color:#000}",""]),e.exports=n},558:function(e,t,r){"use strict";r.r(t);var n=r(16),o=r(12),c=(r(55),r(13),r(52),r(382),r(36),r(37),r(53),r(30),r(45),r(29),r(46),r(385));function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var f={mixins:[c.j],asyncData:function(e){return Object(o.a)(regeneratorRuntime.mark((function t(){var r,n,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.$content,e.params,e.redirect,n=[],t.next=4,r("overview/bau").fetch();case 4:return n=t.sent,n=Object(c.e)(n),o=n.filter((function(e){return e.年份===c.c.BASE})).sort((function(a,b){return b.Tot數值-a.Tot數值})).slice(0,5).reduce((function(e,t){return e[t.產業別]=t,e}),{}),n=n.filter((function(e){return o[e.產業別]})),t.abrupt("return",{bauStats:n,top5IndustryCodes:Object.keys(o)});case 9:case"end":return t.stop()}}),t)})))()},computed:{industry:function(){return this.industries[0]},top5Industries:function(){var e=this.industries.reduce((function(e,t){return e[t.code]=t,e}),{});return this.top5IndustryCodes.map((function(code,i){return d(d({},e[code]),{},{color:Object(c.k)(i)})}))},top5IndustryMap:function(){return this.top5Industries.reduce((function(e,t){return e[t.code]=t,e}),{})},yMax:function(){return this.bauStats.reduce((function(e,t){return e===c.d.MAX?e:t.Tot變化>e?Math.min(t.Tot變化,c.d.MAX):e}),c.d.MIN)},chartColors:function(){return c.a}},beforeDestroy:function(){var html=document.querySelector("html");html.classList.contains("is-clipped-touch")&&html.classList.remove("is-clipped-touch")}},m=(r(518),r(39)),component=Object(m.a)(f,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"netZero"},[t("div",{staticClass:"netZero__nav esgContainer"},[t("div",{staticClass:"f6 o-60 mb1"},[e._v("產業")]),t("b-dropdown",{staticClass:"netZero__typeSelector",attrs:{"aria-role":"menu",scrollable:!0,"max-height":"22rem"}},[t("template",{slot:"trigger"},[t("button",{staticClass:"flex justify-between items-center w-100 pointer"},[t("div",{staticClass:"black f3 flex-auto tl"},[e._v(e._s(e.industry.label))]),t("i",{staticClass:"fas fa-sort flex-none"})])]),e._l(e.industries,(function(r){return t("b-dropdown-item",{key:r.code,attrs:{"aria-role":"menuitem","has-link":!0}},[t("nuxt-link",{attrs:{to:e.industryLink(r.code)}},[e._v(e._s(r.label))])],1)}))],2)],1),t("div",{staticClass:"netZero__legend thinContainer"},[t("div",{staticClass:"netZero__legendRow"},e._l(e.top5Industries,(function(e){return t("net-zero-legend",{key:e.code,attrs:{title:e.label,color:e.color}})})),1),t("div",{staticClass:"netZero__legendRow"},[t("net-zero-legend",{attrs:{title:"IPCC",color:e.chartColors.IPCC,type:"roadmap"}}),t("net-zero-legend",{attrs:{title:"PNNL",color:e.chartColors.PNNL,type:"roadmap"}})],1)]),t("div",{staticClass:"netZero__chart thinContainer"},[t("h2",[e._v("五大產業維持原狀的碳排成長")]),t("net-zero-overview-bau",{attrs:{"bau-stats":e.bauStats,"industry-map":e.top5IndustryMap,"y-max":e.yMax}})],1)])}),[],!1,null,"2642c506",null);t.default=component.exports;installComponents(component,{NetZeroLegend:r(434).default,NetZeroOverviewBau:r(553).default})}}]);