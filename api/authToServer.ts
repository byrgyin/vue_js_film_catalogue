import axios from "axios";
import type {IUserRegistration,IUserLogIn} from "../src/types/user.ts";

export const regisrationEvent = async (data: IUserRegistration): Promise<any>=>{
  try {
    const response = await axios.post('https://cinemaguide.skillbox.cc/user',data);
    return response.data;
  } catch (error){
    console.error('Registration failed:', error);
    throw error;
  }
}

export const loginEvent = async (data:IUserLogIn): Promise<any>=>{
  try {
    const response = await axios.post('https://cinemaguide.skillbox.cc/auth/login',data,{withCredentials:true});
    return {
      data: response.data,
      headers: response.headers
    };
  } catch (error){
    console.error('Registration failed:', error);
    throw error;
  }
}
export const profileLogOut = async (): Promise<any>=>{
  try {
    const response = await axios.get('https://cinemaguide.skillbox.cc/auth/logout',{withCredentials:true});
    return response.data;
  } catch (error){
    console.error('Registration failed:', error);
    throw error;
  }
}
export const profileEvent = async (): Promise<any>=>{
  try {
    const response = await axios.get('https://cinemaguide.skillbox.cc/profile',{withCredentials:true});
    return response.data;
  } catch (error){
    console.error('Registration failed:', error);
    throw error;
  }
}

export const getFavoriteFilms = async (): Promise<any>=>{
  try {
    const response = await axios.get('https://cinemaguide.skillbox.cc/favorites',{withCredentials:true});
    return response.data;
  } catch (error){
    console.error('Registration failed:', error);
    throw error;
  }
}

export const addFavoriteFilms = async (id:object): Promise<any>=>{
  try {
    const response = await axios.post('https://cinemaguide.skillbox.cc/favorites',id,{withCredentials:true});
    return response.data;
  } catch (error){
    console.error('Registration failed:', error);
    throw error;
  }
}


export const removeFavoriteFilms = async (movieId:number): Promise<any>=>{
  try {
    const response = await axios.delete(`https://cinemaguide.skillbox.cc/favorites/${movieId}`,{withCredentials:true});
    return response.data;
  } catch (error){
    console.error('Registration failed:', error);
    throw error;
  }
}
