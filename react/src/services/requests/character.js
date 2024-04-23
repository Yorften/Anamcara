import axiosClient from "../../axios-client";

const CharacterRequest = {};

CharacterRequest.store = (params) => {
  return axiosClient
    .post("/characters", params)
    .then((response) => response.data);
};

CharacterRequest.index = (params) => {
  return axiosClient
    .get("/characters", params)
    .then((response) => response.data);
};

CharacterRequest.update = (id, params) => {
  return axiosClient
    .patch(`/characters/${id}`, params)
    .then((response) => response.data);
};

CharacterRequest.delete = (id, params) => {
  return axiosClient
    .delete(`/characters/${id}`, params)
    .then((response) => response.data);
};

export default CharacterRequest;
