// controllers/booking/getBookedSeatsController.js
import Booking from "../../model/booking.js";

export async function getBookedSeats(req, res) {
    try {
        const { eventId } = req.params;

        const bookings = await Booking.find({ event: eventId, bookingStatus: 'confirmed' });
        const bookedSeats = bookings.flatMap(b => b.seats.map(s => s.seatNumber));

        res.json({ bookedSeats });
    } catch (error) {
        console.error("Error getting booked seats", error);
        res.status(500).json({ message: "Server error" });
    }
}
