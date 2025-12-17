<script setup>
import { useRoute } from 'vue-router'
import { portView } from "../constants"
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref, onMounted, computed } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

// Swiper CSS
import 'swiper/css'

// Mockup 이미지 import (실제 필요한 것만!)
import pcMockup from '../assets/img/Mockup_imac.png'
import mobileMockup from '../assets/img/Mockup_iphone.png'

gsap.registerPlugin(ScrollTrigger)

// 반응형 슬라이드 설정
const slidesPerView = ref(5)
const spaceBetween = ref(120)

onMounted(() => {
  const width = window.innerWidth
  if (width <= 500) {
    slidesPerView.value = 3
    spaceBetween.value = 5
  } else if (width <= 1024) {
    slidesPerView.value = 3
    spaceBetween.value = 80
  }
  window.scrollTo(0, 0)
})

onMounted(() => {
  gsap.to(".target", {
    y: 100,
    scrollTrigger: {
      trigger: ".target",
      scroller: ".img__inner",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    }
  })
})

const route = useRoute()
const id = parseInt(route.params.id)
const portData = portView[id]

console.log("📌 route.params.id =", route.params.id)
console.log("📌 id =", id)
console.log("📌 portData =", portData)

// 특정 ID만 PC 목업으로 보여주기
const pcIds = [3] // 관리 배열

// 이미지 소스
const frameImg = computed(() => 
  pcIds.includes(id) ? pcMockup : mobileMockup
)

// 이미지 클래스
const frameClass = computed(() => 
  pcIds.includes(id) ? "pc-frame" : "mobile-frame"
)

</script>

