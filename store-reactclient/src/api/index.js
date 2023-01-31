import axios from "axios";

export const BASE_URL = "https://localhost:44339/api/";

export const ENDPOINTS = {
  GAMES: "Games",
  GENRES: "Genres",
  REGISTRATION: "Authentication/register-user",
  LOGIN: "Authentication/login-user",
  REFRESH_TOKEN: "Authentication/refresh-token",
  UPDATE_AVATAR: "Authentication/update-avatar",
  COMMENTS: "Comments",
};

export const createApiEndpoint = (endpoint) => {
  let url = BASE_URL + endpoint;
  return {
    fetchAll: () => axios.get(url),
    fetchById: (id) => axios.get(url + "/" + id),
    post: (newRecord) => axios.post(url, newRecord),
    edit: (id, editedRecord) => axios.put(url + "/" + id, editedRecord),
    delete: (id) => axios.delete(url + "/" + id),
    fetchCommentsByGameId: (id) => axios.get(url + "?gameId=" + id),
  };
};

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
