import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FlightReservation, PaginationMeta } from '@/types/flight';

interface ReservationsResponse {
    data: FlightReservation[];
    meta: PaginationMeta;
}

interface GetReservationsParams {
    startDate: string;
    endDate: string;
    page: number;
    itemsPerPage: number;
}

// Type for the raw response from the API
interface RawReservationResponse extends Omit<ReservationsResponse, 'data'> {
    data: Array<Omit<FlightReservation, 'createdAt' | 'updatedAt'> & {
        createdAt: string;
        updatedAt: string;
    }>;
}

export const flightApi = createApi({
    reducerPath: 'flightApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
        credentials: 'include',
    }),
    tagTypes: ['Reservations'],
    endpoints: (builder) => ({
        getReservations: builder.query<ReservationsResponse, GetReservationsParams>({
            query: (params) => ({
                url: '/flight-reservations',
                method: 'GET',
                params,
            }),
            // Transform response to convert string dates to Date objects
            transformResponse: (response: RawReservationResponse): ReservationsResponse => ({
                data: response.data.map(reservation => ({
                    ...reservation,
                    createdAt: new Date(reservation.createdAt),
                    updatedAt: new Date(reservation.updatedAt),
                })),
                meta: response.meta,
            }),
            // Properly cache and invalidate data
            providesTags: (result) =>
                result
                    ? [
                          ...result.data.map(({ id }) => ({ 
                              type: 'Reservations' as const, 
                              id 
                          })),
                          { type: 'Reservations', id: 'LIST' },
                      ]
                    : [{ type: 'Reservations', id: 'LIST' }],
            // Keep unused data cached for 60 seconds
            keepUnusedDataFor: 60,
        }),
    }),
});

export const { useGetReservationsQuery } = flightApi; 