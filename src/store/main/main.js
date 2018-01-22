/**
 * Created by Administrator on 2017/9/15.
 */
import { l } from './../../utils/base'
import { Cmd } from './../../utils/device/Packet'
import { DataHandler, LCDDisplayDataHandler, SleepDataHandler, SportDataHandler, TempRHPressDataHandler, PulseDataHandler } from './../../utils/device/DataHandler'
import { senddataBytes } from './../../utils/device/WXDevice'
import { bytesToHex, byteToHex, hexToBytes } from './../../utils/device/HexUtils'
import { confirm } from './../../utils/toast'

let state = {
    taskQueue: [
        {
            // 屏幕显示数据
            name: 'getLCDDisplayData',
            isExec: false
        },
        {
            // 同步时间
            name: 'setLCDDTime',
            isExec: false
        },
        {
            // 手环电量查询
            name: 'getBattery',
            isExec: false
        },
        {
            //读取里程信息
            name: 'getLCDDisplayDataNew',
            isExec: false
        },
        {
            //读取提醒阈值
            name: 'getFlashingWarningThreshold',
            isExec: true
        },
        {
            //设置提醒阈值
            name: 'setFlashingWarningThreshold',
            isExec: false
        },
        {
            //读取个人信息(身高体重)
            name: 'getPersonalInfo',
            isExec: false
        },
        {
            //设置个人信息(身高体重)
            name: 'setPersonalInfo',
            isExec: false
        },
        {
            //读取版本
            name: 'getUserCodeVer',
            isExec: false
        },
        {
            //节日提醒 女性生理周期提醒
            name: 'getHolidayReminder',
            isExec: false
        },
        {
            //读取运动历史
            name: 'getSport',
            isExec: false
        },
        {
            //读取睡眠
            name: 'getSleep',
            isExec: false
        },
        {
            //读取温湿度气压
            name: 'getTempRHPress',
            isExec: true
        },
        {
            //读取历史脉搏数据
            name: 'getHistoricalPulse',
            isExec: true
        },
    ],
    taskQueueIndex: 0,
    mainTheadRunIng: false,
    config: {
        //实时数据读取线程开关
        readLCDDataTheadEnable: true,
        //WX设备库状态
        WXDeviceLibState: 0,
        //最后发起读取实时数据的时间
        lastReadLCDDataTime: new Date('2017/1/1'),
        //读取实时数据的间隔秒数
        readLCDDataInterval: 6,
        //是否读取历史数据中
        IsReadHistoryData: false,
        //最后发送成功的时间
        lastSendSuccessTime: new Date('2017/1/1'),
        //最后成功接收的时间
        lastReceiveSuccessTime: new Date('2017/1/1'),
        lastSetTime: new Date('2017/1/1'),
        //历史数据长度
        DataLen: 0,
        //已接收数据长度
        ReceiveDataLen: 0,
        ///当前指令
        CurCmd: Cmd.sports,
        ///当前处理程序
        CurHandler: null,
        //最后执行队列的时间
        taskQueueTimeLast: new Date('2017/1/1'),
        LCDDisplayDataHandlerSuccessFlag: false,
        SleepDataHandlerSuccessFlag: false,
        SportDataHandlerSuccessFlag: false,
        TempRHPressDataHandlerSuccessFlag: false,
        PulseDataHandlerSuccessFlag: false,
    },
    deviceInfo: {
        deviceId: '',
        deviceType: '',
        connectState: false, // 设备已连接状态

        //心率提醒参数
        heartRateSwitch: false,
        heartRateDate: 0,

        //温差提醒参数
        tempDiffSwitch: false,
        tempDiffDate: 0,

        //步数目标参数
        stepNumber: 0,

        // 电量
        bracelet: 5,

        //固件版本
        userCodeVer: 'v1.0.0',
        //心率报警值
        rawDeviceSetHeartRateMax: 0,
        //步数目标
        rawDeviceSetStepTarget: 0,
        //温差提醒阀值
        rawDeviceSetTempDiff: 0,
        //里程
        km: 0,
        //身高
        Height: 172,
        //体重
        Weight: 60,
        //节日提醒开启状态
        remindonstate: false,
        //周期
        cycle: 0,
        //下次提醒天数
        nextremind: 0,

    },
    deviceInfoSeting:{
        deviceType: 2,
        heartRateCountRemind: 0,
        heartRateRemind: 0,
        sportTarget: 0,
        sportTargetRemind: 1,
        temperatureDifferenceRemind: 0,
        temperatureDifferenceValue: 0,
        lowHeartRateValue: 0
    },
    userInfo: { 
        openId: 'openId',
        menstruationCycle: 28,
        menstruationDays: 5,
    },
    female:{
        maleStart: false,
        maleEnd: false,
    },
    LCDDisplayData: {
        sportstep: null,
        calorie: null,
        sleephour: null,
        heartrate: null,
        bodysurfacetemp: null,
        humidity: null,
        temperature: null,
        pressure: null
    },
    tooltipInfo: '',             //顶部提示信息
    dynamicHeartRate: {
        heartRateTimer: 0,
        status: 3,               // 1已打开 2同步中 3关闭 
        heartRateList: [],
    }
}

