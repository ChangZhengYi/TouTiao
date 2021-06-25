import request from "../utils/request.js";
// import store from "../store/index";
//登录 注册
export const getComments = (params) => {
    return request({
        method: "get",
        url: "/app/v1_0/comments",
        params,
    });
};
export const addCommentLike = (commentId) => {
    return request({
        method: "post",
        url: "/app/v1_0/comment/likings",
        data: {
            target: commentId,
        },
    });
};
export const deleteCommentLike = (commentId) => {
    return request({
        method: "DELETE",
        url: `/app/v1_0/comment/likings/${commentId}`,
    });
};

export const addComment = (data) => {
    return request({
        method: "POST",
        url: "/app/v1_0/comments",
        data,
    });
};
