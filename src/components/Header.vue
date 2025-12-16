<script setup>
import { headerNav } from '../constants'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import gsap from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin)

const router = useRouter()
const route = useRoute()

// 모바일 메뉴 on/off
const isNavVisible = ref(false)
const toggleMobileMenu = () => {
  isNavVisible.value = !isNavVisible.value
}

const navigate = (nav) => {
  if (nav.type === 'scroll') {
    if (route.path !== '/') {
      router.push({ path: '/', hash: nav.url })
    } else {
      scrollToSection(nav.url)  // ✅ 여기에서 GSAP로 이동
    }
  } else if (nav.type === 'route') {
    router.push(nav.url)
  }
}


const scrollTo = (target) => {
  gsap.to(window, {
    duration: 1,
    scrollTo: target,
    ease: "power2.inOut"
  });
};

const goToSection = async (target) => {
  // 현재 라우트가 Home이 아니면 먼저 홈으로 이동
  if (router.currentRoute.value.path !== "/") {
    await router.push("/");

    // 홈이 렌더링될 시간을 조금 줘야 함
    setTimeout(() => {
      gsap.to(window, { duration: 1, scrollTo: target, ease: "power2.inOut" });
    }, 100);
  } else {
    // 이미 홈에 있을 경우 바로 스크롤
    gsap.to(window, { duration: 1, scrollTo: target, ease: "power2.inOut" });
  }
};

</script>
<!-- <template>
    <header id="header" role="banner">
        <div class="header__inner">
            <div class="header__logo">
                <h1>
                    <a href="#">portfolio<em>vue.js</em></a>
                </h1>
            </div>
            <nav class="header__nav" :class="{show: isNavVisible}" role="navigation" aria-label="메인 메뉴">
                <ul>
                    <li v-for="(nav, key) in headerNav" :key="key">
                        <a :href="nav.url" @click="scrollLink($event)">{{ nav.title }}</a>
                    </li>
                </ul>
            </nav>
            <div class="header__nav__mobile" id="headerToggle" aria-controls="primary-menu" :aria-expanded="isNavVisible.toString()" role="button" tabindex="0" @click="toggleMobileMenu">
                <span></span>
            </div>
        </div>
    </header>
</template> -->

<template>
    <header id="header" role="banner">
        <div class="header__inner">
            <div class="header__logo">
                <h1>
                    <!-- <a href="#">portfolio<em>vue.js</em></a> -->
                    <router-link to="/">portfolio<em>vue.js</em></router-link>
                </h1>
            </div>
            <nav class="header__nav" :class="{show: isNavVisible}" role="navigation" aria-label="메인 메뉴">
                <ul>
                    <!-- <li v-for="(nav, key) in headerNav" :key="key">
                        <a href="javascript:void(0);" @click="scrollToSection(nav.url)">
                            {{ nav.title }}
                        </a>
                    </li>  -->
                     <!-- <li v-for="(nav, key) in headerNav" :key="key">
                        <a :href="nav.url">{{ nav.title }}</a>
                    </li> -->
                    <li><a href="#" @click.prevent="goToSection('#intro')">Intro</a></li>
                    <li><a href="#" @click.prevent="goToSection('#site')">Career</a></li>
                    <li><a href="#" @click.prevent="goToSection('#port')">Portfolio</a></li>
                    <li><a href="#" @click.prevent="goToSection('#skill')">Skills</a></li>
                    <li><a href="#" @click.prevent="goToSection('#contact')">Contact</a></li>
                </ul>
            </nav>
            <div class="header__nav__mobile" id="headerToggle" aria-controls="primary-menu" :aria-expanded="isNavVisible.toString()" role="button" tabindex="0" @click="toggleMobileMenu">
                <span></span>
            </div>
        </div>
    </header>
</template>


<style lang="scss">
    @import "@/assets/scss/mixin";
    #header {
        @include position-fixed;
        z-index:10000;
    }
    .header__inner {
        @include flex-between;
        background-color:var(--white);
        backdrop-filter:blur(15px);
        padding:1rem;
    }

    .header__logo {
        font-size:0.9rem;
        font-family: var(--mainEng-font-bold);
        text-align:center;
        text-transform:uppercase;
        line-height:1;

        em {
            font-family: var(--subEng-font);
            font-size:12px;
            display:block;
            color:var(--black200);
        }
    }

    .header__nav {

        @media(max-width:800px){
            display:none;

            &.show {
                display:block;

                ul {
                    display:block;
                    position:absolute;
                    right:0;
                    top:68px;
                    background-color:#f6f6f6;
                    z-index:10000;
                    min-width:100%;
                    padding: 20px 0;
                    li {
                        display:block;
                        text-align:right;
                        a {
                            display: inline-block;
                            width: 100%;
                            padding:10px;
                            text-align: center;
                        }
                    }
                }
            }
            &.show+.header__nav__mobile span::before {
                width:20px;
            }
            &.show+.header__nav__mobile span::after {
                width:20px;
            }
        }

        li {
            display:inline;

            a {
                position: relative;
                text-transform: uppercase;
                font-family: var(--mainEng-font-bold);
                font-size: 14px;
                padding: 14px;

                &::before{
                    content:'';
                    width:calc(100% - 28px);
                    height:1px;
                    background-color:var(--black);
                    position:absolute;
                    left:14px;
                    bottom:10px;
                    transform: scaleX(0);
                    transition: all 0.3s;
                }
                &:hover::before {
                    transform:scalX(1);
                }
            }
        }
    }

    .header__nav__mobile {
        display:none;
        width:40px;
        height:40px;
        cursor:pointer;

        @media (max-width:800px){
            display:block;
        }

        span{
            display:block;
            width:40px;
            height:3px;
            background-color: var(--black);
            margin-top:18px;
            position:relative;

            &::before {
                content:'';
                width:40px;
                height:3px;
                background-color:var(--black);
                position:absolute;
                right:0;
                top:6px;
                transition:width 0.3s;
            }
            &::after {
                content:'';
                width:40px;
                height:3px;
                background-color:var(--black);
                position:absolute;
                left:0;
                bottom:6px;
                transition:width 0.3s;
            }
        }
    }


</style>