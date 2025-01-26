import { LoginCredentials, AuthResponse, UserData } from '@/types/auth';
import { apiClient } from '@/lib/api-client';

export class AuthService {
    private static instance: AuthService;
    private userKey = 'user_data';

    private constructor() {}

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        
        try {
            const response = await apiClient<AuthResponse>('/auth/login', {
                method: 'POST',
                body: JSON.stringify(credentials),
                credentials: 'include', // Include cookies in request
            });

            this.setUser(response.user);
            return response;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    private setUser(user: UserData): void {
        localStorage.setItem(this.userKey, JSON.stringify(user));
    }

    getUser(): UserData | null {
        if (typeof window === 'undefined') return null;
        const userData = localStorage.getItem(this.userKey);
        return userData ? JSON.parse(userData) : null;
    }

    async logout(): Promise<void> {
        try {
            // Call backend logout endpoint to clear the HTTP-only cookie
            await apiClient('/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
            
            // Clear local storage
            localStorage.removeItem(this.userKey);
        } catch (error) {
            console.error('Logout failed:', error);
            // Still clear local storage even if the API call fails
            localStorage.removeItem(this.userKey);
            throw error;
        }
    }

    isAuthenticated(): boolean {
        return !!this.getUser();
    }
} 