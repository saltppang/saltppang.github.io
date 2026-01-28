<script setup>
    import { contactText } from "../constants";
    import { contactInfo } from "../constants";
</script>

<template>
    <section id="contact">
        <div class="contact__inner">
            <h2 class="contact__title">Contact</h2>
            <div class="contact__wrap">
                <div class="left">
                    <h3>역량 있는 웹 퍼블리셔를 찾고 계시나요?</h3>
                    <p>Contact with me! 🤙</p>
                    <ul>
                        <li v-for="(contact, key) in contactText" :key="key">
                            <!-- 링크가 있는 경우 -->
                            <a v-if="contact.link" :href="contact.link" target="_blank" rel="noopener noreferrer">
                                {{ contact.title }}
                            </a>
                             <!-- 링크가 없는 경우 -->
                             <span v-else>
                                {{ contact.title }}
                            </span>

                            <em>{{ contact.desc }}</em>

                        </li>
                    </ul>
                </div>
                
                <div class="right">
                    <div class="title">
                        포트폴리오 소개
                    </div>
                    <div>
                        <p class="desc" v-for="(contInfo, info) in contactInfo" :key="info">
                            {{ contInfo.text }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template> 

<style lang="scss">
#contact {
    height: 100vh;
     @media (max-width: 800px){ 
        height: 100%;
    }
        
}
.contact__inner {
    width: 100%;
    height: 100%;
    padding: 16px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    flex-direction: column;

    @media (max-width: 800px){ 
        justify-content: flex-start;
    }

    .contact__title {
        position: sticky;
        width: 100%;
        height: 4vw;
        top: 70px;
        font-size: 1.8rem;
        line-height: 1.6;
        font-family: var(--mainEng-font-bold);
        text-transform: uppercase;
        color: var(--black100);
        border-bottom: 0.3vw solid var(--black100);
        margin-bottom: 20px;

        @media (max-width: 800px){ 
            margin-bottom: 2vw;
            top: 68px;
            height: auto;
            font-size: 1.5rem;
            background-color: var(--white);
            z-index: 1;
        }
    }
    
    .contact__wrap {
        position: sticky;
        display:flex;
        justify-content:space-between;
        margin: 0;
        top:140px;
        width:100%;
        height: 65vh;

        @media (max-width:800px){
            flex-direction: column;
            height: 100%;
        }
        
        .left {
            width: 50%;

            @media (max-width: 800px){
                width: 100%;
            }

            h3 {
                font-family: 'MaruBuriBold';
                font-size: 1rem;
                padding: 2rem 1rem;
            }
            p {
                padding: 1rem;
                font-family: var(--mainEng-font-bold);
                font-size:1rem;
                @media (max-width: 800px){
                    padding-top: 0;
                } 
            }
            ul {
                border-top: 1px solid var(--black);
                li {
                    border-bottom: 1px solid var(--black);

                    a {
                        padding: 1rem;
                        font-size: 0.9rem;
                        font-family: var(--mainEng-font-bold);
                        display: inline-block;
                        text-transform: uppercase;
                    }
                    span {
                        padding: 1rem;
                        font-size: 0.9rem;
                        font-family: var(--mainEng-font-bold);
                        display: inline-block;
                        text-transform: uppercase;
                    }
                    em {
                        font-family: var(--mainEng-font);
                        font-size: 0.9rem;
                        padding-left: 10px;
                        opacity: 0;
                        transition: all 0.5s;
                    }
                    @media (min-width: 800px){
                        &:hover {
                            em{
                                padding-left: 20px;
                                border-color: transparent;  
                                opacity: 1;
                            }
                        }
                    }    
                    @media (max-width: 800px){
                        em {
                            opacity: 1;
                        }
                    }    
                }
            }
        }

        .right {
            width: 45%;
            @media (max-width: 800px){
                width: 100%;
            }

            .title {
                border-bottom: 1px solid var(--black);
                padding: 2rem 1rem;
                font-family: 'MaruBuriBold';
                font-size:1rem;
            }
            .desc {
                font-size: 0.8rem;
                padding: 1rem;
                word-break: keep-all;
                &:nth-child(1) {
                    padding-top: 2rem;
                }
                @media (max-width: 800px){
                    font-size: 0.9rem;
                    &:nth-last-child(1) {
                        padding-top: 2rem;
                    }
                }
            }
        }

    }

}
</style>