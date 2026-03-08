import type { AppDispatch } from '../store';
import { usersFetching, usersFetched, usersFetchingError } from './usersSlice';
import type { UsersResponse } from '../../types/user';
import { PAGE_SIZE } from '../../constants/global';

interface FetchUsersParams {
    page: number;
    query: string;
}

let fetchUsersController: AbortController | null = null;

export const fetchUsers = ({ page, query }: FetchUsersParams) => async (dispatch: AppDispatch) => {
    if (fetchUsersController) {
        fetchUsersController.abort();
    }
    fetchUsersController = new AbortController();

    try {
        dispatch(usersFetching());
        const limit = PAGE_SIZE;
        const skip = (page - 1) * limit;
        
        let url: string;
        if (query) {
            url = `https://dummyjson.com/users/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`;
        } else {
            url = `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;
        }
        const response = await fetch(url, { signal: fetchUsersController.signal });
        
        const data: UsersResponse = await response.json();
        dispatch(usersFetched(data));
        return data;
    } catch (e: unknown) {
        if (e instanceof Error && e.name === 'AbortError') {
            return;
        }

        if (e instanceof Error) {
            dispatch(usersFetchingError(e.message));
        } else {
            dispatch(usersFetchingError('An unknown error occurred'));
        }
        throw e;
    }
};
