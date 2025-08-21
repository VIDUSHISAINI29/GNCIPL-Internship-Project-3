// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { Menu, X, User } from "lucide-react"; // icon library

// export default function Navbar() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);

//   // Simulated auth state (replace with your actual context/auth logic)
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "Events", path: "/events" },
//     { name: "My Bookings", path: "/bookings" },
//   ];

//   const isActive = (path) => location.pathname === path;

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setProfileOpen(false);
//     // Remove token from localStorage/session if used
//     navigate("/");
//   };

//   return (
//     <nav className="bg-black border-b-2 border-neonPink shadow-pinkGlow shadow-md relative">
//       <div className="container mx-auto px-6 py-2 flex justify-between items-center">
//         {/* Logo */}
//         <Link
//           to="/"
//           className="text-neonPink font-bold flex flex-col items-center text-xl tracking-wide"
//         >
//           <img
//             className="w-12 h-12 mb-[-10px]"
//             src="/src/assets/Logo.png"
//             alt="Sportify"
//           />
//           <span>Sportify</span>
//         </Link>

//         {/* Desktop Nav */}
//         <div className="hidden md:flex items-center space-x-8">
//           {navLinks.map(({ name, path }) => (
//             <Link
//               key={path}
//               to={path}
//               className={`relative text-textPrimary font-medium transition ${
//                 isActive(path) ? "text-neonBlue" : "hover:text-neonPink"
//               }`}
//             >
//               <span className="relative">{name}</span>
//             </Link>
//           ))}

//           {/* Auth Section */}
//           {!isLoggedIn ? (
//             <div className="flex space-x-4">
//               <Link
//                 to="/signup"
//                 className="px-4 py-1 rounded-full border-2 border-neonPink text-neonPink hover:bg-neonPink hover:text-black transition shadow-pinkGlow"
//               >
//                 Signup
//               </Link>
//               <Link
//                 to="/login"
//                 className="px-4 py-1 rounded-full border-2 border-neonBlue text-neonBlue hover:bg-neonBlue hover:text-black transition shadow-neonGlow"
//               >
//                 Login
//               </Link>
//             </div>
//           ) : (
//             <div className="relative">
//               <button
//                 onClick={() => setProfileOpen((prev) => !prev)}
//                 className="p-2 rounded-full border-2 border-neonBlue text-neonBlue hover:bg-neonBlue hover:text-black transition shadow-neonGlow"
//               >
//                 <User size={20} />
//               </button>

//               {profileOpen && (
//                 <div className="absolute right-0 mt-2 w-40 bg-cardBackground text-textPrimary rounded-lg shadow-lg border border-neonBlue shadow-neonGlow">
//                   <Link
//                     to="/profile"
//                     className="block px-4 py-2 hover:bg-neonPink hover:text-black transition"
//                     onClick={() => setProfileOpen(false)}
//                   >
//                     Profile
//                   </Link>
//                   <button
//                     onClick={handleLogout}
//                     className="w-full text-left px-4 py-2 hover:bg-neonPink hover:text-black transition"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="md:hidden text-neonPink"
//         >
//           {isOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Nav */}
//       {isOpen && (
//         <div className="md:hidden bg-black border-t border-neonPink px-6 py-4 space-y-4">
//           {navLinks.map(({ name, path }) => (
//             <Link
//               key={path}
//               to={path}
//               onClick={() => setIsOpen(false)}
//               className={`block text-lg font-medium ${
//                 isActive(path)
//                   ? "text-neonBlue"
//                   : "text-textPrimary hover:text-neonPink"
//               }`}
//             >
//               {name}
//             </Link>
//           ))}

//           {/* Auth Section in Mobile */}
//           {!isLoggedIn ? (
//             <div className="flex flex-col space-y-3 pt-4 border-t border-neonPink">
//               <Link
//                 to="/signup"
//                 className="px-4 py-2 rounded-full border-2 border-neonPink text-neonPink hover:bg-neonPink hover:text-black transition shadow-pinkGlow text-center"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Signup
//               </Link>
//               <Link
//                 to="/login"
//                 className="px-4 py-2 rounded-full border-2 border-neonBlue text-neonBlue hover:bg-neonBlue hover:text-black transition shadow-neonGlow text-center"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Login
//               </Link>
//             </div>
//           ) : (
//             <div className="pt-4 border-t border-neonPink">
//               <Link
//                 to="/profile"
//                 className="block px-4 py-2 hover:bg-neonPink hover:text-black transition"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Profile
//               </Link>
//               <button
//                 onClick={() => {
//                   handleLogout();
//                   setIsOpen(false);
//                 }}
//                 className="w-full text-left px-4 py-2 hover:bg-neonPink hover:text-black transition"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }





import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // ✅ import your context

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { isAuthenticated, user, logout } = useAuth(); // ✅ use context

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "My Bookings", path: "/bookings" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-black border-b-2 border-neonPink shadow-pinkGlow shadow-md relative">
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-neonPink font-bold flex flex-col items-center text-xl tracking-wide">
          <img
            className="w-12 h-12 mb-[-10px]"
            src="/src/assets/Logo.png"
            alt="Sportify"
          />
          <span>Sportify</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(({ name, path }) => (
            <Link
              key={path}
              to={path}
              className={`relative  font-medium transition ${
                isActive(path) ? "text-neonBlue" : "hover:text-neonPink"
              }`}
            >
              {name}
            </Link>
          ))}

          {/* Auth Section */}
          {!user ? (
            <div className="flex space-x-4">
              <Link
                to="/signup"
                className="px-4 py-1 rounded-full border-2 border-neonPink text-neonPink hover:bg-neonPink hover:text-black transition shadow-pinkGlow"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="px-4 py-1 rounded-full border-2 border-neonBlue text-neonBlue hover:bg-neonBlue hover:text-black transition shadow-neonGlow"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="p-2 rounded-full border-2 border-neonBlue text-neonBlue hover:bg-neonBlue hover:text-black transition shadow-neonGlow"
              >
                <User size={20} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-cardBackground text-textPrimary rounded-lg shadow-lg border border-neonBlue shadow-neonGlow">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-neonPink rounded-lg hover:text-black transition"
                    onClick={() => setProfileOpen(false)}
                  >
                    Profile {user?.name && `(${user.name})`}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left rounded-lg px-4 py-2 hover:bg-neonPink hover:text-black transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-neonPink"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-neonPink px-6 py-4 space-y-4">
          {navLinks.map(({ name, path }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setIsOpen(false)}
              className={`block text-lg font-medium ${
                isActive(path)
                  ? "text-neonBlue"
                  : "text-textPrimary hover:text-neonPink"
              }`}
            >
              {name}
            </Link>
          ))}

          {/* Auth Section in Mobile */}
          {!isAuthenticated ? (
            <div className="flex flex-col space-y-3 pt-4 border-t border-neonPink">
              <Link
                to="/signup"
                className="px-4 py-2 rounded-full border-2 border-neonPink text-neonPink hover:bg-neonPink hover:text-black transition shadow-pinkGlow text-center"
                onClick={() => setIsOpen(false)}
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 rounded-full border-2 border-neonBlue text-neonBlue hover:bg-neonBlue hover:text-black transition shadow-neonGlow text-center"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="pt-4 border-t border-neonPink">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-neonPink hover:text-black transition"
                onClick={() => setIsOpen(false)}
              >
                Profile {user?.name && `(${user.name})`}
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-neonPink hover:text-black transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
