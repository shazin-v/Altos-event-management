import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login.css";
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
        console.log(response.data);
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
      <div className="form-container">
        <center>
          <fieldset>
            <legend>SignUp</legend>
            <form onSubmit={handleSubmit}>
              <label>Enter your Name: </label>
              <input
                type="text"
                id="email"
                name="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <label>Enter your Email: </label>
              <input
                type="email"
                id="name"
                name="name"
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

export default Signup;
