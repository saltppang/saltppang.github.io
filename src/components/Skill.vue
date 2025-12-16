<script setup>
    import { skillText } from '../constants';
</script>

<template>
    <section id="skill">
        <div class="skill__inner">
            <h2 class="skill__title">Skill</h2>
            <div class="skill__desc">
                <div class="skill__wrap" v-for="(section, index) in skillText" :key="index">
                    <h3>{{ section.title }}</h3>
                    <div class="detail">
                        <!-- 설명을 반복 -->
                        <p v-for="(desc, index) in section.description" :key="index">{{ desc }}</p>
                    </div>
                    <div class="logo">
                        <!-- 로고를 반복 -->
                        <img v-for="(logo, logoIndex) in section.logos" :key="logoIndex" 
                        :src="logo.src" :alt="logo.alt" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template> 

<style lang="scss">
    .contact__inner {
        padding-top:0;
    }
    .skill__inner {
        padding: 16px;
        display:flex;
        justify-content: space-between;

        @media (max-width:800px){
            flex-direction: column;
        }

        .skill__title {
            position:sticky;
            top:70px;
            left:0;
            width:38%;
            height:4vw;
            font-size:1.8rem;
            line-height:1.6;
            font-family: var(--mainEng-font-bold);
            text-transform: uppercase;
            color:var(--black100);
            border-bottom:0.3vw solid var(--black100);

            @media (max-width:800px){
                top:68px;
                margin-bottom:2vw;
                width:100%;
                height:auto;
                font-size:1.5rem;
                background-color:var(--mainBg-color);
                z-index: 1;
            }
        }
        
        .skill__desc {
            width: calc(100% - 42%);
            @media (max-width:800px){
                width:100%;
            }
            
            h3 {
                padding-bottom: 0.5rem;
                font-size:1.8rem;
                font-family: var(--mainEng-font);

                @media (max-width:800px){
                    font-size:1.5rem;
                }
            }
            .detail {
                margin-bottom:2vh;
                p {
                    position:relative;
                    width: calc(100% - 2.5vw);
                    margin-bottom:1vh;
                    left:2.5vw;
                    text-indent:0;
                    font-size:0.9rem;
                    font-family: var(--mainKor-font);
                    word-break: keep-all;
                    &::before {
                        position:absolute;
                        top:1.5vh;
                        left:-2.5vw;
                        display:block;
                        width:1.5vw;
                        height:1px;
                        background-color:var(--black300);
                        box-sizing:border-box;
                        content:'';
                    }
                    @media (max-width:800px){
                        font-size: 1rem;
                    }
                }
            }
            .logo {
                display: flex; 
                img {
                    padding:0.5rem;
                    width: 3rem;
                    height: 3rem;
                    border:1px solid var(--black400);
                    border-radius: 0.2rem;
                    &+img {
                        margin-left:0.5rem;
                    }
                }
            }
        }
        .skill__wrap {
            +.skill__wrap {
                margin-top:2rem;
            }
            &:nth-child(1) {
                margin-top: 3rem;
            }
        }
    }
</style>