(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{406:function(t,e,o){var content=o(438);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(28).default)("10a10da0",content,!0,{sourceMap:!1})},437:function(t,e,o){"use strict";o(406)},438:function(t,e,o){var l=o(27)(!1);l.push([t.i,".longCell--long[data-v-cbb6ab20]{-webkit-text-decoration:underline dashed;text-decoration:underline dashed;cursor:pointer}",""]),t.exports=l},443:function(t,e,o){"use strict";o.r(e);o(52);var l={props:{value:{type:String,required:!0}},computed:{isTooLong:function(){return this.value.length>8},label:function(){return this.isTooLong?this.value.slice(0,8)+"...":this.value},title:function(){return this.isTooLong?this.value:""}},methods:{showAllValue:function(){this.isTooLong&&window.alert(this.value)}}},n=(o(437),o(39)),component=Object(n.a)(l,(function(){var t=this;return(0,t._self._c)("div",{staticClass:"longCell",class:{"longCell--long":t.isTooLong},attrs:{title:t.title},on:{click:t.showAllValue}},[t._v(t._s(t.label))])}),[],!1,null,"cbb6ab20",null);e.default=component.exports}}]);