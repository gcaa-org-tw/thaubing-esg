(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{430:function(t,e,n){var content=n(460);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(28).default)("1474a6bf",content,!0,{sourceMap:!1})},459:function(t,e,n){"use strict";n(430)},460:function(t,e,n){var c=n(27)(!1);c.push([t.i,".chartPanel[data-v-179f0a74]  .c3-chart-line .c3-line{stroke-width:3px}",""]),t.exports=c},513:function(t,e,n){"use strict";n.r(e);n(13),n(29),n(398);var c=n(378),o=n(381),r={mixins:[Object(o.a)(c.b,(function(t){return"環境違規"===t.subCat&&t.onlyDetail}))],computed:{c3Config:function(){var t=this.dumpSubCatStats(),e={"違反環境法規金額-空氣":"因空氣污染遭裁罰金額","違反環境法規金額-水":"因水污染遭裁罰金額","違反環境法規金額-misc":"其他違規項目金額"};return t.forEach((function(t){e[t[0]]&&(t[0]=e[t[0]])})),{data:{x:"x",columns:t,type:"bar",groups:[Object.values(e)]},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{label:this.measureMap["違反環境法規金額-空氣"].unit,tick:{format:this.genYFormatter()}}}}}}},l=(n(459),n(39)),component=Object(l.a)(r,(function(){return(0,this._self._c)("chart-panel",{attrs:{title:"違反環境法規",unit:["金額"],"c3-config":this.c3Config}})}),[],!1,null,"179f0a74",null);e.default=component.exports;installComponents(component,{ChartPanel:n(379).default})}}]);