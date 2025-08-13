// import { useEffect, useMemo, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import axios from 'axios'
// /**
//  * Props:
//  * - open (bool)
//  * - onClose (fn)
//  * - event (object) => contains seats: [{seatNumber, section, price, isBooked}]
//  * - onBooked (fn) => called with booking result
//  * - authToken (string) optional
//  */
// export default function BookingModal({ open, onClose, event, onBooked, authToken }) {
//   const { user } = useAuth();
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [successMsg, setSuccessMsg] = useState(null);

//   useEffect(() => {
//     if (!open) {
//       setSelectedSeats([]);
//       setError(null);
//       setSuccessMsg(null);
//     }
//   }, [open]);

//   // Sort seats (numeric order after removing letter prefix)
//   const sortedSeats = useMemo(() => {
//     if (!event?.seats) return [];
//     return [...event.seats].sort((a, b) => {
//       const na = parseInt(a.seatNumber.replace(/^[A-Za-z]+/, ""), 10) || 0;
//       const nb = parseInt(b.seatNumber.replace(/^[A-Za-z]+/, ""), 10) || 0;
//       return na - nb;
//     });
//   }, [event]);

//   const toggleSeat = (seat) => {
//     if (seat.isBooked) return;
//     const exists = selectedSeats.find((s) => s.seatNumber === seat.seatNumber);
//     if (exists) {
//       setSelectedSeats(selectedSeats.filter((s) => s.seatNumber !== seat.seatNumber));
//     } else {
//       setSelectedSeats([...selectedSeats, seat]);
//     }
//   };

//   const totalPrice = selectedSeats.reduce((sum, s) => sum + (s.price || 0), 0);

//   const handleConfirmBooking = async () => {
//     if (!user) {
//       setError("You must be logged in to book seats.");
//       return;
//     }

//     if (selectedSeats.length === 0) {
//       setError("Please select at least one seat.");
//       return;
//     }

//     setError(null);
//     setLoading(true);

//     try {
//       const { createBooking } = await import("../utils/api.js");

//       // 1️⃣ Create booking
//       const body = {
//         eventId: event._id,
//         userId: user._id,
//         seats: selectedSeats.map((s) => ({ seatNumber: s.seatNumber, price: s.price })),
//         totalPrice,
//       };

//       const bookingResult = await createBooking(body);
//       setSuccessMsg("Booking successful! Check your email for ticket.");
//       console.log("book = ", bookingResult)
//       // 2️⃣ Fetch QR code from backend
//       const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/qr`, {
//         params: {
//           userId: user._id,
//           eventId: event._id,
//           bookingId: bookingResult.booking._id
//         }
//       });
//       const data = res.data; // <-- axios automatically parses JSON
//       if (!data.qrCode) throw new Error("Failed to generate QR code");

//       // 3️⃣ Trigger download
//       const link = document.createElement("a");
//       link.href = data.qrCode; // base64 image URL
//       link.download = `Ticket-${bookingResult.booking._id}.png`;
//       link.click();

//       setLoading(false);

//       if (onBooked) onBooked(bookingResult);
//     } catch (err) {
//       setLoading(false);
//       setError(err.message || "Booking failed. Try again.");
//     }
//   };


//   if (!open) return null;

//   return (
//     <div className="fixed my-10  inset-0 z-50 flex items-center justify-center p-4">
//       {/* Overlay */}
//       <div className="absolute inset-0 " onClick={onClose}></div>

//       {/* Modal Container */}
//       <div className="relative w-full max-w-4xl bg-black rounded-2xl shadow-neonGlow overflow-hidden transform transition-all max-h-screen overflow-y-auto">
//         {/* Header */}
//         <div className="p-6 bg-gradient-to-r from-neonBlue to-neonPink text-textPrimary">
//           <div className="flex justify-between items-center">
//             <div>
//               <h3 className="text-2xl font-extrabold">{event.title}</h3>
//               <p className="text-sm opacity-80">
//                 {new Date(event.date).toLocaleString()} • {event.venue}
//               </p>
//             </div>
//             <button
//               className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-md transition"
//               onClick={onClose}
//               aria-label="Close"
//             >
//               ✕
//             </button>
//           </div>
//         </div>

