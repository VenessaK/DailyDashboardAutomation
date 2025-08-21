import React, { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch("YOUR N8N WEBHOOK URL") // Replace with your webhook URL
      .then((res) => res.json())
      .then((json) => setData(json.combinedData))
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="App">
      <h1>My Dashboard</h1>
      <button onClick={fetchData} className="fetch-button">
        {loading ? "Loading..." : "Fetch Data"}
      </button>

      <div className="dashboard">
        {data && (
          <>
            {/* Weather Card */}
            <div className="card">
              <h2>Weather</h2>
              <p>Temperature: {data.weather.temperature}°C</p>
              <p>Wind Speed: {data.weather.windspeed} km/h</p>
              <p>Condition: {data.weather.condition}</p>
            </div>

            {/* Crypto Card */}
            <div className="card">
              <h2>Crypto</h2>
              <p>Bitcoin: ${data.crypto.bitcoin.toLocaleString()}</p>
              <p>Ethereum: ${data.crypto.ethereum.toLocaleString()}</p>
            </div>

            {/* News Card */}
            <div className="card news-card">
              <h2>News</h2>
              <ul>
                {data.news.headlines.map((headline, index) => (
                  <li key={index}>
                    <a href={headline.url} target="_blank" rel="noopener noreferrer">
                      {headline.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
