import {createRouter, createWebHistory } from 'vue-router';
import {fetchFilm} from "../../api/fetchFilms.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
    {
      path: '/',
      name: 'home',
      component: ()=> import(('../views/HomeView.vue')),
      meta: {
        title: 'Film Catalogue',
        description: 'Welcome to the Film Catalogue',
      },
    },
    {
      path:'/genres',
      name:'genres',
      component:()=> import(('../views/GenresView.vue')),
      meta: {
        title: 'Genres',
        description: 'Browse all movie genres',
      },
    },
    {
      path:'/genres/:genre',
      name:'genre',
      component:()=> import(('../views/GenresInnerView.vue')),
      meta: {
        title: 'Genre',
        description: 'Movies in the selected genre',
      },
    },
    {
      path:'/genres/:genre/:id',
      name:'filmByGenre',
      component:()=> import(('../views/FilmView.vue')),
      meta: {
        title: 'Film',
        description: 'Details of the selected movie',
      },
    },
    {
      path:'/:id',
      name:'film',
      component:()=> import(('../views/FilmView.vue')),
      meta: {
        title: 'Film',
        description: 'Details of the selected movie',
      },
    },
    {
      path:'/profile',
      name:'profile',
      component:()=> import(('../views/ProfileView.vue')),
      meta: {
        title: 'Profile',
        description: 'User profile and settings',
      },
    }
  ]
});

router.beforeEach(async (to, _from, next) => {
  let title:string =  (to.meta.title as string | undefined) || 'My app';
  let description:string = (to.meta.description as string | undefined) || 'Default description for My App';


  if(to.name === 'genre' && to.params.genre) {
    const genre = Array.isArray(to.params.genre) ? to.params.genre[0] : to.params.genre;
    title = `Genre: ${genre.charAt(0).toUpperCase() + genre.slice(1)}`;
    description = `Browse movies in the ${genre} genre`;
  } else if(to.name === 'film' || to.name === 'filmByGenre'){
    const idFilm:number = Number(to.params.id);
    const film = await fetchFilm(idFilm);
    title = film.title;
    description = film.plot;
  }

  document.title = title;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  } else {
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = description;
    document.head.appendChild(meta);
  }
  next();
});
export default router;
