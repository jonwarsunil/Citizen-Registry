import React, { useMemo } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = useMemo(() => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className='flex justify-end mt-6 gap-2 flex-wrap'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50 cursor-pointer'
      >
        Prev
      </button>

      {getPageNumbers.map((page, idx) =>
        page === '...' ? (
          <span key={`ellipsis-${idx}`} className='px-3 py-1 text-gray-500'>
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded cursor-pointer ${
              currentPage === page ? 'bg-[#DBE8F2] text-black' : 'bg-gray-100 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='px-3 py-1 cursor-pointer rounded bg-gray-200 text-gray-700 disabled:opacity-50'
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
