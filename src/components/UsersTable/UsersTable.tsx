'use client';

import React, { useState } from 'react'
import Pagination from '../Pagination/Pagination'
import { StarWarsHero } from '@/types/StarWars/StartWars.type';

const UsersTable = ({
  users,
}: {
  users: StarWarsHero[],
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const perPage = 5;
  const itemNumberStart = perPage * (currentPage - 1);
  const itemNumberEnd = Math.min(perPage * currentPage, users.length);

  console.info(`
  total=${users.length}
  currentPage=${currentPage}
  `);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <Pagination
            total={users.length}
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
                {(users.slice(itemNumberStart, itemNumberEnd)).map(user => (
                  <tr key={user.created}
                    className="border-b border-neutral-200 dark:border-white/10">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{user.birth_year}</td>
                    <td className="whitespace-nowrap px-6 py-4">{user.name}</td>
                    <td className="whitespace-nowrap px-6 py-4">{user.homeworld}</td>
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

export default React.memo(UsersTable);