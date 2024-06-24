import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";
import CreateEventForm from "./pages/CreateEventForm";
import EventId from "./pages/EventId";
import Bookings from "./pages/Bookings";
import EditEvent from "./pages/EditEvent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/add-event" element={<CreateEventForm />} />
          <Route path="/event/:id" element={<EventId />} />
          <Route path="/events/edit/:id" element={<EditEvent />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
