<template>
    <van-cell class="commentitem">
        <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="comment.aut_photo"
        />

        <div slot="title">
            <div class="title-warp">
                <div class="name">{{ comment.aut_name }}</div>
                <div class="like-warp">
                    <van-icon
                        :name="comment.is_liking ? 'good-job' : 'good-job-o'"
                        class="like-icon"
                        @click="onLike"
                        :color="comment.is_liking ? '#e5645f' : '#777'"
                    />
                    <span class="like-count">{{ comment.like_count }}</span>
                </div>
            </div>

            <div class="content">{{ comment.content }}</div>
            <div>
                <span class="pubdate"
                    >{{ comment.pubdate | datetime("MM-DD HH:mm:ss") }}
                </span>
                <van-button
                    round
                    size="mini"
                    class="reply-btn"
                    @click="$emit('reply-click', comment)"
                    >{{ comment.reply_count }}回复</van-button
                >
            </div>
        </div>
        <!-- 1321478006182510592 -->
        <!-- 1326071025988796416 -->
    </van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike } from "../../../api/comment";
export default {
    name: "CommentItem",
    created() {},
    props: {
        comment: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {};
    },
    methods: {
        async onLike() {
            // this.$toast.loading({
            //     message: "操作中",
            //     forbidClick: true,
            // });
            const authorId = this.comment.com_id.toString();
            if (this.comment.is_liking) {
                await deleteCommentLike(authorId);
                this.comment.like_count--;
            } else {
                await addCommentLike(authorId);
                this.comment.like_count++;
            }
            this.comment.is_liking = !this.comment.is_liking;
            // this.$toast.success(
            //     `${this.comment.is_liking ? "" : "取消"}点赞成功`
            // );
        },
    },
    components: {},
};
</script>

<style scoped lang="less">
.commentitem {
    .avatar {
        width: 36px;
        height: 36px;
        margin-right: 13px;
    }
    .name {
        font-size: 14px;
        color: #406599;
    }
    .content {
        font-size: 16px;
        color: #222222;
    }
    .pubdate {
        font-size: 10px;
        margin-right: 10px;
        // margin-top: -10px;
        // display: inline-block;
    }
    .title-warp {
        display: flex;
        justify-content: space-between;
    }
    .like-warp {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .reply-btn {
        font-size: 10px;
        // border: unset;
        //  line-height: 10px;
    }
}
</style>
