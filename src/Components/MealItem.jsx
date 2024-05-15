import React from 'react';
import { useNavigate } from 'react-router-dom';

const MealItem = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="item-container">
      {data.length === 0 ? (
        <p>No meals found</p>
      ) : (
        data.map(item => (
          <div
            key={item.idMeal}
            className="card"
            onClick={() => navigate(`/${item.idMeal}`)}
          >
            <img src={item.strMealThumb} alt={item.strMeal} />
            <h3>{item.strMeal}</h3>
          </div>
        ))
      )}
    </div>
  );
};

export default MealItem;