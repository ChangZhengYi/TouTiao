// 用户相关请求模块
import request from "../utils/request.js";
// import store from "../store/index";
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
//获取登录用户信息
export const getCurrentUser = () => {
    return request({
        method: "get",
        url: "/app/v1_0/user",
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`,
        // },
    });
};
//获取用户频道列表
export const getUserChannels = () => {
    return request({
        method: "get",
        url: "/app/v1_0/user/channels",
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`,
        // },
    });
};
//关注用户频道列表
export const addFollow = (userId) => {
    return request({
        method: "POST",
        url: "/app/v1_0/user/followings",
        data: {
            target: userId,
        },
    });
};

//取消关注用户频道列表
export const deleteFollow = (userId) => {
    return request({
        method: "DELETE",
        url: `/app/v1_0/user/followings/${userId}`,
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`,
        // },
    });
};
export const getUserProfile = () => {
    return request({
        method: "get",
        url: "/app/v1_0/user/profile",
    });
};

export const updateUserProfile = (data) => {
    return request({
        method: "PATCH",
        url: "/app/v1_0/user/profile",
        data,
    });
};
export const updateUserPhoto = (data) => {
    return request({
        method: "PATCH",
        url: "/app/v1_0/user/photo",
        data,
    });
};
