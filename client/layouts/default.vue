<template>
    <section class="container">
        <app-header/>
        <nuxt/>
        <app-footer/>
    </section>
</template>
<script>
import AppHeader from "~/components/public/AppHeader";
import AppFooter from "~/components/public/AppFooter";
export default {
    components: {
        "app-header":AppHeader,
        "app-footer":AppFooter
    },
    async asyncData({ $axios }) {
        let categoryList = null;
        try {
            let data = await $axios.get("/api/category/list");
            if (data.status == 1) {
                categoryList = data.data;
            }
        } catch (error) {}
        return {
            categoryList
        };
    }
};
</script>
<style lang="scss" scoped>
.container {
    min-height: 100.1vh; //防止页面抖动
    display: flex;
    flex-direction: column;
    padding-top: 90px;
}
.article-content {
    flex: 1;
}
@media (max-width: 1100px) {
    .container{
        padding-top: 70px;
    }
}
</style>