const mutations = {
    pushHeartRateList(state, payload){
        
        console.error(`保存到store中,【${payload.hrCount}】`)
        state.dynamicHeartRate.heartRateList.push(payload)
        
    },
    clearHeartRateList(state, payload){
        console.log('执行清空心率数据')
        state.dynamicHeartRate.heartRateList = []
    },
    setDynamicHeartRate(state, payload){
        if(payload.status==3){
            console.log('关闭循环读取心率数据')
            clearInterval(state.dynamicHeartRate.heartRateTimer)
        }
        state.dynamicHeartRate = {...state.dynamicHeartRate, ...payload}
    },
    deviceInfoSetingSet(state, payload) {
        state.deviceInfoSeting = {...state.deviceInfoSeting, ...payload}
    },
    userInfoSets(state, payload) {
        state.userInfo = { ...state.userInfo, ...payload }
    },
    femaleSet(state, payload){
        state.female = { ...state.female, ...payload }
    },
    saveMainTheadRunIng(state, payload) {     // 存储商品信息
        state.mainTheadRunIng = payload
    },
    configSet(state, payload) {
        state.config = { ...state.config, ...payload }
    },
    deviceInfoSet(state, payload) {
        state.deviceInfo = { ...state.deviceInfo, ...payload }
    },
    LCDDisplayDataSet(state, payload) {
        state.LCDDisplayData = { ...state.LCDDisplayData, ...payload }
    },
    taskQueueSet(state, payload) {
        const { index } = payload
        state.taskQueue[index].isExec = true
    },
    taskQueueIndexSet(state, payload) {
        state.taskQueueIndex = payload
    },
    taskQueueTimeLastSet(state, payload) {
        state.taskQueueTimeLast = new Date()
    },
    tooltipInfoSet(state, payload) {
        // l.w('更新到Store')
        l.w(payload)
        state.tooltipInfo = payload
    },
    // changeQueue(state, payload) {
    //     // l.w('更新到Store')
    //     l.w(payload)
    //     state.taskQueue[payload.index] = payload.obj
    // },
}

