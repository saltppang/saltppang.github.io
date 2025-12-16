<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const scrollY = ref(0);

// 스크롤 값 추적
const handleScroll = () => {
  scrollY.value = window.scrollY;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  console.log("intro onMounted 호출됨");
  initScrollAnimation();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  // intro 전용 트리거만 제거
  ScrollTrigger.getAll().forEach(st => {
    if (!st.vars.id || st.vars.id.startsWith("Intro")) return;
    st.kill();
  });
});

// intro 가로 스크롤 & 패럴랙스
const initScrollAnimation = () => {
  ScrollTrigger.matchMedia({
    "(min-width: 801px)": function () {
      console.log("pc 가로스크롤 실행");
      const horSection = gsap.utils.toArray(".intro__item");
      const container = document.querySelector("#intro");

      gsap.to(horSection, {
        x: () => -(container.scrollWidth - container.offsetWidth),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => container.scrollWidth - container.offsetWidth,
          pin: true,
          scrub: 1,
          markers: false,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          id: "IntroHorizontal", // id 지정
        },
      });
    },
    "(max-width: 800px)": function () {
      console.log("모바일 세로스크롤 실행");
      // 모바일에서는 별도 애니메이션 없음
    },
  });

  // 자식 패럴랙스
  const items = gsap.utils.toArray(".intro__lines .item");
  items.forEach((item, index) => {
    const moveX = parseInt(item.dataset.x) * 0.2;
    gsap.fromTo(
      item,
      { x: 0 },
      {
        x: moveX,
        ease: "none",
        scrollTrigger: {
          trigger: ".intro__lines",
          start: "top center",
          end: "bottom center",
          scrub: 1,
          id: `IntroParallax-${index}`, // id 지정
        },
      }
    );
  });

  // 이미지 패럴랙스
  nextTick(() => {
    const bigImg = document.querySelector(".grid_wrap_big img");
    const smallImg = document.querySelector(".grid_wrap_small img");

    if (bigImg) {
      gsap.fromTo(
        bigImg,
        { xPercent: -1, scale: 1 },
        {
          xPercent: 3,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".intro__images",
            start: "top center",
            end: "bottom center",
            scrub: 1,
            id: "IntroBigImg",
          },
        }
      );
    }

    if (smallImg) {
      gsap.fromTo(
        smallImg,
        { xPercent: 15, scale: 1 },
        {
          xPercent: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".intro__images",
            start: "bottom center",
            end: "bottom center",
            scrub: 1,
            id: "IntroSmallImg",
          },
        }
      );
    }
  });

  // 스크롤 시 이미지 scale 클래스
  const handleImageScale = () => {
    const images = document.querySelectorAll(".intro__images img");
    const scrollPosition = window.scrollY;
    images.forEach((img) => {
      if (scrollPosition > 1000) {
        img.classList.add("scaled");
      } else {
        img.classList.remove("scaled");
      }
    });
  };

  window.addEventListener("scroll", handleImageScale);
};
</script>

