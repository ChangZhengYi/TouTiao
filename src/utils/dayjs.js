import dayjs from 'dayjs'
import Vue from "vue";
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

import relativeTime  from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
// console.log(dayjs('2008-01-01').from(dayjs())); 
//处理相对时间的代码包装为全局过滤器
Vue.filter('relativeTime',value=>{
    return dayjs(value).from(dayjs())
})