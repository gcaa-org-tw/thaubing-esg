(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{336:function(t,e,o){var content=o(372);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(39).default)("c361bc06",content,!0,{sourceMap:!1})},371:function(t,e,o){"use strict";o(336)},372:function(t,e,o){var l=o(38)(!1);l.push([t.i,".longCell--long[data-v-cbb6ab20]{-webkit-text-decoration:underline dashed;text-decoration:underline dashed;cursor:pointer}",""]),t.exports=l},378:function(t,e,o){"use strict";o.r(e);o(47);var l={props:{value:{type:String,required:!0}},computed:{isTooLong:function(){return this.value.length>8},label:function(){return this.isTooLong?this.value.slice(0,8)+"...":this.value},title:function(){return this.isTooLong?this.value:""}},methods:{showAllValue:function(){this.isTooLong&&window.alert(this.value)}}},n=(o(371),o(56)),component=Object(n.a)(l,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"longCell",class:{"longCell--long":t.isTooLong},attrs:{title:t.title},on:{click:t.showAllValue}},[t._v(t._s(t.label))])}),[],!1,null,"cbb6ab20",null);e.default=component.exports}}]);