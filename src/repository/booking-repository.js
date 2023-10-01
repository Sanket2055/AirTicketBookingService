const { Booking } = require('../models/index');
const { ValidationError, AppError } = require('../utils/errors/index');
const { StatusCodes } = require('http-status-codes');

class BookingRepository {
    async create(data) {
        try {
            const booking = await Booking.create(data);
            return booking
        } catch (error) {
            console.log('error in booking repo:', error);
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

    async update(bookingId, data) {
        try {
            // const booking = await Booking.update(data, {
            //     where: {
            //         id: bookingId
            //     }
            // });
            // return true;
            const booking = await Booking.findByPk(bookingId);
            if (!booking) {
                throw new AppError(
                    "RepositoryError",
                    "Cannot update booking",
                    "There was an error while updating a booking.Please try later",
                    StatusCodes.INTERNAL_SERVER_ERROR,
                );
            }
            if (data.status) {
                booking.status = data.status;
            }
            await booking.save();
            return booking;
        } catch (error) {
            console.log('error in booking repo:', error);

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