import { useParams } from "react-router-dom";
import UserNavBar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

function EventPage() {
  const { id } = useParams();
  // const userId = getUserToken();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const [eventData, setEventData] = useState([]);
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  // function to handle share button click
  // const share = () => {
  //   if (navigator.share) {
  //     navigator
  //       .share({
  //         title: eventData.name,
  //         text: "Check out this event!",
  //         url: window.location.href,
  //       })
  //       .then(() => console.log("Successful share"))
  //       .catch((error) => console.log("Error sharing", error));
  //   }
  // };

  // function that fetches the event data on load
  // const fetchEvent = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://127.0.0.1:8000/events/${eventId}/`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           // event_id: eventId,
  //         }),
  //       }
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       setEventData(data);
  //       // Check if the user's ID exists in the participants array
  //       setIsUserRegistered(
  //         data.participants
  //           .some
  //           // (participant) => participant.id === userId
  //           ()
  //       );
  //     } else {
  //       throw new Error(`${response.status} ${response.statusText}`);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching event data:", error.message);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      // const token = sessionStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/events/${id}/`,
          {
            headers: {
              Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE5MTI4NjY1LCJpYXQiOjE3MTkxMjgzNjUsImp0aSI6IjAyY2ZhNjYzNjY1YzQ4MzZhNWJmZGEyZTBhOTBhNWY5IiwidXNlcl9pZCI6Mn0.l5pWnv6w7a8gV3mimzdK5fk2V1pLE1H1nh-fQaWQBHA`,
            },
          }
        );
        console.log("response", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setIsLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchData();
  }, [id]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  if (isLoading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (!data) {
    return <div>Error loading data.</div>; // Display error state if data is not available
  }

  // useEffect(() => {
  //     fetchEvent();
  // }, [eventId]); // fetch event on component mount and when eventId changes

  // if (!eventData || !eventData.cover)
  //     // If event data isn't loaded correctly, it should recall API
  //     return <div onLoad={fetchEvent()}>loading...</div>;
  // else
  return (
    <div className="pt-20 lg:pt-8 bg-[color:var(--primary-color)]">
      <UserNavBar />
      <div className="flex flex-col items-center justify-center">
        <div className="relative h-40 sm:h-[25rem] overflow-hidden container shadow-lg">
          {/* blurred image background */}
          <img
            // src={eventData.cover}
            src="/img/eventsFormImg.jpg"
            // alt={eventData.name}
            alt={""}
            fill
            placeholder="blur"
            // blurDataURL={eventData.cover}
            className="h-[25rem] container  lg:block object-cover"
          />

          {/* <div className="absolute inset-0 w-full h-40 sm:h-[25rem] container">
            <img
              // src="https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-jo-bolta-hai-wohi-hota-hai-ft-harsh-gujral-0-2023-2-3-t-9-23-51.jpg"
              // src={eventData.cover}
              // src="/img/eventsFormImg.jpg"
              alt="Eventimage"
              fill
              className="absolute object-contain object-center"
            />
          </div> */}
        </div>

        {/* Second div with event details and ticket pricing */}
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
                    {data.date ? data.date.split("-").slice(0, 3).join("-") : "Date"}
                  </div>
                  <div className="text-md text-gray-800 mr-4">
                    <span className="font-bold">Time:</span>                     
                    {data.time}
                  </div>
                  {/* <div className="text-md text-gray-800 mr-4">
                    <span className="font-bold">Venue:</span> {data.venue} Bengaluru
                  </div>
                  <div className="text-md text-gray-800 mr-4">
                    <span className="font-bold">Organizer:</span>{" "} DJ Khaled
                    {eventData.organizer}
                  </div> */}
                </div>
              </div>
              {/* <div className="text-left lg:text-right mt-4 lg:mt-0">
                <button
                  // onClick={() =>
                  // router.push(
                  // `/event/${eventId}/payment`
                  // )
                  // }
                  className={`px-6 py-2 ${
                    isUserRegistered
                      ? "bg-gray-700 hover:bg-gray-800"
                      : "bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)]"
                  } text-white rounded focus:outline-none`}
                  disabled={isUserRegistered}
                >
                  {isUserRegistered ? "Already Registered" : "Buy Tickets"}
                </button>
              </div> */}
            </div>
            {/* <div className="border-b border-gray-300 mt-8 mb-4"></div> */}
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              {/* <div className="flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ticket Pricing
                </h3>
                <p className="text-gray-800">₹{eventData.price}</p>
              </div> */}
              {/* <div className="flex mt-4 md:mt-0">
                <button
                  onClick={share}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none"
                >
                  Share
                </button>
              </div> */}
            </div>
          </div>
        </div>

        {/* Third div with major event details */}
        {/* <div className="container mt-4 bg-[color:var(--primary-color)]">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr] gap-4"> */}
        {/* <div className="mb-4 max-w-5xl bg-white px-6 py-4 rounded-lg shadow-md"> */}

        <div className="container bg-white py-4 mt-4 rounded-lg shadow-md">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:flex-row lg:items-center justify-between">
              <div className=" ">
                {/* <div className="mb-4 w-full bg-black px-6 py-4 rounded-lg shadow-md"> */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  About the Event
                </h3>
                {/* {Array(3)
                  .fill()
                  .map((_, index) => ( */}
                <p
                  // key={index}
                  className="text-gray-600 text-lg "
                >
                  {data.description}
                </p>
                {/* ))} */}
              </div>
              {/* <div className="mb-4 bg-white px-6 py-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ticket Prices
                </h3>
                <ul className="text-gray-600">
                  {[
                    {
                      type: "General*",
                      price: eventData.price,
                    },
                    {
                      type: "VIP*",
                      price: 2 * eventData.price,
                    },
                    {
                      type: "VVIP*",
                      price: 4 * eventData.price,
                    },
                  ].map((item, index) => (
                    <li
                      className="flex items-center h-16 py-1 rounded-md p-4 mb-2 hover:shadow-md"
                      key={index}
                    >
                      <span className="w-1/3">{item.type}</span>
                      <span className="w-1/3 text-center">₹{item.price}</span>
                      <button
                        // onClick={() =>
                        // router.push(
                        // `/event/${eventId}/payment`
                        // )
                        // }
                        className={`px-3 py-2 ${
                          isUserRegistered
                            ? "bg-gray-700 hover:bg-gray-800"
                            : "bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)]"
                        } text-white rounded focus:outline-none`}
                        disabled={isUserRegistered}
                      >
                        {isUserRegistered ? "Registered" : "Buy Tickets"}
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-[color:var(--darker-secondary-color)] mt-6">
                  *Caution: All ticket sales are final and non-refundable.
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPage;
