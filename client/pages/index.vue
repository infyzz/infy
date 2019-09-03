<template>
    <main class="main-index wrapper">
        <div class="main-index__list"
             ref="articleList">
            <article-item :key='item.id'
                          v-for='item in articleList'
                          :item-data='item' />
            <app-article-skeleton v-if="isShowSkeleton" />
        </div>
        <aside class="aside-section">
            <div class="section-widget section-widget__tags">
                <div class="section-widget__header">
                    <div class="title">标签云</div>
                    <a href="#"
                       class="more">查看更多</a>
                </div>
                <div class="section-widget__body">
                    <nuxt-link to="/"
                               v-for="(item, index) in articleTags"
                               :key="index">{{ item }}</nuxt-link>
                </div>
            </div>
            <div class="section-widget section-widget__friendlinks">
                <div class="section-widget__header">
                    <div class="title">友情链接</div>
                    <nuxt-link :to="{name:'guestbook'}"
                               class="more">申请</nuxt-link>
                </div>
                <div class="section-widget__body">
                    <a :href="item.link"
                       target="view_window"
                       v-for="(item, index) in friendLinks"
                       :key="index">{{ item.name }}</a>
                </div>
            </div>
        </aside>
    </main>
</template>
<script>
import ArticleItem from "~/components/article/articleItem";
import AppArticleSkeleton from "~/components/article/AppArticleSkeleton";
export default {
    components: {
        "article-item": ArticleItem,
        "app-article-skeleton": AppArticleSkeleton
    },
    async asyncData ({ $axios }) {
        let articleList = [];
        let articleTags = [];
        let friendLinks = [];
        let isShowSkeleton = false;
        try {
            let { data } = await $axios.get("/api/article");
            if (data.status === 1) {
                articleList = data.data;
            }
        } catch (error) { }
        try {
            let { data } = await $axios.get("/api/tags");
            if (data.status === 1) {
                articleTags = data.data;
            }
        } catch (error) { }
        try {
            let { data } = await $axios.get("/api/public/friendLinks");
            if (data.status === 1) {
                friendLinks = data.data;
            }
        } catch (error) { }

        return {
            articleList,
            articleTags,
            friendLinks,
            isShowSkeleton
        };
    }
};
</script>
<style lang="scss" scoped>
.main-index {
    display: flex;
    flex: 1;
    &.wrapper {
        padding: 20px;
    }
    &__aside {
        width: 260px;
    }
    &__list {
        padding: 20px;
        background: #fff;
    }
}
@media (max-width: 1100px) {
    .article-list {
        padding-top: 25px;
        padding-bottom: 20px;
    }
}
</style>
