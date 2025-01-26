'use client';

import { FaPlaneDeparture } from 'react-icons/fa';
import Navigation from '@/components/Navigation';
import { login } from '@/actions/auth';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
    const router = useRouter();
    const [state, action, pending] = useActionState(login, undefined);
    const [email, setEmail] = useState('staff@flightapp.com');
    const [password, setPassword] = useState('randompasswordforadmin');

    useEffect(() => {
        if (state?.success) {
            router.push('/dashboard');
        }
    }, [state, router]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            
            <div className="flex min-h-screen pt-24 md:pt-16">
                <div className="w-full max-w-md mx-auto p-6">
                    <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
                        <div className="p-8">
                            <div className="flex items-center justify-center mb-4">
                                <FaPlaneDeparture className="text-blue-600 text-3xl" />
                                <h1 className="text-2xl font-bold text-gray-800 ml-2">Welcome Back</h1>
                            </div>
                            
                            <p className="text-center text-gray-600 mb-8">
                                Sign in to access your account
                            </p>

                            <form action={action} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name='email'
                                        id='email'
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-colors text-gray-600"
                                        disabled={pending}
                                    />
                                </div>
                                {state?.errors?.email && <p className="text-red-500">{state?.errors?.email}</p>}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name='password'
                                        id='password'
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-colors text-gray-600"
                                        disabled={pending}
                                    />
                                </div>
                                {state?.errors?.password && <p className="text-red-500">{state?.errors?.password}</p>}

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                                            disabled={pending}
                                        />
                                        <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                            Remember me
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                                    disabled={pending}
                                >
                                    {pending ? 'Signing in...' : 'Sign In'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 