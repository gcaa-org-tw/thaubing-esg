(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{424:function(t,e,n){var content=n(458);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(28).default)("099ef171",content,!0,{sourceMap:!1})},457:function(t,e,n){"use strict";n(424)},458:function(t,e,n){var c=n(27)(!1);c.push([t.i,".chartPanel[data-v-23a2c74a]  .c3-chart-line .c3-line{stroke-width:3px}",""]),t.exports=c},510:function(t,e,n){"use strict";n.r(e);n(65);var c=n(393),o=n(378),r=n(380),l={mixins:[Object(r.a)(o.d,(function(t){return"員工組成"===t.subCat&&["性別比","新進率","離職率"].includes(t.measure)}))],computed:{c3Config:function(){return{data:{x:"x",columns:this.dumpSubCatStats(),axes:{"性別比":"y","新進率":"y2","離職率":"y2"}},point:{r:6},axis:{x:{type:"timeseries",tick:{format:"%Y"}},y:{label:this.measureMap.性別比.unit},y2:{show:!0,label:this.measureMap.新進率.unit,tick:{format:Object(c.format)(".02%")}}}}}}},f=(n(457),n(39)),component=Object(f.a)(l,(function(){return(0,this._self._c)("chart-panel",{attrs:{title:"員工組成","is-self-report":!0,unit:["男/女","人/正式員工"],"c3-config":this.c3Config}})}),[],!1,null,"23a2c74a",null);e.default=component.exports;installComponents(component,{ChartPanel:n(379).default})}}]);