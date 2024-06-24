import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import UserNavBar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

function EventPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = sessionStorage.getItem("token");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/events/${id}/`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Error loading data.</div>;
  }

  const handleClick = () => {
    Swal.fire({
      title: "Are you sure want to book?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Book it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/bookings/",
            { event_id: id },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
            }
          );
          if (response.status === 200 || response.status === 201) {
            Swal.fire({
              title: "Booked!",
              text: "Your event has been booked.",
              icon: "success",
            }).then(() => {
              navigate("/homepage");
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "There was an issue with your booking. Please try again.",
              icon: "error",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "There was an issue with your booking. Please try again.",
            icon: "error",
          });
        }
      }
    });
  };

  const editEvent = () => {
    navigate(`/events/edit/${id}`);
  };

  const DeleteEvent = () => {
    Swal.fire({
      title: "Are you sure want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://127.0.0.1:8000/events/${id}/`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          if (response.status === 204) {
            Swal.fire({
              title: "Deleted!",
              text: "Your booked event has been Deleted.",
              icon: "success",
            }).then(() => {
              navigate("/homepage");
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "There was an issue with deleting. Please try again.",
              icon: "error",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "There was an issue with deleting. Please try again.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="pt-20 lg:pt-8 bg-[color:var(--primary-color)]">
      <UserNavBar />
      <div className="flex flex-col items-center justify-center">
        <div className="relative h-40 sm:h-[25rem] overflow-hidden container shadow-lg">
          <img
            src="/img/eventsFormImg.jpg"
            alt="Eventimage"
            fill
            placeholder="blur"
            className="h-[25rem] container  lg:block object-cover"
          />
        </div>
        <div className="container bg-white py-4 mt-4 rounded-lg shadow-md">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              <div className="flex flex-col">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {data.title || "Event Name"}
                </h1>
                <div className="flex flex-col md:flex-row">
                  <div className="text-md text-gray-800 mr-4">
                    <span className="font-bold">Date & time:</span>{" "}
                    {data.date
                      ? data.date.split("-").slice(0, 3).join("-")
                      : "Date"}
                  </div>
                  <div className="text-md text-gray-800 mr-4">
                    <span className="font-bold">Time:</span>
                    {data.time}
                  </div>
                </div>
              </div>
              <div className="text-left lg:text-right mt-4 lg:mt-0">
                <button
                  onClick={handleClick}
                  className="px-6 py-2 bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] text-white rounded focus:outline-none"
                >
                  Book Event
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex mt-4 md:mt-0">
                <button
                  onClick={editEvent}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none"
                >
                  Edit Event
                </button>
              </div>
              <div className="flex mt-4 md:mt-0">
                <button
                  onClick={DeleteEvent}
                  className="px-6 py-2 bg-[color:var(--darker-secondary-color)] text-white rounded hover:bg-gray-300 focus:outline-none"
                >
                  Delete Event
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container bg-white py-4 mt-4 rounded-lg shadow-md">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:flex-row lg:items-center justify-between">
              <div className=" ">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  About the Event
                </h3>
                <p className="text-gray-600 text-lg ">{data.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPage;
