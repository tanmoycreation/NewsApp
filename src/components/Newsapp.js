import React, { useEffect, useState, useCallback } from 'react';
import Card from './Card';

const Newsapp = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState([]);
  const API_KEY = "1a764709ede9489187e1f00c34886a8e";

  const getData = useCallback(async () => {
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`);
      const jsonData = await response.json();
      console.log(jsonData);

      if (Array.isArray(jsonData.articles)) {
        let dt = jsonData.articles.slice(0, 10); // Limit to 10 items
        setNewsData(dt);
      } else {
        console.error("Expected 'articles' to be an array, but got:", jsonData.articles);
        setNewsData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setNewsData([]);
    }
  }, [search, API_KEY]); // Adding API_KEY to the dependency array

  useEffect(() => {
    getData();
  }, [getData]);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const userInput = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <nav>
        <div>
          <h1>Trendy News</h1>
        </div>
        <ul style={{ display: "flex", gap: "11px" }}>
          <li><button style={{ fontWeight: 600, fontSize: "17px", background: "none", border: "none", color: "#000", cursor: "pointer" }}>All News</button></li>
          <li><button style={{ fontWeight: 600, fontSize: "17px", background: "none", border: "none", color: "#000", cursor: "pointer" }}>Trending</button></li>
        </ul>
        <div className='searchBar'>
          <input type='text' placeholder='Search News' value={search} onChange={handleInput} />
          <button onClick={getData}>Search</button>
        </div>
      </nav>
      <div>
        <p className='head'>Stay Updated with TrendyNews</p>
      </div>
      <div className='categoryBtn'>
        <button onClick={userInput} value="sports">Sports</button>
        <button onClick={userInput} value="politics">Politics</button>
        <button onClick={userInput} value="entertainment">Entertainment</button>
        <button onClick={userInput} value="health">Health</button>
        <button onClick={userInput} value="fitness">Fitness</button>
      </div>

      <div>
        {newsData.length > 0 ? <Card data={newsData} /> : <p>No news available</p>}
      </div>
    </div>
  );
};

export default Newsapp;