<template>
  <!-- <p style="z-index:20000; position:fixed;">스크롤 값: {{ scrollY }}px</p> -->
  <section id="intro">
    <div class="intro__inner">
      <div class="intro__title hide">
        introfolio <em>포폴 작업물</em>
      </div>
      <div class="intro__wrap">
        <div class="intro__item intro__summary">
          <p class="say">
            There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle.
          </p>
          <p class="say">A person who never made a mistake never tried anything new.</p>
          <p class="people">-Albert Einstein</p>
        </div>
        <div class="intro__item intro__lines">
          <div class="item one" data-x="-300"><span>I </span><span> </span><span>a</span><span>m</span> </div> 
          <div class="item two" data-x="200">
            <span class="greetings">Hello</span>
            <!-- <span> a </span><span> </span><span>b</span><span>c</span><span>d</span> -->
            <span> a </span><span> </span><span>w</span><span>e</span><span>b</span>
          </div>
          <div class="item three" data-x="-100">
            <!-- <span>e</span><span>f</span><span>g</span><span>h</span><span>i</span><span>j</span><span>k</span><span>l</span><span>m</span> -->
            <div class="item"><span>p</span><span>u</span><span>b</span><span>l</span><span>i</span><span>s</span><span>h</span><span>e</span><span>r</span>
                    </div>
          </div>
        </div>
        <div class="intro__item intro__images">
          <div class="grid">
            <div class="grid_wrap">
              <div class="grid_wrap_big"  data-x="-800">
                <img src="../assets/img/introImg1.JPG" />
              </div>
            </div>
            <div class="grid_wrap" data-x="-300">
              <div class="grid_wrap_small">
                <img src="/src/assets/img/introImg2.jpg" />
              </div>
            </div>
          </div>
        </div> 
        <div class="intro__item intro__content">
          <p>
            안녕하세요, 프로그래밍 서비스업 퍼블리싱 팀에서 4년 3개월간 다양한 프로젝트를 통해 역량을 쌓아온 황선미입니다.
          </p>
          <p>
            웹 개발 언어를 활용해 웹사이트 제작 및 유지보수를 주로 담당했으며, 디자이너와 개발자와의 협업 도구를 적극적으로 활용하여 업무 효율성을 높였습니다.
          </p>
          <p>
            최근에는 Vue와 React 등 JavaScript 프레임워크에 관심이 생겨, 퍼블리셔로서의 영역을 확장하기 위해 관련 강의를 수강하고 작은 프로젝트를 진행해 보고 있습니다.
          </p>
          <!--<div class="infoMore">
            <a class="infoMore__Btn" href="javascript:void(0);" target="_blank">
              자기소개 더보기
            </a>
          </div>-->
        </div>
      </div>
    </div>
  </section>
</template>


