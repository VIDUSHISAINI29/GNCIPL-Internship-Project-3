import Booking from "../../model/booking.js"


export async function getUserBookings(req, res) {
  try {
    const auth0UserId = req.user.sub;  // the user's unique id from Auth0

    // If you store the Auth0 userId directly as `user` field in Booking:
    const bookings = await Booking.find({ user: auth0UserId })
      .populate('event', 'title date venue')
      .exec();

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
}
