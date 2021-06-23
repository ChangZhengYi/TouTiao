<template>
    <div class="search-result">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
        </van-list>
    </div>
</template>

<script>
import { getSearchResults } from "../../../api/search";
export default {
    name: "SearchResult",
    created() {},
    props: {
        searchText: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            page: 1,
            perpage: 10,
        };
    },
    methods: {
        
        async onLoad() {
            const { data } = await getSearchResults({
                page: this.page,
                per_page: this.perpage,
                q: this.searchText,
            });
            const { results } = data.data;
            this.list.push(...results);
            this.loading = false;
            if (results.length) {
                this.page++;
            } else {
                this.finished = true;
            }
        },
    },
    components: {},
};
</script>

<style scoped lang="less">
.search-result {
    position: fixed;
    left: 0;
    right: 0;
    top: 54px;
    bottom: 0;
    overflow-y: auto;
}
</style>
