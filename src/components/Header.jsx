import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import UserMenu from "./UserMenu"; // büyük harf önemli!
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

export default function Navbar() {

   const { user } = useUser();
  const navigate = useNavigate();
  

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div
          className="cursor-pointer text-xl font-bold text-indigo-600 hover:text-indigo-700"
          onClick={() => navigate("/")}
        >
          TakasApp
        </div>

        {/* Menu */}
        <nav className="hidden md:flex space-x-6">
          <a
            href="/"
            className="text-gray-700 hover:text-indigo-600 transition"
          >
            Anasayfa
          </a>
          <a
            href="/trades"
            className="text-gray-700 hover:text-indigo-600 transition"
          >
            Takaslar
          </a>
          
        </nav>

        {/* Sağ taraf */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <a
                href="/login"
                className="text-sm text-indigo-600 hover:underline"
              >
                Giriş Yap
              </a>
              <a
                href="/signup"
                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
              >
                Kayıt Ol
              </a>
            </>
          ) : user.role === "Admin" ? (
            <>
              <a
                href="/admin"
                className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700 text-sm"
              >
                Admin Panele Gir
              </a>
              <UserMenu username={user.name || user.email} />
            </>
          ) : (
            <>
              <UserMenu username={user.name || user.email} />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
