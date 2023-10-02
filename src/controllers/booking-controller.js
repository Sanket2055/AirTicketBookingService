const { BookingService } = require('../services/index');
const { StatusCodes } = require('http-status-codes');
const bookingService = new BookingService();
const { createChannel, publishMessage } = require("../utils/messageQueue")
const { EXCHANGE_NAME, REMINDER_BINDING_KEY } = require("../config/serverConfig")
class BookingController {
    constructor() {

    }
    async sendMessageToQueue(req, res) {
        const channel = await createChannel();
        const data = {
            message: "Sending message to queue"
        }
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(data));
        return res.status(StatusCodes.OK).json({
            message: "Message sent to queue",
        })
    }

    async create(req, res) {
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
}
module.exports = BookingController;