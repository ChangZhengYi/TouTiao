<template>
    <div class="search-history">
        <van-cell title="搜索历史">
            <div v-if="isDataShow">
                <span @click="$emit('updata-histories', [])">全部删除</span>
                &nbsp; &nbsp;
                <span @click="isDataShow = false">完成</span>
            </div>
            <van-icon name="delete" v-else @click="isDataShow = true" />
        </van-cell>
        <van-cell
            @click="onDelete(history, index)"
            :title="history"
            v-for="(history, index) in this.searchHistories"
            :key="index"
        >
            <van-icon name="close" v-show="isDataShow" />
        </van-cell>
    </div>
</template>

<script>
// import { setItem } from "../../../utils/storage";
export default {
    name: "SearchHistory",
    created() {},
    props: {
        searchHistories: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            isDataShow: false, //删除的显示状态
        };
    },
    methods: {
        onDelete(history, index) {
            if (this.isDataShow) {
                this.searchHistories.splice(index, 1);
                // setItem("search-histories", this.searchHistories);
                return;
            }
            //非删除状态会执行搜索
            this.$emit("search", history);
        },
    },
    components: {},
};
</script>

<style scoped lang="less"></style>
