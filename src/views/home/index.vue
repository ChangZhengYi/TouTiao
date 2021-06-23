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
                to='/search'
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
            <div slot="nav-right" class="wap-nav-zw"></div>
            <div slot="nav-right" class="wap-nav-warp" @click="isshow = true">
                <van-icon name="wap-nav" />
            </div>
        </van-tabs>

        <!-- //弹出层 -->
        <van-popup
            v-model="isshow"
            position="bottom"
            class="channel-edit"
            closeable
            get-container="body"
            style="height:100%"
            close-icon-position="top-left"
            ><channel-edit
                :userChannels="channels"
                @close="isshow = false"
                :active="active"
            />
        </van-popup>
    </div>
    <!-- @update-active="onupdateactive" -->
</template>

<script>
import { getUserChannels } from "../../api/user";
import ArticleList from "./components/article-list";
import ChannelEdit from "./components/channel-edit.vue";
import { mapState } from "vuex";
import { getItem } from "../../utils/storage";
export default {
    created() {
        this.loadChannels();
    },
    props: {
        // channel: {
        //     type: Object,
        //     required: true,
        // },
    },
    data() {
        return {
            active: 0,
            channels: [], //频道列表
            isshow: false,
        };
    },
    methods: {
        async loadChannels() {
            let channels = [];
            if (this.user) {
                const { data } = await getUserChannels();
                channels = data.data.channels;
            } else {
                const loadChannels = getItem("user-channels");
                if (loadChannels) {
                    channels = loadChannels;
                } else {
                    const { data } = await getUserChannels();
                    channels = data.data.channels;
                }
            }
            this.channels = channels;
            //请求获取频道数据
            // const { data } = await getUserChannels();
            // console.log(data);
            // this.channels = data.data.channels;
        },
        // onupdateactive(index) {
        //     this.active = index;
        // },
    },
    components: {
        ArticleList,
        ChannelEdit,
    },
    computed: {
        ...mapState(["user"]),
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
    .wap-nav-zw {
        width: 33px;
        flex-shrink: 0;
    }
    .wap-nav-warp {
        position: fixed;
        right: 0;
        height: 43px;
        // line-height: 44px;

        background-color: #fff;
        opacity: 0.9;
        width: 33px;
        display: flex;
        justify-content: center;
        align-items: center;
        .van-icon-wap-nav {
            font-size: 24px;
        }
    }
}
// .channel-edit {
//     height: 100%;
// }
</style>
