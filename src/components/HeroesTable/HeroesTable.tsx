'use client';

import React, { useEffect, useState } from 'react'
import Pagination from '../Pagination/Pagination'
import { StarWarsHero, StarWarsData } from '@/types/StarWars/StarWars.type';
import * as starWarsApi from '@/api/starWars.api';
import HeroFlowInfo from '../HeroFlowInfo/HeroFlowInfo';

const HeroesTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentHeroesPage, setCurrentHeroesPage] = useState<StarWarsData<StarWarsHero[]> | null>(null)

  const perPage = 10;

  useEffect(() => {
    starWarsApi.getPeopleByPage(currentPage)
      .then(setCurrentHeroesPage)
      .catch(() => setCurrentHeroesPage(null));
  },
    [currentPage]);

  if (!currentHeroesPage) return null;

  console.info(`
  currentPage=${currentPage}
  currentHeroesPage.results[0]=${JSON.stringify(currentHeroesPage.results[0])}
  `);


  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <Pagination
            total={currentHeroesPage.count}
            perPage={perPage}
            currentPage={currentPage}
            onPageChange={(v) => setCurrentPage(v)}
          />
        </div>
      </div>

      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
              <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                <tr>
                  <th className="px-6 py-4">Birth Year</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Homeworld</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b border-neutral-200 dark:border-white/10">
                  <td colSpan={3} className="h-64">
                    <HeroFlowInfo hero={currentHeroesPage.results[0]} />
                  </td>
                </tr>

                {(currentHeroesPage.results).map(hero => (
                  <tr key={hero.created}
                    className="border-b border-neutral-200 dark:border-white/10">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{hero.birth_year}</td>
                    <td className="whitespace-nowrap px-6 py-4">{hero.name}</td>
                    <td className="whitespace-nowrap px-6 py-4">{hero.homeworld}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>


    </div>
  )
}

export default React.memo(HeroesTable);