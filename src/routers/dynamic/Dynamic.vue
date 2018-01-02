<template>
    <div id="Dynamic">
        <div class="upper">
            <div class="startBtn">
                <div class="item">
                    <div class="btn">
                        开始
                    </div>
                </div>
            </div>
            <div class="dynamicVal">
                <div class="val">0</div>
                <div class="label">次/分钟</div>
            </div>
        </div>
        <div class="lower">
            <ve-line :data="chartData" :settings="chartSettings" :extend="extend" :height="'6rem'"></ve-line>
        </div>
        <div class="record" @click="openPages('DynamicRecord',{})">
            <img src="./../../assets/images/record.png" alt="" srcset="">
        </div>
    </div>
</template>
<script>
import VeLine from 'v-charts/lib/line'
import { apiUrl } from "./../../utils/subei_config.js"
import { Toast, Loading, Confirm } from 'vue-ydui/dist/lib.rem/dialog';
import { mapState, mapActions } from 'vuex'
import { getMemberInfo,simulationLogin,userInfoEdit } from "./../../sverse/api.js"
import { success } from './../../utils/toast.js'
    export default {
        components:{
            [VeLine.name]: VeLine
        },
        data () {
            return {

            }
        },
        created(){
            console.log('组件初始化完成！')
            this.chartData = {
                columns: ['date', 'balance'],
                rows: [
                    { 'date': '1月2日 10:12', 'balance': 75 },
                    { 'date': '1月2日 10:13', 'balance': 118 },
                    { 'date': '1月2日 10:14', 'balance': 80 },
                    { 'date': '1月2日 10:15', 'balance': 75 },
                    { 'date': '1月2日 10:15', 'balance': 55 },
                    { 'date': '1月2日 10:16', 'balance': 60 },
                    { 'date': '1月2日 10:16', 'balance': 70 },
                    { 'date': '1月2日 10:17', 'balance': 85 },
                    { 'date': '1月2日 10:17', 'balance': 90 },
                    { 'date': '1月2日 10:17', 'balance': 85 },
                    { 'date': '1月2日 10:16', 'balance': 88 },
                    { 'date': '1月2日 10:15', 'balance': 180 },
                    { 'date': '1月2日 10:13', 'balance': 109 },
                    { 'date': '1月2日 10:13', 'balance': 95 },
                    { 'date': '1月2日 10:13', 'balance': 75 }
                ]
            }
            this.chartSettings = {
                labelMap: {
                    balance: '心率'
                }
            }
            this.extend = {
                legend:{
                    data:['']
                },
                yAxis:{
                    min: 50
                },
                xAxis:{
                    show: false
                }
            }
        },
        mounted () {
    
        },
        computed:{
            ...mapState({})
        },

        methods: {
             ...mapActions([
                "userInfoSet",
                'changePersonalInfo'
            ]),
            openPages (name,param) {
                param = (JSON.stringify(param) == "{}" ? {} : param);
                this.$router.push({name: name, params: param});
            },
        }
    }
</script>
<style lang="less" scoped>
    @font-face {
        font-family: Dorsa; 
        src: url('./../../assets/ttf/Dorsa-Regular.ttf'); 
    }
    #Dynamic{
        position: relative;
        background: #ffffff;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        .record{
            position: absolute;
            top: .15rem*2;
            right: .15rem*2;
            width: .35rem*2;
            height: .35rem*2;
            img{
                width: 100%;
            }
        }
        .upper{
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .startBtn{
                flex: 1;
                box-sizing: border-box;
                display: flex;
                justify-content: center;
                align-items: center;
                .item{
                    width: 3rem;
                    height: 3rem;
                    border: 1px solid #e5e5e5;
                    border-radius: 50%;
                    overflow: hidden;
                    box-sizing: border-box;
                    padding: .08rem*2;
                    .btn{
                        border-radius: 50%;
                        height: 100%;
                        width: 100%;
                        background: #ff6969;
                        font-size: .18rem*2;
                        color: #fff;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        box-shadow: 0px 0px .1rem*2 #999;
                    }
                }
            }
            .dynamicVal{
                .val{
                    text-align: center;
                    visibility: visible;
                    font-family: "Dorsa";
                    font-size: 60px;
                    font-style: normal;
                    font-weight: 800;
                    letter-spacing: .03rem*2;
                }
                .label{
                    font-size: .16rem*2;
                    color: #666;
                    text-align: center;
                }
            }
        }
        .lower{
            background: #fff;
        }
    }
</style>