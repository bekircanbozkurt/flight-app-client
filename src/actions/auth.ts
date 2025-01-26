import { FormState, loginSchema } from "@/lib/definitions";
import { AuthService } from "@/services/auth-service";
import { AuthError } from "@/types/auth";

export async function login(state: FormState, formData: FormData) {
    const validatedData = loginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    });

    if (!validatedData.success) {
        return {
            errors: validatedData.error.flatten().fieldErrors,
            success: false
        };
    }

    try {
        const authService = AuthService.getInstance();
        const response = await authService.login(validatedData.data);
        
        // Verify login response
        if (!response.user) {
            return {
                errors: {
                    email: ['Invalid login response from server']
                },
                success: false
            };
        }

        // Login successful
        return { success: true };
        
    } catch (error) {
        const authError = error as AuthError;
        return {
            errors: authError.errors || {
                email: [authError.message]
            },
            success: false
        };
    }
}