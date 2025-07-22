export const filterById = (id, characters) => {
  const filterCharacter = characters.find(char => char.id === id);

  return filterCharacter;

};