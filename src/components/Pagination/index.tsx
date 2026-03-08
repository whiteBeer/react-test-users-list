import { usePagination, DOTS } from '../../hooks/usePagination';
import styles from './Pagination.module.css';

interface PaginationProps {
    onPageChange: (page: number) => void;
    totalCount: number;
    siblingCount?: number;
    currentPage: number;
    pageSize: number;
}

const Pagination = (props: PaginationProps) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    const lastPage = paginationRange ? paginationRange[paginationRange.length - 1] : 0;

    return (
        <nav aria-label="Pagination Navigation">
            <ul className={styles.paginationContainer}>
                <li className={styles.paginationItem}>
                    <button type="button" className={styles.paginationButton} onClick={onPrevious} disabled={currentPage === 1} aria-label="Go to previous page">
                        <div className={`${styles.arrow} ${styles.left}`} />
                    </button>
                </li>
                {paginationRange && paginationRange.map((pageNumber, index) => {
                    if (pageNumber === DOTS) {
                        return <li key={`dots-${index}`} className={`${styles.paginationItem} ${styles.dots}`}>&#8230;</li>;
                    }

                    return (
                        <li key={pageNumber} className={styles.paginationItem}>
                            <button
                                type="button"
                                className={`${styles.paginationButton} ${pageNumber === currentPage ? styles.selected : ''}`}
                                onClick={() => onPageChange(Number(pageNumber))}
                                aria-current={pageNumber === currentPage ? 'page' : undefined}
                                aria-label={`Go to page ${pageNumber}`}
                            >
                                {pageNumber}
                            </button>
                        </li>
                    );
                })}
                <li className={styles.paginationItem}>
                    <button
                        type="button"
                        className={styles.paginationButton}
                        onClick={onNext}
                        disabled={currentPage === lastPage}
                        aria-label="Go to next page"
                    >
                        <div className={`${styles.arrow} ${styles.right}`} />
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;