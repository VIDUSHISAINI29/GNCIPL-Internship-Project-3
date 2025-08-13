import Event from "../../model/event.js"

export async function getAllEvents(req, res){
    try {
        const events = await Event.find().sort({createdAt: -1});
        res.status(200).json(events);
    } catch (error) {
        console.log("Error in event controller", error);
        res.status(500).json({message: "Internal server error"});
        
    }
}
