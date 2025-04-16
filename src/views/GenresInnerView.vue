<template>
  <section class="genre-inner">
    <div :class="['container',{'hero__container--loading':!loading}]">
      <h1 class="genre-inner__title">
        <router-link class="genre-inner__link" :to="{name:'genres'}">{{genre}}</router-link>
      </h1>
      <ul class="genre-inner__list">
        <FilmPreviewCard
          v-for="(film,index) in filmArray"
          :key="index"
          :film="film"
          :genre="genre"
        />
      </ul>
      <button v-if="showBtnLoadMore" @click="loadMoreFilms(genre)" class="genre-inner__loadmore">Show more</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed} from "vue";
import {ref} from "vue";
import {fetchGenresFilms} from "../../api/fetchFilms.ts";
import {IFilm} from "../types/film.ts";
import FilmPreviewCard from "../components/FilmPreviewCard.vue";


const route = useRoute();
const genre = computed(()=> route.params.genre as string);
let loading = ref<boolean>(false);
let showBtnLoadMore = ref<boolean>(true)
let countPage:number = 1;
const loadFilms = async (genre:string)=>{
  const res = await fetchGenresFilms(genre,countPage);
  filmArray.value = res
  loading.value = true;
}
const filmArray = ref<IFilm[]>();
const loadMoreFilms = async (genre:string)=>{
  countPage++
  const res = await fetchGenresFilms(genre,countPage);
  if(res.length === 0){
    showBtnLoadMore.value = false
  }
  filmArray.value.push(...res);
  loading.value = true;
}
loadFilms(genre.value);
</script>

<style scoped>
.genre-inner{
  padding-top: 160px;
}
.genre-inner__title{
  margin: 0 0 64px;
  text-transform: capitalize;
}
.genre-inner__link{
  display: flex;
  align-items: center;
  gap: 16px;
}
.genre-inner__link:before{
  content:'';
  display: block;
  width: 14px;
  height: 14px;
  border-left: 4px solid #fff;
  border-bottom: 4px solid #fff;
  transform: rotate(45deg);
}
.genre-inner__link:hover:before{
  border-left: 4px solid rgb(255 163 1);
  border-bottom: 4px solid rgb(255 163 1);
}
.genre-inner__list{
  display: grid;
  grid-template-columns: repeat(5,1fr);
  grid-gap: 64px 40px;
  margin: 0 0 64px;
}
.genre-inner__loadmore{
  display: block;
  margin: 0 auto;
  padding: 16px 48px;
  width: fit-content;
  color: #fff;
  background: rgba(103, 165, 235, 1);
  border: none;
  outline: none;
  border-radius: 28px;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  text-align: center;
  white-space: nowrap;
  transition: background-color ease .3s;
}
@media (max-width: 991px) {
  .genre-inner__list {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 40px;
  }
}
@media (max-width: 650px) {
  .genre-inner__list {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 24px;
  }
}
@media (max-width: 479px) {
  .genre-inner__list {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
