(window.webpackJsonp=window.webpackJsonp||[]).push([[10,9],{376:function(t,e,r){"use strict";r.r(e);r(133);var n={props:{title:{type:String,required:!0},unit:{type:[String,Array],default:""},isSelfReport:{type:Boolean,default:!1},tips:{type:String,default:""},c3Config:{type:Object,default:function(){return{}}}},computed:{unitStr:function(){return Array.isArray(this.unit)?this.unit.join(" · "):this.unit}}},c=(r(434),r(37)),component=Object(c.a)(n,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"chartPanel bg-white h-100"},[e("div",{staticClass:"flex justify-between items-start mb1"},[e("div",{staticClass:"chartPanel__title fw5"},[t._v(t._s(t.title))]),t.isSelfReport?e("div",{staticClass:"chartPanel__audit"},[t._v("來自企業 CSR 報告")]):e("div",{staticClass:"chartPanel__audit"},[t._v("來自政府、官方報告")])]),e("div",{staticClass:"mb3 pb2"},[t.unit?e("span",[t._v("單位："+t._s(t.unitStr))]):t._e()]),e("chart-content",{attrs:{config:t.c3Config}}),t.tips?e("div",{staticClass:"chartPanel__tips mt2"},[t._v(t._s(t.tips))]):t._e()],1)}),[],!1,null,"5e8bdd28",null);e.default=component.exports;installComponents(component,{ChartContent:r(428).default})},387:function(t,e,r){var content=r(405);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(33).default)("196923cf",content,!0,{sourceMap:!1})},403:function(t,e,r){var content=r(435);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(33).default)("4e276e1e",content,!0,{sourceMap:!1})},404:function(t,e,r){"use strict";r(387)},405:function(t,e,r){var n=r(32)(!1);n.push([t.i,".chartContent__chart--blur[data-v-6299e406]{filter:blur(3px)}.chartContent__noData[data-v-6299e406]{background:hsla(0,0%,100%,.5019607843)}",""]),t.exports=n},428:function(t,e,r){"use strict";r.r(e);var n=r(19);r(38),r(14),r(52),r(39),r(35),r(46),r(34),r(47);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function o(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var l={props:{config:{type:Object,required:!0}},data:function(){return{c3Handler:null}},computed:{hasNoData:function(){var t=this;return!!this.config.data&&this.config.data.columns.filter((function(e){return e.length>1&&e[0]!==t.config.data.x})).every((function(t){return t.slice(1).every((function(t){return null===t}))}))}},mounted:function(){if(this.config.data){var t=r(393);this.c3Handler=t.generate(o(o({},this.config),{},{bindto:this.$refs.chart}))}}},f=(r(404),r(37)),component=Object(f.a)(l,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"chartContent relative"},[e("div",{ref:"chart",staticClass:"chartContent__chart h-100",class:{"chartContent__chart--blur":t.hasNoData}}),t.hasNoData?e("div",{staticClass:"chartContent__noData aspect-ratio--object flex items-center justify-center"},[e("div",{staticClass:"f3 fw5 gray pb4"},[t._v("無資料")])]):t._e()])}),[],!1,null,"6299e406",null);e.default=component.exports},434:function(t,e,r){"use strict";r(403)},435:function(t,e,r){var n=r(32)(!1);n.push([t.i,".chartPanel[data-v-5e8bdd28]{padding:1.5rem;border-radius:.5rem;box-shadow:0 2px 4px rgba(0,0,0,.12)}.chartPanel__title[data-v-5e8bdd28]{font-size:1.5rem;color:#49591c}.chartPanel__audit[data-v-5e8bdd28]{color:#49591c}.chartPanel .chartContent[data-v-5e8bdd28]{height:calc(100% - 5rem)}",""]),t.exports=n}}]);