const { BookingRepository } = require('../repository/index');
const { FLIGHT_SERVICE_PATH } = require('../config/serverConfig');
const axios = require('axios');
const { ServiceError } = require('../utils/errors');
class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data) {
        try {
            // flightId , userId , seatNumber
            const flightId = data.flightId;
            const userId = data.userId;
            const seatNumber = data.seatNumber;

            const getFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;

            // get flight details from flight service
            const response = await axios.get(getFlightRequestUrl);
            const flightData = response.data.data;
            let priceOfFlight = flightData.price;
            if (data.noOfSeats > flightData.totalSeats) {
                throw new ServiceError('Something went wrong in booking process', "Insufficient seats in flight");
            }

            let totalCost = priceOfFlight * data.noOfSeats;
            const bookingPayload = { ...data, totalCost };
            const booking = await this.bookingRepository.create(bookingPayload);

            const updateFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            // update flight total seats in flight service
            await axios.patch(updateFlightRequestUrl, {
                totalSeats: flightData.totalSeats - data.noOfSeats
            });

            const finalBooking = await this.bookingRepository.update(booking.id, { status: "approved" });
            return finalBooking;

        } catch (error) {

            if (error.name === "RepositoryError" || error.name === "ValidationError") {
                throw error;
            }
            console.log('error', error);
            throw new ServiceError(error);
        }

    }
}

module.exports = BookingService;