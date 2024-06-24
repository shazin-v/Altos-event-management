import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FaUsers } from "react-icons/fa";
import axios from "axios";

const Bookings = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Please login to continue");
      window.location.href = "/login";
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/user/events/", {
          headers: {
            Authorization: token,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Error loading data.</div>;
  }

  return (
    <>
      <div className="pt-20 lg:pt-8 overflow-y-hidden bg-[color:var(--primary-color)]">
        <Navbar />
        <div className="flex m-auto">
          <div className="flex mx-auto container ">
            <div className="flex m-auto gap-4 lg:gap-8 overflow-y-hidden w-full h-[calc(88vh)]">
              <div className="hidden md:flex flex-col p-4 sticky top-0 w-1/6 md:w-1/4"></div>
              <div className="flex w-full md:w-3/4 mx-auto justify-between container">
                <div className="p-4 overflow-y-auto w-full h-[calc(80vh)]">
                  <h2 className="text-lg font-medium mb-4">My Bookings</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {data.length === 0 ? (
                      <p>No Bookings yet. Add you Bookings</p>
                    ) : (
                      data.map((item) => (
                        <div
                          key={item.id}
                          className="hover:scale-105 cursor-pointer transition-all mt-5 bg-[color:var(--white-color)] rounded-lg shadow-md px-3 py-3"
                        >
                          <div className="relative h-[25rem]">
                            <img
                              fill
                              className="object-cover h-full w-full rounded-md"
                              src="/img/eventsFormImg.jpg"
                              alt="img"
                              sizes="(min-width: 640px) 100vw, 50vw"
                              priority
                            />
                          </div>
                          <div className="flex flex-row justify-between items-start mt-4">
                            <div className="px-2">
                              <p className="text-sm text-gray-800 font-bold">
                                {item.event.title}
                              </p>
                              <p className="text-sm text-gray-800">
                                {item.event.description}
                              </p>
                            </div>
                            <div className="flex flex-col justify-end items-center">
                              <span className="w-full flex flex-row items-center">
                                <FaUsers />
                                <span className="ml-2 text-sm">
                                  {item.event.capacity}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookings;
