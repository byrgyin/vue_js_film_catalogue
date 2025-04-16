<template>
  <section class="genres">
    <div :class="['container','genres__container',{'hero__container--loading':!loading}]">
      <h2 class="genres__title">Genres of films</h2>
      <ul class="genres__list">
        <GenreCard
          v-for="(genre,index) in arrayGenres"
          :key="index"
          :genre="genre"
        />
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import {fetchGenres} from "../../api/fetchFilms.ts";
import {ref} from "vue";
import GenreCard from "./GenreCard.vue";

const arrayGenres = ref<string[]>();
let loading = ref<boolean>(false);
const loadGenres = async (): Promise<void> => {
  const res = await fetchGenres();
  arrayGenres.value = res;
  loading.value = true;
}
loadGenres();
</script>

<style scoped>
.genres {
  padding-top: 160px;
}
.genres__title {
  margin: 0 0 64px;
}
.genres__list{
  display: grid;
  grid-template-columns: repeat(4,1fr);
  grid-gap: 64px 40px;
}

@media(max-width: 1024px){
  .genres__list{
    grid-template-columns: repeat(3,1fr);
    grid-gap: 40px;
  }
}
@media(max-width: 767px){
  .genres__list{
    grid-template-columns: repeat(2,1fr);
    grid-gap: 24px;
  }
}
@media(max-width: 489px){
  .genres__list{
    grid-template-columns: repeat(1,1fr);
  }
}
</style>
