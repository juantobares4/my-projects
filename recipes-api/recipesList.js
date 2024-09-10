const recipes = [
  {
    id: 1,
    recipeName: 'Spaghetti Bolognese',
    ingredients: ['spaghetti', 'ground beef', 'onion', 'garlic', 'tomato sauce', 'olive oil', 'salt', 'pepper'],
    instructions: 'Cook the spaghetti. In a pan, sauté onion and garlic, then add ground beef. Once browned, add tomato sauce and simmer for 15 minutes. Serve over spaghetti.'
  },
  {
    id: 2,
    recipeName: 'Chicken Caesar Salad',
    ingredients: ['chicken breast', 'romaine lettuce', 'Caesar dressing', 'parmesan cheese', 'croutons'],
    instructions: 'Grill the chicken breast and slice it. Toss romaine lettuce with Caesar dressing, parmesan, and croutons. Top with chicken slices.'
  },
  {
    id: 3,
    recipeName: 'Pancakes',
    ingredients: ['flour', 'milk', 'egg', 'butter', 'sugar', 'baking powder', 'salt'],
    instructions: 'Mix dry ingredients. Add milk, egg, and melted butter. Stir until smooth. Cook on a hot griddle until bubbles form, then flip and cook until golden brown.'
  },
  {
    id: 4,
    recipeName: 'Guacamole',
    ingredients: ['avocados', 'onion', 'tomato', 'lime', 'cilantro', 'salt', 'pepper'],
    instructions: 'Mash avocados in a bowl. Add finely chopped onion, tomato, cilantro, lime juice, salt, and pepper. Mix well.'
  },
  {
    id: 5,
    recipeName: 'French Toast',
    ingredients: ['bread', 'eggs', 'milk', 'cinnamon', 'sugar', 'butter', 'maple syrup'],
    instructions: 'Whisk eggs, milk, cinnamon, and sugar. Dip bread slices in the mixture and cook on a buttered pan until golden brown. Serve with maple syrup.'
  },
  {
    id: 6,
    recipeName: 'Grilled Cheese Sandwich',
    ingredients: ['bread', 'cheddar cheese', 'butter'],
    instructions: 'Butter the bread slices. Place cheese between two slices and grill in a pan until the bread is golden and the cheese is melted.'
  },
  {
    id: 7,
    recipeName: 'Chocolate Chip Cookies',
    ingredients: ['flour', 'butter', 'sugar', 'brown sugar', 'eggs', 'vanilla extract', 'chocolate chips', 'baking soda', 'salt'],
    instructions: 'Cream butter and sugars. Add eggs and vanilla. Mix dry ingredients separately, then combine with wet ingredients. Stir in chocolate chips and bake at 350°F for 10-12 minutes.'
  },
  {
    id: 8,
    recipeName: 'Tacos',
    ingredients: ['ground beef', 'taco seasoning', 'tortillas', 'lettuce', 'cheese', 'salsa'],
    instructions: 'Cook ground beef with taco seasoning. Serve in tortillas with lettuce, cheese, and salsa.'
  },
  {
    id: 9,
    recipeName: 'Margarita Pizza',
    ingredients: ['pizza dough', 'tomato sauce', 'mozzarella cheese', 'basil', 'olive oil'],
    instructions: 'Roll out pizza dough. Spread tomato sauce, add mozzarella, and drizzle with olive oil. Bake at 475°F for 10-12 minutes. Garnish with fresh basil.'
  },
  {
    id: 10,
    recipeName: 'Chicken Stir Fry',
    ingredients: ['chicken breast', 'soy sauce', 'broccoli', 'carrots', 'bell peppers', 'ginger', 'garlic', 'sesame oil'],
    instructions: 'Stir fry chicken with garlic and ginger. Add vegetables and soy sauce, then cook until tender. Serve with rice.'
  },
  {
    id: 11,
    recipeName: 'Beef Stew',
    ingredients: ['beef stew meat', 'potatoes', 'carrots', 'onion', 'beef broth', 'tomato paste', 'garlic', 'thyme'],
    instructions: 'Brown beef in a pot. Add vegetables, broth, tomato paste, and spices. Simmer for 2-3 hours until beef is tender.'
  },
  {
    id: 12,
    recipeName: 'Egg Fried Rice',
    ingredients: ['cooked rice', 'eggs', 'soy sauce', 'green onions', 'carrots', 'peas', 'sesame oil'],
    instructions: 'Scramble eggs in a pan. Add cooked rice, soy sauce, and vegetables. Stir fry until heated through.'
  },
  {
    id: 13,
    recipeName: 'Banana Bread',
    ingredients: ['ripe bananas', 'flour', 'sugar', 'butter', 'eggs', 'baking soda', 'vanilla extract'],
    instructions: 'Mash bananas and mix with wet ingredients. Add dry ingredients and stir until combined. Bake at 350°F for 60 minutes.'
  },
  {
    id: 14,
    recipeName: 'Lasagna',
    ingredients: ['lasagna noodles', 'ground beef', 'ricotta cheese', 'mozzarella cheese', 'tomato sauce', 'parmesan cheese'],
    instructions: 'Layer cooked noodles with meat sauce, ricotta, and mozzarella in a baking dish. Bake at 375°F for 45 minutes.'
  },
  {
    id: 15,
    recipeName: 'Buffalo Wings',
    ingredients: ['chicken wings', 'hot sauce', 'butter', 'garlic powder'],
    instructions: 'Bake or fry chicken wings. Toss with a sauce made from melted butter, hot sauce, and garlic powder.'
  },
  {
    id: 16,
    recipeName: 'Tomato Soup',
    ingredients: ['tomatoes', 'onion', 'garlic', 'vegetable broth', 'cream', 'basil'],
    instructions: 'Sauté onions and garlic. Add chopped tomatoes and broth. Simmer, then blend until smooth. Stir in cream and garnish with basil.'
  },
  {
    id: 17,
    recipeName: 'Chicken Alfredo',
    ingredients: ['fettuccine', 'chicken breast', 'heavy cream', 'parmesan cheese', 'butter', 'garlic'],
    instructions: 'Cook fettuccine. In a pan, sauté chicken and garlic. Add cream and parmesan, simmer until thickened. Toss with pasta.'
  },
  {
    id: 18,
    recipeName: 'Shrimp Scampi',
    ingredients: ['shrimp', 'garlic', 'butter', 'lemon juice', 'parsley', 'spaghetti'],
    instructions: 'Cook spaghetti. In a pan, sauté garlic in butter, add shrimp and cook until pink. Add lemon juice and parsley, then toss with spaghetti.'
  },
  {
    id: 19,
    recipeName: 'Vegetable Curry',
    ingredients: ['potatoes', 'carrots', 'cauliflower', 'coconut milk', 'curry powder', 'garlic', 'ginger', 'onion'],
    instructions: 'Sauté onion, garlic, and ginger. Add vegetables, curry powder, and coconut milk. Simmer until vegetables are tender.'
  },
  {
    id: 20,
    recipeName: 'Greek Salad',
    ingredients: ['cucumber', 'tomato', 'red onion', 'feta cheese', 'olives', 'olive oil', 'oregano'],
    instructions: 'Chop vegetables and toss with olive oil, oregano, and feta cheese. Garnish with olives.'
  }

];

module.exports = recipes;