import { useState } from 'react'
import './App.css'

const BASE_URL = 'http://localhost:8080'

const apiCall = () => {
  fetch(BASE_URL)
    .then(response => response.json())
    .then(data => { console.log(data) })
    .catch(error => console.error(error));
}

function App() {
  return (
    <div className="App">
      <header>
        <button onClick={apiCall}>Make API Call</button>
      </header>
    </div>
  );
}

export default App
