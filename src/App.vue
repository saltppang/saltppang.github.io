<script setup>
import { RouterView } from "vue-router";
import Skip from "@/components/Skip.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div class="app">
    <Skip />
    <Header />
    <main id="main" role="main">
      <RouterView :key="$route.name" />
    </main>
    <Footer />
  </div>
</template>

<script>
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis;

export default {
  mounted() {
    if (!lenis) {
      this.scrollAnimation();
    }
  },
  methods: {
    scrollAnimation() {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        direction: "vertical",
        gestureDirection: "vertical",
      });

      function raf(time) {
        lenis.raf(time);
        ScrollTrigger.update(); // ✅ Lenis와 ScrollTrigger 연결 핵심
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    },
  },
};
</script>