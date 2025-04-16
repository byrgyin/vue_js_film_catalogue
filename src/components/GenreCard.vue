<template>
  <li class="genres__item">
    <img class="genres__item-img" :src="imagePath" :alt="genre">
    <router-link class="genres__item-link" :to="{name:'genre', params:{genre}}">{{ genre }}</router-link>
  </li>
</template>
<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
  genre: string;
}>();
const imagePath = computed(() => {
  return `/${props.genre}.jpg`;
});
</script>

<style scoped>
.genres__item{
  position: relative;
  height: 304px;
  border-radius: 24px;
  background-color: #000;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  text-align: center;
  text-transform: capitalize;
  overflow: hidden;
  box-shadow: 0 0 57px -16px #fff;
}
.genres__item-link{
  display: block;
  padding: 22px 0;
}
.genres__item-link:before{
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.genres__item-img{
  display: block;
  width: 100%;
  height: 220px;
}
</style>
