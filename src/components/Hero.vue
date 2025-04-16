<template>
  <section class="hero">
    <div :class="['container','hero__container',{'hero__container--loading':!loading}] ">
      <div class="hero__content">
        <ul class="hero__short-info">
          <li class="short-info__rating" :data-color="ratingFilm.color" :style="{'--rating-color': ratingFilm.color}">
            <img src="/rating.svg" alt="rating">{{ ratingFilm.num }}</li>
          <li class="short-info__year">{{ film?.releaseYear }}</li>
          <li class="short-info__genre">{{ film?.genres[0] }}</li>
          <li class="short-info__duration">{{runtime}}</li>
        </ul>
        <h1 class="hero__title">{{ film?.title }}</h1>
        <p class="hero__description">{{ film?.plot }}</p>
        <ul class="hero__list-buttons">
          <li class="hero__item-button">
            <button @click="callPopUp" :data-urlvideo="film?.trailerYouTubeId" class="hero__button">Trailer</button>
          </li>
          <li v-if="!currentFilmPage && film" class="hero__item-button">
            <router-link :to="{name:'film', params:{id:film.id}}" class="hero__button">About Film</router-link>
          </li>
          <li v-if="film" class="hero__item-button">
            <button v-if="useAuthStore().isAuthorized" @click="toggleFilm" :data-id-film="film.id" :data-addfilm="!!addedFilm" class="hero__button-circle">
              <img v-if="!addedFilm" src="/wisthlist.svg" alt="update film">
              <img v-else src="/wisthlist-added.svg" alt="update film">
            </button>
            <button v-else :data-id-film="film.id" @click="openFormModal" :data-addfilm="!!addedFilm" class="hero__button-circle">
              <img v-if="!addedFilm" src="/wisthlist.svg" alt="update film">
              <img v-else src="/wisthlist-added.svg" alt="update film">
            </button>

          </li>
          <li v-if="!currentFilmPage" class="hero__item-button">
            <button class="hero__button-circle" @click="loadFilmRandom"><img src="/update.svg" alt="update film"></button>
          </li>
        </ul>
      </div>
      <img class="hero__img" :src="film?.posterUrl" :alt="film?.title">
    </div>
    <div v-if="currentFilmPage && film" class="container hero__container-about">
      <h2>About Film</h2>
      <ul class="hero__list-attr">
        <li class="hero__item-attr">
          <span class="hero__item-key">Language</span>
          <span class="hero__item-value">{{film.language}}</span>
        </li>
        <li v-if="budget" class="hero__item-attr">
          <span class="hero__item-key">Budget</span>
          <span class="hero__item-value">$ {{budget}}</span>
        </li>
        <li v-if="revenue" class="hero__item-attr">
          <span class="hero__item-key">Revenue</span>
          <span class="hero__item-value">$ {{revenue}}</span>
        </li>
        <li v-if="film.director" class="hero__item-attr">
          <span class="hero__item-key">Director</span>
          <span class="hero__item-value">{{film.director}}</span>
        </li>
        <li v-if="film.production" class="hero__item-attr">
          <span class="hero__item-key">Production</span>
          <span class="hero__item-value">{{film.production}}</span>
        </li>
        <li  v-if="film.awardsSummary" class="hero__item-attr">
          <span class="hero__item-key">Awards Summary</span>
          <span class="hero__item-value">{{film.awardsSummary}}</span>
        </li>
      </ul>
    </div>
  </section>
  <PopUpVideo v-if="showPopUp" :VIDEO_ID="catchIdVideo" @close="showPopUp=false"/>
  <LogRegistrationForm
    v-if="showLogRegForm"
    :showLogRegForm="showLogRegForm"
    @update:showLogRegForm="closeFormModal"
    @update:imLogIn="updateIsAuthorized "
  />
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {computed, ref} from "vue";
import {fetchRandomFilm,fetchFilm} from "../../api/fetchFilms.ts";
import type {IFilm} from "../types/film.ts";
import type {IUser} from "../types/user.ts";
import {calculateTime} from "../../api/calculateTime.ts";
import {calculateRatingFilm} from "../../api/calculateRatingFilm.ts";
import PopUpVideo from "./PopUpVideo.vue";
import formatMoney from "../../api/formatMoney.ts";
import {useAuthStore} from "../stores/authStores.ts";
import {addFavoriteFilms, getFavoriteFilms, profileEvent, removeFavoriteFilms} from "../../api/authToServer.ts";
import LogRegistrationForm from "./LogRegistrationForm.vue";


