(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{415:function(t,e,n){var content=n(440);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(28).default)("584cef82",content,!0,{sourceMap:!1})},439:function(t,e,n){"use strict";n(415)},440:function(t,e,n){var c=n(27)(!1);c.push([t.i,".chartPanel[data-v-79797f5c]  .c3-chart-line .c3-line{stroke-width:3px}",""]),t.exports=c},499:function(t,e,n){"use strict";n.r(e);var c=n(378),o=n(380),r={mixins:[Object(o.a)(c.b,"溫室氣體排放")],computed:{c3Config:function(){return{data:{x:"x",columns:this.dumpSubCatStats(),type:"bar",groups:[["範疇一直接排放","範疇二間接排放"]],axes:{"範疇一直接排放":"y","範疇二間接排放":"y","碳密集度":"y2"}},point:{r:6},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{label:this.measureMap.範疇二間接排放.unit,tick:{format:this.genYFormatter()}}}}}}},l=(n(439),n(39)),component=Object(l.a)(r,(function(){return(0,this._self._c)("chart-panel",{attrs:{title:"溫室氣體排放",unit:["公噸CO2e","公噸/億元"],"c3-config":this.c3Config}})}),[],!1,null,"79797f5c",null);e.default=component.exports;installComponents(component,{ChartPanel:n(379).default})}}]);