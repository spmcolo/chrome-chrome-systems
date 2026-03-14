export const API_BASE_URL = "";

export const API_ENDPOINTS = {
  GET_ATLETAS: () => API_BASE_URL + "/api/atletas",
  POST_ATLETAS: () => API_BASE_URL + "/api/atletas",
  PUT_ATLETAS_ID: (id) => API_BASE_URL + "/api/atletas/" + id + "",
  DELETE_ATLETAS_ID: (id) => API_BASE_URL + "/api/atletas/" + id + "",
  GET_CIA: () => API_BASE_URL + "/api/cia",
  POST_CIA: () => API_BASE_URL + "/api/cia",
  PUT_CIA_ID: (id) => API_BASE_URL + "/api/cia/" + id + "",
  DELETE_CIA_ID: (id) => API_BASE_URL + "/api/cia/" + id + "",
  GET_ANIMAIS: () => API_BASE_URL + "/api/animais",
  POST_ANIMAIS: () => API_BASE_URL + "/api/animais",
  PUT_ANIMAIS_ID: (id) => API_BASE_URL + "/api/animais/" + id + "",
  DELETE_ANIMAIS_ID: (id) => API_BASE_URL + "/api/animais/" + id + "",
  GET_EVENTOS: () => API_BASE_URL + "/api/eventos",
  POST_EVENTOS: () => API_BASE_URL + "/api/eventos",
  PUT_EVENTOS_ID: (id) => API_BASE_URL + "/api/eventos/" + id + "",
  DELETE_EVENTOS_ID: (id) => API_BASE_URL + "/api/eventos/" + id + ""
};
