export default function EventCard({ event, onBook }) {
  // Convert to Date object safely
  const dateObj = new Date(event.date);

  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(dateObj);

  return (
    <div className="shadow-neonGlow bg-black rounded-xl p-5 hover:shadow-pinkGlow transition transform hover:scale-[1.01]">
  
      <h2 className="text-xl font-bold mt-4 text-textPrimary">{event.title}</h2>

      <p className="text-textSecondary">{formattedDate} | {event.venue}</p>
      <p className="mt-2 text-sm text-textPrimary">{event.description}</p>
      <button
        onClick={() => onBook(event)}
        className="mt-4 bg-neonBlue text-black font-semibold px-4 py-2 rounded-lg hover:bg-neonPink hover:text-white transition-all"
      >
        Book Now
      </button>
    </div>
  );
}
