import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);
  console.log("user = ", user);
  if (!user) return <p className="text-neonBlue text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-modernBgGradient p-4">
      <div className="bg-cardBackground rounded-2xl shadow-neonGlow max-w-md w-full p-8 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-neonBlue mb-6">Profile</h2>

        <div className="w-full">
          <p className="text-textPrimary text-lg mb-3">
            <span className="font-semibold text-neonPink">Name:</span> {user?.name || "N/A"}
          </p>
          <p className="text-textPrimary text-lg mb-3">
            <span className="font-semibold text-neonPink">Role:</span> {user?.role || "N/A"}
          </p>
        </div>

        
      </div>
    </div>
  );
}
