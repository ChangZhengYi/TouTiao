import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

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
    ],
});

export default router;
