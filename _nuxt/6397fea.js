(window.webpackJsonp=window.webpackJsonp||[]).push([[34,23],{380:function(t,e,r){"use strict";var n=r(15),o=r(7),l=r(5),c=r(129),f=r(22),d=r(18),h=r(242),v=r(54),N=r(99),m=r(243),w=r(6),_=r(98).f,I=r(49).f,M=r(21).f,y=r(382),x=r(241).trim,E="Number",T=o.Number,F=T.prototype,k=o.TypeError,A=l("".slice),S=l("".charCodeAt),V=function(t){var e=m(t,"number");return"bigint"==typeof e?e:L(e)},L=function(t){var e,r,n,o,l,c,f,code,d=m(t,"number");if(N(d))throw k("Cannot convert a Symbol value to a number");if("string"==typeof d&&d.length>2)if(d=x(d),43===(e=S(d,0))||45===e){if(88===(r=S(d,2))||120===r)return NaN}else if(48===e){switch(S(d,1)){case 66:case 98:n=2,o=49;break;case 79:case 111:n=8,o=55;break;default:return+d}for(c=(l=A(d,2)).length,f=0;f<c;f++)if((code=S(l,f))<48||code>o)return NaN;return parseInt(l,n)}return+d};if(c(E,!T(" 0o1")||!T("0b1")||T("+0x1"))){for(var O,C=function(t){var e=arguments.length<1?0:T(V(t)),r=this;return v(F,r)&&w((function(){y(r)}))?h(Object(e),r,C):e},j=n?_(T):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),G=0;j.length>G;G++)d(T,O=j[G])&&!d(C,O)&&M(C,O,I(T,O));C.prototype=F,F.constructor=C,f(o,E,C,{constructor:!0})}},382:function(t,e,r){var n=r(5);t.exports=n(1..valueOf)},405:function(t,e,r){r(3)({target:"Number",stat:!0},{isNaN:function(t){return t!=t}})},408:function(t,e,r){var content=r(439);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("10a10da0",content,!0,{sourceMap:!1})},438:function(t,e,r){"use strict";r(408)},439:function(t,e,r){var n=r(27)(!1);n.push([t.i,".longCell--long[data-v-cbb6ab20]{-webkit-text-decoration:underline dashed;text-decoration:underline dashed;cursor:pointer}",""]),t.exports=n},440:function(t,e,r){var content=r(491);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("3f8530d6",content,!0,{sourceMap:!1})},443:function(t,e,r){"use strict";r.r(e);r(52);var n={props:{value:{type:String,required:!0}},computed:{isTooLong:function(){return this.value.length>8},label:function(){return this.isTooLong?this.value.slice(0,8)+"...":this.value},title:function(){return this.isTooLong?this.value:""}},methods:{showAllValue:function(){this.isTooLong&&window.alert(this.value)}}},o=(r(438),r(39)),component=Object(o.a)(n,(function(){var t=this;return(0,t._self._c)("div",{staticClass:"longCell",class:{"longCell--long":t.isTooLong},attrs:{title:t.title},on:{click:t.showAllValue}},[t._v(t._s(t.label))])}),[],!1,null,"cbb6ab20",null);e.default=component.exports},489:function(t,e,r){"use strict";var n=r(3),o=r(5),l=r(67),c=r(382),f=r(249),d=r(6),h=RangeError,v=String,N=Math.floor,m=o(f),w=o("".slice),_=o(1..toFixed),I=function(t,e,r){return 0===e?r:e%2==1?I(t,e-1,r*t):I(t*t,e/2,r)},M=function(data,t,e){for(var r=-1,n=e;++r<6;)n+=t*data[r],data[r]=n%1e7,n=N(n/1e7)},y=function(data,t){for(var e=6,r=0;--e>=0;)r+=data[e],data[e]=N(r/t),r=r%t*1e7},x=function(data){for(var t=6,s="";--t>=0;)if(""!==s||0===t||0!==data[t]){var e=v(data[t]);s=""===s?e:s+m("0",7-e.length)+e}return s};n({target:"Number",proto:!0,forced:d((function(){return"0.000"!==_(8e-5,3)||"1"!==_(.9,0)||"1.25"!==_(1.255,2)||"1000000000000000128"!==_(0xde0b6b3a7640080,0)}))||!d((function(){_({})}))},{toFixed:function(t){var e,r,n,o,f=c(this),d=l(t),data=[0,0,0,0,0,0],N="",_="0";if(d<0||d>20)throw h("Incorrect fraction digits");if(f!=f)return"NaN";if(f<=-1e21||f>=1e21)return v(f);if(f<0&&(N="-",f=-f),f>1e-21)if(r=(e=function(t){for(var e=0,r=t;r>=4096;)e+=12,r/=4096;for(;r>=2;)e+=1,r/=2;return e}(f*I(2,69,1))-69)<0?f*I(2,-e,1):f/I(2,e,1),r*=4503599627370496,(e=52-e)>0){for(M(data,0,r),n=d;n>=7;)M(data,1e7,0),n-=7;for(M(data,I(10,n,1),0),n=e-1;n>=23;)y(data,1<<23),n-=23;y(data,1<<n),M(data,1,1),y(data,2),_=x(data)}else M(data,0,r),M(data,1<<-e,0),_=x(data)+m("0",d);return _=d>0?N+((o=_.length)<=d?"0."+m("0",d-o)+_:w(_,0,o-d)+"."+w(_,o-d)):N+_}})},490:function(t,e,r){"use strict";r(440)},491:function(t,e,r){var n=r(27)(!1);n.push([t.i,"",""]),t.exports=n},521:function(t,e,r){"use strict";r.r(e);r(405),r(380),r(489);var n=r(443),o={props:{columnMeta:{type:Object,required:!0},row:{type:Object,required:!0},quartile:{type:Object,required:!0}},computed:{widget:function(){return"工安意外"===this.columnMeta.measure?n.default:"span"},beautyValue:function(){if(this.columnMeta.isFake)return"待解鎖";if(!(this.columnMeta.key in this.row.stats))return"-";var t=this.row.stats[this.columnMeta.key];if(!Number.isNaN(t.value)){var e=Math.pow(10,this.columnMeta.toFixed||0);return(Math.round(t.value*e)/e).toLocaleString()}return"".concat(t.數值)}}},l=(r(490),r(39)),component=Object(l.a)(o,(function(){var t=this;return(0,t._self._c)(t.widget,{tag:"component",staticClass:"statsValue",class:{"light-silver":t.columnMeta.isFake},attrs:{quartile:t.quartile,row:t.row,"column-meta":t.columnMeta,value:t.beautyValue}},[t._v(t._s(t.beautyValue))])}),[],!1,null,"687cf076",null);e.default=component.exports}}]);