(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{431:function(t,e,n){var content=n(464);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(28).default)("831d3c72",content,!0,{sourceMap:!1})},463:function(t,e,n){"use strict";n(431)},464:function(t,e,n){var r=n(27)(!1);r.push([t.i,".chartPanel[data-v-5a2e628f]  .c3-chart-line .c3-line{stroke-width:3px}",""]),t.exports=r},517:function(t,e,n){"use strict";n.r(e);n(129);var r=n(378),o=n(380),c={mixins:[Object(o.a)(r.d,(function(t){return"員工組成"===t.subCat&&("正式員工"===t.measure||t.measure.startsWith("是否"))}))],computed:{c3Config:function(){return{data:{x:"x",columns:this.dumpSubCatStats(),type:"bar",types:{"正式員工":"line"},axes:{"正式員工":"y","是否聘用移工":"y2","是否聘用身障人士":"y2","是否聘用原住民":"y2"}},point:{r:6},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{label:this.measureMap.正式員工.unit,tick:{format:this.genYFormatter()}},y2:{show:!0,label:this.measureMap.是否聘用移工.unit,tick:{format:this.genYFormatter()}}}}}}},l=(n(463),n(39)),component=Object(l.a)(c,(function(){return(0,this._self._c)("chart-panel",{attrs:{title:"員工組成","is-self-report":!0,unit:["人"],"c3-config":this.c3Config}})}),[],!1,null,"5a2e628f",null);e.default=component.exports;installComponents(component,{ChartPanel:n(379).default})}}]);