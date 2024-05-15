import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas, faUtensils } from '@fortawesome/free-solid-svg-icons';
import './RecipeInfo.css';

const RecipeInfo = () => {
  const [item, setItem] = useState(null);
  const { MealId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the current path is the recipe details page
    if (location.pathname.startsWith('/recipe')) {
      // If it is, redirect to the home page after refreshing
      navigate('/');
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (MealId !== "") {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${MealId}`)
        .then(res => res.json())
        .then(data => {
          setItem(data.meals[0]);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [MealId]);

  const id = item ? item.strYoutube.split('=')[1] : '';

  return (
    <div className="app">
      {item && (
        <div className="content">
          <img src={item.strMealThumb} alt={item.strMeal} className="meal-image" />
          <div className="inner-content">
            <h1>{item.strMeal}</h1>
            <h2>
              <FontAwesomeIcon icon={faGlobeAmericas} /> {item.strArea} Food
            </h2>
            <h3>
              <FontAwesomeIcon icon={faUtensils} /> Category {item.strCategory}
            </h3>
          </div>
        </div>
      )}
      {item && (
        <div className="recipe-details">
          <div className="ingredients">
            <h2>Ingredients</h2>
            <ul>
              {Object.keys(item)
                .filter(key => key.includes('strIngredient') && item[key])
                .map((key, index) => (
                  <li key={index}>{item[key]} : {item[`strMeasure${index + 1}`]}</li>
                ))}
            </ul>
          </div>
          <div className="instructions">
            <h2>Instructions</h2>
            <p>{item.strInstructions}</p>
          </div>
        </div>
      )}
      {id && (
        <div className="video">
          <iframe
            width="100%"
            height="515"
            title="recipeVideo"
            src={`https://www.youtube.com/embed/${id}`}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default RecipeInfo;