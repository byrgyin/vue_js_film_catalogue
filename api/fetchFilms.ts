export const fetchRandomFilm = async () => {
  try {
    const res = await fetch('https://cinemaguide.skillbox.cc/movie/random');
    return await res.json();
  } catch (error){
    console.log(error.message);
  }
}

export const fetchTopFilms = async () => {
  try {
    const res = await fetch('https://cinemaguide.skillbox.cc/movie/top10');
    return await res.json();
  } catch (error){
    console.log(error.message);
  }
}
export const fetchGenres= async () => {
  try {
    const res = await fetch('https://cinemaguide.skillbox.cc/movie/genres');
    return await res.json();
  } catch (error){
    console.log(error.message);
  }
}
export const fetchGenresFilms= async (genre:string,page:number) => {
  try {
    const res = await fetch(`https://cinemaguide.skillbox.cc/movie?genre=${genre}&count=15&page=${page}`);
    return await res.json();
  } catch (error){
    console.log(error.message);
  }
}
export const fetchFilm = async (movieId:number) => {
  try {
    const res = await fetch(`https://cinemaguide.skillbox.cc/movie/${movieId}`);
    return await res.json();
  } catch (error){
    console.log(error.message);
  }
}
export const fetchSearchResultsFilms= async (title:string) => {
  try {
    const res = await fetch(`https://cinemaguide.skillbox.cc/movie?title=${title}&count=5`);
    return await res.json();
  } catch (error){
    console.log(error.message);
  }
}
