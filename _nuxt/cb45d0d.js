(window.webpackJsonp=window.webpackJsonp||[]).push([[35,22,23],{417:function(t,e,r){var content=r(466);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("10a10da0",content,!0,{sourceMap:!1})},418:function(t,e,r){var content=r(471);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("7e23f135",content,!0,{sourceMap:!1})},465:function(t,e,r){"use strict";r(417)},466:function(t,e,r){var n=r(27)(!1);n.push([t.i,".longCell--long[data-v-cbb6ab20]{-webkit-text-decoration:underline dashed;text-decoration:underline dashed;cursor:pointer}",""]),t.exports=n},467:function(t,e,r){"use strict";var n=r(3),o=r(468);n({target:"String",proto:!0,forced:r(469)("link")},{link:function(t){return o(this,"a","href",t)}})},468:function(t,e,r){var n=r(5),o=r(34),l=r(16),c=/"/g,f=n("".replace);t.exports=function(t,e,r,n){var d=l(o(t)),h="<"+e;return""!==r&&(h+=" "+r+'="'+f(l(n),c,"&quot;")+'"'),h+">"+d+"</"+e+">"}},469:function(t,e,r){var n=r(6);t.exports=function(t){return n((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},470:function(t,e,r){"use strict";r(418)},471:function(t,e,r){var n=r(27)(!1);n.push([t.i,".mainSite[data-v-422db95e]{color:#4a4a4a;text-decoration:underline}",""]),t.exports=n},472:function(t,e,r){var content=r(516);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("0664dfe6",content,!0,{sourceMap:!1})},477:function(t,e,r){"use strict";r.r(e);r(52);var n={props:{value:{type:String,required:!0}},computed:{isTooLong:function(){return this.value.length>8},label:function(){return this.isTooLong?this.value.slice(0,8)+"...":this.value},title:function(){return this.isTooLong?this.value:""}},methods:{showAllValue:function(){this.isTooLong&&window.alert(this.value)}}},o=(r(465),r(29)),component=Object(o.a)(n,(function(){var t=this;return(0,t._self._c)("div",{staticClass:"longCell",class:{"longCell--long":t.isTooLong},attrs:{title:t.title},on:{click:t.showAllValue}},[t._v(t._s(t.label))])}),[],!1,null,"cbb6ab20",null);e.default=component.exports},478:function(t,e,r){"use strict";r.r(e);r(467);var n={props:{value:{type:String,required:!0},row:{type:Object,required:!0},columnMeta:{type:Object,required:!0},quartile:{type:Object,required:!0}},computed:{link:function(){var t=this.row.company.統編;return"https://thaubing.gcaa.org.tw/corp/".concat(t)}}},o=(r(470),r(29)),component=Object(o.a)(n,(function(){var t=this,e=t._self._c;return e("a",{staticClass:"mainSite flex items-center",attrs:{href:t.link,target:"_blank",rel:"noopener"}},[t._v(t._s(t.value)),e("i",{staticClass:"fas fa-external-link-alt f7 ml2"})])}),[],!1,null,"422db95e",null);e.default=component.exports},514:function(t,e,r){"use strict";var n=r(3),o=r(5),l=r(67),c=r(381),f=r(252),d=r(6),h=RangeError,v=String,m=Math.floor,w=o(f),x=o("".slice),M=o(1..toFixed),_=function(t,e,r){return 0===e?r:e%2==1?_(t,e-1,r*t):_(t*t,e/2,r)},y=function(data,t,e){for(var r=-1,n=e;++r<6;)n+=t*data[r],data[r]=n%1e7,n=m(n/1e7)},k=function(data,t){for(var e=6,r=0;--e>=0;)r+=data[e],data[e]=m(r/t),r=r%t*1e7},j=function(data){for(var t=6,s="";--t>=0;)if(""!==s||0===t||0!==data[t]){var e=v(data[t]);s=""===s?e:s+w("0",7-e.length)+e}return s};n({target:"Number",proto:!0,forced:d((function(){return"0.000"!==M(8e-5,3)||"1"!==M(.9,0)||"1.25"!==M(1.255,2)||"1000000000000000128"!==M(0xde0b6b3a7640080,0)}))||!d((function(){M({})}))},{toFixed:function(t){var e,r,n,o,f=c(this),d=l(t),data=[0,0,0,0,0,0],m="",M="0";if(d<0||d>20)throw h("Incorrect fraction digits");if(f!=f)return"NaN";if(f<=-1e21||f>=1e21)return v(f);if(f<0&&(m="-",f=-f),f>1e-21)if(r=(e=function(t){for(var e=0,r=t;r>=4096;)e+=12,r/=4096;for(;r>=2;)e+=1,r/=2;return e}(f*_(2,69,1))-69)<0?f*_(2,-e,1):f/_(2,e,1),r*=4503599627370496,(e=52-e)>0){for(y(data,0,r),n=d;n>=7;)y(data,1e7,0),n-=7;for(y(data,_(10,n,1),0),n=e-1;n>=23;)k(data,1<<23),n-=23;k(data,1<<n),y(data,1,1),k(data,2),M=j(data)}else y(data,0,r),y(data,1<<-e,0),M=j(data)+w("0",d);return M=d>0?m+((o=M.length)<=d?"0."+w("0",d-o)+M:x(M,0,o-d)+"."+x(M,o-d)):m+M}})},515:function(t,e,r){"use strict";r(472)},516:function(t,e,r){var n=r(27)(!1);n.push([t.i,"",""]),t.exports=n},549:function(t,e,r){"use strict";r.r(e);r(13),r(445),r(42),r(446),r(447),r(448),r(449),r(450),r(451),r(452),r(453),r(454),r(455),r(456),r(457),r(458),r(459),r(460),r(461),r(43),r(426),r(379),r(514);var n=r(477),o=r(478),l=new Set(["工安意外","溫室氣體減量目標說明","溫室氣體減量承諾"]),c=new Set(["違反環境法規金額","違反環境法規次數"]),f={props:{columnMeta:{type:Object,required:!0},row:{type:Object,required:!0},quartile:{type:Object,required:!0}},computed:{widget:function(){return l.has(this.columnMeta.measure)?n.default:c.has(this.columnMeta.measure)?o.default:"span"},beautyValue:function(){if(this.columnMeta.isFake)return"待解鎖";if(!(this.columnMeta.key in this.row.stats))return"-";var t=this.row.stats[this.columnMeta.key];if(!l.has(this.columnMeta.measure)&&!Number.isNaN(t.value)){var e=Math.pow(10,this.columnMeta.toFixed||0);return(Math.round(t.value*e)/e).toLocaleString()}return"".concat(t.數值)}}},d=(r(515),r(29)),component=Object(d.a)(f,(function(){var t=this;return(0,t._self._c)(t.widget,{tag:"component",staticClass:"statsValue",class:{"light-silver":t.columnMeta.isFake},attrs:{quartile:t.quartile,row:t.row,"column-meta":t.columnMeta,value:t.beautyValue}},[t._v(t._s(t.beautyValue))])}),[],!1,null,"2f1fff87",null);e.default=component.exports}}]);