import axiosClient from "../../axios-client";

const IconRequest = {};

IconRequest.index = (params) => {
  return axiosClient
    .get("/icons", params)
    .then((response) => response.data);
};

export default IconRequest;
