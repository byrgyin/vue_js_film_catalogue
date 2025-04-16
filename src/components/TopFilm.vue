<template>
  <section class="tom-films">
    <div class="container">
      <h2 class="tom-films__title">Топ 10 Фильмов</h2>
      <ul class="tom-films__list">
        <FilmPreviewCard
        v-for="(film,index) in filmArray"
        :key="index"
        :index="index + 1"
        :film="film"
        />
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import FilmPreviewCard from "./FilmPreviewCard.vue";
import {fetchTopFilms} from "../../api/fetchFilms.ts";
import type {IFilm} from "../types/film.ts";
import {ref} from "vue";

const filmArray = ref<IFilm[]>();
const loadTopFilms = async ()=>{
  const res = await fetchTopFilms();
  filmArray.value = res;
}
loadTopFilms();
</script>

<style scoped>
.tom-films{
  padding: 40px 0 120px;
}
.tom-films__title{
  margin-bottom: 64px;
}
.tom-films__list{
  display: grid;
  grid-template-columns: repeat(5,1fr);
  grid-gap: 64px 40px;
}
@media (max-width: 1024px) {
  .tom-films__list {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 40px;
  }
}
@media (max-width: 767px) {
  .tom-films {
    padding: 40px 0 60px;
  }
  .tom-films__title{
    margin: 0;
  }
  .tom-films__list {
    display: flex;
    overflow: auto;
    margin: 0 -20px;
    padding: 70px 20px 70px 20px;
  }
  .tom-films__item{
    width: 224px;
    height: 336px;
    flex-shrink: 0;
  }
}
@media (max-width: 600px) {
  .tom-films__title{
    margin-bottom: 40px;
  }
  .tom-films__list {
    display: flex;
    overflow: auto;
    margin: 0 -20px;
    padding: 40px 20px 16px 20px;
  }
  .tom-films__item {
    box-shadow: 0 0 18px 0 rgba(255, 255, 255, 0.33);
  }
  .tom-films {
    padding: 40px 0 16px;
  }
}
</style>
