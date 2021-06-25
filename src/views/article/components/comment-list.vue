<template>
    <div class="commentlist">
        <van-cell title="全部评论"></van-cell>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <!-- <van-cell
                v-for="(comment, index) in list"
                :key="index"
                :title="comment.content"
            /> -->

            <comment-item
                v-for="(comment, index) in list"
                :key="index"
                :comment="comment"
                @reply-click="$emit('reply-click', $event)"
            />
        </van-list>
    </div>
</template>

<script>
import CommentItem from "./comment-item.vue";
import { getComments } from "../../../api/comment";
export default {
    name: "CommentList",
    created() {},
    props: {
        source: {
            type: [Number, String, Object],
            required: true,
        },
        list: {
            type: Array,
            default: () => [],
        },
        type: {
            type: String,
            default: "a",
        },
    },
    data() {
        return {
            // list: [],
            loading: false,
            finished: false,
            offset: null,
            limit: 10,
        };
    },
    methods: {
        async onLoad() {
            const { data } = await getComments({
                type: this.type,
                source: this.source.toString(),
                offset: this.offset,
                limit: this.limit,
            });

            this.$emit("update-total-count", data.data.total_count);
            console.log(data.data.results);
            const { results } = data.data;
            this.list.push(...results);
            this.loading = false;
            if (results.length) {
                this.offset = data.data.last_id;
            } else {
                this.finished = true;
            }
        },
    },
    components: { CommentItem },
};
</script>

<style scoped lang="less"></style>
