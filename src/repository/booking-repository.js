const { Booking } = require('../models/index');
const { ValidationError, AppError } = require('../utils/errors/index');
const { StatusCodes } = require('http-status-codes');

class BookingRepository {
    async create(booking) {
        try {
            const booking = await Booking.create(data);
            return booking
        } catch (error) {
            if (error.name == "SequelizeValidationError") {
                throw new ValidationError(error);
            }
            throw new AppError(
                "RepositoryError",
                "Cannot create booking",
                "There was an error while creating a booking.Please try later",
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async update() {
        try {
            const booking = await Booking.update(data, {
                where: {
                    id: id
                }
            });
            return booking;
        } catch (error) {
            if (error.name == "SequelizeValidationError") {
                throw new ValidationError(error);
            }
            throw new AppError(
                "RepositoryError",
                "Cannot update booking",
                "There was an error while updating a booking.Please try later",
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
        }
    }

}

module.exports = BookingRepository;