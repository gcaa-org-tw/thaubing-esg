(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{412:function(t,e,n){var content=n(445);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(28).default)("5ff789d2",content,!0,{sourceMap:!1})},444:function(t,e,n){"use strict";n(412)},445:function(t,e,n){var r=n(27)(!1);r.push([t.i,".chartPanel[data-v-595b5ff3]  .c3-chart-line .c3-line{stroke-width:3px}",""]),t.exports=r},499:function(t,e,n){"use strict";n.r(e);n(64);var r=n(378),o=n(380),c={mixins:[Object(o.a)(r.b,(function(t){return"能源使用狀況"===t.subCat&&["總用電量","能源密集度"].includes(t.measure)}))],computed:{c3Config:function(){return{data:{x:"x",columns:this.dumpSubCatStats(),type:"bar",types:{"能源密集度":"line"},axes:{"總用電量":"y","能源密集度":"y2"},colors:{"能源密集度":"#555"}},point:{r:6},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{label:this.measureMap.總用電量.unit,tick:{format:this.genYFormatter()}},y2:{show:!0,label:this.measureMap.能源密集度.unit,tick:{format:this.genYFormatter()}}}}}}},l=(n(444),n(39)),component=Object(l.a)(c,(function(){return(0,this._self._c)("chart-panel",{attrs:{title:"年度總用電量","is-self-report":!0,unit:["度","度/億元"],"c3-config":this.c3Config}})}),[],!1,null,"595b5ff3",null);e.default=component.exports;installComponents(component,{ChartPanel:n(379).default})}}]);