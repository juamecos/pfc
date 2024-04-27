import React from 'react';
import { Link } from '@inertiajs/react'

export default function Pagination({ currentPage, totalPages, links, nextPage, prevPage }) {
  if (totalPages <= 1) {
    return <div className="text-center py-4 text-gray-600">No more items.</div>;
  }

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="flex items-center -space-x-px h-10 text-base justify-center">
        {totalPages > 1 && (
          <li>
            <Link
              href={prevPage ? prevPage : '#'}
              preserveScroll
              className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
            >
              <span className="sr-only">Previous</span>
              {/* SVG Left Arrow */}
              <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
              </svg>
            </Link>
          </li>
        )}

        {pageNumbers.map(page => (
          <li key={page}>
            <Link
              href={`${links[page].url}`}
              preserveScroll
              className={`flex items-center justify-center px-4 h-10 leading-tight ${currentPage === page ? 'text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 dark:bg-gray-700 dark:text-white' : 'text-gray-500 bg-white hover:bg-gray-100'} border border-gray-300 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >
              {page}
            </Link>
          </li>
        ))}

        {totalPages > 1 && (
          <li>
            <Link
              href={nextPage ?
                nextPage
                : '#'}
              preserveScroll
              className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
            >
              <span className="sr-only">Next</span>
              {/* SVG Right Arrow */}
              <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}