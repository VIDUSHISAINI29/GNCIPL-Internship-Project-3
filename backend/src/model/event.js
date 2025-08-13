import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    venue:{
        type: String,
        required: true
    },
    totalSeats: {
        type: Number,
        required: true
    },
    seats: [
        {
            seatNumber: { type: String, required: true }, // e.g. A1, B5
            category: { type: String,
                enum:["Vip", "Normal"]
             }, // optional
            price: { type: Number, required: true },
            isBooked: { type: Boolean, default: false }
        }
    ],
      status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
        required: true
    },
},
{
    timestamps:true
});

const Event = mongoose.model('events collection', eventSchema);

export default Event;