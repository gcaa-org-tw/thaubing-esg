(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{415:function(t,e,n){var content=n(451);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(28).default)("0e09fda0",content,!0,{sourceMap:!1})},450:function(t,e,n){"use strict";n(415)},451:function(t,e,n){var o=n(27)(!1);o.push([t.i,".chartPanel[data-v-b96014f4]  .c3-chart-line .c3-line{stroke-width:3px}",""]),t.exports=o},502:function(t,e,n){"use strict";n.r(e);var o=n(378),r=n(380),c={mixins:[Object(r.a)(o.b,"廢棄物管理",!0)],computed:{c3Config:function(){return{data:{x:"x",columns:this.dumpSubCatStats(),type:"bar",groups:[["一般事業廢棄物","有害事業廢棄物","資源化再利用"]]},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{label:this.measureMap.一般事業廢棄物.unit,tick:{format:this.genYFormatter()}}}}}}},l=(n(450),n(39)),component=Object(l.a)(c,(function(){return(0,this._self._c)("chart-panel",{attrs:{title:"廢棄物管理","is-self-report":!0,unit:["噸"],"c3-config":this.c3Config}})}),[],!1,null,"b96014f4",null);e.default=component.exports;installComponents(component,{ChartPanel:n(379).default})}}]);