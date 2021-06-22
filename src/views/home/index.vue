<template>
    <div class="home-container">
        <van-nav-bar class="app-nav-bar">
            <van-button
                slot="title"
                icon="search"
                round
                size="small"
                type="info"
                class="search-btn"
            >
                搜索
            </van-button>
        </van-nav-bar>
        <!-- 文章频道列表 -->
        <van-tabs v-model="active" class="channel-abs">
            <van-tab
                :title="channel.name"
                v-for="channel in channels"
                :key="channel.id"
            >
                <!-- 文章列表 -->
                <article-list :channel="channel" />
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { getUserChannels } from "../../api/user";
import ArticleList from "./components/article-list";
export default {
    created() {
        this.loadChannels();
    },
    props: {
        channel: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            active: 0,
            channels: [], //频道列表
        };
    },
    methods: {
        async loadChannels() {
            //请求获取频道数据
            const { data } = await getUserChannels();
            console.log(data);
            this.channels = data.data.channels;
        },
    },
    components: {
        ArticleList,
    },
};
</script>

<style scoped lang="less">
.home-container {
    /deep/ .van-nav-bar__title {
        max-width: unset;
    }
    .search-btn {
        background-color: #5babfb;
        width: 277px;
        height: 32px;
        border: none;
    }
    .channel-abs {
        /deep/ .van-tab {
            border-right: 1px solid #edeff3;
            border-bottom: 1px solid #edeff3;
        }
    }
    /deep/ .van-tabs__line {
        width: 15px !important;
        height: 3px;
        background-color: #3296fa;
        bottom: 20px;
    }
}
</style>
