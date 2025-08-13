import Booking from "../../model/booking.js"

export async function getAllBookings(req, res){
    try {
        const bookings = await Booking.find().sort({createdAt: -1});
        res.status(200).json(bookings);
    } catch (error) {
        console.log("Error in booking controller", error);
        res.status(500).json({message: "Internal server error"});
        
    }
}
