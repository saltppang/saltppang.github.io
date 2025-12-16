
<template>
    <section id="site">
        <div class="site__inner">
            <h2 class="site__title">
                Career
                <a v-show="true" class="link" href="#" @click="openModal(0)" tabindex="0" ref="careerTrigger">경력기술서 더보기</a>
                <CareerModal v-show="modal"
                :modal="modal" 
                :careerData="careerModal"
                :triggerEl="$refs.careerTrigger"
                :temp="selectedTemp"
                @update:modal="modal = $event" 
                />
            </h2>
            <div class="site__wrap">
                <div class="site__item" v-for="(yearData, index) in siteText" :key="index">
                <span class="num">{{ yearData.year }}</span>
                <div class="title">
                    <div class="title__txt" v-for="(site, index) in yearData.sites" :key="index">
                        
                        <p class="tit" v-if="!site.subTxts">
                            {{ site.title }}
                            <em v-if="site.period">{{ site.period }}</em>
                        </p>

                        <template v-if="site.subTxts && site.subTxts.length">
                            <p class="twodep_tit">{{ site.title }}</p>
                            <p class="tit" v-for="(sub, subIndex) in site.subTxts" :key="subIndex">
                                {{ sub.name }}<em>{{ sub.period }}</em>
                            </p>
                        </template>

                        <p class="stack">{{ site.stack }}</p>
                    </div>
                </div>
                <div class="info">
                    <span>{{ yearData.info }}</span>
                </div>
            </div>

            </div>
        </div>
    </section>
</template>

<script>
import { siteText } from "../constants";
import { careerModal } from '../constants';
import CareerModal from './CareerModal.vue';  

export default {
  name: 'App',
  components: {
    CareerModal
  },
  data() {
    return {
      modal: false,
      siteText,
      selectedTemp: 0, // 예시로 첫 번째 데이터를 보여준다고 가정
      careerModal,
    }
  },
  
  methods: {
    
    openModal(index) {
        this.selectedTemp = index;
        this.modal = true;
    }

  },
}
</script>


