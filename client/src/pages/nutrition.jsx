import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/G1Logo.png'; // Adjust if logo is elsewhere
import '../styles/nutrition.css';
import banana from '../assets/banana.png'; // Adjust if banana icon is elsewhere

function Nutrition() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    setResults([]);

    if (!query.trim()) {
      setError('Please enter a food item.');
      return;
    }

    try {
      const response = await fetch(
        `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`,
        {
          method: 'GET',
          headers: {
            'X-Api-Key': 'Rr4RqdHLbu+yRVD6TzxzWw==9QdLqySldxza9Axo', // Keep private in production
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      if (data.items && data.items.length > 0) {
        setResults(data.items);
      } else {
        setError('No results found.');
      }
    } catch (err) {
      setError('Failed to fetch data. Check your API key or try again.');
      console.error('Error:', err.message);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <img src={logo} alt="G1 Fitness Logo" className="logo" />
        <h1 className="title">Nutrition</h1>
        <Link to="/">
          <button className="nav-button">Return Home</button>
        </Link>
      </div>

      <hr className="divider"/>

      <div className="icon">
        <img src={banana} alt="Banana Icon" className="banana-icon" />
      </div>

      <div className="description">
        <p>
          Search for food items to get their nutritional information. Enter a food item in the search bar below. Separate multiple food items using commas. 
        </p>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Eg. 2 Bananas, 10 Ounces of Chicken Breast"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="results-section">
        {results.length > 0 && (
          <ul className="results-list">
            {results.map((item, index) => (
              <li key={index} className="result-item">
                <strong>{item.name}</strong>
                <br />
                Calories: {item.calories} kcal
                <br />
                Protein: {item.protein_g}g | Carbs: {item.carbohydrates_total_g}g | Fat: {item.fat_total_g}g
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Nutrition;
