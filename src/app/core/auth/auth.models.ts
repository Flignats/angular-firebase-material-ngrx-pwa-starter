export interface Authenticate {
    displayName?: string;
    email: string;
    password: string;
}

export interface AuthState {
    uid: string;
    error: any;
    isAuthenticated: boolean;
    isPending: boolean;
}
