<template>
<div @click="closePopUp" class="popup">
  <div class="popup__overlay"></div>
  <div class="popup__content-modal">
    <iframe class="popup__iframe"  :src="`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=0`" allowfullscreen allow="autoplay"></iframe>
    <button  class="popup__close-button"></button>
  </div>
</div>
</template>

<script setup lang="ts">
defineProps<{
  VIDEO_ID:string;
}>();
const emit = defineEmits<{
  (e: 'close'): void;
}>();
const closePopUp = (event):void=>{
  if(event.target.classList.contains('popup__overlay') || event.target.classList.contains('popup__close-button')){
    emit('close');
  }
}
</script>

<style scoped>
.popup{
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 11, 11, 0.7);
  z-index: 999;
}
.popup__overlay{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.popup__content-modal{
  position: relative;
  width: 100%;
  max-width: 960px;
  height: 560px;
  background-color: #9CA3AF;
}
.popup__iframe{
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
}
.popup__close-button{
  position: absolute;
  top: 0;
  right: -60px;
  width: 48px;
  height: 48px;
  border: none;
  outline: none;
  border-radius: 50%;
  background-color: #fff;
}
.popup__close-button:before,
.popup__close-button:after{
  content: '';
  display: block;
  width: 20px;
  height: 3px;
  background-color: #000;
  position: absolute;
  top: 50%;
  left: 50%;
}
.popup__close-button:before {
  transform: translate(-50%, -50%) rotate(-45deg);
}
.popup__close-button:after {
  transform: translate(-50%, -50%) rotate(45deg);
}
@media(max-width: 1141px){
  .popup__close-button{
    width: 32px;
    height: 32px;
    top: -15px;
    right: -15px;
  }
  .popup {
    padding: 0 22px;
  }
}
@media (max-width: 767px) {
  .popup {
    padding: 0;
  }
  .popup__close-button{
    top: 8px;
    right: 8px;
  }
  .popup__content-modal{
    height: 368px;
  }
}
</style>
