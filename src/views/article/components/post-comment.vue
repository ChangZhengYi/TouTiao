<template>
    <div class="postcomment">
        <van-field
            v-model="message"
            rows="3"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请输入评论"
            show-word-limit
        />
        <van-button 
            class="v-btn"
            size="mini"
            type="info"
            round
            @click="onpost"
            :disabled="!message"
            >发布</van-button
        >
    </div>
    <!-- 139534 -->
</template>

<script>
import { addComment } from "../../../api/comment";
export default {
    name: "PostComment",
    created() {},
    props: {
        target: {
            type: [String, Number, Object],
            required: true,
        },
        articleId: {
            type: [String, Number, Object],
            default: null,
        },
    },
    data() {
        return {
            message: "",
        };
    },
    methods: {
        async onpost() {
            this.$toast.loading({
                message: "发布中",
                forbidClick: true,
            });
            // console.log(this.target.toString());
            // console.log(this.message);
            const { data } = await addComment({
                target: this.target.toString(),
                content: this.message,
                art_id: this.articleId ? this.articleId.toString() : null,
            });
            // console.log(data);
            this.$emit("post-success", data.data.new_obj);
            this.$toast.success("发布成功");
            this.message = "";
        },
    },
    components: {},
};
</script>

<style scoped lang="less">
.postcomment {
    padding: 14px;
    display: flex;
    align-items: center;
    .v-btn {
        width: 40px;
        height: 40px;
    }
}
</style>
