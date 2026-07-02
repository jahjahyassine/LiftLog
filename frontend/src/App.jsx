import { Routes, Route } from "react-router-dom";
import "./style.css"

import Landing from "./pages/Landing.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Workouts from "./pages/Workouts.jsx"
import AddWorkout from "./pages/AddWorkout.jsx"
import Progress from "./pages/Progress.jsx"
import Records from "./pages/Records.jsx";
import Profile from "./pages/Profile.jsx";

function App () {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/workouts" element={<Workouts />} />
      <Route path="/workouts/new" element={<AddWorkout />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/records" element={<Records />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default App;