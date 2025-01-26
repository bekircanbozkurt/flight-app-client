import { apiClient } from '@/lib/api-client';
import { FlightReservation, ReservationSearchParams, PaginatedResponse } from '@/types/flight';

export class FlightService {
    private static instance: FlightService;

    private constructor() {}

    public static getInstance(): FlightService {
        if (!FlightService.instance) {
            FlightService.instance = new FlightService();
        }
        return FlightService.instance;
    }

    async getReservations(params?: ReservationSearchParams): Promise<PaginatedResponse<FlightReservation>> {
        try {
            const queryParams = new URLSearchParams();
            if (params?.startDate) queryParams.append('startDate', params.startDate);
            if (params?.endDate) queryParams.append('endDate', params.endDate);
            if (params?.page) queryParams.append('page', params.page.toString());
            if (params?.itemsPerPage) queryParams.append('itemsPerPage', params.itemsPerPage.toString());

            const endpoint = `/flight-reservations${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
            console.log('Fetching reservations from:', endpoint);
            
            return await apiClient<PaginatedResponse<FlightReservation>>(endpoint, {
                method: 'GET',
                credentials: 'include', // Ensure cookies are sent with the request
            });
        } catch (error) {
            console.error('Error fetching reservations:', error);
            throw error;
        }
    }
} 