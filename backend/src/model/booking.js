import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    seats: [
        {
            seatNumber: { type: String, required: true },
            price: { type: Number, required: true }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    bookingStatus: {
        type: String,
        enum: ['confirmed', 'cancelled'],
        default: 'confirmed'
    }
}, { timestamps: true });

const Booking = mongoose.model('bookings collection', bookingSchema);

export default Booking;
