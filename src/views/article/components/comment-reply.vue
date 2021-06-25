<template>
    <div class="commentreply">
        <van-nav-bar :title="`${Comment.reply_count}条回复`">
            <van-icon slot="left" name="cross" @click="$emit('close')" />
        </van-nav-bar>

        <comment-item :comment="Comment"></comment-item>

        <van-cell>
            <comment-list
                :source="Comment.com_id"
                type="c"
                :list="CommentList"
            ></comment-list>
        </van-cell>

        <div class="article-bpttom">
            <van-button
                class="comment-btn"
                type="default"
                round
                size="small"
                @click="isshow = true"
                >写评论</van-button
            >
        </div>

        <van-popup v-model="isshow" position="bottom">
            <post-comment
                :target="Comment.com_id"
                :article-id="articleId"
                @post-success="onpostsuccess"
            ></post-comment>
        </van-popup>
    </div>
</template>

<script>
import CommentItem from "./comment-item.vue";
import CommentList from "./comment-list.vue";
import PostComment from "./post-comment.vue";
export default {
    name: "CommentReply",
    created() {},
    props: {
        Comment: {
            type: Object,
            required: true,
        },
        articleId: {
            type: [String, Number, Object],
            required: true,
        },
    },
    data() {
        return {
            isshow: false,
            CommentList: [],
        };
    },
    methods: {
        onpostsuccess(Comment) {
            this.CommentList.unshift(Comment);
            this.Comment.reply_count++;
            this.isshow = false;
        },
    },
    components: { CommentItem, CommentList, PostComment },
};
</script>

<style scoped lang="less">
.article-bpttom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .write-btn {
        width: 160px;
        // height: 30px;
    }
    .comment-btn {
        width: 200px;
        height: 30px;
    }
}
</style>
