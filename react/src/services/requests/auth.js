import axiosClient from "../../axios-client";

const AuthRequest = {};

AuthRequest.postAuth = (params) => {
  return axiosClient
    .post("/auth/discord/callback", params)
    .then((response) => response.data);
};

export default AuthRequest;
