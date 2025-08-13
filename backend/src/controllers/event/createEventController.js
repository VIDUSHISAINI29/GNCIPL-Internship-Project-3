    import Event from "../.././model/event.js"

    export async function createEvent(req, res){
        try {
            const {title, date, venue, totalSeats, seats, status} = req.body;
            const [day, month, year] = date.split("-");
            const formattedDate = new Date(year, month - 1, day);
            const newEvent = new Event({title, date : formattedDate, venue, totalSeats, seats, status});
            await newEvent.save();
            res.status(201).json({message:"Event created successfully!"});
        } catch (error) {
            console.log("Error in creating Event in user controller.", error);
            res.status(500).json({message: "Internal server error"});
        }
    }
