<template>
  <div v-if="showLogRegForm"  class="auth-wrapper">
    <span @click="closeForm(false)" class="auth-wrapper__bg"></span>
    <div class="auth-wrapper__form-block">
      <button @click="closeForm(false)" class="auth-wrapper__close"></button>
      <img class="auth-wrapper__logo" src="/logo.png" alt="form logo">

      <form @submit="submitLog" @submit.prevent="cancelStandadrForm" v-if="showForm" class="auth-wrapper__login"  method="POST"  enctype="application/x-www-form-urlencoded">
        <input type="email" class="auth-wrapper__input" name="email" placeholder="Электронная почта" required>
        <input type="password" class="auth-wrapper__input" name="password" placeholder="Пароль" required>
        <button class="auth-wrapper__button auth-wrapper__submit" type="submit">Войти</button>
      </form>

      <form @submit="submitReg" @submit.prevent="cancelStandadrForm" v-else v-if="!registerComlete" class="auth-wrapper__signing"  method="POST"  enctype="application/x-www-form-urlencoded">
        <fieldset>
          <legend class="auth-wrapper__signing-legend">Регистрация</legend>
          <input type="email" class="auth-wrapper__input" name="email" placeholder="Электронная почта" required>
          <input type="text" class="auth-wrapper__input" name="name" placeholder="Имя" required>
          <input type="text" class="auth-wrapper__input" name="surname" placeholder="Фамилия" required>
          <input type="password" class="auth-wrapper__input" name="password"  placeholder="Пароль" required>
          <input type="password" class="auth-wrapper__input" name="approve_password"  placeholder="Потвердите пароль" required>
          <button class="auth-wrapper__button auth-wrapper__submit" type="submit">Создать аккаунт</button>
        </fieldset>
      </form>

      <button @click="changeToRegForm" v-if="showForm" id="auth_reg" class="auth-wrapper__already-access">Регистрация</button>
      <button @click="changeToLogForm" v-else id="auth_login" class="auth-wrapper__already-access">У меня есть пароль</button>

      <div class="auth-wrapper__reg-complete" v-if="registerComlete">
        <div class="auth-wrapper__reg-complete-title">Регистрация завершена</div>
        <div class="auth-wrapper__reg-complete-subtitle"> Используйте вашу электронную почту для входа</div>
        <button @click="changeToLogForm" id="auth_enter" class="auth-wrapper__button">Войти</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {regisrationEvent,loginEvent} from "../../api/authToServer.ts";


defineProps<{
  showLogRegForm:boolean;
  // imLogIn:boolean;
}>();
const emit = defineEmits<{
  (e:'update:showLogRegForm', value: boolean):void;
  (e:'update:imLogIn', value: boolean):void;
}>();

let showForm = ref<boolean>(true);
let registerComlete = ref<boolean>(false);

const changeToRegForm = ():void=>{
  showForm.value = false;
}
const changeToLogForm = ():void=>{
  showForm.value = true;
  registerComlete.value = false
}
const closeForm = (avgBoolean:boolean):void=>{
  emit('update:showLogRegForm', false);
  emit('update:imLogIn', avgBoolean);
}
const cancelStandadrForm = (event:Event):void=>{
  event.preventDefault();
}
const submitReg = async (event: Event): Promise<void> => {

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    name: formData.get('name') as string,
    surname: formData.get('surname') as string,
  };
  const responseRegister =  await regisrationEvent(data);
  registerComlete.value = responseRegister.success;

}

const submitLog = async (event:Event): Promise<void>=>{
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };
  const responseLogin = await loginEvent(data);
  if(responseLogin.data.result){
    closeForm(responseLogin.data.result);
    localStorage.setItem('isAuthorized','true');
  }
}

</script>

