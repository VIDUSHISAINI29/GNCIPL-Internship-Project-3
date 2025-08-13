import { useEffect, useState } from "react";
import axios from "axios";

export default function BookSeats({ eventId }) {
  const [eventData, setEventData] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    // Fetch event details
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/event/${eventId}`)
      .then((res) => setEventData(res.data));

    // Fetch already booked seats
    axios.get(`/api/bookings?eventId=${eventId}`).then((res) => {
      const seats = res.data.flatMap((b) =>
        b.seats.map((s) => s.seatNumber)
      );
      setBookedSeats(seats);
    });
  }, [eventId]);

  const toggleSeat = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return; // ignore if booked
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const confirmBooking = async () => {
    await axios.post("/api/bookings", {
      event: eventId,
      user: "USER_ID_HERE", // Replace with actual logged-in user ID
      seats: selectedSeats.map((s) => ({ seatNumber: s, price: 500 })),
      totalPrice: selectedSeats.length * 500,
    });
    alert("Booking successful!");
  };

  if (!eventData) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-textSecondary">
        Loading event...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 bg-background/80 backdrop-blur-md shadow-lg">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-neonBlue text-center mb-10 tracking-wide drop-shadow-neonGlow">
        {eventData.title}
      </h1>

      {/* Seats Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(50px,1fr))] gap-3 max-w-3xl mx-auto mb-10">
        {Array.from({ length: eventData.seats }).map((_, index) => {
          const seatNumber = `S${index + 1}`;
          const isBooked = bookedSeats.includes(seatNumber);
          const isSelected = selectedSeats.includes(seatNumber);

          return (
            <button
              key={seatNumber}
              onClick={() => toggleSeat(seatNumber)}
              disabled={isBooked}
              className={`
                h-12 w-full rounded-lg font-semibold text-textPrimary shadow-md transition-all duration-200
                ${isBooked ? "bg-gray-700/80 cursor-not-allowed" : ""}
                ${isSelected && !isBooked ? "bg-neonPink hover:bg-pink-600" : ""}
                ${!isBooked && !isSelected ? "bg-neonBlue hover:bg-neonPink" : ""}
              `}
            >
              {seatNumber}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mb-8 text-sm text-textSecondary">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 bg-neonBlue rounded"></span> Available
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 bg-neonPink rounded"></span> Selected
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 bg-gray-700/80 rounded"></span> Booked
        </div>
      </div>

      {/* Confirm Booking */}
      <div className="flex justify-center">
        <button
          onClick={confirmBooking}
          disabled={selectedSeats.length === 0}
          className={`
            bg-gradient-to-r from-neonBlue to-neonPink
            hover:from-neonPink hover:to-neonBlue
            text-background font-semibold px-8 py-3 rounded-xl shadow-lg border-2 border-neonPink
            transition-all duration-300 hover:shadow-pinkGlow
            ${selectedSeats.length === 0 ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          Confirm Booking ({selectedSeats.length})
        </button>
      </div>
    </div>
  );
}
