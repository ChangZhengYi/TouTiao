<template>
    <van-cell class="article-item">
        <div slot="title" class="van-multi-ellipsis--l3 title">
            {{ article.title }}
        </div>
        <div slot="label">
            <div class="cover-warp" v-if="article.cover.type === 3">
                <div
                    class="cover-warp-item"
                    v-for="(img, index) in article.cover.images"
                    :key="index"
                >
                    <van-image fit="cover" :src="img" height="73" />
                </div>
            </div>
            <div class="label-warp">
                <span>{{ article.aut_name }}</span
                >&nbsp; <span>{{ article.comm_count }}评论 </span>&nbsp;
                <span>{{ article.pubdate | relativeTime }} </span>
            </div>
        </div>

        <van-image
            v-if="article.cover.type === 1"
            class="right-cover"
            fit="cover"
            :src="article.cover.images[0]"
        />
    </van-cell>
</template>

<script>
export default {
    name: "ArticleItem",
    created() {},
    props: {
        article: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {};
    },
    methods: {},
    components: {},
};
</script>

<style scoped lang="less">
.article-item {
    .title {
        font-size: 16px;
        color: #3a3a3a;
    }
    /deep/ .van-cell__value {
        flex: unset;
        width: 116px;
        height: 73px;
        margin-left: 12px;
    }
    .right-cover {
        width: 116px;
        height: 73px;
    }
    .cover-warp {
        display: flex;
        padding: 15px 0;
        .cover-warp-item {
            flex: 1;
            height: 73px;
            &:not(:last-child) {
                padding-right: 4px;
            }
            .cover_item {
                width: 100%;
                height: 73px;
            }
        }
    }
}
.label-warp {
    font-size: 11px;
    color: #b4b4b4;
}
.label-wrap span {
    margin-right: 12px;
}
</style>
