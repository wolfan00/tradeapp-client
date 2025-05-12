// components/UserMenu.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext.jsx";

export default function UserMenu({ username }){
  const [open, setOpen] = useState(false);

   const {logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const handleProfile = () => {
    navigate("/profile");
  }
  const handleMyProducts = () => {
    navigate("/my-products"); 
  }
  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
      >
        <span className="font-medium">Hoşgeldiniz {username}!</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-md z-50">
          <button
              onClick={() => {handleProfile(), setOpen(false)}}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 "
            >
              Profil
          </button>
          <button
              onClick={() => {handleMyProducts(), setOpen(false)}}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Ürünlerim
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
          >
            Oturumu Kapat
          </button>
        </div>
      )}
    </div>
  );
};
