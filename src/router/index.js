import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
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
            component: login,
        },
        {
            path: "/",
            // redirect: "/login",
            component: layout,
            children: [
                {
                    path: "",
                    component: Home,
                },
                {
                    path: "/qa",
                    component: qa,
                },
                {
                    path: "/video",
                    component: video,
                },
                {
                    path: "/my",
                    component: my,
                },
            ],
        },
        {
            path: "/search",
            component: Search,
        },
        {
            path: "/article/:articleId",
            name: "article",
            component: ArticleIndex,
            props: true,
        },
        {
            path: "/user/profile",
            component: UserProfile,
        },
    ],
});

export default router;
