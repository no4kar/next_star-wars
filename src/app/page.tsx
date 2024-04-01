'use client';

import React, { useEffect, useState } from 'react';

import { StarWarsTy } from '@/types/StarWars/StarWars.type';

import * as starWarsApi from '@/api/starWars.api';
import Pagination from '@/components/Pagination/Pagination';
import HeroesTable from '@/components/HeroesTable/HeroesTable';
import Loader from '@/components/Loader/Loader';

const emptyHeroesPage: StarWarsTy.Data<StarWarsTy.Hero[]>
  = Object.freeze({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });

export default function Home() {
  const [isloading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedHero, setSelectedHero] = useState<StarWarsTy.Hero | null>(null);
  const [currentHeroesPage, setCurrentHeroesPage]
    = useState<StarWarsTy.Data<StarWarsTy.Hero[]>>(emptyHeroesPage);

  const perPage = 10;
  const pagesCount = Math.ceil(currentHeroesPage.count / perPage);

  useEffect(() => {
    setIsLoading(true);

    starWarsApi.getPeopleByPage(currentPage)
      .then(setCurrentHeroesPage)
      .catch(() => setCurrentHeroesPage(emptyHeroesPage))
      .finally(() => setIsLoading(false));
  },
    [currentPage]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16">
      <div className="flex flex-col">
        <div className="pb-4">
          <h1 className="flex flex-auto justify-center text-lg font-semibold text-slate-900">
            Star Wars Heroes
          </h1>
        </div>

        {pagesCount > 0 && (
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <Pagination
                pagesCount={pagesCount}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        )}

        {isloading && (
          <Loader />
        )}

        {!isloading && currentHeroesPage.results.length !== 0 && (
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <HeroesTable
                  selectedHero={selectedHero}
                  currentHeroesPage={currentHeroesPage}
                  onSelectHero={(hero) => setSelectedHero(hero)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </main >
  );
}
