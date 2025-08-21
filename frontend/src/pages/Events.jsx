import { useEffect, useState } from "react";
import { getAllEvents, getEventById } from "../utils/api";
import BookingModal from "../components/BookingModal";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const ev = await getAllEvents();
        setEvents(ev);
      } catch (err) {
        console.error("Failed to load events", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const openBooking = async (eventId) => {
    try {
      setLoading(true);
      const ev = await getEventById(eventId);
      console.log("event = ",ev)
      setSelectedEvent(ev);
      setModalOpen(true);
    } catch (err) {
      console.error("Failed to fetch event details", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBooked = () => {
    setModalOpen(false);
    setSelectedEvent(null);
    (async () => {
      const ev = await getAllEvents();
      setEvents(ev);
    })();
  };

  return (
    <div className="min-h-screen hover:cursor-pointer  py-10 px-4">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-neonBlue drop-shadow-neonGlow">
        All Events
      </h1>

      {loading && (
        <p className="text-center text-textSecondary animate-pulse">
          Loading events…
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
        {events.map((e) => (
          <div
            key={e._id}
            className="bg-black rounded-2xl shadow-neonGlow overflow-hidden 
                       transform hover:-translate-y-2 transition duration-300 
                       hover:shadow-pinkGlow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-textPrimary">{e.title}</h2>
                <span className="text-sm text-textSecondary">
                  {new Date(e.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              <p className="text-sm text-textSecondary mt-2">{e.venue}</p>

              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    e.status === "upcoming"
                      ? "bg-neonBlue/20 text-neonBlue"
                      : "bg-gray-700 text-textSecondary"
                  }`}
                >
                  {e.status}
                </span>

                <button
                  onClick={() => openBooking(e._id)}
                  className="bg-neonPink text-white px-4 py-2 rounded-lg 
                             hover:shadow-pinkGlow hover:scale-105 
                             transition-transform duration-300"
                >
                  Book
                </button>
              </div>

              <div className="mt-4 text-sm text-textSecondary">
                Seats: {e.seats?.length ?? 0}
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && selectedEvent && (
        <BookingModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          event={selectedEvent}
          onBooked={handleBooked}
        />
      )}
    </div>
  );
}