//         {/* Body */}
//         <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Seat Grid */}
//           <div className="md:col-span-2">
//             <div className="mb-4 text-sm text-textSecondary">
//               Tap seats to select. <span className="text-neonBlue">Blue</span> = available, <span className="text-neonPink">Pink</span> = selected, <span className="text-gray-600">Gray</span> = booked.
//             </div>

//             <div className="bg-background-light rounded-xl p-4 border border-neonBlue">
//               {/* Legend */}
//               <div className="flex items-center gap-4 mb-4 flex-wrap">
//                 <Legend color="bg-neonBlue" label="Available" />
//                 <Legend color="bg-neonPink" label="Selected" />
//                 <Legend color="bg-gray-600" label="Booked" />
//               </div>

//               {/* Responsive Seat box layout */}
//               <div
//                 className="grid gap-2 w-full sm:max-w-md"
//                 style={{
//                   gridTemplateColumns: "repeat(auto-fill, minmax(44px, 1fr))",
//                 }}
//               >
//                 {sortedSeats.map((s) => {
//                   const isSelected = selectedSeats.some((sel) => sel.seatNumber === s.seatNumber);
//                   const baseClasses =
//                     "w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-md text-xs sm:text-sm font-medium cursor-pointer select-none transition transform";

//                   const classes = s.isBooked
//                     ? `${baseClasses} bg-gray-600 text-gray-400 cursor-not-allowed`
//                     : isSelected
//                       ? `${baseClasses} bg-neonPink text-background shadow-neonGlow`
//                       : `${baseClasses} bg-neonBlue text-black hover:scale-105`;

//                   return (
//                     <div
//                       key={s.seatNumber}
//                       className={classes}
//                       onClick={() => toggleSeat(s)}
//                       title={`${s.seatNumber} — ₹${s.price} — ${s.section || "General"}`}
//                     >
//                       {s.seatNumber}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Booking Summary */}
//           <div className="border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-4">
//             <div className="bg-background-light rounded-lg p-4 shadow-neonShadow border border-neonBlue">
//               <h4 className="text-lg font-bold mb-2 text-textPrimary">Booking Summary</h4>
//               <div className="text-sm text-textSecondary mb-3">
//                 Selected seats: {selectedSeats.length}
//               </div>

//               <ul className="space-y-2 text-neonPink mb-4">
//                 {selectedSeats.map((s) => (
//                   <li key={s.seatNumber} className="flex justify-between">
//                     <span className="font-medium">{s.seatNumber}</span>
//                     <span>₹{s.price}</span>
//                   </li>
//                 ))}
//               </ul>

//               <div className="flex justify-between text-neonBlue items-center mb-4">
//                 <div className="text-md font-bold text-textSecondary">Total :</div>
//                 <div className="text-xl font-extrabold">₹{totalPrice}</div>
//               </div>

//               {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
//               {successMsg && <div className="text-sm text-green-600 mb-2">{successMsg}</div>}

//               <button
//                 onClick={handleConfirmBooking}
//                 disabled={loading || selectedSeats.length === 0}
//                 className={`w-full py-2 rounded-lg font-semibold text-background ${loading ? "bg-neonPink/70 cursor-wait" : "bg-neonPink hover:bg-neonPink/90"
//                   } transition`}
//               >
//                 {loading ? "Booking..." : "Confirm  (Demo)"}
//               </button>

//               <div className="text-xs text-textSecondary mt-3">
//                 Payments are simulated in demo mode. Integrate Stripe for live payments.
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="p-4 text-center text-xs text-textSecondary">
//           Powered by Sportify • demo UI
//         </div>
//       </div>
//     </div>
//   );
// }

// // Legend helper with theme colors
// function Legend({ color, label }) {
//   return (
//     <div className="flex items-center gap-2">
//       <span className={`w-4 h-4 rounded-sm ${color} border border-neonBlue`}></span>
//       <span className="text-sm text-textSecondary">{label}</span>
//     </div>
//   );
// }




// NEW_MODAL = 



import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import html2canvas from "html2canvas";

