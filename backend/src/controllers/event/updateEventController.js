import Event from "../.././model/event.js"

export async function updateEvent(req, res){
    try {
        const {title, date, venue, seats, status} = req.body;
     //seats should be array of objects
     //status should be array
     const [day, month, year] = date.split("-");
        const formattedDate = new Date(year, month - 1, day);
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            {title, date : formattedDate, venue, seats, status},
            {
                new:true
            }
        );
        if (!updatedEvent) return res.status(404).json({ message: "Event not found" });

        res.status(200).json(updatedEvent);
    } catch (error) {
        console.log("Error in creating user in Event controller.", error);
        res.status(500).json({message: "Internal server error"});
    }
}

