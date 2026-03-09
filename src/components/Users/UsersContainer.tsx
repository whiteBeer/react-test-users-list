import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/users/usersThunk';
import { selectUsers, selectUsersLoading, selectUsersError, selectUsersTotal } from '../../redux/users/usersSelector';
import type { AppDispatch } from '../../redux/store';
import { PAGE_SIZE } from '../../constants/global';
import UsersItem from './UsersItem';
import Pagination from '../Pagination';
import Search from '../Search';
import Loader from '../Loader';
import styles from './UsersContainer.module.css';

interface UsersContainerProps {
    currentPage: number;
    currentQuery: string;
    onPageChange: (page: number) => void;
    onSearchChange: (query: string) => void;
}

const UsersContainer = ({ currentPage, currentQuery, onPageChange, onSearchChange }: UsersContainerProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const users = useSelector(selectUsers);
    const loading = useSelector(selectUsersLoading);
    const error = useSelector(selectUsersError);
    const totalUsers = useSelector(selectUsersTotal);

    useEffect(() => {
        dispatch(fetchUsers({ page: currentPage, query: currentQuery }));
    }, [dispatch, currentPage, currentQuery]);

    return (
        <div className={styles.container}>
            <Search value={currentQuery} onSearchChange={onSearchChange}/>
            {loading && <div className={styles.loaderCont}><Loader/></div>}
            {error && <p className={styles.error}>Error: {error}</p>}
            {!error &&
                <div style={{visibility: loading ? 'hidden' : 'visible'}}>
                    {users.length > 0 ? (
                        <div className={styles.list}>
                            {users.map((user) => (
                                <UsersItem key={user.id} user={user} highlightText={currentQuery}/>
                            ))}
                        </div>
                    ) : (
                        <p className={styles.notFound}>Users not found.</p>
                    )}
                </div>
            }
            {totalUsers > PAGE_SIZE && !error && (
                <Pagination
                    currentPage={currentPage}
                    totalCount={totalUsers}
                    pageSize={PAGE_SIZE}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
};

export default UsersContainer;
