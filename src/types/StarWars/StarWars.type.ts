declare namespace StarWarsTy {
  export {
    Data,
    Hero,
    StarShip,
    StarShipWithId,
    Film,
    FilmWithId,
  };
}

export type { StarWarsTy };

type Data<T> = {
  count: number,
  next: string | null,
  previous: string | null,
  results: T,
};

type Hero = {
  name: string,
  height: string,
  mass: string,
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

type Film = {
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

interface FilmWithId extends Film {
  id: number;
}

type StarShip = {
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

interface StarShipWithId extends StarShip {
  id: number;
}
