import Vue from "vue";
import VueRouter from "vue-router";
import { Dialog } from "vant";
import store from "../store/index";
Vue.use(VueRouter);

const UserChat = () =>
    import(
        /* webpackChunkName: "Order_Report" */ "../views/user-chat/index.vue"
    );
const UserProfile = () =>
    import(
        /* webpackChunkName: "Order_Report" */ "../views/user-profile/index.vue"
    );
const ArticleIndex = () =>
    import(/* webpackChunkName: "Order_Report" */ "../views/article/index.vue");
const Search = () =>
    import(/* webpackChunkName: "Order_Report" */ "../views/search/index.vue");
const login = () =>
    import(/* webpackChunkName: "Order_Report" */ "../views/login/index.vue");
const layout = () =>
    import(/* webpackChunkName: "Order_Report" */ "../views/layout/index.vue");
const Home = () =>
    import(/* webpackChunkName: "Order_Report" */ "../views/home/index.vue");
const qa = () =>
    import(/* webpackChunkName: "Order_Report" */ "../views/qa/index.vue");
const video = () =>
    import(/* webpackChunkName: "Order_Report" */ "../views/video/index.vue");
const my = () =>
    import(/* webpackChunkName: "Order_Report" */ "../views/my/index.vue");
//路由表
const routes = [];

const router = new VueRouter({
    routes: [
        {
            path: "/login",
            name: "login",
            component: login,
            meta: { requiresAuth: false },
        },
        {
            path: "/",
            // redirect: "/login",
            component: layout,
            children: [
                {
                    path: "",
                    component: Home,
                    meta: { requiresAuth: false },
                },
                {
                    path: "/qa",
                    component: qa,
                    meta: { requiresAuth: false },
                },
                {
                    path: "/video",
                    component: video,
                    meta: { requiresAuth: true },
                },
                {
                    path: "/my",
                    component: my,
                    meta: { requiresAuth: false },
                },
            ],
        },
        {
            path: "/search",
            component: Search,
            meta: { requiresAuth: false },
        },
        {
            path: "/article/:articleId",
            name: "article",
            component: ArticleIndex,
            props: true,
            meta: { requiresAuth: false },
        },
        {
            path: "/user/profile",
            component: UserProfile,
            meta: { requiresAuth: false },
        },
        {
            path: "/user/chat",
            component: UserChat,
            meta: { requiresAuth: true },
        },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (store.state.user) {
            return next();
        }
        Dialog.confirm({
            title: "该功能需要登录，确认登录吗？",
        })
            .then(() => {
                router.replace({
                    name: "login",
                    query: {
                        redirect: router.currentRoute.fullPath,
                    },
                });
            })
            .catch(() => {
                // on cancel
                next(false);
            });
    } else {
        next();
    }
});
export default router;
