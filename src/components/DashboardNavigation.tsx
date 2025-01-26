'use client';

import { FaPlaneDeparture, FaSignOutAlt, FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/auth-service';
import { useEffect, useState } from 'react';
import { UserData } from '@/types/auth';

export default function DashboardNavigation() {
    const router = useRouter();
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        const authService = AuthService.getInstance();
        const userData = authService.getUser();
        setUser(userData);
    }, []);

    const handleLogout = async () => {
        try {
            const authService = AuthService.getInstance();
            await authService.logout();
            setUser(null);
            router.replace('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            // Still try to redirect to login page even if logout fails
            router.replace('/login');
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/dashboard" className="flex items-center space-x-2">
                        <FaPlaneDeparture className="text-blue-600 text-2xl" />
                        <span className="text-xl font-bold text-gray-800">LumFlights</span>
                    </Link>

                    {/* User Info and Logout */}
                    <div className="flex items-center space-x-6">
                        {user && (
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                    <FaUser className="text-blue-600" />
                                </div>
                                <div className="hidden md:block">
                                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                                </div>
                            </div>
                        )}
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <FaSignOutAlt />
                            <span className="hidden md:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
} 