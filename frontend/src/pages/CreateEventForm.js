import { useState } from "react";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const CreateEventForm = () => {
  const token = sessionStorage.getItem("token");
  const decoded = jwtDecode(token);
  const UID = decoded.user_id;

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
    capacity: 0,
  });

  const handleEventFormSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      capacity: parseInt(formData.capacity, 10),
      time: formData.time,
      user: UID,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/events/",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.status === 201) {
        alert("Event Created Successfully");
        window.location.href = "/homepage";
      } else {
        alert(`Failed with status code ${response.status}`);
      }
    } catch (error) {
      alert("Error creating event", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pt-20 lg:pt-8 bg-[color:var(--primary-color)]">
      <Navbar />
      <center className="p-6">
        <div className="flex flex-col md:h-[calc(90vh)] md:w-[90%] md:flex-row justify-center bg-[color:var(--primary-color)]">
          <div className="flex-2 mx-6 mb-6 bg-[color:var(--primary-color)]">
            <img
              src="/img/eventsFormImg.jpg"
              alt="Event-Image"
              width={500}
              height={500}
              className="w-full h-full object-contain md:object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="flex-1 m-6 md:m-0 md:mr-6 md:mb-6"></div>
          <div className="flex h-80vh text-left bg-white rounded-lg shadow-lg items-center">
            <div className="p-8 w-full">
              <h1 className="text-2xl font-bold text-gray-700 mb-4">
                Create an Event
              </h1>
              <form
                id="event-form"
                onSubmit={handleEventFormSubmit}
                className="space-y-8"
              >
                <div>
                  <label
                    htmlFor="title"
                    className="block font-medium text-gray-700"
                  >
                    Title:
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="adminDropDownInput"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                  <div>
                    <label
                      htmlFor="capacity"
                      className="block font-medium text-gray-700"
                    >
                      Capacity:
                    </label>
                    <input
                      type="number"
                      id="capacity"
                      name="capacity"
                      min="0"
                      className="adminDropDownInput"
                      value={formData.capacity}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="date"
                      className="block font-medium text-gray-700"
                    >
                      Date:
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="adminDropDownInput"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="time"
                      className="block font-medium text-gray-700"
                    >
                      Time:
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      className="adminDropDownInput"
                      value={formData.time}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block font-medium text-gray-700"
                  >
                    Description:
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="adminDropDownInput"
                    value={formData.description}
                    rows="5"
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="text-center w-full px-4 py-2 bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] transition-all ease-in-out text-white font-bold rounded-lg"
                >
                  Create Event
                </button>
              </form>
            </div>
          </div>
        </div>
      </center>
    </div>
  );
};

export default CreateEventForm;
