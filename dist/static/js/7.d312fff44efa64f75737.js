webpackJsonp([7],{Gee0:function(e,t,i){"use strict";function a(e){i("s464")}Object.defineProperty(t,"__esModule",{value:!0});var n=i("iXxb"),c=i("bpva"),s=i("VU/8"),o=a,r=s(n.a,c.a,!1,o,"data-v-1ad5e6d0",null);t.default=r.exports},bpva:function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"device_set"}},[a("yd-cell-group",[a("yd-cell-item",{attrs:{href:"#",type:"link"}},[a("div",{staticClass:"title",attrs:{slot:"left"},slot:"left"},[a("span",[e._v(e._s(e.deviceGetInfo.deviceName))]),e._v(" "),a("span",[e._v("("+e._s(e.deviceGetInfo.userCodeVer)+")")])]),e._v(" "),a("div",{staticClass:"but",staticStyle:{width:"100%",display:"flex","flex-direction":"row-reverse"},attrs:{slot:"right"},slot:"right"},[a("yd-button",{attrs:{size:"large",type:"danger"},nativeOn:{click:function(t){e.relieveDevice(t)}}},[e._v("解除绑定")])],1)]),e._v(" "),a("yd-cell-item",{attrs:{arrow:"",href:"#",type:"link"},nativeOn:{click:function(t){e.openPages("DeviceInfo",{})}}},[a("span",{attrs:{slot:"left"},slot:"left"},[e._v("设备信息")]),e._v(" "),a("div",{staticClass:"code",attrs:{slot:"right"},slot:"right"},[a("img",{attrs:{src:i("sp20"),alt:""}})])])],1),e._v(" "),a("yd-cell-group",[a("yd-cell-item",{attrs:{arrow:"",type:"a"},nativeOn:{click:function(t){e.openPages("StepSettings",{})}}},[a("span",{attrs:{slot:"left"},slot:"left"},[e._v("步数提醒")]),e._v(" "),a("span",{staticClass:"span_color",attrs:{slot:"right"},slot:"right"},[e._v(e._s(1==e.deviceInfoSeting.sportTargetRemind?e.deviceInfoSeting.sportTarget+" 步":"未设置"))])]),e._v(" "),a("yd-cell-item",{attrs:{arrow:"",type:"a"},nativeOn:{click:function(t){e.openPages("HeartRate",{})}}},[a("span",{attrs:{slot:"left"},slot:"left"},[e._v("心率提醒")]),e._v(" "),a("span",{staticClass:"span_color",attrs:{slot:"right"},slot:"right"},[e._v(e._s(1==e.deviceInfoSeting.heartRateRemind?e.deviceInfoSeting.heartRateCountRemind+" bpm":"未设置"))])]),e._v(" "),a("yd-cell-item",{attrs:{arrow:"",type:"a"},nativeOn:{click:function(t){e.openPages("TempDiff",{})}}},[a("span",{attrs:{slot:"left"},slot:"left"},[e._v("温差提醒")]),e._v(" "),a("span",{staticClass:"span_color",attrs:{slot:"right"},slot:"right"},[e._v(e._s(1==e.deviceInfoSeting.temperatureDifferenceRemind?e.deviceInfoSeting.temperatureDifferenceValue+" ℃":"未设置"))])])],1),e._v(" "),0==e.sex?a("yd-cell-group",[a("yd-cell-item",[a("span",{staticClass:"setting-name",attrs:{slot:"left"},slot:"left"},[e._v("女性生理期")]),e._v(" "),a("span",{attrs:{slot:"right"},slot:"right"},[a("yd-switch",{model:{value:e.cycleFlag,callback:function(t){e.cycleFlag=t},expression:"cycleFlag"}})],1)]),e._v(" "),a("yd-cell-item",{attrs:{arrow:"",type:"a"},nativeOn:{click:function(t){e.openPages("Female",{})}}},[a("span",{attrs:{slot:"left"},slot:"left"},[e._v("女性生理期设置")])])],1):e._e(),e._v(" "),1==e.sex?a("yd-cell-group",[a("yd-cell-item",{attrs:{arrow:"",type:"a"},nativeOn:{click:function(t){e.openPages("Male",{})}}},[a("span",{attrs:{slot:"left"},slot:"left"},[e._v("重要日期提醒")])])],1):e._e()],1)},n=[],c={render:a,staticRenderFns:n};t.a=c},iXxb:function(e,t,i){"use strict";var a=i("mvHQ"),n=i.n(a),c=i("Dd8w"),s=i.n(c),o=i("NYxO"),r=i("SBGd"),M=i("A3j7"),l=(i.n(M),i("TagB"));i("PApA");t.a={data:function(){return{userId:0,sex:0,deviceSetInfo:{}}},mounted:function(){this.userId=window.localStorage.userId,this.sex=Number(window.localStorage.sex),this.deviceSetInfo=s()({},this.deviceSetInfo,this.deviceGetInfo)},methods:{openPages:function(e,t){e&&(t="{}"==n()(t)?{}:t,this.$router.push({name:e,params:t}))},relieveDevice:function(){var e=this;this.$dialog.confirm({mes:"您确定解除绑定吗？",opts:[{txt:"取消",color:!1,callback:function(){}},{txt:"确定",color:!0,callback:function(){Object(r.e)(e.deviceGetInfo.deviceId).then(function(t){Object(l.c)({msg:"解绑成功！"}),e.$router.replace({name:"RelationDevice",params:{}})})}}]})}},computed:s()({},Object(o.d)({deviceGetInfo:function(e){return e.main.deviceInfo},deviceInfoSeting:function(e){return e.main.deviceInfoSeting}})),watch:{deviceInfoSeting:function(e,t){console.error("设备信息"),console.error(e)}}}},s464:function(e,t,i){var a=i("z7HJ");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);i("rjj0")("ecb7f344",a,!0)},sp20:function(e,t){e.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTEwMzcwNzc5OTc5IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE2NDgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNjIuOTk2Nzc2IDQ4NC4wNjE2OTRsNDIzLjE2MjY5NiAwTDQ4Ni4xNTk0NzIgNjAuOTAwMDIyIDYyLjk5Njc3NiA2MC45MDAwMjIgNjIuOTk2Nzc2IDQ4NC4wNjE2OTR6TTE2OC43ODgyMTggMTY2LjY5MDQ0bDIxMS41ODA4MzYgMCAwIDIxMS41ODA4MzZMMTY4Ljc4ODIxOCAzNzguMjcxMjc2IDE2OC43ODgyMTggMTY2LjY5MDQ0ek01MzkuMDU1MTkzIDYwLjkwMDAyMmwwIDQyMy4xNjI2OTYgNDIzLjE2MjY5NiAwTDk2Mi4yMTc4ODggNjAuOTAwMDIyIDUzOS4wNTUxOTMgNjAuOTAwMDIyek04NTYuNDI2NDQ3IDM3OC4yNzEyNzYgNjQ0Ljg0NTYxMSAzNzguMjcxMjc2IDY0NC44NDU2MTEgMTY2LjY5MDQ0bDIxMS41ODA4MzYgMEw4NTYuNDI2NDQ3IDM3OC4yNzEyNzZ6TTIyMS42ODI5MTUgMzI1LjM3NjU3OWwxMDUuNzkwNDE4IDBMMzI3LjQ3MzMzMyAyMTkuNTg1MTM3IDIyMS42ODI5MTUgMjE5LjU4NTEzNyAyMjEuNjgyOTE1IDMyNS4zNzY1Nzl6TTYyLjk5Njc3NiA5NjAuMTIwMTExbDQyMy4xNjI2OTYgMEw0ODYuMTU5NDcyIDUzNi45NTc0MTUgNjIuOTk2Nzc2IDUzNi45NTc0MTUgNjIuOTk2Nzc2IDk2MC4xMjAxMTF6TTE2OC43ODgyMTggNjQyLjc0NzgzM2wyMTEuNTgwODM2IDAgMCAyMTEuNTgwODM2TDE2OC43ODgyMTggODU0LjMyODY2OSAxNjguNzg4MjE4IDY0Mi43NDc4MzN6TTgwMy41MzE3NDkgMjE5LjU4NTEzNyA2OTcuNzQwMzA4IDIxOS41ODUxMzdsMCAxMDUuNzkwNDE4IDEwNS43OTA0MTggMEw4MDMuNTMwNzI2IDIxOS41ODUxMzd6TTUzOS4wNTUxOTMgOTYwLjEyMDExMWwxMDUuNzkwNDE4IDBMNjQ0Ljg0NTYxMSA4NTQuMzI5NjkyIDUzOS4wNTUxOTMgODU0LjMyOTY5MiA1MzkuMDU1MTkzIDk2MC4xMjAxMTF6TTY0NC44NDU2MTEgNjQyLjc0NzgzM2wwIDIxMS41ODA4MzYgMTA1Ljc5MDQxOCAwTDc1MC42MzYwMjkgNjQyLjc0NzgzMyA2NDQuODQ1NjExIDY0Mi43NDc4MzN6TTg1Ni40MjY0NDcgODU0LjMyOTY5MiA3NTAuNjM2MDI5IDg1NC4zMjk2OTIgNzUwLjYzNjAyOSA5NjAuMTIwMTExbDIxMS41ODA4MzYgMEw5NjIuMjE2ODY1IDc0OC41MzgyNTEgODU2LjQyNjQ0NyA3NDguNTM4MjUxIDg1Ni40MjY0NDcgODU0LjMyOTY5MnpNODU2LjQyNjQ0NyA2NDIuNzQ3ODMzbDEwNS43OTA0MTggMEw5NjIuMjE2ODY1IDUzNi45NTc0MTUgODU2LjQyNjQ0NyA1MzYuOTU3NDE1IDg1Ni40MjY0NDcgNjQyLjc0NzgzM3pNNTM5LjA1NTE5MyA1MzYuOTU3NDE1bDAgMTA1Ljc5MDQxOCAxMDUuNzkwNDE4IDBMNjQ0Ljg0NTYxMSA1MzYuOTU3NDE1IDUzOS4wNTUxOTMgNTM2Ljk1NzQxNXpNMjIxLjY4MjkxNSA4MDEuNDMzOTcybDEwNS43OTA0MTggMEwzMjcuNDczMzMzIDY5NS42NDM1NTQgMjIxLjY4MjkxNSA2OTUuNjQzNTU0IDIyMS42ODI5MTUgODAxLjQzMzk3MnoiIGZpbGw9IiNjNWM1YzUiIHAtaWQ9IjE2NDkiPjwvcGF0aD48L3N2Zz4="},z7HJ:function(e,t,i){t=e.exports=i("FZ+f")(!0),t.push([e.i,"#device_set .yd-cell-box[data-v-1ad5e6d0]{margin-top:.35rem}#device_set .title[data-v-1ad5e6d0]{width:80%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-ms-flex-wrap:wrap;flex-wrap:wrap}#device_set .title span[data-v-1ad5e6d0]:nth-child(2){font-size:.28rem;margin-top:.05rem;color:#888}#device_set button[data-v-1ad5e6d0]{width:2rem;height:.5rem;margin-top:0;font-size:.3rem;border-radius:.5rem;background:#c0da30}#device_set .code[data-v-1ad5e6d0]{width:.45rem;height:.45rem}#device_set .code img[data-v-1ad5e6d0]{width:100%;height:100%}#device_set .span_color[data-v-1ad5e6d0]{color:#999}","",{version:3,sources:["D:/jackie_project/device_S4/src/routers/deviceSet/DeviceSet.vue"],names:[],mappings:"AACA,0CACE,iBAAmB,CACpB,AACD,oCACE,UAAW,AACX,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,mBAAoB,AAChB,cAAgB,CACrB,AACD,sDACE,iBAAkB,AAClB,kBAAmB,AACnB,UAAY,CACb,AACD,oCACE,WAAY,AACZ,aAAc,AACd,aAAc,AACd,gBAAiB,AACjB,oBAAqB,AACrB,kBAAoB,CACrB,AACD,mCACE,aAAc,AACd,aAAe,CAChB,AACD,uCACE,WAAY,AACZ,WAAa,CACd,AACD,yCACE,UAAY,CACb",file:"DeviceSet.vue",sourcesContent:["\n#device_set .yd-cell-box[data-v-1ad5e6d0] {\n  margin-top: .35rem;\n}\n#device_set .title[data-v-1ad5e6d0] {\n  width: 80%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n#device_set .title span[data-v-1ad5e6d0]:nth-child(2) {\n  font-size: .28rem;\n  margin-top: .05rem;\n  color: #888;\n}\n#device_set button[data-v-1ad5e6d0] {\n  width: 2rem;\n  height: .5rem;\n  margin-top: 0;\n  font-size: .3rem;\n  border-radius: .5rem;\n  background: #c0da30;\n}\n#device_set .code[data-v-1ad5e6d0] {\n  width: .45rem;\n  height: .45rem;\n}\n#device_set .code img[data-v-1ad5e6d0] {\n  width: 100%;\n  height: 100%;\n}\n#device_set .span_color[data-v-1ad5e6d0] {\n  color: #999;\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=7.d312fff44efa64f75737.js.map