<template>
    <div class="article-container">
        <van-nav-bar
            title="文章详情"
            class="app-nav-bar"
            left-arrow
            @click-left="$router.back()"
        />
        <div class="article-warp">
            <h1 class="title">{{ article.title }}</h1>
            <van-cell center class="user-info">
                <div class="name" slot="title">{{ article.aut_name }}</div>
                <van-image
                    class="avatar"
                    slot="icon"
                    round
                    fit="cover"
                    :src="article.aut_photo"
                />
                <div slot="label" class="pubdate">
                    {{ article.pubdate | relativeTime }}
                </div>
                <van-button
                    round
                    size="small"
                    :loading="isFollowLoading"
                    :type="article.is_followed ? 'default' : 'info'"
                    class="follow-btn"
                    :icon="article.is_followed ? '' : 'plus'"
                    @click="onFollow"
                    >{{ article.is_followed ? "已关注" : "关注" }}</van-button
                >
            </van-cell>
            <div
                class="content   markdown-body "
                v-html="article.content"
                ref="article-content"
            ></div>
            <!-- 文章评论列表 -->
            <comment-list
                :source="articleId"
                :list="commentlist"
                @update-total-count="totalCommentCount = $event"
                @reply-click="onReplyClick"
            />
        </div>

        <div class="article-bpttom">
            <van-button
                class="comment-btn"
                type="default"
                round
                size="small"
                @click="isshow = true"
                >写评论</van-button
            >
            <!-- @click="$emit('click-write')" -->
            <van-icon
                class="comment-icon"
                name="comment-o"
                :info="totalCommentCount"
            />
            <!-- :info="commentCount"
                @click="$emit('click-comment')" -->
            <van-icon
                :color="article.is_collected ? 'orange' : '#777'"
                :name="article.is_collected ? 'star' : 'star-o'"
                @click="onCollect"
            />
            <van-icon
                :color="article.attitude === 1 ? '#e5645f' : '#777'"
                :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
                @click="onLike"
            />
            <van-icon name="share" />
        </div>

        <van-popup v-model="isshow" position="bottom">
            <post-comment
                :target="articleId"
                @post-success="onpostsuccess"
            ></post-comment>
        </van-popup>

        <van-popup v-model="isreplyshow" position="bottom">
            <comment-reply
                v-if="isreplyshow"
                :Comment="replyComment"
                @close="isreplyshow = false"
                :article-id="articleId"
            ></comment-reply>
        </van-popup>
    </div>
</template>

<script>
import "./github-markdown.css";
import { getArticleById } from "../../api/articles";
import { ImagePreview } from "vant";
import { addFollow, deleteFollow } from "../../api/user";
import {
    addCollect,
    deleteCollect,
    addLike,
    deleteLike,
} from "../../api/articles";

import CommentList from "./components/comment-list.vue";
import PostComment from "./components/post-comment.vue";
import CommentReply from "./components/comment-reply.vue";
export default {
    name: "ArticleIndex",
    created() {
        this.loadArticle();
    },
    props: {
        articleId: {
            type: [String, Number, Object],
            required: true,
        },
    },
    data() {
        return {
            article: {},
            isFollowLoading: false,
            isCollectLoading: false,
            isshow: false,
            commentlist: [],
            totalCommentCount: 0,
            isreplyshow: false,
            replyComment: {},
        };
    },
    methods: {
        async loadArticle() {
            const { data } = await getArticleById(this.articleId);
            this.article = data.data;
            this.$nextTick(() => {
                this.perviewImage();
            });
        },
        perviewImage() {
            const articleContent = this.$refs["article-content"];
            const imgs = articleContent.querySelectorAll("img");
            const imgspaths = [];
            imgs.forEach((img, index) => {
                imgspaths.push(img.src);
                img.onclick = function() {
                    ImagePreview({
                        images: imgspaths,
                        startPosition: index,
                    });
                };
            });
        },
        async onFollow() {
            this.isFollowLoading = true;
            // console.log(this.article);
            const authorId = this.article.aut_id;
            // console.log(authorId);
            if (this.article.is_followed) {
                await deleteFollow(authorId);
            } else {
                await addFollow(authorId);
            }
            this.article.is_followed = !this.article.is_followed;
            this.isFollowLoading = false;
        },
        async onCollect() {
            this.$toast.loading({
                message: "操作中",
                forbidClick: true,
            });
            // this.isCollectLoading = true;
            // console.log(this.article);
            const authorId = this.articleId;

            // console.log(authorId);
            if (this.article.is_collected) {
                await deleteCollect(authorId);
            } else {
                await addCollect(authorId);
            }
            this.article.is_collected = !this.article.is_collected;
            // this.isCollectLoading = false;
            this.$toast.success(
                `${this.article.is_collected ? "" : "取消"}收藏成功`
            );
            // console.log(this.article.is_collected);
        },
        async onLike() {
            this.$toast.loading({
                message: "操作中",
                forbidClick: true,
            });
            const authorId = this.articleId;
            if (this.article.attitude === 1) {
                await deleteLike(authorId);
                this.article.attitude = -1;
            } else {
                await addLike(authorId);
                this.article.attitude = 1;
                console.log(this.article.attitude);
            }
            this.$toast.success(
                `${this.article.attitude === 1 ? "" : "取消"}点赞成功`
            );
        },
        onpostsuccess(comment) {
            // console.log(comment);
            this.commentlist.unshift(comment);
            this.totalCommentCount++;
            this.isshow = false;
        },
        onReplyClick(comment) {
            this.replyComment = comment;
            this.isreplyshow = true;
        },
    },
    components: {
        CommentList,
        PostComment,
        CommentReply,
    },
};
</script>

<style scoped lang="less">
.title {
    font-size: 20px;
    color: #3a3a3a;
    padding: 14px;
    background-color: #fff;
    margin: 0;
}
.user-info {
    .name {
        font-size: 12px;
        color: #333333;
    }
    .pubdate {
        font-size: 12px;
        color: #b4b4b4;
    }
    .avatar {
        width: 35px;
        height: 35px;
        margin-right: 8px;
    }
    .follow-btn {
        width: 85px;
        height: 29px;
    }
}
.markdown-body {
    padding: 14px;
    background-color: #fff;
}
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
    }
    .van-icon {
        font-size: 20px;
    }
    .comment-icon {
        bottom: -2px;
    }
    .share-icon {
        bottom: -2px;
    }
}

.article-warp {
    position: fixed;
    left: 0;
    top: 46px;
    right: 0;
    bottom: 44px;
    overflow-y: auto;
}
</style>
