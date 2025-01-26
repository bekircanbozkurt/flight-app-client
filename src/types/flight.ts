export interface Passenger {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    passportNumber: string;
    nationality: string;
    seatNumber: string;
}

export interface FlightDetails {
    flightNumber: string;
    departureAirport: string;
    arrivalAirport: string;
    departureTime: string;
    arrivalTime: string;
    aircraft: string;
}

export interface Suggestion {
    id: string;
    type: string;
    description: string;
    status: string;
}

export interface Comment {
    id: string;
    text: string;
    createdAt: string;
    createdBy: string;
    type: string;
}

export interface FlightReservation {
    id: string;
    reservationId: string;
    bookingReference: string;
    bookingDate: string;
    status: string;
    passengers: Passenger[];
    flightDetails: FlightDetails;
    suggestions: Suggestion[];
    comments: Comment[];
    totalPrice: number;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ReservationSearchParams {
    startDate?: string;
    endDate?: string;
    page?: number;
    itemsPerPage?: number;
}

export interface PaginationMeta {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: PaginationMeta;
} 