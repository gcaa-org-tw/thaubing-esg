(window.webpackJsonp=window.webpackJsonp||[]).push([[38,9,16],{400:function(t,e,r){var content=r(405);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("6e1e522f",content,!0,{sourceMap:!1})},404:function(t,e,r){"use strict";r(400)},405:function(t,e,r){var n=r(27)(!1);n.push([t.i,".esgFooter[data-v-73084c53]{border-color:rgba(0,0,0,.062745098)}.esgFooter a[data-v-73084c53]{color:#49591c;font-weight:500;text-decoration:underline}",""]),t.exports=n},410:function(t,e,r){"use strict";r.r(e);var n={computed:{buildTime:function(){return"2023-03-26T13:50:03Z"}}},c=(r(404),r(29)),component=Object(c.a)(n,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"esgFooter bt bw1 mt3 pt3 pb4 flex-ns justify-between tr tl-ns"},[t._m(0),e("div",{staticClass:"mt2 mt0-ns"},[t._m(1),e("div",{staticClass:"light-silver tr"},[t._v("更新時間： "+t._s(t.buildTime))])])])}),[function(){var t=this,e=t._self._c;return e("div",{staticClass:"mid-gray"},[e("div",{staticClass:"mb2"},[t._v("由"),e("a",{staticClass:"dim",attrs:{href:"http://www.gcaa.org.tw/"}},[t._v("綠色公民行動聯盟")]),t._v(" X "),e("a",{staticClass:"dim",attrs:{href:"https://thaubing.gcaa.org.tw/"}},[t._v("透明足跡計畫")]),t._v("推動")]),e("a",{staticClass:"dim",attrs:{href:"https://gcaa.neticrm.tw/civicrm/contribute/transact?reset=1&id=41&utm_source=Web&utm_content=ESG_donate&utm_campaign=TB3"}},[t._v("捐款支持")])])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"mid-gray"},[e("div",{staticClass:"mb2"},[e("a",{staticClass:"dim",attrs:{href:"https://github.com/gcaa-org-tw/thaubing-esg"}},[t._v("原始碼")]),t._v("以 MIT 釋出")]),e("div",[e("a",{staticClass:"dim",attrs:{href:"https://github.com/gcaa-org-tw/thaubing-esg/tree/main/data"}},[t._v("資料庫")]),t._v("以 "),e("a",{staticClass:"dim",attrs:{href:"https://creativecommons.org/licenses/by-nc/4.0/deed.zh_TW"}},[t._v("創用 CC 姓名標示-非商業性 4.0 國際 ")]),t._v("授權條款釋出")])])}],!1,null,"73084c53",null);e.default=component.exports},415:function(t,e,r){var content=r(430);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("40a75a96",content,!0,{sourceMap:!1})},418:function(t,e,r){t.exports=function(){"use strict";var t=1e3,e=6e4,r=36e5,n="millisecond",i="second",s="minute",u="hour",a="day",c="week",o="month",l="quarter",f="year",d="date",h="Invalid Date",m=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,v=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,_={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},$=function(t,e,r){var n=String(t);return!n||n.length>=e?t:""+Array(e+1-n.length).join(r)+t},g={s:$,z:function(t){var e=-t.utcOffset(),r=Math.abs(e),n=Math.floor(r/60),i=r%60;return(e<=0?"+":"-")+$(n,2,"0")+":"+$(i,2,"0")},m:function t(e,r){if(e.date()<r.date())return-t(r,e);var n=12*(r.year()-e.year())+(r.month()-e.month()),i=e.clone().add(n,o),s=r-i<0,u=e.clone().add(n+(s?-1:1),o);return+(-(n+(r-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:o,y:f,w:c,d:a,D:d,h:u,m:s,s:i,ms:n,Q:l}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",w={};w[y]=_;var p=function(t){return t instanceof C},M=function t(e,r,n){var i;if(!e)return y;if("string"==typeof e){var s=e.toLowerCase();w[s]&&(i=s),r&&(w[s]=r,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;w[a]=e,i=a}return!n&&i&&(y=i),i||!n&&y},S=function(t,e){if(p(t))return t.clone();var r="object"==typeof e?e:{};return r.date=t,r.args=arguments,new C(r)},D=g;D.l=M,D.i=p,D.w=function(t,e){return S(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var C=function(){function _(t){this.$L=M(t.locale,null,!0),this.parse(t)}var $=_.prototype;return $.parse=function(t){this.$d=function(t){var e=t.date,r=t.utc;if(null===e)return new Date(NaN);if(D.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var n=e.match(m);if(n){var i=n[2]-1||0,s=(n[7]||"0").substring(0,3);return r?new Date(Date.UTC(n[1],i,n[3]||1,n[4]||0,n[5]||0,n[6]||0,s)):new Date(n[1],i,n[3]||1,n[4]||0,n[5]||0,n[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},$.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},$.$utils=function(){return D},$.isValid=function(){return!(this.$d.toString()===h)},$.isSame=function(t,e){var r=S(t);return this.startOf(e)<=r&&r<=this.endOf(e)},$.isAfter=function(t,e){return S(t)<this.startOf(e)},$.isBefore=function(t,e){return this.endOf(e)<S(t)},$.$g=function(t,e,r){return D.u(t)?this[e]:this.set(r,t)},$.unix=function(){return Math.floor(this.valueOf()/1e3)},$.valueOf=function(){return this.$d.getTime()},$.startOf=function(t,e){var r=this,n=!!D.u(e)||e,l=D.p(t),h=function(t,e){var i=D.w(r.$u?Date.UTC(r.$y,e,t):new Date(r.$y,e,t),r);return n?i:i.endOf(a)},m=function(t,e){return D.w(r.toDate()[t].apply(r.toDate("s"),(n?[0,0,0,0]:[23,59,59,999]).slice(e)),r)},v=this.$W,_=this.$M,$=this.$D,g="set"+(this.$u?"UTC":"");switch(l){case f:return n?h(1,0):h(31,11);case o:return n?h(1,_):h(0,_+1);case c:var y=this.$locale().weekStart||0,w=(v<y?v+7:v)-y;return h(n?$-w:$+(6-w),_);case a:case d:return m(g+"Hours",0);case u:return m(g+"Minutes",1);case s:return m(g+"Seconds",2);case i:return m(g+"Milliseconds",3);default:return this.clone()}},$.endOf=function(t){return this.startOf(t,!1)},$.$set=function(t,e){var r,c=D.p(t),l="set"+(this.$u?"UTC":""),h=(r={},r[a]=l+"Date",r[d]=l+"Date",r[o]=l+"Month",r[f]=l+"FullYear",r[u]=l+"Hours",r[s]=l+"Minutes",r[i]=l+"Seconds",r[n]=l+"Milliseconds",r)[c],m=c===a?this.$D+(e-this.$W):e;if(c===o||c===f){var v=this.clone().set(d,1);v.$d[h](m),v.init(),this.$d=v.set(d,Math.min(this.$D,v.daysInMonth())).$d}else h&&this.$d[h](m);return this.init(),this},$.set=function(t,e){return this.clone().$set(t,e)},$.get=function(t){return this[D.p(t)]()},$.add=function(n,l){var d,h=this;n=Number(n);var m=D.p(l),v=function(t){var e=S(h);return D.w(e.date(e.date()+Math.round(t*n)),h)};if(m===o)return this.set(o,this.$M+n);if(m===f)return this.set(f,this.$y+n);if(m===a)return v(1);if(m===c)return v(7);var _=(d={},d[s]=e,d[u]=r,d[i]=t,d)[m]||1,$=this.$d.getTime()+n*_;return D.w($,this)},$.subtract=function(t,e){return this.add(-1*t,e)},$.format=function(t){var e=this,r=this.$locale();if(!this.isValid())return r.invalidDate||h;var n=t||"YYYY-MM-DDTHH:mm:ssZ",i=D.z(this),s=this.$H,u=this.$m,a=this.$M,c=r.weekdays,o=r.months,l=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].slice(0,s)},f=function(t){return D.s(s%12||12,t,"0")},d=r.meridiem||function(t,e,r){var n=t<12?"AM":"PM";return r?n.toLowerCase():n},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:D.s(a+1,2,"0"),MMM:l(r.monthsShort,a,o,3),MMMM:l(o,a),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:l(r.weekdaysMin,this.$W,c,2),ddd:l(r.weekdaysShort,this.$W,c,3),dddd:c[this.$W],H:String(s),HH:D.s(s,2,"0"),h:f(1),hh:f(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:D.s(u,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:i};return n.replace(v,(function(t,e){return e||m[t]||i.replace(":","")}))},$.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},$.diff=function(n,d,h){var m,v=D.p(d),_=S(n),$=(_.utcOffset()-this.utcOffset())*e,g=this-_,y=D.m(this,_);return y=(m={},m[f]=y/12,m[o]=y,m[l]=y/3,m[c]=(g-$)/6048e5,m[a]=(g-$)/864e5,m[u]=g/r,m[s]=g/e,m[i]=g/t,m)[v]||g,h?y:D.a(y)},$.daysInMonth=function(){return this.endOf(o).$D},$.$locale=function(){return w[this.$L]},$.locale=function(t,e){if(!t)return this.$L;var r=this.clone(),n=M(t,e,!0);return n&&(r.$L=n),r},$.clone=function(){return D.w(this.$d,this)},$.toDate=function(){return new Date(this.valueOf())},$.toJSON=function(){return this.isValid()?this.toISOString():null},$.toISOString=function(){return this.$d.toISOString()},$.toString=function(){return this.$d.toUTCString()},_}(),x=C.prototype;return S.prototype=x,[["$ms",n],["$s",i],["$m",s],["$H",u],["$W",a],["$M",o],["$y",f],["$D",d]].forEach((function(t){x[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),S.extend=function(t,e){return t.$i||(t(e,C,S),t.$i=!0),S},S.locale=M,S.isDayjs=p,S.unix=function(t){return S(1e3*t)},S.en=w[y],S.Ls=w,S.p={},S}()},419:function(t,e,r){"use strict";r.d(e,"a",(function(){return n}));r(51),r(243),r(13);function n(t,e){return t.map((function(t){var r=e.find((function(meta){return meta.tagEn===t}));return r?r.tagZh:t}))}},428:function(t,e,r){t.exports=r.p+"img/og-default.ddc62db.jpg"},429:function(t,e,r){"use strict";r(415)},430:function(t,e,r){var n=r(27)(!1);n.push([t.i,".articleSum img[data-v-6575cb50]{-o-object-fit:cover;object-fit:cover}.articleSum__tag[data-v-6575cb50]{color:#35811c}.articleSum__tag+.articleSum__tag[data-v-6575cb50]{margin-left:.5rem}.articleSum__date[data-v-6575cb50]{color:#444}",""]),t.exports=n},470:function(t,e,r){"use strict";r.r(e);var n=r(418),c=r.n(n),o=r(419),l=r(428),f=r.n(l),d={props:{article:{type:Object,required:!0,validator:function(article){return article.title&&article.path&&article.creationDate}},tagMeta:{type:Array,default:function(){return[]}},headerTag:{type:String,default:"h2"}},computed:{coverImage:function(){return this.article.coverImage||f.a},tagList:function(){return Object(o.a)(this.article.tags||[],this.tagMeta)},date:function(){return c()(this.article.creationDate).format("YYYY年MM月DD日")}}},h=(r(429),r(29)),component=Object(h.a)(d,(function(){var t=this,e=t._self._c;return e("nuxt-link",{staticClass:"articleSum",attrs:{to:{name:"blog-blog",params:{blog:t.article.slug}}}},[e("div",{staticClass:"aspect-ratio aspect-ratio--16x9 br2 overflow-hidden mb2"},[e("img",{staticClass:"aspect-ratio--object",attrs:{src:t.coverImage,alt:t.article.title}})]),t.tagList.length?e("div",{staticClass:"mt2 flex f6"},t._l(t.tagList,(function(r){return e("div",{staticClass:"articleSum__tag",attrs:{ke:r}},[t._v(t._s(r))])})),0):t._e(),e(t.headerTag,{tag:"component",staticClass:"mt1 mb4 f5 f4-ns fw5 black lh-title"},[t._v(t._s(t.article.title))]),e("div",{staticClass:"articleSum__date f6 lh-copy"},[t._v(t._s(t.date))])],1)}),[],!1,null,"6575cb50",null);e.default=component.exports},515:function(t,e,r){var content=r(549);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("5029cb86",content,!0,{sourceMap:!1})},548:function(t,e,r){"use strict";r(515)},549:function(t,e,r){var n=r(27)(!1);n.push([t.i,".blog .esgNavbar[data-v-aa1f5fa8]{padding-bottom:1rem}.blog__list .articleSum+.articleSum[data-v-aa1f5fa8]{margin-top:1rem}@media screen and (min-width:60em){.blog__list[data-v-aa1f5fa8]{display:grid;grid-template-columns:repeat(auto-fill,19vw);grid-column-gap:1.5rem;-moz-column-gap:1.5rem;column-gap:1.5rem;grid-row-gap:2.625rem;row-gap:2.625rem;justify-content:center}.blog__list .articleSum+.articleSum[data-v-aa1f5fa8]{margin-top:0}}",""]),t.exports=n},591:function(t,e,r){"use strict";r.r(e);var n=r(12),c=(r(55),{layout:"empty",asyncData:function(t){return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.$content,t.params,t.redirect,e.next=3,r("blog").where({wip:!1}).sortBy("creationDate","desc").only(["title","coverImage","tags","creationDate","slug"]).fetch();case 3:return n=e.sent,e.next=6,r("settings").where({type:"blogTags"}).only(["tagEn","tagZh"]).fetch();case 6:return c=e.sent,e.abrupt("return",{articles:n,tagDefs:c});case 8:case"end":return e.stop()}}),e)})))()}}),o=(r(548),r(29)),component=Object(o.a)(c,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"blog"},[e("esg-navbar",{staticClass:"flex flex-column"},[e("div",{staticClass:"flex flex-column flex-auto"},[e("div",{staticClass:"esgHero__main flex-auto flex flex-column items-center justify-center"},[e("h1",{staticClass:"fw6 tc"},[t._v("專欄文章")])]),e("div",{staticClass:"flex-none tr"},[e("a",{staticClass:"esgNavbar__officialSite",attrs:{href:"https://thaubing.gcaa.org.tw/"}},[e("img",{attrs:{src:r(250)}})])])])]),e("div",{staticClass:"esgContainer"},[e("div",{staticClass:"blog__list mv4 mt5-ns"},t._l(t.articles,(function(article){return e("article-summary",{key:article.path,attrs:{article:article,tagMeta:t.tagDefs}})})),1)]),e("div",{staticClass:"esgContainer"},[e("gcaa-footer")],1)],1)}),[],!1,null,"aa1f5fa8",null);e.default=component.exports;installComponents(component,{EsgNavbar:r(251).default,ArticleSummary:r(470).default,GcaaFooter:r(410).default})}}]);