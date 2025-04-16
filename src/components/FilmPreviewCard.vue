<template>
  <li class="tom-films__item">
    <button v-if="deleteFilm" @click="removeFilm" :data-id="film?.id" class="tom-films__item-delete"></button>
    <span v-if="index" class="tom-films__counter">{{ index }}</span>
    <router-link class="tom-films__link" :to="genre ? {name:'filmByGenre', params:{genre, id:film.id}} : {name:'film',params: {id: film.id}}">
      <img class="tom-films__img" :src="film.posterUrl" :alt="film.title">
    </router-link>
  </li>
</template>

<script setup lang="ts">
import type {IFilm} from "../types/film.ts";
import {removeFavoriteFilms} from "../../api/authToServer.ts";

defineProps<{
  film: IFilm;
  index: number;
  genre?:string;
  deleteFilm:boolean;
}>();
const emit = defineEmits<{
  (e: 'update:reloadFavoritesFilm', value: boolean): void;
}>();
const removeFilm = async (event:Event): Promise<any>=>{
  const idFilm = Number(event.currentTarget.getAttribute('data-id'));
  const res = await removeFavoriteFilms(idFilm);
  console.log(res)
  emit('update:reloadFavoritesFilm', true);
}
</script>

<style scoped>
.tom-films__item {
  position: relative;
  box-shadow: 0 0 80px 0 rgba(255, 255, 255, 0.33);
  border-radius: 16px;
  height: 336px;
}
.tom-films__counter {
  position: absolute;
  top: -15px;
  left: -15px;
  padding: 8px 24px;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  text-align: center;
  border-radius: 50px;
  color: rgb(155 99 1);
  background-color: #fff;
}
.tom-films__link {
  display: block;
  border-radius: 16px;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.tom-films__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.tom-films__item-delete{
  position: absolute;
  top: -20px;
  right: -20px;
  width: 40px;
  height: 40px;
  gap: 10px;
  border-radius: 30px;
  opacity: 0;
  border: none;
  outline: none;
  background-color: #fff;
  pointer-events: none;
  transition: opacity .3s ease-in-out;
}
.tom-films__item-delete:before,
.tom-films__item-delete:after{
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  right: 50%;
  width: 19px;
  height: 2px;
  background-color: #000;
}
.tom-films__item-delete:before{
  transform: translate(50%,50%) rotate(-45deg);
}
.tom-films__item-delete:after{
  transform: translate(50%,50%) rotate(45deg);
}
.tom-films__item:hover .tom-films__item-delete{
  opacity: 1;
  pointer-events: all;
}
@media (max-width: 991px){
  .tom-films__item{
    flex-shrink: 0;
    box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.33);
  }
  .tom-films__item-delete{
    opacity: 1;
    pointer-events: auto;
  }
}
@media (max-width: 479px) {
  .genre-inner__list .tom-films__item {
    height: 520px;
  }
}
</style>