const actions = {
    userInfoSet({ commit, state, dispatch, getters }, payload) {
        commit('userInfoSets', payload);
    },
    deviceInfoSet({ commit, state, dispatch, getters }, payload) {
        commit('deviceInfoSet', payload);
    },
    mainthead({ commit, state, dispatch, getters }, payload) {
        let { WXDeviceLibState, lastReceiveSuccessTime, taskQueueTimeLast, lastSendSuccessTime } = state.config

        // console.log(`
        //     WXDeviceLibState: 保存的设备库状态(蓝牙状态); =1(蓝牙已打开) =2(微信未授权蓝牙) =3(蓝牙未打开) =4(设备库初始化失败)
        //     lastReceiveSuccessTime: 成功接收蓝牙数据的时间
        //     taskQueueTimeLast: 上一次执行队列任务的时间
        //     lastSendSuccessTime: 数据发送成功的时间
        // `)

        let { connectState } = state.deviceInfo
        //保持单例运行
        if (state.mainTheadRunIng) return;
        // l.i('运行中...')
        commit('saveMainTheadRunIng', true)
        try {

            //读取历史记录超过13秒未响应（需要配合接收超时的重试间隔和次数）
            // console.log(`尝试执行队列任务 以下是状态`)
            // console.log(`
            //     WXDeviceLibStateL(蓝牙连接状态): 【 ${WXDeviceLibState} 】,
            //     connectState(设备连接状态): 【 ${connectState} 】,
            //     (new Date().getTime() / 1000 - taskQueueTimeLast.getTime() / 1000): 【 ${ ((new Date().getTime() / 1000 - taskQueueTimeLast.getTime() / 1000) > 3) } 】
            //     (sendTimeOut === null || ((new Date().getTime() / 1000 - lastSendSuccessTime.getTime() / 1000) > 13))：【 ${(sendTimeOut === null || ((new Date().getTime() / 1000 - lastSendSuccessTime.getTime() / 1000) > 13))} 】
            // `)

            if (WXDeviceLibState == 1
                && connectState
                && (new Date().getTime() / 1000 - taskQueueTimeLast.getTime() / 1000) > 3
                && (new Date().getTime() / 1000 - lastReceiveSuccessTime.getTime() / 1000) > 13
                && (sendTimeOut === null || ((new Date().getTime() / 1000 - lastSendSuccessTime.getTime() / 1000) > 13))
            ) {
                commit('taskQueueTimeLastSet') // 保存当前执行时间
                dispatch('taskQueueExec', {})
            }
        }
        catch (e) {
            l.e('主线程出错', e.message, e.stack)
        }

        commit('saveMainTheadRunIng', false)
        setTimeout(() => {
            dispatch('mainthead')
        }, 1000);

    },
    taskQueueExec: function ({ commit, state, dispatch, getters }, payload) {

        // console.log(`开始执行队列任务：【 taskQueueExec 】`)
        let { taskQueue, taskQueueIndex } = state
        let { QueueName } = payload

        // 改变执行完的任务状态
        console.warn('执行改变任务状态方法前');
        console.warn(`QueueName:【${QueueName}】`);
        console.warn(`QueueName typeOf:【${typeof QueueName}】`);

        if(QueueName){
            console.warn(`接收到同步完成标记的任务【${QueueName}】`);
            QueueNameFor:
                for (let task = 0; task < taskQueue.length; task++){
                    if(taskQueue[task].name == QueueName){
                        commit('taskQueueSet', { index: task });
                    }
                    let taskLen = taskQueue.length;
                    if((taskLen - 1) == task){
                        break QueueNameFor;
                    }
                }
        }

        // 执行未执行的任务
        QueueLoop:
            for (let i = 0; i < taskQueue.length; i++){

                console.warn(`执行【${taskQueue[i].name}】状态是${taskQueue[i].isExec}`)

                if(taskQueue[i].isExec === false){
                    console.warn(`状态通过，立即执行【${ taskQueue[i].name }】`)
                    dispatch(taskQueue[i].name)
                    break QueueLoop;
                }
                let taskLen = taskQueue.length;
                if((taskLen - 1) == i){
                    console.warn('单项任务已执行完。')
                    dispatch('readLCDDataThead')
                }

            }

    },
    readLCDDataThead({ commit, state, dispatch, getters }, payload) {
        let { WXDeviceLibState,
            IsReadHistoryData,
            LCDDisplayDataHandlerSuccessFlag,
            TempRHPressDataHandlerSuccessFlag,
            lastReadLCDDataTime,
            readLCDDataInterval,
            readLCDDataTheadEnable,
            lastSetTime
             } = state.config

        let { connectState } = state.deviceInfo
        try {
           // l.i('readLCDDataThead')
            const { taskQueue, taskQueueIndex, dynamicHeartRate } = state

            //没有在读取历史数据
            let taskLen = taskQueue.length;
            if (WXDeviceLibState == 1 && taskQueue[taskLen-1].isExec && dynamicHeartRate.status==3) {
                //设备处于连接状态 且 已经超过读取间隔
                //l.i(`connectState=${connectState}||lastReadLCDDataTime=${((new Date().getTime() / 1000) - (lastReadLCDDataTime.getTime() / 1000))}||readLCDDataInterval=${readLCDDataInterval}||TempRHPressDataHandlerSuccessFlag=${TempRHPressDataHandlerSuccessFlag}`)
                if (connectState &&
                    ((new Date().getTime() / 1000) - (lastReadLCDDataTime.getTime() / 1000)) > readLCDDataInterval) {

                    lastReadLCDDataTime = new Date();
                    commit('configSet', { lastReadLCDDataTime: new Date() })
                    dispatch('getLCDDisplayData', {})
                }
            }
        } catch (e) {
            l.e('readLCDDataThead方法内错误')
        }

        //读取实时数据启用中
        if (readLCDDataTheadEnable) {
            setTimeout(() => {
                dispatch('readLCDDataThead')
            }, 2000);
        }
    },
    getLCDDisplayData: function ({ commit, state, dispatch, getters }, payload) {
        // console.log(`执行读取手环数据：【 getLCDDisplayData 】`)
        let t_data = this;
        if (typeof (window.lcdDisplayDataHandler) !== 'function') {
            (function () {
                var Super = function () { };
                Super.prototype = DataHandler.prototype;
                SleepDataHandler.prototype = new Super();
            })();
            window.lcdDisplayDataHandler = new LCDDisplayDataHandler(t_data)
        }
        const { IsReadHistoryData } = state.config
        if (IsReadHistoryData) return;
        window.lcdDisplayDataHandler.SendCount = 1;
        window.lcdDisplayDataHandler.NeedReply = true;
        window.lcdDisplayDataHandler.DataDomain = 0;
        senddataBytes(state.deviceInfo.wecDeviceId, {
            cmd: Cmd.LCDDisplayData,
            data: '',
            dataHandler: window.lcdDisplayDataHandler,
            t_data: t_data
        })
    },
    setLCDDTime({ commit, state, dispatch, getters }, payload) {
        var now = new Date();
        var nowtimebytes = [now.getFullYear() - 2000, (now.getMonth() + 1), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()];
        // console.log('同步设置时间')
        // console.log(bytesToHex(nowtimebytes))
        dispatch('SendCmd', { cmd: Cmd.setTime, data: bytesToHex(nowtimebytes) });
    },
    getBattery({ commit, state, dispatch, getters }, payload) {
        dispatch('SendCmd', { cmd: Cmd.bracelet, data: '' });
    },
    getLCDDisplayDataNew({ commit, state, dispatch, getters }, payload) {
        dispatch('SendCmd', { cmd: Cmd.LCDDisplayDataNew, data: '' });
    },
    getPersonalInfo({ commit, state, dispatch, getters }, payload) {
        dispatch('SendCmd', { cmd: Cmd.personalInfo, data: '01' });
    },
    setPersonalInfo({ commit, state, dispatch, getters }, payload) {
        //是否需要设置身高体重
        if (!(typeof state.userInfo.height == 'undefined') && state.userInfo.height > 0
            && !(typeof state.userInfo.weight == 'undefined') && state.userInfo.weight > 0
            && (state.userInfo.height != state.deviceInfo.Height || state.userInfo.weight != state.deviceInfo.Weight)) {
            const { height, weight } = state.userInfo
            l.w(`Height:${height},Weight:${weight}`)
            // console.log(`设置的身高数据:${bytesToHex([height, weight])}`)
            dispatch('SendCmd', { cmd: Cmd.personalInfo, data: '02' + bytesToHex([height, weight]) });
        }
        else {
            l.w('身高体重跳过')
            //直接跳过
            dispatch('taskQueueExec', { QueueName: 'setPersonalInfo' })
        }
    },
    setHolidayReminder({ commit, state, dispatch, getters }, payload) {
        let { remindonstate, cycle, nextremind } = state.deviceInfo
        let command = `0${remindonstate}`
        console.log(
            `
                设置前的参数【女性生理周期】
                子命令: 【02】;
                开关: 【${remindonstate}】;
                周期：【${cycle}】;
                天数：【${nextremind}】;
            `
        )
        dispatch('SendCmd', { cmd: Cmd.holidayReminder, data: '02' + bytesToHex([remindonstate, cycle, nextremind]) });

    },
    getFlashingWarningThreshold({ commit, state, dispatch, getters }, payload) {
        dispatch('SendCmd', { cmd: Cmd.FlashingWarningThreshold, data: '01' });
    },
    setFlashingWarningThreshold({ commit, state, dispatch, getters }, payload) {
        const {
            rawDeviceSetHeartRateMax, rawDeviceSetStepTarget, rawDeviceSetTempDiff,
            heartRateCountRemind, sportTarget, temperatureDifferenceValue,
            heartRateRemind, temperatureDifferenceRemind, sportTargetRemind
         } = state.deviceInfo

        // rawDeviceSetHeartRateMax 手环里面的心率值（为零等于未开启）
        // heartRateRemind 服务器返回的心率开关
        // heartRateCountRemind 服务器返回的心率值

        // rawDeviceSetStepTarget 手环的步数目标值（为零等于未开启）
        // sportTargetRemind 接口返回步数开关
        // sportTarget 接口返回步数值

        // rawDeviceSetTempDiff 温差提醒筏值开关（为零等于未开启）
        // temperatureDifferenceRemind 接口返回温差提醒筏值开关
        // temperatureDifferenceValue 温差筏值

        //  if(heartRateRemind==1){

        //  }

        console.error(`heartRateRemind:${heartRateRemind},rawDeviceSetHeartRateMax:${rawDeviceSetHeartRateMax},heartRateCountRemind:${heartRateCountRemind},rawDeviceSetStepTarget:${rawDeviceSetStepTarget},sportTarget:${sportTarget},rawDeviceSetTempDiff:${rawDeviceSetTempDiff},temperatureDifferenceValue:${temperatureDifferenceValue}`)
         
        const ratemax = heartRateRemind ? heartRateCountRemind : 0; // 设置心率值
        const steptarget = hexToBytes(Number( sportTargetRemind ? sportTarget : 0).toString(16).PadLeft(4)).reverse(); // 设置运动步数
        const tempdiff = parseInt('0' + Number(temperatureDifferenceRemind ? temperatureDifferenceValue : 0).toString(2).PadLeft(7), 2);  // 设置温差提醒
        
        l.w(`设置提醒阀值执行ratemax:${ratemax},steptarget:${bytesToHex(steptarget)},sportTarget:${sportTarget},tempdiff:${tempdiff}`)

        dispatch('SendCmd', { cmd: Cmd.FlashingWarningThreshold, data: '02' + bytesToHex([ratemax,40].concat(steptarget, [tempdiff])) });

        // dispatch('taskQueueExec', { isSetSuccess: true })
        // if (rawDeviceSetHeartRateMax != heartRateCountRemind ||
        //     rawDeviceSetStepTarget != sportTarget ||
        //     rawDeviceSetTempDiff != temperatureDifferenceValue) {
        // }
        // else {
        //     l.w('设置提醒阀值跳过')
        //     //直接跳过
        //     dispatch('taskQueueExec', { isSetSuccess: true })
        // }
    },
    getUserCodeVer({ commit, state, dispatch, getters }, payload) {
        dispatch('SendCmd', { cmd: Cmd.userCodeVer, data: '' });
    },
    getHolidayReminder({ commit, state, dispatch, getters }, payload) {
        dispatch('SendCmd', { cmd: Cmd.holidayReminder, data: '01' });
    },
    SendCmd({ commit, state, dispatch, getters }, payload) {
        let t_data = this
        if (typeof (window.dataHandler) !== 'function') {
            window.dataHandler = new DataHandler(undefined, undefined, t_data)
        }

        // 发送的本帧编号
        window.dataHandler.SendCount = 1;       // 重发次数
        window.dataHandler.NeedReply = true;    // 是否为必须应答
        window.dataHandler.DataDomain = 0;      // 数据域定义

        senddataBytes(state.deviceInfo.wecDeviceId, {
            cmd: payload.cmd,
            data: payload.data,
            dataHandler: window.dataHandler,
            t_data: t_data
        })
        
    },
    getSleep({ commit, state, dispatch, getters }, payload) {
        var t_data = this;
        // console.log('读取睡眠时间')
        commit('configSet', { IsReadHistoryData: true })
        if (typeof (window.sleepDataHandler) !== 'function') {
            (function () {
                var Super = function () { };
                Super.prototype = DataHandler.prototype;
                SleepDataHandler.prototype = new Super();
            })();
            window.sleepDataHandler = new SleepDataHandler(t_data);
        }
        console.log(window.sleepDataHandler)
        //发送请求帧
        window.sleepDataHandler.SendCount = 1;
        window.sleepDataHandler.NeedReply = true;
        window.sleepDataHandler.DataDomain = 0;

        senddataBytes(state.deviceInfo.wecDeviceId, {
            cmd: Cmd.sleep,
            data: '',
            dataHandler: window.sleepDataHandler,
            t_data: t_data
        })
    },
    getSport({ commit, state, dispatch, getters }, payload) {
        var t_data = this;
        // l.i('读取历史运动数据')
        //commit('configSet',{IsReadHistoryData: true})
        if (typeof (window.sportDataHandler) !== 'function') {
            //通用回复处理
            (function () {
                var Super = function () { };
                Super.prototype = DataHandler.prototype;
                SportDataHandler.prototype = new Super();
            })();
            window.sportDataHandler = new SportDataHandler(t_data);
        }
        //发送请求帧
        window.sportDataHandler.SendCount = 1;
        window.sportDataHandler.NeedReply = true;
        window.sportDataHandler.DataDomain = 0;

        senddataBytes(state.deviceInfo.wecDeviceId, {
            cmd: Cmd.sports,
            data: '',
            dataHandler: window.sportDataHandler,
            t_data: t_data
        })
    },
    getTempRHPress({ commit, state, dispatch, getters }, payload) {
        var t_data = this;
        // l.i('读取历史温湿度气压数据')
        //commit('configSet',{IsReadHistoryData: true})
        if (typeof (window.tempRHPressDataHandler) !== 'function') {
            //通用回复处理
            (function () {
                var Super = function () { };
                Super.prototype = DataHandler.prototype;
                TempRHPressDataHandler.prototype = new Super();
            })();
            window.tempRHPressDataHandler = new TempRHPressDataHandler(t_data);
        }
        //发送请求帧 
        window.tempRHPressDataHandler.SendCount = 1;
        window.tempRHPressDataHandler.NeedReply = true;
        window.tempRHPressDataHandler.DataDomain = 0;

        senddataBytes(state.deviceInfo.wecDeviceId, {
            cmd: Cmd.Temphumpres,
            data: '',
            dataHandler: window.tempRHPressDataHandler,
            t_data: t_data
        })
        
    },
    getHistoricalPulse({ commit, state, dispatch, getters }, payload) {
        var t_data = this;
        // l.i('读取历史脉搏数据')
        //commit('configSet',{IsReadHistoryData: true})
        if (typeof (window.pulseDataHandler) !== 'function') {
            //通用回复处理
            (function () {
                var Super = function () { };
                Super.prototype = DataHandler.prototype;
                PulseDataHandler.prototype = new Super();
            })();
            window.pulseDataHandler = new PulseDataHandler(t_data);
        }
        //发送请求帧
        window.pulseDataHandler.SendCount = 1;
        window.pulseDataHandler.NeedReply = true;
        window.pulseDataHandler.DataDomain = 0;

        senddataBytes(state.deviceInfo.wecDeviceId, {
            cmd: Cmd.historicalPulse,
            data: '',
            dataHandler: window.pulseDataHandler,
            t_data: t_data
        })
    },
    //更改设备信息
    changeDeviceInfo({ commit, state, dispatch, getters }, payload) {
        // l.w('changeDeviceInfo')
        state.taskQueue.push({
            //设置提醒阈值
            name: 'setFlashingWarningThreshold',
            isExec: false
        })
    },
    //更改体重身高
    changePersonalInfo({ commit, state, dispatch, getters }, payload) {
        // l.w('changePersonalInfo')
        state.taskQueue.push({
            //设置个人信息(身高体重)
            name: 'setPersonalInfo',
            isExec: false
        })
    },
    //更改女性生理周期
    changeHolidayReminder({ commit, state, dispatch, getters }, payload) {
        console.error('已添加设置女性生理周期【添加命令】')
        state.taskQueue.push({
            //设置女性生理周期
            name: 'setHolidayReminder',
            isExec: false
        })
    },
    getDynamicHeartRate({ commit, state, dispatch, getters }, payload){
        let { taskQueue } = state

        if(taskQueue[taskQueue.length-1].isExec===true){
            commit('setDynamicHeartRate',{ status: 1 })
            dispatch('SendCmd', { cmd: Cmd.dynamicHeartRate, data: '01' });
        }else{
            confirm({title: '数据同步中，请稍后...',msg:' '}).then((res)=>{
                
            })
        }
    },
    closeDynamicHeartRate({ commit, state, dispatch, getters }, payload){
        let { taskQueue, dynamicHeartRate } = state

        if(dynamicHeartRate.heartRateTimer){
            clearInterval(dynamicHeartRate.heartRateTimer)
        }

        setTimeout(()=>{
            commit('setDynamicHeartRate',{ status: 3 })
            dispatch('SendCmd', { cmd: Cmd.dynamicHeartRate, data: '03' });
        }, 1000)

    },
    pushDynamicHeartRate({ commit, state, dispatch, getters }, payload){
        let { taskQueue } = state
        commit('setDynamicHeartRate',{ status: 2 })
        dispatch('SendCmd', { cmd: Cmd.dynamicHeartRate, data: '02' });
    },
}

const getters = {

}

export default {
    state,
    mutations,
    getters,
    actions
}
