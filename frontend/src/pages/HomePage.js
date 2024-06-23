import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AiOutlinePlus } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleRoute = () => {
    window.location.href = "/add-event";
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Please login to continue");
      window.location.href = "/login";
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      try {
        const response = await axios.get("http://127.0.0.1:8000/events/", {
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
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Error loading data.</div>;
  }

  const handleCard = (id) => {
    navigate(`/event/${id}`);
  };

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
                  <h2 className="text-lg font-medium mb-4">Events</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {data.length === 0 ? (
                      <p>No events yet. Add events</p>
                    ) : (
                      data.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            handleCard(item.id);
                          }}
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
                                {item.title}
                              </p>
                              <p className="text-sm text-gray-800">
                                {item.description}
                              </p>
                            </div>
                            <div className="flex flex-col justify-end items-center">
                              <span className="w-full flex flex-row items-center">
                                <FaUsers />
                                <span className="ml-2 text-sm">
                                  {item.capacity}
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
              <div className="fixed bottom-3 right-3">
                <button
                  onClick={() => handleRoute()}
                  className="mt-4 flex items-center justify-center w-[4rem] h-[4rem] text-white rounded-full bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] hover:scale-105 shadow-lg cursor-pointer transition-all ease-in-out focus:outline-none"
                  title="Create Events"
                >
                  <AiOutlinePlus className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
