import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { FaAngleDown } from "react-icons/fa";
// import { useRouter } from "next/router";
// import { removeAdminToken } from "@/utils/removeAdminToken";

export default function Dropdown({ adminData }) {
  // const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // function to handle dropdown toggle
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // function to handle logout button click
  // const handleLogout = () => {
  //     removeAdminToken();
  //     router.push("/");
  // };

  // Attaches an event listener for the 'mousedown' event to detect a click outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="mb-[8vh]">
        <header className="bg-[color:var(--white-color)] fixed top-0 z-50 w-full shadow-md text-[color:var(--darker-secondary-color)]">
          <div className="container mx-auto flex items-center flex-col lg:flex-row justify-between p-4">
            <div
              //   onClick={() => router.push("/admin/dashboard")}
              className="flex items-center gap-x-3 cursor-pointer"
            >
              {/* <Image
                src="/favicon_io/android-chrome-192x192.png"
                width={500}
                height={500}
                alt="Logo"
                className="h-8 w-8"
              /> */}
              <h1 className="m-2 text-black font-bold text-4xl">
                {"<In"}
                <span className="text-[color:var(--darker-secondary-color)]">
                  VIT
                </span>
                {"e />"}
              </h1>
            </div>
            <nav className="text-sm">
              <ul className="flex items-center">
                <li
                  //   onClick={() => router.push("/")}
                  className="mr-4 cursor-pointer"
                >
                  <button
                    onClick={handleLogout}
                    className="btn text-white bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] w-full mb-4 sm:w-auto sm:mb-0"
                  >
                    Logout
                  </button>{" "}
                </li>
                {/* <AdminDropdown adminData={adminData} /> */}
              </ul>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
}
