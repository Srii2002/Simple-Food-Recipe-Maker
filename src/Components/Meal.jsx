import React, { useEffect, useState } from 'react';
import MealItem from './MealItem';
import RecipeIndex from './RecipeIndex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun} from '@fortawesome/free-solid-svg-icons';
import './style.css';


const App = () => {
  const [url, setUrl] = useState('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  const [items, setItems] = useState([]);
  const [showMeals, setShowMeals] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data.meals);
        setItems(data.meals || []);
        setShowMeals(true);
      })
      .catch(error => console.error(error));
  }, [url]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const setIndex = (alpha) => {
    setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?f=${alpha}`);
  };

  const searchRecipe = () => {
    if (search.trim() !== '') {
      setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value.trim()) {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${e.target.value}`)
        .then(res => res.json())
        .then(data => {
          if (data.meals) {
            setSuggestions(data.meals.map(meal => meal.strMeal));
          } else {
            setSuggestions([]);
          }
        })
        .catch(error => console.error(error));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    setSuggestions([]);
    setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${suggestion}`);
  };

  return (
    <div className='main'>
      <div className='heading'>
        <h1>Search Your Food Recipe</h1>
        <h4>
          Welcome to Food Recipe Maker, your ultimate destination for culinary inspiration! Whether you're a seasoned chef or a novice cook, our platform offers a diverse array of mouthwatering recipes to suit every taste and occasion. From quick and easy weekday dinners to impressive gourmet delights, our curated collection ensures that you'll never run out of ideas in the kitchen. Explore our user-friendly interface, browse through hundreds of recipes, and let your culinary creativity soar with Food Recipe Maker!
        </h4>
      </div>
      <div className="searchBox">
        <input
          type="search"
          className="search-bar"
          onChange={handleSearchChange}
          value={search}
          placeholder="Search recipes..."
        />
        {suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
        <button className="search-btn" onClick={searchRecipe}>

        </button>
        <button className="dark-mode-btn" onClick={handleToggleDarkMode}>
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </button>
      </div>
      <div className="container">
        {showMeals && <MealItem data={items} />}
      </div>
      <div className="indexContainer">
        <RecipeIndex alphaIndex={(alpha) => setIndex(alpha)} />
      </div>
    </div>
  );
};

export default App;
