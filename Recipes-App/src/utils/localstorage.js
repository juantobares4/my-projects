export const getDataFromLocalStorage = (key) => {
  let data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];

};

export const saveDataInLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));

};
