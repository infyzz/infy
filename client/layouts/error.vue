<template>
    <div class="content-404">
        <template v-if="error.statusCode === 404">
            <h1>404 </h1>
            <h2>{{ error.message }}</h2>
        </template>
        <template v-else>
            <h1>{{ error.statusCode }} </h1>
            <h2>应用发生错误异常</h2>
        </template>
        <nuxt-link class="error-link" to="/">返回首页</nuxt-link>
    </div>
</template>
<script>
export default {
  props: ['error'],
  layout: 'errorLayout' // you can set a custom layout for the error page
}
</script>
<style lang="scss" scoped>
    @import '../assets/_color.scss';
    .content-404{
        text-align: center;
        flex: 1;
        align-items: center;
    }
    .error-link{
        font-size: 14px;
        color: #eeeeee;
        width: 120px;
        height: 40px;
        line-height: 40px;
        border-radius: 3px;
        display: inline-block;
        background: #c8a260;
        margin-top: 30px;
    }
    h1{
        font-size: 160px;
        line-height: 1;
        color: $primary
    }
    h2{
        font-size: 22px;
    }
    .mu-button{
        background:$primary;
        box-shadow: none;
        margin-top: 20px;
    }
</style>
