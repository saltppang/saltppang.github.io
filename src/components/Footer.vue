<script setup>

</script>

<template>
    <footer id="footer" role="fontentinfo">
        <div class="footer__inner">
            <div class="footer__right">
                2025 이 사이트는 뷰를 이용하여 제작하였습니다.
            </div>
        </div>
    </footer>
</template>

<style lang="scss">
    #footer {
        border: 1px solid var( --black400);
        font-family: var(--mainKor-font);
    }
    .footer__inner {
        padding:1.5rem;
        
        .footer__right {
            text-align:center;
            text-transform: uppercase;
            font-size:12px;
            @media (max-width:800px){
                margin-bottom:0;
                font-size:12px;
            }
        }
    }
</style>