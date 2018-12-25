
export const AUTH_TOKEN = 'authToken';

export const LocalStorageAPI = {
  saveAuthToken(token) {
    window.localStorage.setItem(AUTH_TOKEN, token);
  },
  getAuthToken() {
    return window.localStorage[AUTH_TOKEN];
  }
};