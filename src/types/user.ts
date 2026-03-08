export interface User {
    id: number;
    firstName: string;
    lastName: string;
    image: string;
    email: string;
    phone: string;
}

export interface UsersResponse {
    users: User[];
    total: number;
    skip: number;
    limit: number;
}

export interface UsersState {
    users: User[];
    loading: boolean;
    error: string | null;
    total: number;
}