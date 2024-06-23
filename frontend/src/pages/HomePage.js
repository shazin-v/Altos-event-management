import React from "react";
import Navbar from "../components/Navbar";
import { AiOutlinePlus } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
// import { Link } from "react-router-dom";

const HomePage = () => {
  const handleRoute = () => {
    window.location.href = "/add-event";
  };

  const handleCard = () => {
    window.location.href = "/event/1"
  }

  return (
    <>
      <div className="pt-20 lg:pt-8 overflow-y-hidden bg-[color:var(--primary-color)]">
        <Navbar />
        <div className="flex m-auto">
          <div className="flex mx-auto container ">
            <div className="flex m-auto gap-4 lg:gap-8 overflow-y-hidden w-full h-[calc(88vh)]">
              {/* Render the regular filter for medium screens and above */}
              <div className="hidden md:flex flex-col p-4 sticky top-0 w-1/6 md:w-1/4">
                {/* <Dashboard_Filter
                  filterOptions={filterOptions}
                  setFilterOptions={setFilterOptions}
                  handleFilterClear={handleFilterClear}
                /> */}
              </div>
              {/* Render the popup filter for small screens */}
              {/* {popupFilterOpen && (
                <div className="md:hidden fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white rounded-lg p-4 w-5/6">
                    <Popup_Filter
                      filterOptions={filterOptions}
                      setFilterOptions={setFilterOptions}
                      handleFilterClear={handleFilterClear}
                      handleClose={() => setPopupFilterOpen(false)}
                    />
                  </div>
                </div>
              )} */}
              {/* Render the main content of the dashboard */}
              <div className="flex w-full md:w-3/4 mx-auto justify-between container">
                <div className="p-4 overflow-y-auto w-full h-[calc(80vh)]">
                  <h2 className="text-lg font-medium mb-4">Events</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* {filteredEvents.length === 0 ? (
                      <p>No events yet</p>
                    ) : (
                      filteredEvents.map((event) => ( */}
                    <div
                      onClick={() => { handleCard()
                        // router.push(`/event/${event.event_id}/adminevents`);
                      }}
                      className="hover:scale-105 cursor-pointer transition-all mt-5 bg-[color:var(--white-color)] rounded-lg shadow-md px-3 py-3"
                      //   key={event._id}
                    >
                      <div className="relative h-[25rem]">
                        {/* {event.profile && ( */}
                        <img
                          fill
                          className="object-cover h-full w-full rounded-md"
                          // src={event.profile}
                          src="/img/eventsFormImg.jpg"
                          alt=""
                          sizes="(min-width: 640px) 100vw, 50vw"
                          priority
                        />
                        {/* )} */}
                      </div>
                      <div className="flex flex-row justify-between items-start mt-4">
                        <div className="px-2">
                          <p className="text-sm text-gray-800 font-bold">
                            {/* {event.name.length > 30 */}
                            {/* ? event.name.slice(0, 30) + "..." */}
                            {/* : event.name} */}
                          </p>
                          <p className="text-sm text-gray-800">
                            {/* {event.venue} */}
                            Benglurur
                          </p>
                          <p className="text-sm text-gray-800">
                            {/* {event.date} */}
                            10/20/2024
                          </p>

                          <p className="text-sm text-gray-800">
                            {/* {event.venue} */}
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Praesent sed leo in enim porttitor dignissim
                            non vitae augue. 
                          </p>
                        </div>
                        {/* Star component  */}
                        <div className="flex flex-col justify-end items-center">
                          <span className="w-full flex flex-row items-center">
                            <FaUsers />
                            <span className="ml-2 text-sm">4,92</span>
                          </span>
                          {/* <p className="text-sm text-gray-800 mt-2"> */}
                            {/* <strong className="whitespace-nowrap"> */}
                              {/* ₹ {event.price} */}
                              {/* ₹ 100 */}
                            {/* </strong> */}
                          {/* </p> */}
                        </div>
                      </div>
                    </div>
                    {/* )) */}
                    {/* )}  */}
                  </div>
                </div>
              </div>
              {/* Bottom buttons */}
              <div className="fixed bottom-3 right-3">
                {/* Button to open the popup filter */}
                <button
                  //   onClick={() => setPopupFilterOpen(true)}
                  className="md:hidden flex items-center justify-center w-[4rem] h-[4rem] text-white rounded-full bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] hover:scale-105 shadow-lg cursor-pointer transition-all ease-in-out focus:outline-none"
                  title="Filter Events"
                >
                  <RxHamburgerMenu className="w-6 h-6" />
                </button>
                {/* Button to open the event form */}
                <button
                  onClick={() => handleRoute()}
                  className="mt-4 flex items-center justify-center w-[4rem] h-[4rem] text-white rounded-full bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] hover:scale-105 shadow-lg cursor-pointer transition-all ease-in-out focus:outline-none"
                  title="Create Events"
                >
                  {/* <Link to="/add-event" />  */}

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
