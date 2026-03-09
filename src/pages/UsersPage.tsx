import { useSearchParams } from 'react-router-dom';
import UsersContainer from '../components/Users/UsersContainer';

const UsersPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = Number(searchParams.get('page')) || 1;
    const currentQuery = searchParams.get('q') || '';

    const handlePageChange = (page: number) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            if (page === 1) {
                next.delete('page');
            } else {
                next.set('page', String(page));
            }
            return next;
        });
    };

    const handleSearchChange = (query: string) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            if (query) {
                next.set('q', query);
            } else {
                next.delete('q');
            }
            next.delete('page');
            return next;
        });
    };

    return (
        <UsersContainer 
            currentPage={currentPage}
            currentQuery={currentQuery}
            onPageChange={handlePageChange}
            onSearchChange={handleSearchChange}
        />
    );
};

export default UsersPage;