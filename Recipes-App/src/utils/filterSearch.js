export const filterSearch = (term, data) => {
  if (!Array.isArray(data)) return [];

  const lowerTerm = term.toLowerCase();

  return data.filter(recipe =>
    recipe.title.toLowerCase().includes(lowerTerm) ||
    recipe.category.toLowerCase().includes(lowerTerm)
  
  );

};
