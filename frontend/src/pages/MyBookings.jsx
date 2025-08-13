import React, { useEffect, useState, useMemo, use } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const GenerateMyBookings = () => {
    const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [resEvents, setResEvents] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchBookingsAndEvents = async () => {
      try {
        const resBooking = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/bookings-list`);
        const userBookingsOnly = [];
        resBooking.data.map((booking) =>{
          console.log('user Id = ', user._id)
          console.log('user Id = ', booking.user)
          if(booking.user == user._id){
            userBookingsOnly.push(booking);

          }
        })
        console.log(resBooking.data)
        setBookings(userBookingsOnly);

        const eventIds = resBooking.data.map((booking) => booking.event);
        const eventsResponses = await Promise.all(
          eventIds.map((id) => axios.get(`${import.meta.env.VITE_BACKEND_URL}/event/${id}`))
        );
        setResEvents(eventsResponses.map((res) => res.data));
      } catch (error) {
        console.error("Error fetching bookings or events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingsAndEvents();
  }, []);

  const eventMap = useMemo(
    () => resEvents.reduce((acc, event) => ({ ...acc, [event._id]: event }), {}),
    [resEvents]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-textSecondary">
        Loading your bookings...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 bg-black/40 backdrop-blur-m shadow-lg py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-neonBlue text-center mb-12 tracking-wide drop-shadow-neonGlow">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="text-center text-textSecondary text-lg italic">
          You haven’t booked any tickets yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {bookings.map((booking) => {
            const event = eventMap[booking.event];

            return (
              <div
                key={booking._id}
                className="bg-black border border-neonBlue rounded-3xl p-6 shadow-md 
                           transform transition-transform duration-300 hover:scale-[1.01] hover:cursor-pointer 
                           hover:shadow-neonGlow"
              >
                {/* Title + Status */}
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-2xl font-semibold text-textPrimary tracking-wide">
                    {event ? event.title : "Loading..."}
                  </h2>
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      booking.bookingStatus === "confirmed"
                        ? "bg-green-400 text-green-900 shadow-md"
                        : "bg-yellow-400 text-yellow-900 shadow-md"
                    }`}
                  >
                    {booking.bookingStatus}
                  </span>
                </div>

                {/* Event Info */}
                <div className="space-y-2 text-sm">
                  <p className="text-textSecondary">
                    Date:{" "}
                    <span className="font-medium text-textPrimary">
                      {event ? new Date(event.date).toLocaleDateString() : "-"}
                    </span>
                  </p>
                  <p className="text-textSecondary">
                    Venue:{" "}
                    <span className="font-medium text-textPrimary">{event ? event.venue : "-"}</span>
                  </p>
                  <p className="text-textSecondary">
                    Seat Number:{" "}
                    <span className="font-medium text-textPrimary">
                      {booking.seats?.map((seat) => seat.seatNumber).join(", ")}
                    </span>
                  </p>
                  <p className="text-textSecondary">
                    Price:{" "}
                    <span className="font-medium text-textPrimary">
                      {booking.seats?.map((seat) => seat.price).join(", ")}
                    </span>
                  </p>
                  <p className="text-textSecondary">
                    Seat Category:{" "}
                    <span className="font-medium text-textPrimary">
                      {event?.seats?.map((seat) => booking.seats?.map((s) => {
                        if(s.seatNumber == seat.seatNumber ){
                          return seat.category
                        }
                      })) || "-"}
                    </span>
                  </p>
                </div>

                {/* View Ticket Button */}
                <div className="text-right mt-6">
                  <button
                    className="bg-gradient-to-r from-neonBlue to-neonPink
                               hover:from-neonPink hover:to-neonBlue
                               text-background font-semibold px-6 py-2 rounded-xl shadow-lg
                               transition-all duration-400
                               hover:shadow-pinkGlow border-2 border-neonPink"
                  >
                    View Ticket
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GenerateMyBookings;
