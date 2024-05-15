import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Meal from './Components/Meal';
import RecipeInfo from './Components/RecipeInfo';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Meal />} />
        <Route path="/:MealId" element={<RecipeInfo />} />
      </Routes>
    </Router>
  );
};

export default App;