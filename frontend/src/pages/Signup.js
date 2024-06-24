import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/signup/", {
        username: email,
        first_name: name,
        password: password,
      });

      if (response.status === 201) {
        alert("signup successful!");
        navigate("/login");
      } else {
        console.error(`Failed with status code ${response.status}`);
      }
    } catch (error) {
      console.error("Error during login request:", error);
    }
  };

  return (
    <>
      <div className="form-container flex items-center justify-center h-screen">
        <fieldset className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <legend className="text-2xl font-bold mb-4 text-center">
            Sign Up
          </legend>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-gray-700 font-semibold mb-1"
              >
                Enter your Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-gray-700 font-semibold mb-1"
              >
                Enter your Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="xyz@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-gray-700 font-semibold mb-1"
              >
                Enter Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <span className="status"></span>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none"
            >
              Submit
            </button>
          </form>
        </fieldset>
      </div>
    </>
  );
};

export default Signup;
