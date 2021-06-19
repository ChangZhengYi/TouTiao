// 用户相关请求模块
import request from "../utils/request.js";
//登录 注册
export const login = (data) => {
    return request({
        method: "post",
        url: "/app/v1_0/authorizations",
        data,
    });
};

//发送短信验证码
export const sendSms = (mobile) => {
    return request({
        method: "get",
        url: `/app/v1_0/sms/codes/${mobile}`,
    });
};
