import React, { useEffect, useState } from "react";
import { getFilmById, getStarshipById } from '@/api/starWars.api';
import { StarWarsTy } from "@/types/StarWars/StarWars.type";
import HeroFlowInfo from '@/components/HeroFlowInfo/HeroFlowInfo';

const HeroInfo = ({
  hero,
}: {
  hero: StarWarsTy.Hero,
}) => {
  // Need the custom type with id that will be used in HeroFlowInfo
  const [films, setFilms] = useState<StarWarsTy.FilmWithId[]>([]);
  const [starships, setStarships] = useState<StarWarsTy.StarShipWithId[]>([]);

  useEffect(() => {
    // IIFE(Immediately Invoked Function Expression)
    (async function () {
      const fetchedFilms: StarWarsTy.FilmWithId[] = [];
      const fetchedStarships: StarWarsTy.StarShipWithId[] = [];

      /* Unfortunately if would use "Promise.all(ids.map(id => getFileById(id)))"
       we will get error 429('Too many request'). For this reason, we extract the
       data one by one and add id*/
      for (const id of hero.films) {
        const film = await getFilmById(id).catch(() => null);
        if (film) {
          fetchedFilms.push({ ...film, id });
        }
      }

      for (const id of hero.starships) {
        const starship = await getStarshipById(id).catch(() => null);
        if (starship) {
          fetchedStarships.push({ ...starship, id });
        }
      }

      setFilms(fetchedFilms);
      setStarships(fetchedStarships);
    })();

  }, [hero]);

  return (
    <HeroFlowInfo
      name={hero.name}
      films={films}
      starships={starships}
    />
  );
};

export default React.memo(
  HeroInfo,
  (prevProps, nextProps) => prevProps.hero.name === nextProps.hero.name
);

