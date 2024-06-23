import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login.css";
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
        sessionStorage.setItem("token", response.data.token);
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
      <div className="form-container">
        <center>
          <fieldset>
            <legend>Sign In</legend>
            <form onSubmit={handleSubmit}>
              <label>Enter your Email Address: </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="xyz@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <label>Enter Password: </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <span className="status"></span>
              <button type="submit">Submit</button>
            </form>
          </fieldset>
        </center>
      </div>
    </>
  );
};

export default Login;
