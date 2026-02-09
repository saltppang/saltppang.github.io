<script setup>
import { portText } from "../constants";
import { onMounted, onBeforeUnmount, nextTick } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let portTrigger = null;
let resizeHandler = null;

function initScroll() {
  // port 전용 트리거만 제거
  if (portTrigger) {
    portTrigger.kill();
    portTrigger = null;
  }

  if (window.innerWidth < 800) {
    return;
  }

  const portWrap = document.querySelector(".port__wrap");
  const portSection = document.querySelector("#port");

  const totalWidth = portWrap.scrollWidth - window.innerWidth;

  portTrigger = gsap.to(portWrap, {
    x: -totalWidth,
    ease: "none",
    scrollTrigger: {
      trigger: portSection,
      start: "top 56px",
      end: `+=${totalWidth + 200}`,
      scrub: 1,
      pin: true,
      markers: false,
      invalidateOnRefresh: true,
      id: "PortTrigger", // id 지정
    },
  }).scrollTrigger;
}

onMounted(() => {
  nextTick(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        initScroll();
        ScrollTrigger.refresh();
      }, 100);
    });

    resizeHandler = () => {
      if (portTrigger) portTrigger.kill();
      initScroll();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", resizeHandler, { passive: true });
  });
});

onBeforeUnmount(() => {
  if (resizeHandler) {
    window.removeEventListener("resize", resizeHandler);
    resizeHandler = null;
  }
  if (portTrigger) portTrigger.kill();
});
</script>

<template>
    <section id="port">
        <div class="port__inner">
            <div class="port__title">
                portfolio
                <!-- <a class="link" href="./PortList.vue">전체 포트폴리오 보기</a> -->
                <router-link class="link" to="/PortList">전체 포트폴리오 보기</router-link>
            </div>
            <div class="port__wrap">  
                <div class="port__item" v-for="(port, key) in portText" :key="key" :class="{ 'img-contain': key===2 }">
                    <span class="num">{{ port.num }}.</span>
                    <img :src="port.img" :alt="port.name" />
                    <h3 class="title">{{ port.title }}</h3>
                    <p class="desc">{{ port.desc }}</p>
                    <!-- <a :href="port.view" target="_self" class="site">페이지 이동</a> -->
                    <router-link :to="`/PortView/${port.id}`" class="site">
                        페이지 이동
                    </router-link>
                </div> 
            </div>
        </div>
    </section>
</template> 


<style lang="scss">
    #port {
        overflow: hidden;
        width: 100%;
        margin-top: 30vh;
        @media (max-width: 800px) {
            overflow: visible;
            margin-top: 10vh;
        }
    }
    .port__inner {
        padding: 16px;
        @media (max-width: 800px) {
            padding: 1rem;
        }

        .port__title {
            display:flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            width: 100%;
            height: 4vw;
            line-height: 1.6;
            font-size: 1.8rem;
            font-family: var(--mainEng-font-bold);
            text-transform: uppercase;
            color: var(--black100);
            border-bottom: 0.3vw solid var(--black100);
            letter-spacing: -0.06vw;
            @media (max-width: 800px){ 
                position: sticky;
                width: 100%;
                height: auto;
                top: 68px;
                margin-bottom: 2vw;
                font-size: 1.5rem;
                background-color: var(--white);
                z-index: 1;
            }

            a {
                font-family: var(--mainKor-font);
                @media (min-width: 800px){ 
                    color:  var(--black100);
                    display:inline-block; 
                    margin:0;
                    text-transform:uppercase;
                    font-size: 1rem;
                    &:before {
                    display:block;
                    content: '';
                    border-bottom: solid 0.1vw var(--siteBg2);  
                    transform: scaleX(0);
                    transition: transform 600ms ease-in-out;
                    }
                    &:after {
                    display:block;
                    content: '';
                    border-bottom: solid 0.1vw var(--siteBg2);  
                    transform: scaleX(0);  
                    transition: transform 600ms ease-in-out;
                    }

                    &:hover:before { transform: scaleX(1); }
                    &.link:before{  transform-origin:  50% 0%; }

                    &:hover:after { transform: scaleX(1); }
                    &.link:after{  transform-origin:  0% 50%; }
                }
                @media (max-width: 800px){ 
                    font-size: 1rem;
                }
            }
        }
        .port__wrap {
            display: flex;
            flex-wrap: nowrap; // 한 줄에 모든 항목 배치
            overflow-x: visible; // 가로 스크롤 애니메이션을 위해 가로 오버플로 허용
            margin: 0; // 불필요한 여백 제거
            //border:1px solid red;
            @media (max-width: 800px) {
                flex-direction: column;
                transform: none !important; // GSAP 잔여값 방지
            }

            .port__item {
                display:flex;
                flex-direction: column;
                width: 500px;
                flex-shrink: 0; // 크기 고정
                padding: 0 2.5rem;
                margin-right: 20px;
                @media (max-width: 800px) {
                    width: 90%;
                    padding: 0;
                    margin: 0 auto 3rem auto;
                }
                .num {
                    font-size: 2rem;
                    font-family: var(--mainNum-font);
                }
                img {
                    display: block;
                    margin-top: -16px;
                    border-radius: 5px;
                    width: 100%;
                    transition: all 0.3s;
                    transition: margin-top 0.3s;
                    border: 10px solid var(--black);
                    aspect-ratio: 16 / 9;
                    @media (min-width: 800px){ 
                        filter: saturate(0%);
                    }
                    @media (max-width: 800px){ 
                        margin-top: 0;
                    }
                }
                .title {
                    font-size: 1.5rem;
                    text-align: center;
                    padding: 0.8rem 0;
                    font-weight: 700;
                    color: var(--black100);
                    border-bottom: 2px solid var(--black100);
                    margin-bottom: 1rem;
                }
                .desc {
                    height: 5rem;
                    font-size: 1rem;
                }
                .site {
                    border: 1px solid var(--black100);
                    display: block;
                    padding: 0.625rem 1.5rem;
                    margin-top: 1.5rem;
                    align-items: flex-end;
                    text-align: center;
                    transition: all 0.3s;
                    transition: margin-top 0.3s;
                    font-size: 1rem;
                }
                &.img-contain {
                    img {
                        object-fit: contain;
                    }
                }
                @media (min-width: 800px){ 
                    &:hover {
                        img {
                        margin-top: 10px;
                        filter: saturate(100%);
                        }
                        .site {
                            margin-top: 10px;
                        }
                        
                        &:before {
                            position: absolute;
                            margin-top: 0;
                        }
                    }
                }
            }
        }
    }
</style>