<template>
  <section id="portView">
    <div class="port__inner">
      <div class="port__wrap">
        <div class="port__top">
          <div class="left">
            <div class="imac">
              <div class="img__inner" @wheel.stop @touchmove.stop>
                <img class="target" :src="portData.imgSrc" alt="포트폴리오 이미지" />
              </div>
            </div>
          </div>
          <div class="right">
            <dl class="portfolio-info__dl">
              <dt>CO.</dt>
              <dd>{{ portData.company }}</dd>
              <dt>CLIENT.</dt>
              <dd>{{ portData.client }}</dd>
              <dt>RELEASE DATE.</dt>
              <dd>{{ portData.date }}</dd>
              <dt>TYPE.</dt>
              <dd>{{ portData. type }}</dd>
              <dt>Tech Stack.</dt>
              <dd>{{ portData.tech }}</dd>
              <dt>Description.</dt>
              <dd>{{ portData.description }}</dd>
              <dt>What did I do. </dt>
              <dd>
                <p v-for="(item, i) in portData.task" :key="i">- {{ item }}</p>
              </dd>
            </dl>
          </div>
        </div>

        <div class="port__bottom">

          <div class="phone-carousel">
            <!-- Swiper 슬라이드 -->
            <Swiper
              class="swiper-container"
              :loop="false"
              :slide-to-clicked-slide="true"
              pagination
              :slides-per-view="'auto'"
              :centered-slides="true"
            >
              <SwiperSlide v-for="(img, index) in portData.images" :key="index" :class="pcIds.includes(id) ? 'slide-pc' : 'slide-mobile'">
                <div :class="[ 'screen-wrapper', pcIds.includes(id) ? 'pc' : 'mobile']" @wheel.stop @touchmove.stop>
                  <img class="screen" :src="img" />
                </div>
              </SwiperSlide>

            </Swiper> 

            <!-- 디바이스 프레임 -->
            <img :src="frameImg" :class="frameClass" alt="디바이스 목업" />

          </div>

        </div>
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
    #portView {
        overflow: hidden;
        width: 100%;

        .port__inner {
          .port__wrap {
            display:block;
            margin-top: 3.5rem;
          
            .port__top {
              display:flex;
              padding-top: 3rem;
              flex-flow: row wrap;
              justify-content: space-between;
              align-items: center;
              @media (max-width: 800px) {
                flex-flow: column;
              }
              .left {
                width: 50%;
                @media (max-width: 800px) {
                  width: 80%;
                }
                @media (max-width: 640px) {
                  width: 100%;
                }
                .imac {
                  position: relative;
                  width: 100%;
                  aspect-ratio: 14.5 / 11; /* 이미지 비율에 맞게 조정 */
                  background: transparent;

                  &::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: url('../assets/img/Mockup_imac.png') no-repeat center / contain;
                    z-index: 2;
                    pointer-events: none;
                  }

                  .img__inner {
                    position: absolute;
                    z-index: 1;
                    top:3%;  
                    left: 7%;   
                    width: 85.5%; 
                    height: 63.5%; 
                    overflow-y: auto;
                    img {
                      width: 100%;
                      height: auto;
                      display: block;
                    }
                  }
                }
              }
              .right {
                width: calc(100% - 52%);
                @media (max-width: 800px) {
                  width: 70%;
                  padding-top: 3rem;
                }
                @media (max-width: 640px) {
                  width: 90%;
                }
                dl {
                  display: flex;
                  flex-flow: wrap;
                  font-size: 0.8rem;
                  line-height: 1.6;
                  @media (max-width: 800px) {
                    font-size: 0.9rem;
                    word-break: keep-all;
                  }
                  dt {
                    width: 9rem;
                    font-family: var(--mainEng-font-bold);
                    @media (max-width: 1200px) {
                         width: 7rem;
                    }
                    @media (max-width: 800px) {
                         width: 9rem;
                    }
                  }
                  dd {
                    width: calc(100% - 11rem);
                    letter-spacing: -0.5px;
                    font-family: var(--mainKor-font);
                  }
                }
                dl dt:nth-of-type(n+2),
                dl dd:nth-of-type(n+2) {
                  padding-top: 0.5rem; 
                }
              }
            }

            .port__bottom {
              margin-top:7rem;
              @media (max-width: 800px) {
                  margin-top: 3rem;
                }
              .phone-carousel {
                 position:relative;
                // width:28vw;
                // margin:0 auto;

                img.screen {
                  width: 100%;
                  height: auto;
                  object-fit: contain;
                }
                .swiper-slide.swiper-slide-active {
                    opacity: 1;
                    transform: none;
                }
                .swiper-slide {
                  transform: scale(0.7);
                  opacity: 0.6;
                  transition: all 0.3s ease;
                }

                .swiper-slide-active {
                  transform: scale(1);
                  opacity: 1;
                }

                .swiper-container {
                  width: 100%;
                  padding: 0 0 10vh 0; 
                  box-sizing: border-box;
                }

                .swiper-slide {
                  display: flex;
                  width: 19rem;
                  justify-content: center;
                  align-items: center;
                  &.slide-pc {
                    top: 0;
                    left: 0;
                    width: 50%;
                    aspect-ratio: 14.5 / 11;
                    z-index: 10;
                    pointer-events: none;
                    .pc {
                      width: 95%;
                      aspect-ratio: 14.5 / 11;
                      margin-top: 0;
                      box-shadow: none;
                    }
                  }
                }

                .swiper-slide-active {
                  .screen-wrapper {
                    &.mobile {
                      border-radius: 0 0 10px 10px;
                    }
                  }
                }

                .screen-wrapper {
                  width: 91%;
                  height: auto;
                  aspect-ratio: 9 / 18.35;
                  overflow-y: auto;
                  position: relative;
                  margin-top:5vh;
                  background: #fff;
                  
                  &.mobile {
                    box-shadow: 0 0 0 1px #ddd;
                  }
                }

                .screen-wrapper img {
                  width: 100%;
                  height: auto;
                  display: block;
                }

                /* 이미지가 프레임 안에 꽉 차게 */
                .screen {
                  width: 100%;
                  height: auto;
                  object-fit: contain;
                  display: block;
                }

                /* 핸드폰 프레임 오버레이 */
                .mobile-frame {
                  position: absolute;
                  top: 0;
                  left: 50%; 
                  width: 19rem;
                  transform: translate(-50%, 0);
                  z-index: 10;
                  pointer-events: none;
                }

                /* PC 프레임 오버레이 */
                .pc-frame {
                  position: absolute;
                  top: 0;
                  left: 50%; 
                  width: 50%;
                  aspect-ratio: 14.5 / 11;
                  transform: translate(-50%, 0);
                  z-index: 10;
                  pointer-events: none;
                }

                /* 기존 스타일 + 추가 */
                .screen-wrapper::-webkit-scrollbar {
                  width: 6px;
                }

                .screen-wrapper::-webkit-scrollbar-track {
                  background: transparent;
                }

                .screen-wrapper::-webkit-scrollbar-thumb {
                  background-color: rgba(0, 0, 0, 0.3);
                  border-radius: 8px;
                  border: none;
                }

                .screen-wrapper::-webkit-scrollbar-button:single-button {
                  display: none;
                  height: 0;
                  width: 0;
                }

              }

            }
          }
        }
    }

</style>