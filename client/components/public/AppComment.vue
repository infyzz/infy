<template>
    <div id="comments"></div>
</template>
<script lang="ts">
import Vue from 'vue';
import { onMounted } from 'vue-function-api';
//@ts-ignore
import Gitalk from 'gitalk';
import 'gitalk/dist/gitalk.css';
const NUXT_ENV_CLIENT_ID = process.env.NUXT_ENV_CLIENT_ID;
const NUXT_ENV_CLIENT_SECRET = process.env.NUXT_ENV_CLIENT_SECRET;
const NUXT_ENV_REPO = process.env.NUXT_ENV_REPO;
const NUXT_ENV_OWNER = process.env.NUXT_ENV_OWNER;
const NUXT_ENV_ADMIN = process.env.NUXT_ENV_ADMIN;
export default {
    setup() {
        onMounted(() => {
            const gitalk = new Gitalk({
                clientID: NUXT_ENV_CLIENT_ID,
                clientSecret: NUXT_ENV_CLIENT_SECRET,
                repo: NUXT_ENV_REPO,
                owner: NUXT_ENV_OWNER,
                admin: [NUXT_ENV_ADMIN],
                id: window.location.pathname, // Ensure uniqueness and length less than 50
                distractionFreeMode: false // Facebook-like distraction free mode
            });
            gitalk.render('comments');
        });
        return {};
    }
};
</script>

<style lang="scss">
#comments{
    .gt-container .gt-header-textarea,.gt-container .gt-btn{
        border-radius: 0;
    }
    .gt-container .gt-copyright{
        display: none;
    }
    .gt-container .gt-avatar{
        width: 44px;
        height: 44px;
        border-radius: 3px;
        overflow: hidden;
    }
    .gt-container .gt-initing-text{
        display: none;
    }
}
</style>