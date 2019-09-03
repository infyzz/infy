<template>
    <div class="main-guestbook wrapper">
        <main class="main-guestbook">
            <!-- 评论 -->
            <no-ssr>
                <app-comment />
            </no-ssr>
        </main>
    </div>
</template>
<script>
import Vue from 'vue';
import { value, computed, watch, onMounted } from 'vue-function-api';
export default {
    components: {
        'app-comment': () => import(/*webpackChunkName: "app-comment"*/'~/components/public/AppComment')
    },
    setup () {
        return {
          
        };
    }
};
</script>
<style scoped lang="scss">
.main-guestbook {
    background: #fff;
    flex: 1;
    margin-bottom: 20px;
    padding: 20px;
}
</style>