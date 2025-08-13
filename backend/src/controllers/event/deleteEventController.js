import Event from "../.././model/event.js"


export async function deleteEvent(req, res) {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteEvent controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}