import { StarWarsData, StarWarsFilm, StarWarsHero, StarWarsStarship } from "@/types/StarWars/StarWars.type";
import { getAxiosClient } from "@/utils/axios.client";

const BASE_URL = 'https://sw-api.starnavi.io/';

const starWarsAxiosClient = getAxiosClient(BASE_URL);

export function getPeopleByPage<T = StarWarsData<StarWarsHero[]>>(page: number = 1)
  : Promise<T> {
  return starWarsAxiosClient.get(`people/?page=${page}`)
    .then(res => res.data as T);
}

export function getFilmById<T = StarWarsFilm>(id: number)
  : Promise<T> {
  return starWarsAxiosClient.get(`films/${id}/`)
    .then(res => res.data as T);
}

export function getStarshipById<T = StarWarsStarship>(id: number)
  : Promise<T> {
  return starWarsAxiosClient.get(`starships/${id}/`)
    .then(res => res.data as T);
}
