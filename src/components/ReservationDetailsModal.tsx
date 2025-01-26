import { FlightReservation } from '@/types/flight';
import { FaTimes } from 'react-icons/fa';

interface ReservationDetailsModalProps {
    reservation: FlightReservation | null;
    onClose: () => void;
}

export default function ReservationDetailsModal({ reservation, onClose }: ReservationDetailsModalProps) {
    if (!reservation) return null;

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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl z-10">
                    <h2 className="text-xl font-bold text-gray-900">Reservation Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>
                
                <div className="max-h-[calc(90vh-80px)] overflow-y-auto uiFriendlyScrollbar">
                    <div className="p-6 space-y-8">
                        {/* Booking Information */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Information</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Booking Reference</p>
                                    <p className="text-base text-gray-900">{reservation.bookingReference}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Status</p>
                                    <p className="text-base text-gray-900 capitalize">{reservation.status}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Booking Date</p>
                                    <p className="text-base text-gray-900">{formatDateTime(reservation.bookingDate)}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Total Price</p>
                                    <p className="text-base text-gray-900">{formatCurrency(reservation.totalPrice, reservation.currency)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Flight Details */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Flight Details</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Flight Number</p>
                                    <p className="text-base text-gray-900">{reservation.flightDetails.flightNumber}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Aircraft</p>
                                    <p className="text-base text-gray-900">{reservation.flightDetails.aircraft}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Departure</p>
                                    <p className="text-base text-gray-900">
                                        {reservation.flightDetails.departureAirport}
                                        <br />
                                        {formatDateTime(reservation.flightDetails.departureTime)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Arrival</p>
                                    <p className="text-base text-gray-900">
                                        {reservation.flightDetails.arrivalAirport}
                                        <br />
                                        {formatDateTime(reservation.flightDetails.arrivalTime)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Passengers */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Passengers</h3>
                            <div className="space-y-4">
                                {reservation.passengers.map((passenger) => (
                                    <div key={passenger.id} className="bg-gray-50 p-4 rounded-lg">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 mb-1">Name</p>
                                                <p className="text-base text-gray-900">{passenger.firstName} {passenger.lastName}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 mb-1">Seat</p>
                                                <p className="text-base text-gray-900">{passenger.seatNumber}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 mb-1">Passport</p>
                                                <p className="text-base text-gray-900">{passenger.passportNumber}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 mb-1">Nationality</p>
                                                <p className="text-base text-gray-900">{passenger.nationality}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Comments */}
                        {reservation.comments.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Comments</h3>
                                <div className="space-y-3">
                                    {reservation.comments.map((comment) => (
                                        <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-base text-gray-900">{comment.text}</p>
                                            <div className="mt-2 flex justify-between items-center">
                                                <span className="text-sm font-medium text-gray-600">{comment.createdBy}</span>
                                                <span className="text-sm text-gray-500">{formatDateTime(comment.createdAt)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 