<style scoped>
.auth-wrapper{
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px;
  z-index: 99;
  width: 100%;
  height: 100%;

}
.auth-wrapper__bg{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, #000000 0%, rgba(39, 36, 36, 0.7) 100%),
  linear-gradient(178.73deg, rgba(39, 135, 245, 0.18) -17.53%, rgba(163, 147, 245, 0.18) 131.74%);
}
.auth-wrapper--active{
  display: flex;
}
.auth-wrapper__form-block{
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
  background-color: #000;
  padding: 60px 40px;
  border-radius: 24px;
  box-shadow: 0 4px 70px 8px rgb(255 255 255 / 44%);
}
.auth-wrapper__logo{
  display: block;
  margin: 0 auto 40px;
  width: 56px;
  height: 56px;
  object-fit: contain;
}
.auth-wrapper__signing,
.auth-wrapper__login,
.auth-wrapper__signing fieldset{
  padding: 0;
  outline: none;
  border: none;
  display: flex;
  flex-flow: column;
  gap: 12px;
  margin: 0 0 24px;
}
.auth-wrapper__signing fieldset{
  margin: 0;
}
.auth-wrapper__signing-legend{
  margin: 0 0 24px;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #fff;
}

.auth-wrapper__input{
  padding: 16px 16px 16px 52px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  color: rgba(0, 0, 0, 1);
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  border-radius: 8px;
}
.auth-wrapper__input::placeholder{
  color: rgba(0, 0, 0, 0.4);
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
}
.auth-wrapper__input{
  background-repeat: no-repeat;
  background-position: 16px center;
  background-size: 24px 24px;
}
.auth-wrapper__input[name='name'],
.auth-wrapper__input[name='surname']{
  background-image: url("/name.svg");
}
.auth-wrapper__input[name='email']{
  background-image: url("/email.svg");
}
.auth-wrapper__input[name='password'],
.auth-wrapper__input[name='approve_password']{
  background-image: url("/password.svg");
}

.auth-wrapper__input:hover,
.auth-wrapper__input:focus,
.auth-wrapper__input:focus-within,
.auth-wrapper__input:focus-visible{
  border: 1px solid rgb(255 163 1);
  outline: 1px solid rgb(255 163 1);
}
.auth-wrapper__input:invalid:focus{
  border: 1px solid rgba(255, 117, 117, 1);
  outline: 1px solid rgba(255, 117, 117, 1);
}
.auth-wrapper__input[name='name']:invalid:focus,
.auth-wrapper__input[name='surname']:invalid:focus{
  background-image: url("/name-red.svg");
}
.auth-wrapper__input[name='email']:invalid:focus{
  background-image: url("/email-red.svg");
}
.auth-wrapper__input[name='password']:invalid:focus,
.auth-wrapper__input[name='approve_password']:invalid:focus{
  background-image: url("/password-red.svg");
}
.auth-wrapper__button{
  width: 100%;
  padding: 16px 60px;
  color: #000;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  text-align: center;
  background: rgb(255 163 1);
  outline: none;
  border: none;
  border-radius: 28px;

}
.auth-wrapper__already-access{
  display: block;
  padding: 0;
  margin: 0;
  width: 100%;
  background-color: transparent;
  color: #fff;
  outline: none;
  border: none;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}
.auth-wrapper__close{
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: -60px;
  padding: 14px;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: #000;
  border:none;
  outline: none;
  box-shadow: 0 4px 70px 8px rgb(255 255 255 / 44%);
}
.auth-wrapper__close:before,
.auth-wrapper__close:after{
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  right: 50%;
  width: 18px;
  height: 2px;
  background-color: #fff;
}
.auth-wrapper__close:before{
  transform: translate(50%,50%) rotate(45deg);
}
.auth-wrapper__close:after{
  transform: translate(50%,50%) rotate(-45deg);
}
.auth-wrapper__reg-complete-title{
  margin: 0 0 24px;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: var(--content-black, rgba(0, 0, 0, 1));
}
.auth-wrapper__reg-complete-subtitle{
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: var(--content-black, rgba(0, 0, 0, 1));
}
@media (max-width: 991px) {
  .auth-wrapper__form-block{
    padding: 60px 20px 32px;
  }
  .auth-wrapper__close{
    right: 2px;
  }
}
@media (orientation: landscape) and (max-width: 991px) {
  .auth-wrapper{
    align-items: flex-start;
    overflow: auto;
  }
}
@media (max-width: 350px) {
  .auth-wrapper{
    align-items: flex-start;
    overflow: auto;
  }
}
</style>
