import Booking from "../../model/booking.js"


export async function getBookingById(req, res){
    // console.log('id = ',req.params)
    try {
        const booking = await Booking.findById(req.params.id);
        if(!booking){
          return  res.status(404).json({message: "Booking not found."})
        }
        res.json(booking)
    } catch (error) {
        console.log("Error in controller of get Booking by id.", error);
        res.status(500).json({message: "Internal Server Error"})
    }
}
