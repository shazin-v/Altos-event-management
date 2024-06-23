import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";
import CreateEventForm from "./pages/CreateEventForm";
import EventId from "./pages/EventId";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/add-event" element={<CreateEventForm />} />
          <Route path="/event/1" element={<EventId />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
