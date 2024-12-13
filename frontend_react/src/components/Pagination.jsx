import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const renderPaginationNumbers = () => {
        const pages = [];
        const maxVisiblePages = 6; // Maximum number of visible pages

        // Show first page
        if (currentPage > 3) {
            pages.push(1);
        }

        // Show ellipsis if the first page is skipped
        if (currentPage > 4) {
            pages.push('...');
        }

        // Show the previous 2 pages, the current page, and the next 2 pages
        for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
            pages.push(i);
        }

        // Show ellipsis if the last page is skipped
        if (currentPage < totalPages - 3) {
            pages.push('...');
        }

        // Show the last page
        if (currentPage < totalPages - 2) {
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="d-flex justify-content-center my-3">
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="page-link"
                        >
                            Previous
                        </button>
                    </li>
                    {renderPaginationNumbers().map((page, index) => (
                        <li className="page-item" key={index}>
                            {page === '...' ? (
                                <span className="page-link">{page}</span>
                            ) : (
                                <button
                                    onClick={() => handlePageChange(page)}
                                    className={`page-link ${currentPage === page ? 'active' : ''}`}
                                >
                                    {page}
                                </button>
                            )}
                        </li>
                    ))}
                    <li className="page-item">
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="page-link"
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
