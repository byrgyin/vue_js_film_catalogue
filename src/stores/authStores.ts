import {defineStore} from "pinia";
import {ref} from "vue";
import type {IUser} from "../types/user.ts";

export const useAuthStore = defineStore('auth',()=>{
  let isAuthorized = ref<boolean>(false);
  let User = ref<IUser>();

  const storedIsAuthorized = localStorage.getItem('isAuthorized');
  if(storedIsAuthorized){
    isAuthorized.value = JSON.parse(storedIsAuthorized);
    console.log(isAuthorized.value)
  }

  return{
    isAuthorized,
    User
  }
})
