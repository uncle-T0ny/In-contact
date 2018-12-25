import axios from 'axios';

import { LocalStorageAPI } from './LocalStorageAPI';

const SERVER_URL = `http://localhost:5000`;

function getAuthHeader() {
  return {
    headers: {
      Authorization: LocalStorageAPI.getAuthToken()
    }
  };
}

export const ServerAPI = {
  auth: {
    signIn(email, password) {
      return axios.post(`${SERVER_URL}/auth/login`, { email, password }).then((res) => res.data);
    },
    signUp(email, password) {
      return axios.post(`${SERVER_URL}/auth/register`, { email, password }).then((res) => res.data);
    },
    check() {
      return axios.get(`${SERVER_URL}/auth/check`, getAuthHeader()).then((res) => res.data);
    },
    logOut() {
      return axios.post(`${SERVER_URL}/auth/logout`, {}, getAuthHeader()).then((res) => res.data);
    }
  },

  contacts: {
    get() {
      return axios.get(`${SERVER_URL}/contacts`, getAuthHeader()).then((res) => res.data);
    },
    create(data) {
      return axios.put(`${SERVER_URL}/contacts`, data, getAuthHeader()).then((res) => res.data);
    },
  }
};