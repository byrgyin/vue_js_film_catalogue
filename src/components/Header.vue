<template>
<header class="header">
  <div class="container header__container">
    <router-link class="header__logo" to="/"><img src="/logo.png" alt="Logo" /></router-link>
    <nav class="header__nav">
      <ul class="nav__list">
        <li class="nav__item" v-for="(item) in arrayRouterLinks">
          <router-link class="nav__link"  :to="{name:item.nameView}">{{item.nameText}}</router-link>
        </li>
    </ul>
    </nav>
    <FormSearch
    :isOpenForm="openForm"
    @update:isOpenForm="updateIsOpenForm"
    />
    <router-link to="/genres" class="header__genres"><img src="/genre.svg" alt="lupe"></router-link>
    <button @click="callSearchForm" class="header__lupe-search"><img src="/lupe-white.svg" alt="lupe"></button>
    <router-link v-if="useAuthStore().isAuthorized" to="/profile" class="header__account">{{useAuthStore().User?.name}}</router-link>
    <button v-else  @click="openFormModal" id="entry" class="header__button"><span class="header__button-span">Login</span><img class="header__button-img" src="/acc.svg" alt="account"></button>
  </div>
</header>
  <LogRegistrationForm
    v-if="showLogRegForm"
    :showLogRegForm="showLogRegForm"
    @update:showLogRegForm="closeFormModal"
    @update:imLogIn="updateIsAuthorized "
  />
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import FormSearch from "./FormSearch.vue";
import {ref} from "vue";
import {profileEvent} from "../../api/authToServer.ts";
import LogRegistrationForm from "./LogRegistrationForm.vue";
import {useAuthStore} from "../stores/authStores.ts";

const arrayRouterLinks = [
  {nameView:'home', nameText:'Main'},
  {nameView:'genres', nameText:'Genres'},
]
let openForm = ref<boolean>(false);
let showLogRegForm = ref<boolean>(false);
const callSearchForm = ():void=>{
  openForm.value = true
}
const updateIsOpenForm = (value:boolean):void=>{
  openForm.value = value;
}
const openFormModal = ():void=>{
  showLogRegForm.value = true;
}
const closeFormModal = ():void=>{
  showLogRegForm.value = false;
}
const updateIsAuthorized = async (value: boolean): Promise<void> => {
  useAuthStore().isAuthorized = value;
  if(useAuthStore().isAuthorized){
    useAuthStore().User = await profileEvent();
  }
}

const checkAuthProfile = async (): Promise<void>=>{
  if(useAuthStore().isAuthorized){
    useAuthStore().User = await profileEvent();
  }
}
checkAuthProfile();
</script>

<style scoped>
.header{
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  padding: 24px 0;
  background: #000;
  z-index: 99;
  box-shadow: 1px 1px 83px -25px #fff;
}
.header__container{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header__button-img,
.header__genres{
  display: none;
  width: 20px;
  height: 20px;
}
.header__logo{
  display: block;
  width: 80px;
  height: 80px;
}
.header__logo img{
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.nav__list{
  display: flex;
  align-items: center;
  gap: 40px;
}
.header__button{
  padding: 0;
  border: none;
  background-color: transparent;
}
.header__lupe-search{
  display: none;
  padding: 0;
  margin: 0;
  width: 24px;
  height: 24px;
  border: none;
  outline: none;
  background-color: transparent;
}
.nav__link,
.header__button{
  position: relative;
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  color: #fff;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}
.nav__link.router-link-active:before{
  content: '';
  display: block;
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 100%;
  height: 1px;
  background-color: rgb(255 163 1);
}
@media (max-width: 1279px) {
  .header__container{
    display: grid;
    grid-template-columns: 1fr repeat(3,max-content);
    grid-gap: 22px;
  }
  /*.header__logo{*/
  /*  width: 80px;*/
  /*  height: 32px;*/
  /*}*/
  .header__nav{
    display: none;
  }
  .header__button-span{
    display: none;
  }
  .header__button-img,
  .header__lupe-search,
  .header__genres{
    display: block;
  }
}
</style>
