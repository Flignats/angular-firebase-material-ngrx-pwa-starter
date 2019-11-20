export interface AuthedUser {
    displayName: string | null;
    email: string | null;
    emailVerified: boolean;
    phoneNumber: string | null;
    photoUrl: string | null;
    refreshToken: string;
    uid: string;
}

export interface Authenticate {
    email: string;
    password: string;
}

export interface AuthState extends AuthedUser {
    error: any;
    isAuthenticated: boolean;
    isPending: boolean;
}
