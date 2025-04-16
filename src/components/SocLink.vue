<template>
<li class="footer__list-item">
  <a class="footer__soclink" :href="link" target="_blank">
    <img class="footer__img" :src="img" :alt="alt">
  </a>
</li>
</template>

<script setup lang="ts">
defineProps<{
  alt: string;
  link: string;
  img: string;
}>();
</script>

<style scoped>
.footer__list-item{
  display: block;
  width: 36px;
  height: 36px;
  border: 1px solid #fff;
  border-radius: 8px;
}
.footer__soclink{
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer__soclink{
  cursor: pointer;
  width: 100%;
  height: 100%;
}
.footer__img{
  width: 19px;
  height: 19px;
  object-fit: contain;
}
</style>
