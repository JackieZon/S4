webpackJsonp([14],{"3ci9":function(e,c,i){"use strict";function n(e){i("H0Wb")}Object.defineProperty(c,"__esModule",{value:!0});var t=i("we4z"),d=i("O0OG"),o=i("VU/8"),a=n,A=o(t.a,d.a,!1,a,"data-v-c33d91ec",null);c.default=A.exports},H0Wb:function(e,c,i){var n=i("POkR");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);i("rjj0")("84a46226",n,!0)},O0OG:function(e,c,i){"use strict";var n=function(){var e=this,c=e.$createElement,i=e._self._c||c;return i("div",{attrs:{id:"device"}},[i("div",{staticClass:"device_info"},[i("div",{staticClass:"device_code"},[e.deviceInfo.qrticket?i("img",{attrs:{src:e.deviceInfo.qrticket.indexOf("http://")<0?e.base_url+e.deviceInfo.qrticket:e.deviceInfo.qrticket,alt:""}}):e._e()]),e._v(" "),i("div",{staticClass:"content"},[i("p",[e._v("序列号： "+e._s(e.deviceInfo.deviceNo?e.deviceInfo.deviceNo:"暂无"))]),e._v(" "),i("p",[e._v("设备名称："+e._s(e.deviceInfo.deviceName?e.deviceInfo.deviceName:"暂无"))])])])])},t=[],d={render:n,staticRenderFns:t};c.a=d},POkR:function(e,c,i){c=e.exports=i("FZ+f")(!0),c.push([e.i,"body[data-v-c33d91ec]{background:#ebebeb}#device .device_info[data-v-c33d91ec]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-ms-flex-wrap:wrap;flex-wrap:wrap;text-align:center;padding-top:2rem}#device .device_info .device_code[data-v-c33d91ec]{width:3rem;height:3rem}#device .device_info .device_code img[data-v-c33d91ec]{width:100%}#device .device_info .content[data-v-c33d91ec]{width:100%;margin-top:.25rem;font-size:.3rem;line-height:.45rem;color:#696969}","",{version:3,sources:["D:/jackie_project/device_S4/src/routers/deviceSet/DeviceInfo.vue"],names:[],mappings:"AACA,sBACE,kBAAoB,CACrB,AACD,sCACE,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,wBAAyB,AACrB,qBAAsB,AAClB,uBAAwB,AAChC,mBAAoB,AAChB,eAAgB,AACpB,kBAAmB,AACnB,gBAAkB,CACnB,AACD,mDACE,WAAY,AACZ,WAAa,CACd,AACD,uDACE,UAAY,CACb,AACD,+CACE,WAAY,AACZ,kBAAmB,AACnB,gBAAiB,AACjB,mBAAoB,AACpB,aAAe,CAChB",file:"DeviceInfo.vue",sourcesContent:["\nbody[data-v-c33d91ec] {\n  background: #ebebeb;\n}\n#device .device_info[data-v-c33d91ec] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  text-align: center;\n  padding-top: 2rem;\n}\n#device .device_info .device_code[data-v-c33d91ec] {\n  width: 3rem;\n  height: 3rem;\n}\n#device .device_info .device_code img[data-v-c33d91ec] {\n  width: 100%;\n}\n#device .device_info .content[data-v-c33d91ec] {\n  width: 100%;\n  margin-top: .25rem;\n  font-size: .3rem;\n  line-height: .45rem;\n  color: #696969;\n}\n"],sourceRoot:""}])},we4z:function(e,c,i){"use strict";var n=i("Dd8w"),t=i.n(n),d=(i("SBGd"),i("PBqs")),o=i("NYxO");c.a={data:function(){return{deviceInfo:{},base_url:d.c}},mounted:function(){this.deviceInfo=t()({},this.deviceInfo,this.deviceInfos)},methods:{},computed:t()({},Object(o.d)({deviceInfos:function(e){return e.main.deviceInfo}}))}}});
//# sourceMappingURL=14.884485c0f7655b97c647.js.map