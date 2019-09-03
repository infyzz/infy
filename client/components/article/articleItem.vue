<template>
    <article class="article-item">
        <div class="article-texts">
            <div class="article-head">
                <h1 class="title">
                    <nuxt-link :to="{
                            name: 'article-id',
                            params: { id: itemData.id }
                        }">{{ itemData.title }}</nuxt-link>
                </h1>
            </div>
            <div class="article-body">
                <nuxt-link :to="{ name: 'article-id', params: { id: itemData.id } }">
                    <p>{{ itemData.intro }}</p>
                </nuxt-link>
            </div>
            <div class="article-foot">
                <span>
                    <i class="iconfont icon-calendarcalevent"></i>
                    发表于：{{ itemData.create_time }}
                </span>
                <span>
                    <i class="iconfont icon-view"></i>
                    阅读：{{ itemData.views }}
                </span>
            </div>
        </div>
        <figure class="article-image"
                v-if="itemData.pic">
            <nuxt-link :to="{ name: 'article-id', params: { id: itemData.id } }">
                <img :src="itemData.pic | picUrl"
                     :alt="itemData.title">
            </nuxt-link>
        </figure>
    </article>
</template>
<script>
const NUXT_ENV_PIC_URL = process.env.NUXT_ENV_PIC_URL
export default {
    props: {
        itemData: {
            required: true,
            type: Object
        }
    },
    filters: {
        picUrl (pic) {
            /* 七牛云图片地址  */
            return NUXT_ENV_PIC_URL + '/' + pic;
        }
    }
};
</script>
<style lang="scss" scoped>
@import '../../assets/_color.scss';
@keyframes fadeInDown {
    0% {
        opacity: 0;
        transform: translate3d(0, 120px, 0);
    }
    to {
        opacity: 1;
        transform: translateZ(0);
    }
}
.article-item {
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
    animation-name: fadeInDown;
    animation-duration: 1s;
    .article-image {
        margin: 0;
        margin-left: 20px;
        flex: 0 0 200px;
        height: 120px;
        background: #eeeeee;
        overflow: hidden;
        position: relative;
        &::before {
            content: '';
            position: absolute;
            width: 200px;
            height: 100%;
            top: 0;
            left: -200px;
            overflow: hidden;
            background: -webkit-gradient(
                linear,
                left top,
                right top,
                color-stop(0, rgba(255, 255, 255, 0)),
                color-stop(50%, rgba(255, 255, 255, 0.2)),
                color-stop(100%, rgba(255, 255, 255, 0))
            );
            transform: skewX(-25deg);
        }
        img {
            max-width: 100%;
            min-width: 100%;
        }
        &:hover {
            &::before {
                left: 150%;
                transition: left 1s ease 0s;
            }
        }
    }
    /*     &:last-child {
        border-bottom: none;
    } */
    @for $i from 1 through 10 {
        &:nth-child(#{$i}) {
            animation-delay:  0.1s * $i - 0.1;
        }
    }
    .article-head {
        display: inline-block;
        position: relative;
        line-height: 1.2;
        vertical-align: top;
        margin-bottom: 10px;
        a {
            color: #333;
            padding-bottom: 5px;
            position: relative;
            display: inline-block;
            font-size: 18px;
            &:visited {
                color: #909090;
            }
            &:before {
                content: '';
                display: inline-block;
                position: absolute;
                background: #555555;
                height: 2px;
                width: 100%;
                transform: scaleX(0);
                visibility: hidden;
                transition: 0.4s;
                left: 0;
                right: 0;
                bottom: 0;
            }
            &:hover:before {
                visibility: visible;
                transform: scaleX(1);
            }
        }
        .meta {
            font-size: 12px;
            color: #999999;
            margin-top: 15px;
            margin-bottom: 20px;
            .iconfont {
                position: relative;
                top: 1px;
                margin-right: 5px;
            }
        }
    }
    .article-texts {
        display: flex;
        flex-direction: column;
    }
    .article-body {
        font-size: 13px;
        line-height: 1.5;
        min-height: 30px;
        margin-bottom: 10px;
        display: flex;
        flex: 1;
        justify-content: space-between;
        p {
            color: #555;
        }
    }
    .article-foot {
        margin-top: 10px;
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
        color: #666666;
        span {
            margin-right: 10px;
        }
        .iconfont {
            font-size: 12px;
            margin-right: 5px;
            color: #666666;
        }
        .link {
            display: inline-block;
            padding-bottom: 5px;
            font-size: 16px;
            color: #555555;
            border-bottom: 2px solid #222;
        }
    }
}
@media (max-width: 786px) {
    .article-item .article-body p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
    }
    .article-item .article-image {
        flex: 0 0 100px;
        height: 70px;
    }
}
</style>
