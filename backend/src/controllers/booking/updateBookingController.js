import Booking from "../../model/booking.js"

export async function updateBooking(req, res){
    try {
        const {event, user, seats, totalPrice, paymentStatus, bookingStatus} = req.body;
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            {event, user, seats, totalPrice, paymentStatus, bookingStatus},
            {
                new:true
            }
        );
        if (!updatedBooking) return res.status(404).json({ message: "Booking not found" });

        res.status(200).json(updatedBooking);
    } catch (error) {
        console.log("Error in creating booking in Booking controller.", error);
        res.status(500).json({message: "Internal server error"});
    }
}

