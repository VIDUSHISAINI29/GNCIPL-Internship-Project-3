import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { getAllEvents } from "../utils/api";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllEvents().then(setEvents);
  }, []);

  return (
    <div className="container min-h-screen mx-auto p-10">
      <h1 className="text-3xl font-bold text-center text-neonBlue mb-8">Upcoming Sports Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map(event => (
          <EventCard key={event._id} event={event} onBook={(e) => console.log("Booking", e)} />
        ))}
      </div>
    </div>
  );
}
