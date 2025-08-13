import Event from "../.././model/event.js"


export async function getEventById(req, res){
    // console.log('id = ',req.params)
    try {
        const event = await Event.findById(req.params.id);
        if(!event){
          return  res.status(404).json({message: "Event not found."})
        }
        res.json(event)
    } catch (error) {
        console.log("Error in controller of get event by id.", error);
        res.status(500).json({message: "Internal Server Error"})
    }
}
