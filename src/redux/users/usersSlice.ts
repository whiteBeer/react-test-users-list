import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UsersResponse, UsersState } from '../../types/user';

const initialState: UsersState = {
    users: [],
    loading: false,
    error: null,
    total: 0
};

const usersSlice = createSlice({
    name: 'users',
    initialState, 
    reducers: {
        usersFetching: (state) => {
            state.loading = true;
            state.error = null;
        },
        usersFetched: (state, action: PayloadAction<UsersResponse>) => {
            state.loading = false;
            state.users = action.payload.users;
            state.total = action.payload.total;
        },
        usersFetchingError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearUsers: (state) => {
            state.users = [];
        }
    },
});

export const { usersFetching, usersFetched, usersFetchingError, clearUsers } = usersSlice.actions;
export const { reducer: usersReducer } = usersSlice;
export default usersReducer;
