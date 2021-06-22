// 用户相关请求模块
import request from "../utils/request.js";
// import store from "../store/index";
//获取所有频道列表
export const getAllChannels = () => {
    return request({
        method: "get",
        url: "/app/v1_0/channels",
    });
};
//获取所有频道列表
export const addUserChannel = (data) => {
    return request({
        method: "patch",
        url: "/app/v1_0/user/channels",
        data,
    });
};
//获取所有频道列表
export const deleteUserChannel = (channelId) => {
    return request({
        method: "delete",
        url: `/app/v1_0/user/channels/${channelId}`,
    });
};
