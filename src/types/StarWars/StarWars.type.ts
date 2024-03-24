export type StarWarsData<T> = {
  count: number,
  next: string | null,
  previous: string | null,
  results: T,
};

export type StarWarsHero = {
  name: string,
  height: number,
  mass: number,
  hair_color: string,
  skin_color: string,
  eye_color: string,
  birth_year: string,
  gender: string,
  homeworld: number,
  films: number[],
  species: number[],
  vehicles: number[],
  starships: number[],
  created: string,
  edited: string,
  url: string
};

export type StarWarsFilm = {
  title: string,
  episode_id: number,
  opening_crawl: string,
  director: string,
  producer: string,
  release_date: string,
  characters: number[],
  planets: number[],
  starships: number[],
  vehicles: number[],
  species: number[]
  created: string,
  edited: string,
  url: string,
};

export type StarWarsStarship = {
  name: string,
  model: string,
  manufacturer: string,
  cost_in_credits: string,
  length: string,
  max_atmosphering_speed: string,
  crew: string,
  passengers: string,
  cargo_capacity: string,
  consumables: string,
  hyperdrive_rating: string,
  MGLT: string,
  starship_class: string,
  pilots: number[],
  films: number[],
  created: string,
  edited: string,
  url: string,
};

export interface StarWarsFilmWithId extends StarWarsFilm {
  id: number;
}

export interface StarWarsStarshipWithId extends StarWarsStarship {
  id: number;
}
