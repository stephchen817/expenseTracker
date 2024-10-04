import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/App.css';
import './index.css';


function App() {
  // Connect with back-end
  const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/api/test')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <span>
        {data.map((item, index) => (
                    <li key={index}>{JSON.stringify(item)}</li>
                ))}
      </span>
    </div>
  );
}

export default App;
