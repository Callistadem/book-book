import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'

import Login from './routes/login/login'
import Register from "./routes/register/register";
import Library from "./routes/library/library";

import "./App.css"

const BASE_URL = 'http://localhost:8080'

const App = () => {
  const [userDetails, setUserDetails] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/library" element={<Library />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App