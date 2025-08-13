import { generateQRCode } from '../../middleware/qrGenerator.js';
import Booking from '../../model/booking.js';
import Event from '../../model/event.js';
import User from '../../model/user.js';

// Generate QR code for a booking
export async function createQrCode(req, res){
    const {userId, eventId, bookingId} = req.query;
  try {
    const booking = await Booking.findById(bookingId);
    const event = await Event.findById(eventId);
    const user = await User.findById(userId);
// console.log('book = ',booking.seats[0])
    if (!booking) return res.status(404).json({ message: 'Booking not found' });


  const dateObj = new Date(event.date);

    const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(dateObj);

    // Encode booking details in QR
    const qrData = {
      bookingId: booking._id,
      user: user.name,
      event: event.title,
      venue: event.venue,
      date: formattedDate,
      seats: booking.seats[0].seatNumber,
      totalPrice: booking.totalPrice,
    };

    const qrCodeImage = await generateQRCode(qrData);

    res.json({ qrCode: qrCodeImage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'QR generation failed' });
  }

}