<style lang="scss">
    @import "../assets/SCSS/mixin";

    .site__inner {
    padding: 16px;

    .site__title  {
        position: sticky;
        display: flex;
        align-items: center;
        justify-content: space-between;
        top: 70px;
        left: 0;
        width: 100%;
        height: 4vw;
        font-size: 1.8rem;
        line-height: 1.6;
        font-family: var(--mainEng-font-bold);
        text-transform: uppercase;
        color: var(--black100);
        border-bottom: 0.3vw solid var(--black100);
        margin-bottom: 20px;
        
        a {
            font-family: var(--mainKor-font);
            cursor: pointer;
            @media (min-width: 800px){ 
                color: var(--black100);
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

        @media (max-width: 800px){ 
            width: 100%;
            margin-bottom: 2vw;
            font-size: 1.5rem;
            height: auto;
            top: 68px;
            z-index: 1000;
            background-color: var(--mainBg-color);
        }

        em {
            padding-top:0.1vw;
            font-size: 1.25rem;
            font-weight: 400;
            line-height: 2;
        }
    }
    .site__wrap {
        .site__item {
            height: 70vh;
            @include flex-center;
            justify-content: flex-start;
            position: sticky;

            &:nth-child(1) {
                background-color: var(--siteBg1);
                top: 140px;

                @media (max-width: 800px){ 
                    top: 100px;
                }
            }
            &:nth-child(2) {
                background-color: var(--siteBg2);
                top: 160px;

                @media (max-width: 800px){ 
                    top: 120px;
                }
            }
            &:nth-child(3) {
                background-color: var(--siteBg3);
                top: 180px;

                @media (max-width: 800px){ 
                    top: 140px;
                }
            }
            &:nth-child(4) {
                background-color: var(--siteBg4);
                top: 200px;

                @media (max-width: 800px){ 
                    top: 160px;
                }
            }
            &:nth-child(5) {
                background-color: var(--siteBg5);
                top: 220px;

                @media (max-width: 800px){ 
                    top: 180px;
                }
            }
    
            .num {
                font-size: 1.8rem;
                line-height: 1;
                font-family: var(--mainKor-font);
                position: absolute;
                left: 1vw;
                top: 1vw;

                @media (max-width: 800px){ 
                    font-size: 1.5rem;
                    left: 1.5rem;
                    top: 1.5rem;
                }
            }
            .title {
                position:absolute;
                display: block;
                margin-left :3vw;
                font-family: var(--mainKor-font);
                @media (max-width: 800px) {
                    margin-left: 2.5rem;
                }
            
                &__txt{
                    &:before {
                        position: relative;
                        top: 1.9vh;
                        left: -2vw;
                        display: block;
                        width: 1.5vw;
                        height: 1px;
                        background-color: var(--black300);
                        box-sizing: border-box;
                        content: "";    
                        @media (max-width: 800px) {
                            left: -2.5vw;
                        }
                        @media (max-width: 640px) {
                            top: 1.5vh;
                        }
    
                    }
                    .tit{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        flex-wrap: nowrap;
                        gap: 0.5rem; 
                        width: 100%;  
                        font-family: 'MaruBuriBold';
                        font-size: 1.1rem;
                        em {
                            flex: 0 0 auto;
                            min-width: 6ch;
                            white-space: nowrap;
                            padding-top:0.2vw;
                            font-size: 1.05rem;
                            font-family: var(--mainKor-font);
                             font-variant-numeric: tabular-nums;
                            text-align: right;
                        }
                        @media (max-width: 800px) {
                            gap: 0.3rem;
                            font-size: 1rem;
                            em {
                                min-width: 5ch;    // 좁은 화면 대응
                            }
                        }
                        @media (max-width: 640px) {
                            display: block;
                            em {
                                display: block;
                                text-align: left;
                            }
                        }
                    }
                    .twodep_tit {
                        display:flex;
                        justify-content: space-between;
                        margin-bottom:0.5vw;
                        width: 35vw;
                        font-size: 1.1rem;
                        font-family: 'MaruBuriBold';
                    }
                    .stack {
                        font-size: 1.1rem;
                        color:#444;
                    }
                    &:not(:first-child) {
                        margin-top: 1rem;
                    }
                }
            }
            .btn {
                a {
                    text-decoration: underline;
                    text-transform: uppercase;
                    color: var(--black200);
                    font-size: 1rem;
                    transition: all 0.3s;
                    margin: 0 2px;

                    &:hover {
                        color: var(--black);
                    }
                }
            }
            .info {
                position: absolute;
                left: 0;
                bottom: 3%;
                width: 98%;
                margin-left: 1%;
                border-top: 1px solid var(--black);
                border-bottom: 1px solid var(--black);
                display: flex;
                justify-content: space-between;

                @media (max-width: 800px){ 
                    flex-direction: column;
                    width: 90%;
                    margin-left: 5%;
                    padding: 5px 0;
                }

                span {
                    font-family: var(--mainKor-font);
                    font-size: 12px;
                    padding: 3px 0;
                    text-transform: uppercase;
                }
            }
        }
    }
}



.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed; 
  top: 0;
  left: 0;
  z-index: 9999; 
  padding: 20px;
}

.white-bg {
  position: absolute;
  margin: 4vw 2vw;
  height: 85vh;
  background: white;
  border-radius: 8px;
  padding: 20px;
  z-index: 10000;
  div {
    position: relative;
    margin: 0 auto;
    width: 80%;
    height: 100%;
    border: 0.5px solid #ccc;
    text-align: center;
    box-sizing: border-box;
    overflow-y: scroll;
    img {
        width: 100%;
        height: auto;
    }
    @media (max-width: 640px){ 
        margin-top: 2rem;
        width: 100%;
    }
  }
  
   
}
.close {
    position: absolute;
    top:20px; right:20px;
    padding: 3px 10px;
    background-color:silver;
    cursor:pointer;
}
.modal {
    padding:5px 0;
    border-radius: 3px;
    border:1px solid #000;
    background-color: azure;
}

</style>