export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    user: UserData;
}

export interface UserData {
    id: string;
    email: string;
    name?: string;
    role: string;
}

export interface AuthError {
    message: string;
    errors?: Record<string, string[]>;
}

export interface Session {
    user: UserData;
    access_token: string;
}