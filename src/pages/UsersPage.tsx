import { useSearchParams } from 'react-router-dom';
import UsersContainer from '../components/Users/UsersContainer';

const UsersPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = Number(searchParams.get('page')) || 1;
    const currentQuery = searchParams.get('q') || '';

    const handlePageChange = (page: number) => {
        setSearchParams(prev => {
            if (page === 1) {
                prev.delete('page');
            } else {
                prev.set('page', String(page));
            }
            return prev;
        });
    };

    const handleSearchChange = (query: string) => {
        setSearchParams(prev => {
            if (query) {
                prev.set('q', query);
            } else {
                prev.delete('q');
            }
            prev.delete('page');
            return prev;
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