import axiosClient from "../../axios-client";

const TaskRequest = {};

TaskRequest.store = (params) => {
  return axiosClient
    .post("/tasks", params)
    .then((response) => response.data);
};

TaskRequest.index = (params) => {
  return axiosClient
    .get("/tasks", params)
    .then((response) => response.data);
};

TaskRequest.update = (id, params) => {
  return axiosClient
    .put(`/tasks/${id}`, params)
    .then((response) => response.data);
};

TaskRequest.delete = (id, params) => {
  return axiosClient
    .delete(`/tasks/${id}`, params)
    .then((response) => response.data);
};

export default TaskRequest;
