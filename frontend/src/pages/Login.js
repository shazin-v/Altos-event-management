import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", {
        username: email,
        password: password,
      });
      if (response.status === 200) {
        alert("Login successful!");
        const token = response.data.access;
        sessionStorage.setItem("token", `Bearer ${token}`);
        navigate("/homepage");
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
            Sign In
          </legend>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-1"
              >
                Enter your Email Address:
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
                className="block text-gray-700 font-bold mb-1"
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

export default Login;
