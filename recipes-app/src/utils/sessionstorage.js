export const getDataFromSessionStorage = (key) => {
  let data = sessionStorage.getItem(key);

  return data ? JSON.parse(data) : [];

};

export const saveDataInSessionStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
  
};

export const removeDataFromSessionStorage = (key) => {
  sessionStorage.removeItem(key);

};