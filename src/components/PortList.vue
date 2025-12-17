<script setup>
import { onMounted } from "vue";
import { portText } from "../constants";

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

onMounted(() => {
    window.scrollTo(0, 0);
});
</script>

<template>
<section id="portList">
    <div class="port__inner">
        <div class="port__wrap">
            <div 
              class="port__item" 
              v-for="(port, key) in portText" 
              :key="port.id || key"
              :class="{ 'img-contain': key===2 }"
            >
                <div class="thumb">
                    <img :src="port.img" :alt="port.name" />
                </div>
                <h3 class="title">{{ port.title }}</h3>
                <p class="desc">{{ port.desc }}</p>
                <router-link class="site" :to="`/PortView/${key}`">페이지 이동</router-link>
            </div>
        </div>
    </div>
</section>
</template>

<style lang="scss" scoped>
#portList {
    overflow: hidden;
    width: 100%;

    .port__inner {
        .port__wrap {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: 1fr;
            gap: 2rem;
            margin: 4.5rem 0 2rem 0;
            width: auto;

            @media (max-width: 800px) {
                grid-template-columns: repeat(2, 1fr);
                grid-auto-rows: auto;
            }

            .port__item {
                display:flex;
                width: 100%;
                min-height: 420px;
                flex-direction: column;
                padding: 0;
                margin: 0;
                @media (max-width: 800px) {
                    height: auto;
                    min-height: auto;
                }
                .title {
                    font-size: 1.2rem;
                    word-break: keep-all;
                    line-height: 1.2;
                    will-change: color;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    @media (max-width: 800px) {
                        -webkit-line-clamp: unset;
                    }
                }
                .thumb {
                    overflow: hidden;
                    width: 100%;
                    aspect-ratio: 16 / 9;
                    flex-shrink: 0;
                    img {
                        width: 100%;
                        height: 100%;
                        margin-top: 0;
                        &.img-contain {
                            object-fit: contain;
                        }
                        &.hover {
                            margin-top: 0;
                        }
                        @media (max-width: 800px) {
                            border: 5px solid var(--black);
                        }
                    }
                }
                
                .desc {
                    overflow: hidden;
                    display: -webkit-box;
                    flex-grow: 1;
                    -webkit-box-orient: vertical;
                    
                    @media (max-width: 800px) {
                        height: auto;
                        padding-bottom: 1.5rem;
                        -webkit-line-clamp: unset;
                    }
                }
                .site {
                    margin-top: auto;
                    transition: none;
                    will-change: color;
                }
            }
        }
    }
}
</style>