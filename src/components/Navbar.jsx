import React from "react";
import { logout } from "../utils/logout";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <nav className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-md border-b border-white/10">
      <div className="text-xl font-bold">E-Shop</div>

      <div className="flex items-center gap-4">
        <span>{user?.name}</span>

        <button
          onClick={logout}
          className="px-3 py-1 rounded-md bg-red-500/80 hover:bg-red-500 transition text-white text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
