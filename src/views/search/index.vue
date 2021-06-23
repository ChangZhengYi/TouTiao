<template>
    <div class="search-container">
        <form action="/">
            <van-search
                v-model="searchText"
                placeholder="请输入搜索关键词"
                @search="onSearch(searchText)"
                @cancel="$router.back()"
                show-action
                @focus="isResultShow = false"
            />
        </form>
        <search-result v-if="isResultShow" :search-text="searchText" />
        <search-suggestion
            v-else-if="searchText"
            :search-text="searchText"
            @search="onSearch"
        />
        <search-history
            v-else
            :search-histories="this.searchHistories"
            @search="onSearch"
            @updata-histories="searchHistories = $event"
        />
    </div>
</template>

<script>
import SearchHistory from "./components/search-history.vue";
import SearchResult from "./components/search-result.vue";
import SearchSuggestion from "./components/search-suggestion.vue";
import { setItem, getItem } from "../../utils/storage";
import { mapState } from "vuex";
// import { getSearchHistories } from "../../api/search";
export default {
    name: "SearchIndex",
    created() {
        this.loadSearchHistories();
    },
    watch: {
        searchHistories() {
            setItem("search-histories", this.searchHistories);
        },
    },
    props: {},
    data() {
        return {
            searchText: "",
            isResultShow: false,
            searchHistories: [],
        };
    },
    methods: {
        onSearch(searchText) {
            // 更新文本框内容

            this.searchText = searchText;
            // console.log(this.searchText);
            // 存储搜索历史记录
            // 要求：不要有重复历史记录、最新的排在最前面
            const index = this.searchHistories.indexOf(searchText);
            // console.log(index);
            if (index !== -1) {
                this.searchHistories.splice(index, 1);
            }
            this.searchHistories.unshift(searchText);
            // console.log(this.searchHistories);
            // setItem("search-histories", this.searchHistories);
            // 渲染搜索结果
            this.isResultShow = true;
        },
        async loadSearchHistories() {
            const searchHistories = getItem("search-histories") || [];
            // if (this.user) {
            //     const { data } = await getSearchHistories();
            //     searchHistories = [
            //         ...new Set([...searchHistories, ...data.data.keywords]),
            //     ];
            // }
            this.searchHistories = searchHistories;
        },
    },
    components: {
        SearchSuggestion,
        SearchHistory,
        SearchResult,
    },
    computed: {
        ...mapState(["user"]),
    },
};
</script>

<style scoped lang=" "></style>