<style lang="scss"> 
  #intro { 
    overflow:hidden; 
    width: 100%;
    @media (max-width: 800px) {
      overflow: visible;
    }
  }
  .intro__inner {
    margin-top: 4.5rem;
    .intro__title { 
      width: 100%; 
      height: 5vw; 
      font-size: 4vw; 
      font-weight: 900; 
      line-height: 1.6; 
      font-family: var(--mainKor-font); 
      text-transform: uppercase; 
      color: var(--black100); 
      border-bottom: 0.4vw solid var(--black100); 
      margin-bottom: 16px; 
      text-indent: -0.26vw;
      &.hide { 
        display:none; 
      } 
      @media (max-width:320px){ display: none; } 
  }
  .intro__wrap {
    display: flex;
    //flex-wrap: wrap;
    flex-wrap: nowrap;
    justify-content: flex-start;
    min-width: max-content;
    //width: 4000px;
    z-index: 2; 
    @media (max-width: 800px) {
      flex-direction: column;
      width: 100%;
      min-width: auto; 
      .intro__item {
        flex: none; 
        width: 100%;
      }
    }
    .intro__item { 
      display: flex;
    &.intro__summary { 
      display:inline-block;
      padding: 0 1.5rem;
      width: 280px;
      font-size: .875rem;
      @media (max-width: 800px) {
        width: 100%;
        text-align: center;
        padding: 1rem 8rem 0;
      }
      @media (max-width: 480px) {
        width: 100%;
        padding: 1rem 3rem;
      }
      img {
        border-radius: 50%; 
        margin-bottom: 10px; 
        width: 10rem; 
        height: 10rem; 
        object-fit: cover;
      } 
      .say { margin-bottom: 0.5rem;
        font-family: var(--subEng-font);
        color: #aaa;
      } 
      .people { 
        display: inline-block;
        font-family: var(--subEng-font);
        color: #1e1e1e; 
        line-height: 2; } 
      } 
     
      
      &.intro__lines {
        display: inline-block; width: 200vh; 
        line-height:1; 
        @media (max-width: 800px) {
          padding-top:20vh;
          width: 100%;
        } 
        
        .item { 
          position:relative;
          text-align:center;
          @media (max-width: 800px) {
            &.one {
              margin-left: 7rem;
            }
            &.two {
              margin-left: 1rem;
              width: 88%;
            }
            &.three {
              margin-left: 2rem;
            }
          } 
          @media (max-width: 640px) {
            &.one {
              margin-left: 4rem;
            }
          } 
          .greetings { 
            position:absolute;
            top:65px; 
            left:130px; 
            font-size: 7vh; 
            letter-spacing: 0.5rem;
            @media (max-width: 800px) {
              top: -29vh;
              left: 50%;
              transform: translate(-50%);
              letter-spacing: 0.2rem;
              font-size: 8vw;
            }  
             @media (max-width: 640px) {
              top: -26vh;
            }  
             @media (max-width: 480px) {
              top: -24vh;
            }
          }
          span { 
            text-transform: uppercase; 
            font-size:28vh;                      
            @media (max-width: 800px) { 
              font-size:15vw;
            } 
          } 
        } 
      }
            
        &.intro__images {
          position:relative;
          display: inline-block; 
          width: 60vw;
          @media (max-width: 800px) {
            width: 100%;
            margin-top: 2rem;
          } 
          .grid {
            display:flex; 
            align-items: center;
            @media (max-width: 800px) {
              flex-flow: column;
            }
            &_wrap{ 
              &_big {
                position:absolute; 
                overflow: hidden;
                width: 50vw;
                height: 35vw;  
                top:50%;
                transform: translate(0, -50%);
                @media (max-width: 800px) {
                  position: static;
                  transform: none !important;
                  width: 100%;
                  height: auto;
                  text-align: center;
                }
                img {
                  width: 100%;
                  height: auto;
                  object-fit: cover;
                  transition: transform 1s ease;
                  transform: scale(1.2);
                  &.scaled {
                    transform: scale(1);
                  }
                  @media (max-width: 800px) {
                    width: 95%;
                    height: auto;
                    margin-left: 10px;
                  }    
                }
              } 
              &_small { 
                 position: absolute;
                 overflow: hidden;
                 top: 95%;
                 left: 55%;
                  transform: translate(55%, -65%);
                  width: 20vw;
                  height: 30vw;  
                  @media (max-width: 800px) {
                    margin: 0 auto;
                    position:unset; 
                    width: 20%;
                    height: auto;
                    transform: translate(150%, -20%);
                  }
                  img {
                    width: 80%;
                    height: auto;
                    object-fit: cover;
                    transform: scale(1.1);
                    transition: transform 2s ease;
                    &.scaled {
                      transform: scale(1);
                    }
                    @media (max-width: 800px) {
                      margin: 0 auto;
                      // width: 100%;
                      // height: auto;
                      // transform: none !important;
                      position: static;
                      //transform: none !important;
                      width: 100%;
                      height: auto;
                    }  
                  }
              }
            }
          }
        }
        &.intro__content{ 
          display: inline-block;
          padding: 8rem 3.75rem; 
          width: 42rem; 
          white-space: normal; 
          vertical-align: top; 
          @media (max-width: 800px) {
            width: 100%;
            padding: 0 3.75rem 4rem;
          }
          @media (max-width: 480px) {
            width: 100%;
            padding: 0 1rem 4rem;
          }
          p {
              color: #1e1e1e; 
              font-size: .95rem; 
              word-break: keep-all;
              &+p { 
                margin-top:1rem;
              } 
            .infoMore {
              margin-top: 1rem;
              text-align:right; 
              &__Btn{ 
                right:0; 
                padding: .625rem .9375rem; 
                border: 1px solid #1e1e1e; 
                position: relative;
                z-index: 1; 
                color: #fff;
                background-color: #1e1e1e; 
                border-radius: 20px;
                &::before { 
                  position: absolute; 
                  top: 0;
                  bottom: 0;
                  right: 0; left: 0; z-index: -1; 
                  background-color: #fff; border-radius: 20px; opacity: 0;
                  content: ""; 
                } 
              }
            } 
          }
        }
       }
    }
  }  
</style>