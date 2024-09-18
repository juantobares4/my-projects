const express = require('express');
const recipes = require('./recipesList');

const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
  console.log(`Starting development server at (CTRL + Click): http://localhost:3000/`);

});

app.get('/', (req, res) => {
  res.json(recipes);

});

app.post('/create_recipe', (req, res) => {
  
  const { recipeName, ingredients, instructions } = req.body;
  const newRecipe = req.body;
  newRecipe.id = recipes.length + 1;
  
  if (!recipeName || !ingredients || !instructions) { 
    console.log('Faltan campos obligatorios.');

  };

  recipes.push(newRecipe);
  
  res.status(200).json(newRecipe);

});