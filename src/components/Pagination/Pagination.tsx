'use client';

import React from 'react';
import * as lodash from 'lodash';

const Pagination = ({
  pagesCount,
  currentPage = 1,
  onPageChange = () => { },
}: {
  pagesCount: number,
  currentPage?: number,
  onPageChange: (page: number) => void,
}) => {
  const pageNumbers = lodash.range(1, pagesCount + 1);
  const isFirstPage = currentPage === pageNumbers[0];
  const isLastPage = currentPage === pageNumbers[pageNumbers.length - 1];

  return (
    <ul data-testid="StarWarsPagination" className="list-style-none flex">
      <li>
        <button
          data-testid="PreviousBtn"
          aria-disabled={isFirstPage}
          className={
            !isFirstPage
              ? "cursor-pointer relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none active:bg-neutral-100 active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500"
              : "pointer-events-none relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface/50 transition duration-300 dark:text-neutral-400"
          }
          onClick={() => isFirstPage || onPageChange(currentPage - 1)}
        >
          Previous
        </button>
      </li>

      {pageNumbers.map(pageNumber => (
        <li key={pageNumber}>
          <button
            className={
              pageNumber === currentPage
                ? "cursor-pointer relative block rounded bg-blue-500 px-3 py-1.5 text-sm font-medium text-primary-700 transition duration-300 focus:outline-none dark:bg-slate-900 dark:text-primary-500"
                : "cursor-pointer relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none active:bg-neutral-100 active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500"
            }
            onClick={() => onPageChange(pageNumber)}
          >{pageNumber}
          </button>
        </li>
      ))}

      <li>
        <button
          data-testid="NextBtn"
          aria-disabled={isLastPage}
          className={
            !isLastPage
              ? "cursor-pointer relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none active:bg-neutral-100 active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500"
              : "pointer-events-none relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface/50 transition duration-300 dark:text-neutral-400"
          }
          onClick={() => isLastPage || onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </li>
    </ul>
  )
}

export default React.memo(Pagination, (prevProps, nextProps) => {
  return prevProps.pagesCount === nextProps.pagesCount
    && prevProps.currentPage === nextProps.currentPage
});