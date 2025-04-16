<template>
  <form @click="disableSearch" @submit.prevent="cancelStandadrForm" :class="['header__form-search',{'header__form-search--active':isOpenForm}]">
    <input v-model="searchQuery" @input="getArrayFilms" class="form-search__input" type="search" placeholder="Search">
    <button type="submit" class="form-search__button"><img class="form-search__icon" src="/lupe.svg" alt="lupe"></button>
    <ul v-if="searchResult?.length" class="form-search__list">
      <li class="form-search__item" v-for="(film,index) in searchResult" :key="index">
        <router-link @click="disableSearch" :to="{name:'film', params:{id:film.id}}" class="form-search__link">
          <img loading="eager" class="form-search__img" :src="film?.backdropUrl" :alt="film?.title">
          <ul class="form-search__short-info">
            <li v-if="calculateRatingFilm(film.tmdbRating)?.num"  class="form-search__rating" :data-color="calculateRatingFilm(film.tmdbRating)?.color"  :style="{'--rating-color': calculateRatingFilm(film.tmdbRating)?.color}">
              <img src="/rating.svg" alt="rating">{{calculateRatingFilm(film.tmdbRating)?.num}}</li>
            <li class="form-search__year">{{ film?.releaseYear }}</li>
            <li class="form-search__genre">{{ film?.genres[0] }}</li>
            <li class="form-search__duration">{{calculateTime(film.runtime)}}</li>
          </ul>
          <span class="form-search__title">{{film?.title}}</span>
        </router-link>
      </li>
    </ul>
  </form>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import type {IFilm} from "../types/film.ts";
import {fetchSearchResultsFilms} from "../../api/fetchFilms.ts";
import {calculateTime} from "../../api/calculateTime.ts";
import {calculateRatingFilm} from "../../api/calculateRatingFilm.ts";

const props = defineProps<{
  isOpenForm: boolean;
}>();
const emit = defineEmits<{
  (e:'update:isOpenForm', value: boolean):void
}>()

const searchQuery = ref<string>('');
const searchResult = ref<IFilm[]>();
let runtime = ref<string>('');
let ratingFilm = ref<string>('');
const getArrayFilms = async ():Promise<void>=>{
  if(searchQuery.value.trim() === ''){
    searchResult.value = [];
    return;
  }
  const res = await fetchSearchResultsFilms(searchQuery.value);
  searchResult.value = res;
  console.log(searchResult.value)
}
const cancelStandadrForm = (event:Event):void=>{
  event.preventDefault();
}
const disableSearch = (event:Event):void=>{
  if(!event.target.closest('.form-search__input')){
    emit('update:isOpenForm',false);
    searchResult.value = [];
  }
}
</script>

<style scoped>
.header__form-search{
  width: 100%;
  max-width: 655px;
  position: relative;
}
.form-search__list{
  position: absolute;
  top: 120%;
  right: 0;
  width: 80%;
  border-radius: 8px;
  padding: 8px;
  background: rgba(57, 59, 60, 1);
}
.form-search__short-info{
  display: flex;
  align-items: center;
  gap: 16px;
}
.form-search__short-info li{
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}
.form-search__img{
  display: block;
  width: 40px;
  height: 52px;
  object-fit: cover;
}
.form-search__item{
  padding: 20px 8px;
  border: 1px solid transparent;
  border-radius: 6px;
  transition: border-color ease .3s;
}
.form-search__item:hover{
  border: 1px solid rgba(255, 255, 255, 0.5);
}
.form-search__button{
  position: absolute;
  top: 12px;
  left: 16px;
  border: none;
  outline: none;
  background-color: transparent;
  padding: 0;
  margin: 0;
  z-index: 9;
}
.form-search__link{
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-gap: 0 16px;
  align-items: flex-start;
  color: rgba(255, 255, 255, 0.87);
}
.form-search__title{
  grid-column: 2/3;
  margin-top: -20px;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}
.form-search__icon{
  width: 24px;
  height: 24px;
}
.form-search__input{
  padding: 12px 52px;
  width: 100%;
  border: none;
  border-radius: 8px;
  background: rgba(57, 59, 60, 1);
  transition: box-shadow ease-in-out .3s;
}
.form-search__rating{
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  font-weight: 700 !important;
  background: var(--rating-color, rgba(48, 142, 33, 1));
  border-radius: 16px;
}
.form-search__input::placeholder,
.form-search__input{
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: rgba(255, 255, 255, 0.5);
}
.form-search__input:focus-visible,
.form-search__input:focus-within,
.form-search__input:focus{
  outline: none;
  box-shadow: 1px 1px 20px 0 rgba(255, 255, 255, 0.3);
}
.form-search__input::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  color: white;
  font-size: 10px;
  cursor: pointer;
  clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
}
.form-search__input::-moz-search-cancel-button{
  width: 20px;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  cursor: pointer;
}
@media (max-width: 1279px){
  .header__form-search{
    position: absolute;
    top: 16px;
    left: 20px;
    z-index: 3;
    max-width: calc(100% - 40px);
    transition: transform ease-in-out .3s;
    transform: translateY(-150%);
  }
  .header__form-search:before{
    content: '';
    display: block;
    position: fixed;
    top: -16px;
    left: -20px;
    bottom: 0;
    width: 100vw;
    height: calc(100vh + 50px);
    background-color: rgb(0 0 0 / 67%);
    clip-path: circle(0% at 50% 50%);
    transition: all .5s ease-in-out;
    transform: scale(0);
  }
  .header__form-search--active{
    transform: translateY(0);
  }
  .header__form-search--active:before{
    transform: scale(1);
    clip-path: circle(70.7% at 50% 50%);
  }
  .form-search__input{
    position: relative;
    z-index: 9;
  }
  .form-search__list{
    width: 100%;
    z-index: 9;
  }
}
@media (max-width: 767px) {
  .form-search__list{
    display: flex;
    overflow: auto;
  }
  .form-search__link{
    grid-template-columns: 1fr;
  }
  .form-search__title{
    grid-column: auto;
    margin-top: 0;
  }
  .form-search__img{
    width: 158px;
    height: 206px;
    margin-bottom: 16px;
  }
  .form-search__short-info{
    flex-wrap: wrap;
  }
  .form-search__short-info{
    gap: 6px 12px;
  }
  .form-search__rating.form-search__rating{
    font-size: 12px;
  }
}
</style>
