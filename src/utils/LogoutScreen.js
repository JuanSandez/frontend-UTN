import LOCALSTORAGE_KEYS from "../constants/localStorage";


export const logout = () => {
  localStorage.removeItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN);
  localStorage.removeItem(LOCALSTORAGE_KEYS.USER); 
  window.location.href = "/login";
};
