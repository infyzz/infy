<template>
    <header class="header shadow" ref="elHeader">
        <div class="wrapper">
            <h1 class="logo">
                <nuxt-link to="/">
                    <span>昔年博客</span>
                </nuxt-link>
            </h1>
            <div class="nav-btn" @click="handleShowNav">
                <i class="iconfont icon-meun"></i>
            </div>
            <nav :class="{'active':isShowNav}">
                <ul>
                    <li>
                        <nuxt-link to="/">
                            <i class="iconfont icon-home-fill"></i>
                            首页
                        </nuxt-link>
                    </li>
                    <!-- <li>
                        <nuxt-link to="/3">
                            <i class="iconfont icon-seeuser"></i>
                            关于
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/3">
                            <i class="iconfont icon-tags-fill"></i>
                           标签
                        </nuxt-link>
                    </li> -->
                    <li>
                        <nuxt-link to="/guestbook">
                            <i class="iconfont icon-guestbook"></i>
                           留言
                        </nuxt-link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>
<script>
import { mapState } from "vuex";
export default {
    props: ["data"],
    data(){
      return {
          isShowNav:false
      }
    },
    mounted() {
        this.$refs.elHeader.classList.add("active");
        let top = 0;
        window.addEventListener('scroll', ()=> {
            top = document.documentElement.scrollTop || document.body.scrollTop;
            if(top >= 90){
                this.$refs.elHeader.classList.add('header-hidden')
            }else{
                this.$refs.elHeader.classList.remove('header-hidden')
            }
        },false)
    },
    computed: {
        ...mapState({
            meun: state => state.meun
        })
    },
    methods:{
        handleShowNav(){
            this.isShowNav = !this.isShowNav;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../assets/_color.scss";
.header {
    background: $header_bg;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    height: 80px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    transition: all .5s;
    will-change: transform;
    .nav-btn{
        display: none;
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
    }
    &.header-hidden{
        transform: translateY(-100%);
    }
    .wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .logo {
        position: relative;
        width: 140px;
        text-align: center;
        height: 44px;
        span {
            transform: translateY(-20px);
            opacity: 0;
            visibility: hidden;
            transition: 0.5s;
            transition-delay: 0.5s;
        }
        &::before,
        &::after {
            display: inline-block;
            height: 2px;
            background: #222222;
            content: "";
            width: 0px;
            position: absolute;
            transition: opacity, width 0.3s ease-in-out;
            visibility: hidden;
            opacity: 0;
            transition-delay: 0.15s;
        }
        &::before {
            top: 0;
            left: 0;
        }
        &::after {
            bottom: 0;
            right: 0;
        }
        span {
            font-size: 22px;
            color: #222222;
            display: inline-block;
            line-height: 2;
            position: relative;
        }
    }
    nav {
        ul {
            display: flex;
        }
        li {
            margin-right: 6px;
            opacity: 0;
            .iconfont {
                font-size: 12px;
                margin-right: 8px;
            }
            a {
                padding: 0 10px;
                transition: 0.4s;
                height: 26px;
                font-size: 14px;
                display: flex;
                align-items: center;
                border-radius: 2px;
                color: #222222;
                &:hover {
                    background: #e1e1e1;
                }
            }
            @for $i from 0 through 5 {
                &:nth-child(#{$i}) {
					transition: 0.9s;
					transition-delay: 0.1s * $i;
					transform: translateX(50px)
                }
            }
        }
	}
	&.active {
        span {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        .logo {
            &::before,
            &::after {
                width: 140px;
                visibility: visible;
                opacity: 1;
            }
		}
		nav{
			li{
                opacity: 1;
				@for $i from 0 through 5 {
					&:nth-child(#{$i}) {
						transform: translateX(0)
					}
				}
			}
		}
    }
}
@media (max-width: 1100px) {
    .header.active .logo::before, .header.active .logo::after{
        width: 100px;
    }
    .header .logo{
        height: 32px;
        width: 100px;
    }
    .header .logo span{
        font-size: 16px;
    }
    .header{
        height: 70px;
        padding: 0 5px;
        .nav-btn{
            display: block;
            cursor: pointer;
            .iconfont{
                font-size: 22px;
            }
        }
    }
    .header.active nav{
        position: absolute;
        left: 0;
        right: 0;
        top: 70px;
        background: #ffffff;
        z-index: 9;
        pointer-events: none;
        visibility: hidden;
        //opacity: 0;
        transition: 0.3s;
        //transform: translateY(50px);
        height: 0;
        overflow: hidden;
        &.active{
            height: 230px;
            opacity: 1;
            pointer-events: auto;
            visibility: visible;
            /*  opacity: 1;
              visibility: visible;
              transform: translateY(0);
              pointer-events: auto;
              li{
                  opacity: 1;
                  transform: translateY(0)
              }*/
        }
    }
    .header nav ul{
        display: block;
        li{
            line-height: 45px;
            border-bottom: 1px solid #eee;
            margin-right: 0;
            a{
                padding: 0 25px;
                display: block;
                height: auto;
            }
        }
    }
    .header.header-hidden{
        transform: translateY(0);
    }
}
</style>

