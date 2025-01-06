'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;

    // Update the URL with the new page number
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('page', pageNumber.toString());
    router.push(`?${params.toString()}`); // Updates the URL
  };

  if (totalPages < 2) return null; // Hide pagination if there's only 1 page

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="mt-8 flex justify-center items-center">
      <div className="join">
        {/* Previous Button */}
        <button
          className="btn btn-xs sm:btn-md join-item"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`btn btn-xs sm:btn-md join-item ${
              page === currentPage ? 'bg-blue-500 text-white' : ''
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          className="btn btn-xs sm:btn-md join-item"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
