import { StarWarsTy } from "@/types/StarWars/StarWars.type";
import { getAxiosClient } from "@/utils/axios.client";

const BASE_STARNAVI_URL = 'https://sw-api.starnavi.io/';

const starWarsAxiosClient = getAxiosClient(BASE_STARNAVI_URL);

export function getPeopleByPage<T = StarWarsTy.Data<StarWarsTy.Hero[]>>(page: number = 1)
  : Promise<T> {
  return starWarsAxiosClient.get(`people/?page=${page}`)
    .then(res => res.data as T);
}

export function getFilmById<T = StarWarsTy.Film>(id: number)
  : Promise<T> {
  return starWarsAxiosClient.get(`films/${id}/`)
    .then(res => res.data as T);
}

export function getStarshipById<T = StarWarsTy.StarShip>(id: number)
  : Promise<T> {
  return starWarsAxiosClient.get(`starships/${id}/`)
    .then(res => res.data as T);
}
