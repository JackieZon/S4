<template>
    <div id="DynamicRecord">
        <yd-accordion>
            <yd-accordion-item title="本月">
                <div style="padding: .24rem;">
                    <p>本次最高心率138次/分钟，点击查看详情。</p>
                    <p>本次最高心率138次/分钟，点击查看详情。</p>
                    <p>本次最高心率138次/分钟，点击查看详情。</p>
                    <p>本次最高心率138次/分钟，点击查看详情。</p>
                    <p>本次最高心率138次/分钟，点击查看详情。</p>
                </div>
            </yd-accordion-item>
            <yd-accordion-item title="10月">
                <div style="padding: .24rem;">
                    <p>本次最高心率138次/分钟，点击查看详情。</p>
                    <p>本次最高心率138次/分钟，点击查看详情。</p>
                    <p>本次最高心率138次/分钟，点击查看详情。</p>
                    <p>本次最高心率138次/分钟，点击查看详情。</p>
                    <p>本次最高心率138次/分钟，点击查看详情。</p>
                    <p>本次最高心率138次/分钟，点击查看详情。</p>
                </div>
            </yd-accordion-item>
        </yd-accordion>
    </div>
</template>
<script>

import { CellSwipe } from 'mint-ui'
import { apiUrl } from "./../../utils/subei_config.js"
import { Toast, Loading, Confirm } from 'vue-ydui/dist/lib.rem/dialog'
import {Accordion, AccordionItem} from 'vue-ydui/dist/lib.rem/accordion'
import { mapState, mapActions } from 'vuex'
import { getMemberInfo,simulationLogin,userInfoEdit } from "./../../sverse/api.js"
import { success } from './../../utils/toast.js'
    export default {
        components:{
            [Accordion.name]: Accordion,
            [AccordionItem.name]: AccordionItem,
            [CellSwipe.name]: CellSwipe
        },
        data () {
            return {

            }
        },
        created(){
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
        }
    }
</script>
<style lang="less" scoped>
    #DynamicRecord{
    }
</style>