import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dropdown({ adminData }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged out successfully");
    sessionStorage.clear();
    navigate("/login");
  };

  const handleBookings = () => {
    navigate("/bookings");
  };

  return (
    <>
      <div className="mb-[8vh]">
        <header className="bg-[color:var(--white-color)] fixed top-0 z-30 w-full shadow-md text-[color:var(--darker-secondary-color)]">
          <div className="container mx-auto flex items-center flex-col lg:flex-row justify-between p-4">
            <div className="flex items-center gap-x-3 cursor-pointer"></div>
            <nav className="text-sm">
              <ul className="flex items-center">
                <li className="mr-4 cursor-pointer">
                  <button
                    onClick={handleBookings}
                    className="btn text-white bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] w-full mb-4 sm:w-auto sm:mb-0"
                  >
                    My bookings
                  </button>
                </li>
                <li className="mr-4 cursor-pointer">
                  <button
                    onClick={handleLogout}
                    className="btn text-white bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] w-full mb-4 sm:w-auto sm:mb-0"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
}
