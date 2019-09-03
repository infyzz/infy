<template>
    <div class="article-skeleton">
        <div class="article-skeleton__left">
            <h1 class="article-skeleton__title"></h1>
            <div class="article-skeleton__text">
                <div class="article-skeleton__line"></div>
                <div class="article-skeleton__line animation-delay"></div>
            </div>
            <div class="article-skeleton__foot">
                 <span>
                    <i class="iconfont icon-calendarcalevent"></i>
                    <span class="fill"></span>
                </span>
                <span>
                    <i class="iconfont icon-view"></i>
                    <span class="fill"></span>
                </span>
            </div>
        </div>
        <div class="article-skeleton__right"></div> 
    </div>
</template>
<style lang="scss" scoped>
$color : #eaeaea;
@keyframes loading{
    0%{
        width:100%;
    }
    50%{
        width: 50%;
    }
    100%{
        width: 100%;
    }
}
.article-skeleton{
    display: flex;
    &__right{
        width: 200px;
        height: 120px;
        background: $color;
    } 
    &__left{
        flex: 1;
        margin-right: 20px;
    }
    &__title{
        height: 26px;
        background: $color;
        width: 50%;
    }
    &__line{
        margin-top: 15px;
        height: 16px;
        background: $color ;
        width: 100%;
        animation: loading 1s ease-in-out infinite;
        &.animation-delay{
            animation: loading 1s ease-in-out -.5s infinite;
        }
    }
    &__foot{
        display: flex;
        margin-top: 15px;
        align-items: center;
        .iconfont{
            font-size: 12px;
            margin-right: 5px;
            color: #666666;
            position: relative;
            top: -3px;
        }
        .fill{
            display: inline-block;
            background: $color;
            height: 16px;
            width: 35px;
            margin-right: 15px;
        }
    }
}
</style>
<script>
import Vue from 'vue';
import { value, computed, watch, onMounted } from 'vue-function-api';
export default {
    setup () {
        return {
          
        };
    }
};
