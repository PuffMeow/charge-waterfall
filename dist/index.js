!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("core-js/modules/es.string.starts-with.js"),require("core-js/modules/es.array.from.js"),require("core-js/modules/es.string.iterator.js"),require("core-js/modules/es.array.fill.js"),require("core-js/modules/es.array.concat.js"),require("core-js/modules/es.array.iterator.js"),require("core-js/modules/es.object.to-string.js"),require("core-js/modules/es.promise.js"),require("core-js/modules/esnext.promise.all-settled.js"),require("core-js/modules/web.dom-collections.iterator.js"),require("core-js/modules/es.array.map.js"),require("core-js/modules/es.array.for-each.js"),require("core-js/modules/web.dom-collections.for-each.js"),require("core-js/modules/es.array.index-of.js"),require("core-js/modules/es.date.to-string.js"),require("core-js/modules/web.timers.js")):"function"==typeof define&&define.amd?define(["core-js/modules/es.string.starts-with.js","core-js/modules/es.array.from.js","core-js/modules/es.string.iterator.js","core-js/modules/es.array.fill.js","core-js/modules/es.array.concat.js","core-js/modules/es.array.iterator.js","core-js/modules/es.object.to-string.js","core-js/modules/es.promise.js","core-js/modules/esnext.promise.all-settled.js","core-js/modules/web.dom-collections.iterator.js","core-js/modules/es.array.map.js","core-js/modules/es.array.for-each.js","core-js/modules/web.dom-collections.for-each.js","core-js/modules/es.array.index-of.js","core-js/modules/es.date.to-string.js","core-js/modules/web.timers.js"],t):(e="undefined"!=typeof globalThis?globalThis:e||self).bundle=t()}(this,(function(){"use strict";
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */function e(e,t,o,r){return new(o||(o=Promise))((function(i,n){function s(e){try{l(r.next(e))}catch(e){n(e)}}function a(e){try{l(r.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,a)}l((r=r.apply(e,t||[])).next())}))}function t(e,t){var o,r,i,n,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return n={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(n[Symbol.iterator]=function(){return this}),n;function a(n){return function(a){return function(n){if(o)throw new TypeError("Generator is already executing.");for(;s;)try{if(o=1,r&&(i=2&n[0]?r.return:n[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,n[1])).done)return i;switch(r=0,i&&(n=[2&n[0],i.value]),n[0]){case 0:case 1:i=n;break;case 4:return s.label++,{value:n[1],done:!1};case 5:s.label++,r=n[1],n=[0];continue;case 7:n=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==n[0]&&2!==n[0])){s=0;continue}if(3===n[0]&&(!i||n[1]>i[0]&&n[1]<i[3])){s.label=n[1];break}if(6===n[0]&&s.label<i[1]){s.label=i[1],i=n;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(n);break}i[2]&&s.ops.pop(),s.trys.pop();continue}n=t.call(e,s)}catch(e){n=[6,e],r=0}finally{o=i=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}([n,a])}}}var o=function(o){var r=this;this.items=[],this.itemHeight=[],this.store={},this.initDefaultValue=function(){var e=r.options,t=e.imgContainerClass,o=e.imgClass,i=e.bottomContainerClass;e.column||(r.options.column=2),t||(r.options.imgContainerClass="waterfall-img-container"),o||(r.options.imgClass="waterfall-img"),i||(r.options.bottomContainerClass="waterfall-bottom-container")},this.init=function(){return e(r,void 0,void 0,(function(){var e,o,r,i,n;return t(this,(function(t){if(e=this.options,o=e.resizable,r=void 0!==o&&o,i=e.initialData,n=e.column,"string"==typeof this.options.container){if(!this.options.container.startsWith(".")&&!this.options.container.startsWith("#"))throw Error("请按照标准的dom查询条件传入，如'.container'或'#container'");this.options.container=document.querySelector(this.options.container)}if(!this.options.container)throw Error("container实例不存在，请检查");if(Array.from(this.options.container.children).length)throw Error("container中存在其它元素，请确保container容器中没有其它子元素");return this.itemHeight=new Array(n).fill(0),this.options.container.style.position="relative",r&&this.resize(),this.initImage(i),[2]}))}))},this.initImage=function(o){return e(r,void 0,void 0,(function(){var e;return t(this,(function(t){switch(t.label){case 0:return[4,this.createContent(o)];case 1:return e=t.sent(),this.items=this.items.concat(e),this.computePosition(e),[2]}}))}))},this.createContent=function(o){return void 0===o&&(o=[]),e(r,void 0,void 0,(function(){var e,r,i,n,s,a,l,c,u,m,d;return t(this,(function(t){switch(t.label){case 0:return e=this.options,r=e.onClick,i=e.imgClass,n=e.imgContainerClass,s=e.bottomContainerClass,a=e.render,l=e.defaultImgUrl,c=void 0===l?"":l,[4,Promise.allSettled(o.map((function(e){return e.src&&(t=e.src,o=c,new Promise((function(e,r){var i=new Image;i.src=t,i.onload=e,i.onerror=function(e){i.src=o,r(e)}})));var t,o})))];case 1:return u=t.sent(),m=[],d=document.createDocumentFragment(),o.forEach((function(e,t){var o=document.createElement("div");if(o.className=n,e.src){var l=document.createElement("img");l.style.verticalAlign="bottom",l.src=e.src,console.log(u[t].status),"rejected"===u[t].status&&(l.src=c),l.alt=(null==e?void 0:e.alt)||"image",l.className=i,o.appendChild(l)}if(a){var h=document.createElement("div");h.className=s,h.innerHTML=a(e),o.appendChild(h)}o.onclick=function(t){null==r||r(e,t)},m.push(o),d.appendChild(o)})),this.options.container.append(d),[2,m]}}))}))},this.computePosition=function(e,t){void 0===t&&(t=!1),requestAnimationFrame((function(){var o=r.options,i=o.gapX,n=void 0===i?0:i,s=o.gapY,a=void 0===s?0:s,l=o.column,c=o.width,u=o.bottomContainerClass,m=o.render;c=c||r.options.container.clientWidth/l,t&&(r.itemHeight=new Array(l).fill(0)),e.forEach((function(e){e.style.opacity="0";var t,o=e.querySelector("img");if(o&&(o.style.width=c+"px"),e.style.width=c+"px",e.style.position="absolute",m){var i=e.querySelector("."+u);i.style.width=c+"px",t=((null==o?void 0:o.height)||50)+((null==i?void 0:i.clientHeight)||0),console.log("imgContainerHeight",t)}else t=(null==o?void 0:o.height)||0;var s=r.itemHeight.indexOf(Math.min.apply(Math,r.itemHeight));e.style.left=s*(c+n)+"px",e.style.top=r.itemHeight[s]+"px",r.itemHeight[s]+=Math.round(t*c/c+a),e.style.transition="opacity 0.2s",e.style.opacity="1"})),r.refreshContainerHeight()}))},this.refreshContainerHeight=function(){r.options.container.style.height=Math.max.apply(Math,r.itemHeight)+"px"},this.resize=function(){window.addEventListener("resize",r.store.throttleResize=function(e,t){void 0===t&&(t=100);var o=+new Date;return function(){for(var r=[],i=0;i<arguments.length;i++)r[i]=arguments[i];+new Date-o>t&&(e.apply(this,r),o=+new Date)}}((function(){r.computePosition(r.items,!0)}),50))},this.onReachBottom=function(e){var t=r.options.bottomDistance,o=void 0===t?100:t;if(o<100)throw Error("bottomDistance，触底事件离底部触发的距离不能小于100");window.addEventListener("scroll",r.store.debounceScroll=function(e,t){void 0===t&&(t=100);var o=null;return function(){for(var r=this,i=[],n=0;n<arguments.length;n++)i[n]=arguments[n];o&&clearTimeout(o),o=setTimeout((function(){e.apply(r,i)}),t)}}((function(){var t=document.documentElement,r=t.clientHeight,i=t.scrollTop,n=t.scrollHeight;r+i+o>=n&&e()}),100))},this.loadMore=function(o){return e(r,void 0,void 0,(function(){return t(this,(function(e){return this.initImage(o),[2]}))}))},this.destroy=function(){window.removeEventListener("resize",r.store.throttleResize),window.removeEventListener("scroll",r.store.debounceScroll)},this.options=o,this.initDefaultValue(),this.init()};return o}));