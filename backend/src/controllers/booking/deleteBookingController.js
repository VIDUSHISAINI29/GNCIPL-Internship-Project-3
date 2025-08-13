import Booking from "../../model/booking.js"


export async function deleteBooking(req, res) {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteBooking controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}