const film = ref<IFilm>();
let User = ref<IUser>();
const filmsFavorite = ref<IFilm[]>()
let runtime = ref<string>('');
let ratingFilm = ref<string>('')
let loading = ref<boolean>(false);
let showPopUp = ref<boolean>(false);
let catchIdVideo = ref<string>('');
let budget = ref<string>('');
let revenue = ref<string>('');
let addedFilm = ref<boolean>(false);
let showLogRegForm = ref<boolean>(false);
const loadFilmRandom = async ():Promise<void>=>{
  const res = await fetchRandomFilm();
  film.value = res;
  runtime.value = calculateTime(film.value.runtime);
  ratingFilm.value = calculateRatingFilm(film.value.tmdbRating);
  loading.value = true;
  if(useAuthStore().isAuthorized){
    await getAllFavoriteFilms(film?.value.id)
  }
}
const getAllFavoriteFilms = async(id:number):Promise<void>=>{
  filmsFavorite.value = await getFavoriteFilms();
  filmsFavorite.value?.forEach(item=>{
    if(Number(item.id) === Number(id)){
      addedFilm.value = true;
    }
  })
}
const loadFilm = async (movieId:number):Promise<void>=>{
  const res = await fetchFilm(movieId);
  film.value = res;
  runtime.value = calculateTime(film.value.runtime);
  ratingFilm.value = calculateRatingFilm(film.value.tmdbRating);
  budget.value = formatMoney(film.value.budget);
  revenue.value = formatMoney(film.value.revenue);
  loading.value = true;
  if(useAuthStore().isAuthorized){
    await getAllFavoriteFilms(film.value.id)
  }
}
const callPopUp = (event):void=>{
  const IdYouTube:string = event.target.getAttribute('data-urlvideo');
  showPopUp.value = true;
  catchIdVideo.value = IdYouTube;
}
const toggleFilm = async (event:Event): Promise<any>=>{
  const filmId = {
    id:event.currentTarget.getAttribute('data-id-film')
  },
  movieAdded = event.currentTarget.getAttribute('data-addfilm') === "true";
  if(!movieAdded){
    const res = await addFavoriteFilms(filmId);
    addedFilm.value = true;
  } else {
    const res = await removeFavoriteFilms(filmId.id);
    addedFilm.value = false;
  }
}
const openFormModal = ():void=>{
  showLogRegForm.value = true;
}
const closeFormModal = ():void=>{
  showLogRegForm.value = false;
}

const updateIsAuthorized = async (value: boolean): Promise<void> => {
  useAuthStore().isAuthorized = value;
  useAuthStore().User = await profileEvent();
}

const route = useRoute(),
  currentFilmPage:number = route.params?.id;

if(!currentFilmPage){
  loadFilmRandom();
} else {
  loadFilm(currentFilmPage)
}

</script>

<style scoped>
.hero{
  padding-top: 123px;
}
.hero__container{
  display: grid;
  grid-template-columns: repeat(2,1fr);
  align-items: center;
  grid-gap: 24px;
  border-radius: 16px;
  overflow: hidden;
}

.hero__short-info{
  display: flex;
  align-items: center;
  gap: 16px;
}
.hero__short-info li{
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}
.hero__title{
  margin-bottom: 16px;
}
.hero__description{
  margin-top: 0;
  margin-bottom: 60px;
}
.short-info__rating{
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  background: var(--rating-color, rgba(48, 142, 33, 1));
  border-radius: 16px;
}
.hero__list-buttons{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
}
.hero__button{
  display: block;
  padding: 16px 48px;
  color: #fff;
  background: rgba(57, 59, 60, 1);
  border: 1px solid rgba(0, 0, 0, 0.4);
  outline: none;
  border-radius: 28px;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  white-space: nowrap;
  transition: background-color ease .3s;
}
.hero__button-circle{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 68px;
  height: 56px;
  padding: 19px 24px;
  color: #fff;
  background: rgba(57, 59, 60, 1);
  border: 1px solid rgba(0, 0, 0, 0.4);
  outline: none;
  border-radius: 50%;
  transition: background-color ease .3s;
}
.hero__item-button:first-child .hero__button{
  background: rgba(103, 165, 235, 1);
}
.hero__button:hover,
.hero__button-circle:hover{
  background: rgba(103, 165, 235, 1);
}
.hero__img{
  display: block;
  width: 100%;
  height: 816px;
  object-fit: cover;
  border-radius: 16px;
}
.hero__list-attr{
  width: 100%;
  max-width: 600px;
}
.hero__item-attr{
  display: flex;
  justify-content: space-between;
  gap: 8px;
  white-space: nowrap;
}
.hero__item-attr:not(:last-child){
  margin-bottom: 24px;
}
.hero__item-key{
  display: flex;
  align-items: baseline;
  gap: 8px;
  width: 100%;
}
.hero__item-value{
  text-transform: capitalize;
}
.hero__item-key:after{
  content: '';
  display: block;
  width: 100%;
  border-bottom: 1px dashed #fff;
}
@media (max-width: 1024px) {
  .hero__container{
    grid-template-columns: repeat(1, 1fr);
  }
  .hero__img{
    grid-row: 1;
  }
  .hero__img{
    height: 600px;
    max-width: 400px;
  }
}
@media (max-width: 600px) {
  .hero{
    padding-top: 82px;
  }
  .hero__img{
    height: 500px;
  }
  .hero__list-buttons{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    text-align: -webkit-center;
  }
  .hero__item-button:first-child{
    grid-row: 1;
    grid-column: 1/5;
  }
  .hero__item-button:first-child .hero__button{
    width: 100%;
    text-align: center;
  }
  .hero__item-button:nth-child(2){
    grid-column: 1/3;
  }
  .hero__button{
    padding: 16px 20px;
  }
  .hero__title{
    margin-bottom: 12px;
  }
  .hero__description{
    margin-bottom: 32px;
  }
  .hero__short-info{
    flex-wrap: wrap;
  }
  .hero__item-key:after{
    display: none;
  }
  .hero__item-attr {
    white-space: unset;
    flex-flow: column;
    border: 1px dashed #fff;
    border-radius: 8px;
    padding: 5px;
  }
}
@media (max-width: 340px) {
  .hero__img{
    height: 426px;
  }
  .hero__item-button:nth-child(2){
    grid-column: 1/5;
  }
  .hero__item-button:nth-child(3){
    grid-column: 1/3;
  }
  .hero__item-button:nth-child(4){
    grid-column: 3/5;
  }
  .hero__button-circle{
    width: 100%;
    border-radius: 28px;
  }
}
</style>
