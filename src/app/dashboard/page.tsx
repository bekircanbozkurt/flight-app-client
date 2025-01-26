'use client';

import { useEffect, useState } from 'react';
import DashboardNavigation from '@/components/DashboardNavigation';
import { useGetReservationsQuery } from '@/store/api/flightApi';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FlightReservation } from '@/types/flight';
import ReservationDetailsModal from '@/components/ReservationDetailsModal';
import { AuthService } from '@/services/auth-service';

export default function DashboardPage() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedReservation, setSelectedReservation] = useState<FlightReservation | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);

    // Set default dates and check admin role on component mount
    useEffect(() => {
        if (!startDate && !endDate) {
            const defaultStartDate = '2024-12-01';
            const defaultEndDate = '2024-12-31';
            setStartDate(defaultStartDate);
            setEndDate(defaultEndDate);
        }

        const authService = AuthService.getInstance();
        const user = authService.getUser();
        setIsAdmin(user?.role === 'admin');
    }, []);

    const { data, error, isLoading, refetch } = useGetReservationsQuery({
        startDate: startDate || '2024-12-01',
        endDate: endDate || '2024-12-31',
        page: currentPage,
        itemsPerPage: 5
    }, {
        // Enable polling every 10 seconds
        pollingInterval: 10000,
        // Refetch on window focus
        refetchOnFocus: true,
        // Refetch on reconnect
        refetchOnReconnect: true,
    });

    const reservations = data?.data || [];
    const paginationMeta = data?.meta || null;

    const handleSearch = () => {
        setCurrentPage(1); // Reset to first page when searching
        refetch(); // Manually trigger a refetch when search parameters change
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleViewDetails = (reservation: FlightReservation) => {
        if (isAdmin) {
            setSelectedReservation(reservation);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'confirmed':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardNavigation />
            
            <div className="container mx-auto px-4 pt-24 pb-12 md:pt-20 md:pb-16 lg:max-w-6xl">
                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-6">
                    <div className="max-w-5xl mx-auto">
                        <h1 className="text-2xl font-bold text-gray-800 mb-8">Flight Reservations</h1>
                        
                        {/* Date Range Filter */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 bg-white [&::-webkit-calendar-picker-indicator]:bg-none [&::-webkit-calendar-picker-indicator]:hidden [-webkit-calendar-picker-indicator]:bg-none [-webkit-calendar-picker-indicator]:hidden"
                                    />
                                    <div 
                                        className="absolute right-0 top-0 h-full w-10 flex items-center justify-center cursor-pointer"
                                        onClick={() => {
                                            const input = document.querySelector('input[type="date"]') as HTMLInputElement;
                                            input?.showPicker();
                                        }}
                                    >
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">End Date</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 bg-white [&::-webkit-calendar-picker-indicator]:bg-none [&::-webkit-calendar-picker-indicator]:hidden [-webkit-calendar-picker-indicator]:bg-none [-webkit-calendar-picker-indicator]:hidden"
                                    />
                                    <div 
                                        className="absolute right-0 top-0 h-full w-10 flex items-center justify-center cursor-pointer"
                                        onClick={() => {
                                            const inputs = document.querySelectorAll('input[type="date"]');
                                            (inputs[1] as HTMLInputElement)?.showPicker();
                                        }}
                                    >
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-end">
                                <button
                                    onClick={handleSearch}
                                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                                >
                                    <FaSearch className="inline-block mr-2" />
                                    Search
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
                                Failed to load reservations. Please try again later.
                            </div>
                        )}

                        {/* Reservations Table */}
                        {isLoading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                                <p className="mt-4 text-gray-600">Loading reservations...</p>
                            </div>
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Ref</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Date</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                {isAdmin && (
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody key="reservations-tbody" className="bg-white divide-y divide-gray-200">
                                            {reservations.map((reservation: FlightReservation) => (
                                                <tr key={reservation.reservationId} className="hover:bg-gray-50">
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {reservation.bookingReference}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {formatDateTime(reservation.bookingDate)}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {reservation.flightDetails.flightNumber}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {reservation.flightDetails.departureAirport} → {reservation.flightDetails.arrivalAirport}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {formatDateTime(reservation.flightDetails.departureTime)}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {formatCurrency(reservation.totalPrice, reservation.currency)}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(reservation.status)}`}>
                                                            {reservation.status}
                                                        </span>
                                                    </td>
                                                    {isAdmin && (
                                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            <button
                                                                onClick={() => handleViewDetails(reservation)}
                                                                className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                                                                title="View Details"
                                                            >
                                                                Details
                                                            </button>
                                                        </td>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {reservations.length === 0 && (
                                        <div className="text-center py-12">
                                            <p className="text-gray-500">No reservations found for the selected date range.</p>
                                        </div>
                                    )}
                                </div>

                                {/* Pagination Controls */}
                                {paginationMeta && paginationMeta.totalPages > 1 && (
                                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
                                        <div className="flex flex-1 justify-between sm:hidden">
                                            <button
                                                onClick={() => handlePageChange(paginationMeta.currentPage - 1)}
                                                disabled={!paginationMeta.hasPreviousPage}
                                                className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                                                    paginationMeta.hasPreviousPage
                                                        ? 'text-gray-700 hover:bg-gray-50'
                                                        : 'text-gray-300 cursor-not-allowed'
                                                }`}
                                            >
                                                Previous
                                            </button>
                                            <button
                                                onClick={() => handlePageChange(paginationMeta.currentPage + 1)}
                                                disabled={!paginationMeta.hasNextPage}
                                                className={`relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                                                    paginationMeta.hasNextPage
                                                        ? 'text-gray-700 hover:bg-gray-50'
                                                        : 'text-gray-300 cursor-not-allowed'
                                                }`}
                                            >
                                                Next
                                            </button>
                                        </div>
                                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                            <div>
                                                <p className="text-sm text-gray-700">
                                                    Showing <span className="font-medium">{((paginationMeta.currentPage - 1) * paginationMeta.itemsPerPage) + 1}</span>
                                                    {' '}-{' '}
                                                    <span className="font-medium">
                                                        {Math.min(paginationMeta.currentPage * paginationMeta.itemsPerPage, paginationMeta.totalItems)}
                                                    </span>
                                                    {' '}of{' '}
                                                    <span className="font-medium">{paginationMeta.totalItems}</span> results
                                                </p>
                                            </div>
                                            <div>
                                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                                    <button
                                                        onClick={() => handlePageChange(paginationMeta.currentPage - 1)}
                                                        disabled={!paginationMeta.hasPreviousPage}
                                                        className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                                                            !paginationMeta.hasPreviousPage ? 'cursor-not-allowed' : 'hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        <span className="sr-only">Previous</span>
                                                        <FaChevronLeft className="h-5 w-5" aria-hidden="true" />
                                                    </button>
                                                    {Array.from({ length: Math.min(5, paginationMeta.totalPages) }, (_, i) => {
                                                        let pageNumber;
                                                        if (paginationMeta.totalPages <= 5) {
                                                            pageNumber = i + 1;
                                                        } else {
                                                            const middle = Math.min(
                                                                Math.max(paginationMeta.currentPage, 3),
                                                                paginationMeta.totalPages - 2
                                                            );
                                                            pageNumber = middle - 2 + i;
                                                        }
                                                        return (
                                                            <button
                                                                key={pageNumber}
                                                                onClick={() => handlePageChange(pageNumber)}
                                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                                                    pageNumber == paginationMeta.currentPage
                                                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                                                                }`}
                                                            >
                                                                {pageNumber}
                                                            </button>
                                                        );
                                                    })}
                                                    <button
                                                        onClick={() => handlePageChange(paginationMeta.currentPage + 1)}
                                                        disabled={!paginationMeta.hasNextPage}
                                                        className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                                                            !paginationMeta.hasNextPage ? 'cursor-not-allowed' : 'hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        <span className="sr-only">Next</span>
                                                        <FaChevronRight className="h-5 w-5" aria-hidden="true" />
                                                    </button>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Reservation Details Modal */}
            {selectedReservation && (
                <ReservationDetailsModal
                    reservation={selectedReservation}
                    onClose={() => setSelectedReservation(null)}
                />
            )}
        </div>
    );
} 