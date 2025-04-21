<template>
  <section class="my-account">
    <div :class="['container',{'hero__container--loading':!loading}]">
      <h1 class="my-account__title">My Account</h1>
      <ul class="my-account__list">
        <li class="my-account__list-item">
          <button class="my-account__button my-account__button--active"><img class="my-account__button-icon" src="/wisthlist.svg" alt="Favorite Film"><span>Favorite Film</span></button>
        </li>
        <li class="my-account__list-item">
          <button class="my-account__button"><img class="my-account__button-icon" src="/user.svg" alt="Account"><span>Account Settings</span></button>
        </li>
      </ul>
      <div class="my-account__tabs">
        <div class="my-account__tab my-account__tab--active">
          <ul v-if="arrFavoriteFilms?.length" class="my-account__tab-card-list">
            <FilmPreviewCard
              v-for="(film,index) in arrFavoriteFilms"
              :key="index"
              :index="index + 1"
              :film="film"
              :deleteFilm="true"
              @update:reloadFavoritesFilm="loadFilms"
            />
          </ul>
          <div v-else class="my-account__tab-empty">Non Favorite Film</div>
        </div>
        <div class="my-account__tab my-account__tab-info-account">
          <ul class="my-account__list-info">
            <li class="my-account__item my-account__item-fio">
              <div class="my-account__item-fio-abbr">{{abbr}}</div>
              <div class="my-account__item-text">Name Surname</div>
              <div class="my-account__item-text my-account__item-text--bio">{{userProfile?.name}} {{userProfile?.surname}}</div>
            </li>
            <li class="my-account__item my-account__item-email">
              <div class="my-account__item-fio-abbr"><img src="/email-white.svg" alt="email"></div>
              <div class="my-account__item-text">Email</div>
              <a class="my-account__item-text my-account__item-text--email" :href="`mailto:${userProfile?.email}`">{{userProfile?.email}}</a>
            </li>
          </ul>
          <button @click="logOut" class="my-account__logout">LogOut</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import {profileEvent,profileLogOut,getFavoriteFilms} from "../../api/authToServer.ts";
import {makaAbbr} from "../../api/makaAbbr.ts";
import {useAuthStore} from "../stores/authStores.ts";
import type {IUser} from "../types/user.ts";
import type {IFilm} from "../types/film.ts";
import FilmPreviewCard from "./FilmPreviewCard.vue";

const userProfile = ref<IUser>();
const router = useRouter();
let abbr = ref<string>('');
let loading = ref<boolean>(false);
let arrFavoriteFilms = ref<IFilm[]>();
const loadProfile = async ():Promise<void>=>{
  userProfile.value = await profileEvent();
  if(userProfile.value){
    abbr.value = makaAbbr(userProfile.value);
    loading.value = true;
  }
}
const loadFilms = async (): Promise<void>=>{
  arrFavoriteFilms.value = await getFavoriteFilms();
  loading.value = true;
}
loadFilms();
loadProfile();

const logOut = async ()=>{
  const res =  await profileLogOut();
  console.log(res);
  if(res.result){
    await router.push('/');
    useAuthStore().isAuthorized = false;
    localStorage.setItem('isAuthorized','false');
  }
}

onMounted(()=>{
  const tabBtns = document.querySelectorAll('.my-account__button'),
    tabContent = document.querySelectorAll('.my-account__tab');

  const clearClass = ():void=>{
    tabBtns.forEach(item=>{
      item.classList.remove('my-account__button--active');
    });
    tabContent.forEach(item=>{
      item.classList.remove('my-account__tab--active');
    });
  };
  const changeContentTab = (indexClick:number):void=>{
    tabContent.forEach((item,index)=>{
      if(index === indexClick){
        item.classList.add('my-account__tab--active')
      }
    })
  }

  tabBtns.forEach((item,index)=>{
    item.addEventListener('click',(event: Event)=>{
      const target = event.target as HTMLElement;
      clearClass();
      changeContentTab(index);
      if(target){
        target.classList.add('my-account__button--active');
      }
    });
  });
});

</script>

<style scoped>
.my-account{
  padding-top: 150px;
}
.my-account__title{
  margin: 0 0 64px;
  font-size: 48px;
  font-weight: 700;
  line-height: 56px;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}
.my-account__list{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 64px;
  margin-bottom: 64px;
}
.my-account__button{
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  border-bottom: 1.5px solid transparent;
}
.my-account__button--active{
  border-bottom: 1.5px solid rgba(220, 93, 252, 1);
}

.my-account__tab-card-list{
  display: grid;
  grid-template-columns: repeat(5,1fr);
  grid-gap: 64px 40px;
}
.my-account__tab{
  display: none;
}
.my-account__tab--active{
  display: block;
}
.my-account__button-icon{
  width: 24px;
  height: 24px;
  object-fit: contain;
}
.my-account__list-info{
  margin: 0 0 64px;
}
.my-account__item{
  display: grid;
  grid-template-columns: max-content max-content;
  grid-gap: 4px 16px;
}
.my-account__item .my-account__item-text:last-child{
  grid-column: 2/3;
}
.my-account__item:not(:last-child){
  margin: 0 0 54px;
}
.my-account__item-text--bio,
.my-account__item-text--email{
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  color: #fff;
}
.my-account__item-text--bio{
  text-transform: capitalize;
}
.my-account__item-fio-abbr{
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row: 1/3;
  width: 60px;
  height: 60px;
  padding: 14px;
  background: var(--background-disabled, rgba(255, 255, 255, 0.5));
  border-radius: 50%;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  text-transform: uppercase;
  color: #fff;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

.my-account__logout{
  padding: 16px 60px;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  text-align: center;
  background: rgba(103, 165, 235, 1);
  outline: none;
  border: none;
  border-radius: 28px;
}
.my-account__tab-empty{
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  color: #fff;
}
@media (max-width: 991px) {
  .my-account {
    padding-top: 96px;
    padding-bottom: 96px;
  }
  .my-account__tab-card-list{
    display: flex;
    margin: 0 -20px;
    padding: 20px;
    overflow: auto;
  }
  .my-account__title{
    margin-bottom: 40px;
    font-size: 24px;
  }
  .my-account__item-fio-abbr{
    width: 48px;
    height: 48px;
  }
  .my-account__item:not(:last-child),
  .my-account__list-info{
    margin: 0 0 40px;
  }
}
@media (max-width: 500px) {
  .my-account__list{
    flex-flow: column;
    align-items: flex-start;
    gap: 24px;
    margin-bottom: 24px;
  }
  .my-account__logout{
    width: 100%;
  }
}
</style>
