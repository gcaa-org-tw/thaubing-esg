(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{352:function(t,e,n){var content=n(382);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(39).default)("4de3f670",content,!0,{sourceMap:!1})},381:function(t,e,n){"use strict";n(352)},382:function(t,e,n){var r=n(38)(!1);r.push([t.i,".chartPanel[data-v-2adb7306]  .c3-chart-line .c3-line{stroke-width:3px}",""]),t.exports=r},434:function(t,e,n){"use strict";n.r(e);var r=n(326),o=n(328),c={mixins:[Object(o.a)(r.b,"溫室氣體排放")],computed:{c3Config:function(){return{data:{x:"x",columns:this.dumpSubCatStats(),type:"bar",groups:[["範疇一直接排放","範疇二間接排放"]],axes:{"範疇一直接排放":"y","範疇二間接排放":"y","碳密集度":"y2"}},point:{r:6},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{label:this.measureMap.範疇二間接排放.unit,tick:{format:this.genYFormatter()}}}}}}},l=(n(381),n(56)),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("chart-panel",{attrs:{title:"溫室氣體排放",unit:["公噸CO2e","公噸/億元"],"c3-config":t.c3Config}})}),[],!1,null,"2adb7306",null);e.default=component.exports;installComponents(component,{ChartPanel:n(327).default})}}]);