import axiosClient from "../../axios-client";

const ApplicationRequest = {};

ApplicationRequest.post = (params) => {
  return axiosClient
    .post("/applications", params)
    .then((response) => response.data);
};

export default ApplicationRequest;
