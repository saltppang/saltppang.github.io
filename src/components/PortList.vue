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
                <img :src="port.img" :alt="port.name" />
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
    //border: 2px dashed black;

    .port__inner {
        .port__wrap {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: auto;
            gap: 2rem;
            margin: 4.5rem 0 2rem 0;
            width: auto;

            @media (max-width: 800px) {
                grid-template-columns: repeat(2, 1fr);
            }

            .port__item {
                /* width:100%;
                padding: 0;
                padding-top: 0;
                isolation: isolate; */
                display:flex;
                flex-direction: column;
                width:  100%;
                padding: 0;
                .title {
                    font-size: 1.2rem;
                    word-break: keep-all;
                    line-height: 1.2;
                    will-change: color;
                }
                img {
                    margin-top: 0;
                    transition: none;
                    &.img-contain {
                        object-fit: contain;
                    }
                    // @media (max-width: 800px) {
                    //     border: 6px solid var(--black);
                    // }
                }
                .desc {
                    flex-grow: 1;
                }
                .site {
                    transition: none;
                    will-change: color;
                }
            }
        }
    }
}
</style>