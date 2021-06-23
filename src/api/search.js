// 用户相关请求模块
import request from "../utils/request.js";
// import store from "../store/index";
//登录 注册
export const getSearchSuggestions = (q) => {
    return request({
        method: "get",
        url: "/app/v1_0/suggestion",
        params: {
            q,
        },
    });
};

export const getSearchResults = (params) => {
    return request({
        method: "get",
        url: "/app/v1_0/search",
        params,
    });
};
export const getSearchHistories = () => {
    return request({
        method: "get",
        url: "/app/v1_0/search/histories",
    });
};
