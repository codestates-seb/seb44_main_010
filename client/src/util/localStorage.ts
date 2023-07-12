export const setLocalStorage = (key: string, token: string) => {
  localStorage.setItem(key, token);
};

export const deleteLocalstorage = (key: string) => {
  localStorage.removeItem(key);
};

export const getLocalstorage = (key: string) => {
  return localStorage.getItem(key) as string;
};
