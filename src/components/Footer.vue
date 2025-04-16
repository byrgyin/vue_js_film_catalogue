<template>
<footer class="footer">
  <div class="container footer__container">
    <ul class="footer__list">
      <SocLink
      v-for="(item,index) in arraySocLink"
      :key="index"
      :alt="item.alt"
      :link="item.link"
      :img="item.img"
      />
    </ul>
  </div>
</footer>
</template>

<script setup lang="ts">
import SocLink from "./SocLink.vue";

interface arrayLink{
  alt:string;
  link:string;
  img:string;
}
const arraySocLink: ArrayLink[] = [
  {
    alt:'vk',
    link:'https://www.google.com/',
    img:'/vk.svg'
  },
  {
    alt:'youtube',
    link:'https://www.google.com/',
    img:'/youtube.svg'
  },
  {
    alt:'ok',
    link:'https://www.google.com/',
    img:'/ok.svg'
  },
  {
    alt:'telegram',
    link:'https://www.google.com/',
    img:'/tg.svg'
  },
]
</script>

<style scoped>
.footer{
  padding: 40px 0;
}
.footer__container{
  display: flex;
  justify-content: flex-end;
}
.footer__list{
  display: flex;
  align-items: center;
  gap: 40px;
}
@media (max-width: 600px) {
  .footer{
    padding: 24px 0;
  }
  .footer__container{
    justify-content: flex-start;
  }
  .footer__list{
    gap: 24px;
  }
}
</style>
