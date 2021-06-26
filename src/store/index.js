import Vue from "vue";
import Vuex from "vuex";
import { getItem, setItem } from "../utils/storage";
Vue.use(Vuex);
const user_key = "toutiao_user";

export default new Vuex.Store({
    state: {
        //当前登录用户的登录状态
        // user: JSON.parse(window.localStorage.getItem("user")),
        user: getItem(user_key),
        cachePages: ["layout"],
    },
    mutations: {
        setUser(state, data) {
            state.user = data;
            setItem(user_key, state.user);
            // window.localStorage.setItem("user", JSON.stringify(state.user));
        },
        addCachePage(state, name) {
            if (!state.cachePages.includes(name)) {
                state.cachePages.push(name);
            }
        },
        removeCachePage(state, name) {
            const index = state.cachePages.indexOf(name);
            if (index !== -1) {
                state.cachePages.splice(index, 1);
            }
        },
    },
    actions: {},
    modules: {},
});
