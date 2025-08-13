// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} SportsEventHub. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <a href="#" className="hover:text-yellow-400">Privacy Policy</a>
          <a href="#" className="hover:text-yellow-400">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
