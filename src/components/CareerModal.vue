<template>
  <div class="modal-root">
    <teleport to="body">
      <div class="black-bg" v-show="modal" @click="closeModal">
        <div class="white-bg" @click.stop ref="modalContent" tabindex="-1" > 
          <button class="close" @click="closeModal">X</button>
          <div class="modal-scroll" @wheel.stop @touchmove.stop>
            <img 
              v-for="(item, index) in careerData" 
              :key="index" 
              :src="item.image" 
              alt="경력기술서 이미지"
            />
          </div>
        </div>
      </div>
    </teleport>
   </div> 
</template>

<script>
import { ref, watch, nextTick } from 'vue';

export default {
  name: 'CareerModal',
  props: {
    modal: Boolean,
    careerData: Array,
    temp: Number,
    triggerEl: Object
  },
  emits: ['update:modal'],
  setup(props, { emit }) {
    const modalContent = ref(null);
    const careerTrigger = ref(null);

    const closeModal = () => {
      emit('update:modal', false);
    };

    // 모달 열리면 body 스크롤 막기
    watch(() => props.modal, (newVal) => {
      document.body.style.overflow = newVal ? 'hidden' : '';
      if(!newVal) {
        console.log("닫힐 때 triggerEl:", props.triggerEl);
        console.log("닫힐 때 triggerEl.value:", props.triggerEl?.value);
      }

      if(newVal) {
        nextTick(() => {
          modalContent.value?.focus();
          console.log("현재포커스:", document.activeElement);
        });
      } else {
        nextTick(() => {
          props.triggerEl?.value?.focus?.();
        });
      }
    });

    return { modalContent, closeModal, careerTrigger };
  }
  
};
</script>

<style scoped>
.white-bg {
  position: absolute;
  margin: 4vw 2vw;
  height: 85vh;
  width: 80vw;
  left: 50%;
  transform: translate(-50%);
  background: white;
  border-radius: 8px;
  padding: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  position: absolute;
  @media (max-width: 1250px) {
    margin: 6vw 2vw 2vw 2vw;
    height: 80vh;
    width: 80vw;
  }
  @media (max-width: 1000px) {
    margin: 9vw 2vw 2vw 2vw;
  }
  @media (max-width: 640px) {
    width: 90vw;
    margin: 12vw 0 2vw 0;
  }
   @media (max-width: 480px) {
    margin: 15vw 0 2vw 0;
  }
   
}

.modal-scroll {
  flex: 1; /* 남은 공간 다 차지 */
  overflow-y: auto;
}

.modal-scroll img {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  position: fixed;
  top: 0; left: 0;
  z-index: 9999;
}
</style>
