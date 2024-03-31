import React from 'react';
import { StarWarsTy } from '@/types/StarWars/StarWars.type';
import HeroInfo from '../HeroInfo/HeroInfo';

const HeroesTable = ({
  selectedHero,
  currentHeroesPage,
  onSelectHero,
}: {
  selectedHero: StarWarsTy.Hero | null,
  currentHeroesPage: StarWarsTy.Data<StarWarsTy.Hero[]>,
  onSelectHero: (hero: StarWarsTy.Hero) => void,
}) => {
  return (
    <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
      <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
        <tr>
          <th className="px-6 py-4">Birth Year</th>
          <th className="px-6 py-4">Name</th>
          <th className="px-6 py-4">Homeworld</th>
        </tr>
      </thead>

      <tbody>
        {(currentHeroesPage.results).map(hero => (
          hero.name !== selectedHero?.name
            ? (
              <tr
                key={hero.created}
                className="cursor-pointer border-b border-neutral-200 dark:border-white/10"
                onClick={() => onSelectHero(hero)}
              >
                <td className="whitespace-nowrap px-6 py-4 font-medium">{hero.birth_year}</td>
                <td className="whitespace-nowrap px-6 py-4">{hero.name}</td>
                <td className="whitespace-nowrap px-6 py-4">{hero.homeworld}</td>
              </tr>
            )
            : (
              <tr
                key={hero.created}
                className="border-b border-neutral-200 dark:border-white/10">
                <td
                  data-testid="HeroInfo"
                  colSpan={3}
                  className="h-64"
                >
                  <HeroInfo hero={selectedHero} />
                </td>
              </tr>
            )
        ))}
      </tbody>
    </table>
  )
}

export default React.memo(HeroesTable);
