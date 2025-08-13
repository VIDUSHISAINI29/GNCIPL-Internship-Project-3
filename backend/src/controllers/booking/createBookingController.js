// import Booking from "../../model/booking.js";
// import Event from "../../model/event.js";
// import User from "../../model/user.js";

// export async function createBooking(req, res) {
//     try {
//         const { event, user, seats, paymentStatus, bookingStatus } = req.body;

//         // 1. Check if event exists
//         const eventExists = await Event.findById(event);
//         if (!eventExists) {
//             return res.status(404).json({ message: "Event not found" });
//         }

//         // 2. Check if user exists
//         const userExists = await User.findById(user);
//         if (!userExists) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // 3. Calculate total price from seats
//         const totalPrice = seats.reduce((acc, seat) => acc + seat.price, 0);

//         // 4. Create booking
//         const newBooking = new Booking({
//             event,
//             user,
//             seats,
//             totalPrice,
//             paymentStatus,
//             bookingStatus
//         });

//         await newBooking.save();

//         res.status(201).json({
//             message: "Booking created successfully!",
//             booking: newBooking
//         });

//     } catch (error) {
//         console.error("Error in creating Booking:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }


import Booking from "../../model/booking.js";
import Event from "../../model/event.js";
import User from "../../model/user.js";

export async function createBooking(req, res) {
  try {
    const { eventId, userId, seats, totalPrice } = req.body;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if seats already booked
    for (let s of seats) {
      const seat = event.seats.find((e) => e.seatNumber === s.seatNumber);
      if (!seat || seat.isBooked) return res.status(400).json({ message: `Seat ${s.seatNumber} already booked` });
      seat.isBooked = true;
    }

    await event.save();

    // const totalPrice = seats.reduce((sum, s) => sum + s.price, 0);

    const booking = await Booking.create({
      user: userId,
      event: eventId,
      seats,
      totalPrice,
      bookingStatus: "confirmed",
      paymentStatus: "paid",
    });

    res.status(201).json({ booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
