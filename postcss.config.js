// postcss.config.js
module.exports = {
    plugins: {
        //自动添加浏览器厂商声明前缀，兼容不同浏览器
        // autoprefixer: {
        //     browsers: ["Android >= 4.0", "iOS >= 8"],
        // },
        //px转rem
        "postcss-pxtorem": {
            rootValue: 37.5,
            propList: ["*"],
        },
    },
};
