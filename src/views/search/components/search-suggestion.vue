<template>
    <div class="search-suggestion">
        <van-cell
            icon="search"
            v-for="(str, index) in suggestions"
            :key="index"
            @click="$emit('search',str)"
        >
            <div slot="title" v-html="highlight(str)"></div>
        </van-cell>
    </div>
</template>

<script>
import { getSearchSuggestions } from "../../../api/search";
//按需加载函数防抖
import { debounce } from "lodash";
export default {
    name: "SearchSuggestion",
    created() {},
    props: {
        searchText: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            suggestions: [],
            htmlStr: '"Hello <span style="color: red">World</span>"',
        };
    },
    methods: {
        highlight(str) {
            // RegExp 是原生 JavaScript 的内置构造函数
            const reg = new RegExp(this.searchText, "gi");
            return str.replace(
                reg,
                `<span style="color: red">${this.searchText}</span>`
            );
        },
    },
    components: {},
    watch: {
        searchText: {
            //函数防抖
            handler: debounce(async function() {
                const { data } = await getSearchSuggestions(this.searchText);
                this.suggestions = data.data.options;
            }, 200),
            immediate: true,
        },
    },
};
</script>

<style scoped lang="less"></style>