/**
 * Props:
 * - open (bool)
 * - onClose (fn)
 * - event (object) => contains seats: [{seatNumber, section, price, isBooked}]
 * - onBooked (fn) => called with booking result
 * - authToken (string) optional
 */
export default function BookingModal({ open, onClose, event, onBooked, authToken }) {
  const { user } = useAuth();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    if (!open) {
      setSelectedSeats([]);
      setError(null);
      setSuccessMsg(null);
    }
  }, [open]);

  const sortedSeats = useMemo(() => {
    if (!event?.seats) return [];
    return [...event.seats].sort((a, b) => {
      const na = parseInt(a.seatNumber.replace(/^[A-Za-z]+/, ""), 10) || 0;
      const nb = parseInt(b.seatNumber.replace(/^[A-Za-z]+/, ""), 10) || 0;
      return na - nb;
    });
  }, [event]);

  const toggleSeat = (seat) => {
    if (seat.isBooked) return;
    const exists = selectedSeats.find((s) => s.seatNumber === seat.seatNumber);
    if (exists) {
      setSelectedSeats(selectedSeats.filter((s) => s.seatNumber !== seat.seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const totalPrice = selectedSeats.reduce((sum, s) => sum + (s.price || 0), 0);

  const handleConfirmBooking = async () => {
    if (!user) {
      setError("You must be logged in to book seats.");
      return;
    }

    if (selectedSeats.length === 0) {
      setError("Please select at least one seat.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // Create booking
      const { createBooking } = await import("../utils/api.js");

      const body = {
        eventId: event._id,
        userId: user._id,
        seats: selectedSeats.map((s) => ({ seatNumber: s.seatNumber, price: s.price })),
        totalPrice,
      };

      const bookingResult = await createBooking(body);
      setSuccessMsg("Booking successful! Check your email for ticket.");

      // Fetch QR code
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/qr`, {
        params: {
          userId: user._id,
          eventId: event._id,
          bookingId: bookingResult.booking._id,
        },
      });

      const qrCode = res.data.qrCode;
      if (!qrCode) throw new Error("Failed to generate QR code");

      // Generate ticket element
      const ticketDiv = document.createElement("div");
      ticketDiv.style.position = "absolute";
      ticketDiv.style.left = "-9999px";
      ticketDiv.style.top = "-9999px";
      ticketDiv.style.background = "white";
      ticketDiv.style.color = "black";
      ticketDiv.style.padding = "20px";
      ticketDiv.style.borderRadius = "12px";
      ticketDiv.style.width = "300px";

      // Title
      const title = document.createElement("h2");
      title.innerText = event.title;
      title.style.fontWeight = "bold";
      title.style.fontSize = "20px";
      title.style.marginBottom = "8px";
      ticketDiv.appendChild(title);

      // Date
      const dateP = document.createElement("p");
      dateP.innerText = `Date: ${new Date(event.date).toLocaleString()}`;
      ticketDiv.appendChild(dateP);

      // Venue
      const venueP = document.createElement("p");
      venueP.innerText = `Venue: ${event.venue}`;
      ticketDiv.appendChild(venueP);

      // Seats
      const seatsP = document.createElement("p");
      seatsP.innerText = `Seats: ${selectedSeats.map((s) => s.seatNumber).join(", ")}`;
      ticketDiv.appendChild(seatsP);

      // Total
      const totalP = document.createElement("p");
      totalP.innerText = `Total: ₹${totalPrice}`;
      ticketDiv.appendChild(totalP);

      // QR Code
      const qrImg = document.createElement("img");
      qrImg.src = qrCode;
      qrImg.alt = "QR Code";
      qrImg.style.marginTop = "16px";
      qrImg.style.width = "128px";
      qrImg.style.height = "128px";
      ticketDiv.appendChild(qrImg);

      // Append to body, generate canvas, download
      document.body.appendChild(ticketDiv);
      const canvas = await html2canvas(ticketDiv);
      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image;
      link.download = `Ticket-${bookingResult.booking._id}.png`;
      link.click();

      document.body.removeChild(ticketDiv);

      setLoading(false);
      if (onBooked) onBooked(bookingResult);
    } catch (err) {
      setLoading(false);
      setError(err.message || "Booking failed. Try again.");
    }
  };

  return (
    <>
      {/* Modal */}
      <div
        className={`fixed my-10 inset-0 z-50 flex items-center justify-center p-4 transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div className="absolute inset-0" onClick={onClose}></div>

        {/* Modal Container */}
        <div className="relative w-full max-w-4xl bg-black rounded-2xl shadow-neonGlow overflow-hidden transform transition-all max-h-screen overflow-y-auto">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-neonBlue to-neonPink text-textPrimary">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-extrabold">{event?.title}</h3>
                <p className="text-sm opacity-80">
                  {event ? new Date(event.date).toLocaleString() : ""} • {event?.venue}
                </p>
              </div>
              <button
                className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-md transition"
                onClick={onClose}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Seat Grid */}
            <div className="md:col-span-2">
              <div className="mb-4 text-sm text-textSecondary">
                Tap seats to select. <span className="text-neonBlue">Blue</span> = available,{" "}
                <span className="text-neonPink">Pink</span> = selected, <span className="text-gray-600">Gray</span> = booked.
              </div>

              <div className="bg-background-light rounded-xl p-4 border border-neonBlue">
                {/* Legend */}
                <div className="flex items-center gap-4 mb-4 flex-wrap">
                  <Legend color="bg-neonBlue" label="Available" />
                  <Legend color="bg-neonPink" label="Selected" />
                  <Legend color="bg-gray-600" label="Booked" />
                </div>

                <div
                  className="grid gap-2 w-full sm:max-w-md"
                  style={{ gridTemplateColumns: "repeat(auto-fill, minmax(44px, 1fr))" }}
                >
                  {sortedSeats.map((s) => {
                    const isSelected = selectedSeats.some((sel) => sel.seatNumber === s.seatNumber);
                    const baseClasses =
                      "w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-md text-xs sm:text-sm font-medium cursor-pointer select-none transition transform";

                    const classes = s.isBooked
                      ? `${baseClasses} bg-gray-600 text-gray-400 cursor-not-allowed`
                      : isSelected
                      ? `${baseClasses} bg-neonPink text-background shadow-neonGlow`
                      : `${baseClasses} bg-neonBlue text-black hover:scale-105`;

                    return (
                      <div
                        key={s.seatNumber}
                        className={classes}
                        onClick={() => toggleSeat(s)}
                        title={`${s.seatNumber} — ₹${s.price} — ${s.section || "General"}`}
                      >
                        {s.seatNumber}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-4">
              <div className="bg-background-light rounded-lg p-4 shadow-neonShadow border border-neonBlue">
                <h4 className="text-lg font-bold mb-2 text-textPrimary">Booking Summary</h4>
                <div className="text-sm text-textSecondary mb-3">Selected seats: {selectedSeats.length}</div>

                <ul className="space-y-2 text-neonPink mb-4">
                  {selectedSeats.map((s) => (
                    <li key={s.seatNumber} className="flex justify-between">
                      <span className="font-medium">{s.seatNumber}</span>
                      <span>₹{s.price}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between text-neonBlue items-center mb-4">
                  <div className="text-md font-bold text-textSecondary">Total :</div>
                  <div className="text-xl font-extrabold">₹{totalPrice}</div>
                </div>

                {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
                {successMsg && <div className="text-sm text-green-600 mb-2">{successMsg}</div>}

                <button
                  onClick={handleConfirmBooking}
                  disabled={loading || selectedSeats.length === 0}
                  className={`w-full py-2 rounded-lg font-semibold text-background ${
                    loading ? "bg-neonPink/70 cursor-wait" : "bg-neonPink hover:bg-neonPink/90"
                  } transition`}
                >
                  {loading ? "Booking..." : "Confirm  (Demo)"}
                </button>

                <div className="text-xs text-textSecondary mt-3">
                  Payments are simulated in demo mode. Integrate Stripe for live payments.
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 text-center text-xs text-textSecondary">Powered by Sportify • demo UI</div>
        </div>
      </div>
    </>
  );
}

// Legend helper
function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-4 h-4 rounded-sm ${color} border border-neonBlue`}></span>
      <span className="text-sm text-textSecondary">{label}</span>
    </div>
  );
}
