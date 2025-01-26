const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

class ApiError extends Error {
    constructor(public message: string, public status?: number, public errors?: Record<string, string[]>) {
        super(message);
        this.name = 'ApiError';
    }
}

export async function apiClient<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
    };


    try {
        const response = await fetch(url, {
            ...options,
            headers,
            credentials: 'include', // This ensures cookies are sent with the request
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({
                message: 'An error occurred',
                errors: {}
            }));
            
            console.error('API Error:', {
                status: response.status,
                statusText: response.statusText,
                error
            });

            throw new ApiError(
                error.message || 'An error occurred',
                response.status,
                error.errors
            );
        }

        // Check if response is empty or not JSON
        const contentType = response.headers.get('content-type');
        if (response.status === 204 || !contentType?.includes('application/json')) {
            return {} as T;
        }

        const data = await response.json();
        console.log('API Response:', { endpoint, status: response.status, data });
        return data;
    } catch (error) {
        if (error instanceof ApiError) throw error;
        console.error('Network Error:', error);
        throw new ApiError('Network error occurred while making the request');
    }
} 