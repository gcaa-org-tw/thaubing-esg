(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{361:function(t,e,n){var content=n(397);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(39).default)("4db9ac46",content,!0,{sourceMap:!1})},396:function(t,e,n){"use strict";n(361)},397:function(t,e,n){var c=n(38)(!1);c.push([t.i,".chartPanel[data-v-b275d732]  .c3-chart-line .c3-line{stroke-width:3px}",""]),t.exports=c},440:function(t,e,n){"use strict";n.r(e);n(26),n(340);var c=n(326),r=n(328),o={mixins:[Object(r.a)(c.b,(function(t){return"環境違規"===t.subCat&&t.onlyDetail}))],computed:{c3Config:function(){var t=this.dumpSubCatStats(),e={"違反環境法規金額-空氣":"因空氣污染遭裁罰金額","違反環境法規金額-水":"因水污染遭裁罰金額","違反環境法規金額-misc":"其他違規項目金額"};return t.forEach((function(t){e[t[0]]&&(t[0]=e[t[0]])})),{data:{x:"x",columns:t,type:"bar",groups:[Object.values(e)]},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{label:this.measureMap["違反環境法規金額-空氣"].unit,tick:{format:this.genYFormatter()}}}}}}},l=(n(396),n(56)),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("chart-panel",{attrs:{title:"違反環境法規",unit:["金額"],"c3-config":t.c3Config}})}),[],!1,null,"b275d732",null);e.default=component.exports;installComponents(component,{ChartPanel:n(327).default})}}]);