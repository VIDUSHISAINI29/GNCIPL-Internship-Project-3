

export async function getAllEvents() {
    console.log('meta= ', import.meta.env.VITE_BACKEND_URL)
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/events-list`);
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

export async function getEventById(eventId) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/event/${eventId}`);
  if (!res.ok) throw new Error("Failed to fetch event");
  return res.json();
}

/**
 * createBooking
 * body: { eventId, seats: [{seatNumber, price}], totalPrice }
 * NOTE: attach Authorization header if user is logged in
 */
// utils/api.js
export async function createBooking(bookingBody) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/create-booking`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingBody),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Booking failed");
  return data;
}

