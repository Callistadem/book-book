import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'

import Login from './routes/login/login'
import Register from "./routes/register/register";
import "./App.css"

const BASE_URL = 'http://localhost:8080'

const App = () => {
  const [userDetails, setUserDetails] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App