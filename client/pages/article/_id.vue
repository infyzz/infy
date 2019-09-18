<template>
    <article class="article-content wrapper">
        <main class="article-main" v-highlight>
            <div class="article-head">
                <h2>{{ article.title }}</h2>
                <div class="meta">
                    <i class="iconfont icon-calendarcalevent"></i>
                    发表于 {{ article.create_time }}
                    <span class="meta-divider"></span>
                    <i class="iconfont icon-view"></i>
                    本文总阅读量 {{ article.views }} 次
                </div>
            </div>
            <div class="article-body"
                 v-html='article.content'></div>
            <!-- 评论 -->
            <client-only>
                <app-comment />
            </client-only>
        </main>
        <aside class="aside-section">
            <div class="section-widget section-widget__toc"
                 id="toc"
                 v-html="article.toc"></div>
        </aside>
    </article>

</template>

<script>
import Markdown from "~/plugins/markdown";
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
// import 'highlight.js/styles/androidstudio.css';
let oToc = null;
let oTitles = null;
let oLis = null;
function getScrollTop () {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}
const bodyScroll = function () {
    const scroll = getScrollTop();
    const tocOffsetTop = oToc.offsetTop
    if (scroll >= tocOffsetTop - 80) {
        oToc.classList.add('active');
    } else {
        oToc.classList.remove('active');
    }
    try {
        oTitles.forEach((item, index) => {
            const offsetWindowTop = item.offsetTop + 100;
            if (offsetWindowTop >= scroll) {
                for (let i = 0; i < oLis.length; i++) {
                    for (let j = 0; j < oLis.length; j++) {
                        oLis[j].classList.remove('active')
                    }
                    if (offsetWindowTop >= scroll) {
                        oLis[index].classList.add('active');
                        break
                    }
                }
                //跳出foreach
                foreach.break = new Error("StopIteration");
            }
        })
    } catch (error) { }
}


export default {
    components: {
        'app-comment': () => import(/*webpackChunkName: "app-comment"*/'~/components/public/AppComment')
    },
    async asyncData ({ $axios, params, error }) {
        let { id } = params;
        let article = null;
        let articleTitle = '';
        let articleIntro = '';
        //获取文章
        try {
            let { data } = await $axios.get("/api/article/" + id);
            if (data.status === 1) {
                article = data.data;
                article.toc = await Markdown.marked(article.toc);
                article.content = await Markdown.marked(article.content);
                article.tags = article.tags || [];
                articleTitle = article.title
                articleIntro = article.intro;
            }else{
                error({ statusCode: 404, message: data.message })
            }
        } catch (err) {
            console.log(err);
            
            error({ statusCode: 404, message: 'Post not found' })
        }
        return {
            id,
            article,
            articleTitle,
            articleIntro
        };
    },
    mounted () {
        oToc = document.querySelector('#toc');
        oTitles = document.querySelectorAll('.toc-title');
        oLis = document.querySelectorAll('#toc li');
        oLis[0].classList.add('active');
        bodyScroll();
        window.addEventListener('scroll', bodyScroll, false);        
    },
    directives:{
        highlight:{
            inserted: function (el) {
                el.querySelectorAll('.js-hilight code').forEach((block) => {
                    hljs.highlightBlock(block);
                });
            }
        }
    },
    destroyed () {
        window.removeEventListener('scroll', bodyScroll, false);
    },
    head () {
        return {
            title: this.articleTitle + "-昔年博客",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.articleIntro
                },
                {
                    hid: "keywords",
                    name: "keywords",
                    content: "昔年博客"
                }
            ],
            script:[
                {
                    src:'https://cdn.bootcss.com/prism/9000.0.1/prism.min.js'
                }
            ]
        };
    }
};
</script>
<style lang="scss">
.article-main {
    @import '../../assets/_article-body.scss';
}
code {
    background: #eee;
    padding: 3px;
    color: #847052;
}
.section-widget__toc {
    width: 260px;
    padding: 10px;
    background: #ffffff;
    padding-top: 30px;
    transition: 0.4s;
    position: relative;
    &.active {
        position: fixed;
        top: 90px;
    }
    &:before {
        position: absolute;
        width: 2px;
        background-color: #ebedef;
        opacity: 0.5;
        content: '';
        display: inline-block;
        top: 40px;
        bottom: 20px;
        left: 18px;
    }
    li {
        position: relative;
        margin-bottom: 5px;
        a {
            padding-left: 25px;
        }
        a:hover {
            color: #007fff;
            background: #ebedef;
        }
        &.active {
            > a {
                color: #007fff;
                background: #ebedef;
            }
            &:before {
                background: #007fff;
            }
        }
        &:before {
            position: absolute;
            content: '';
            display: inline-block;
            width: 6px;
            height: 6px;
            top: 15px;
            left: 6px;
            transform: translateY(-50%);
            background: #000000;
            border-radius: 50%;
        }
    }
    a {
        line-height: 30px;
        font-weight: 600;
        font-size: 14px;
        color: #000000;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
    }
    > ul > li {
        a {
            font-weight: 600;
        }
    }
    .anchor-ul-level2 {
        padding-left: 30px;
        font-size: 14px;
        a {
            font-weight: 400;
            font-size: 14px;
            color: rgb(51, 51, 51);
        }
    }
    > ul > li > ul > li {
        font-size: 14px;
        &:before {
            left: 35px;
            width: 4px;
            height: 4px;
            border-radius: 0px;
        }
        a {
            padding-left: 50px;
            font-weight: 400;
            font-size: 14px;
            color: rgb(51, 51, 51);
        }
    }
}
</style>
<style lang="scss" scoped>
@import '../../assets/_color.scss';
.article-content {
    margin: 30px auto;
    display: flex;
    .article-main {
        flex: 1;
        background: $primary;
        padding: 50px 30px;
        overflow: hidden;
    }
    .article-head {
        text-align: center;
        h2 {
            font-size: 26px;
            margin-bottom: 10px;
        }
        .meta {
            color: #999999;
            font-size: 12px;
            .iconfont {
                position: relative;
                top: 1px;
                margin-right: 5px;
            }
            .meta-divider {
                margin: 0 6px;
            }
        }
    }

    .article-aside {
        flex: 0 0 260px;
        // background: $primary;
        margin-left: 10px;
    }

    .article-body {
        color: #848181;
        margin-top: 20px;
        article {
            margin-right: 260px;
        }
    }
    .article-tags {
        color: #898989;
        margin-bottom: 10px;
        ul {
            display: flex;
            li {
                margin-right: 12px;
            }
        }
    }
}
@media (max-width: 1100px) {
    .article-content .article-head h2 {
        font-size: 18px;
    }
    .article-content {
        padding: 20px;
        .wrapper {
            margin: 0;
        }
    }
    .article-content .article-body {
        margin-top: 25px;
    }
}
</style>
