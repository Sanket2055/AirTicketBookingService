const { BookingService } = require('../services/index');
const { StatusCodes } = require('http-status-codes');
const bookingService = new BookingService();

const create = async (req, res) => {
    try {
        const response = await bookingService.createBooking(req.body);
        return res.status(StatusCodes.OK).json({
            message: "Booking created successfully",
            data: response,
            success: true,
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: {},
            success: false,
            error: error.explanation
        })
    }
}


module.exports = {
    create
};