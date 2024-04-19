import axiosClient from "../../axios-client";
import Cookies from "js-cookie";

const AuthRequest = {};

AuthRequest.postAuth = (params) => {
  return axiosClient
    .post("/auth/discord/callback", params)
    .then((response) => response.data);
};

AuthRequest.logout = () => {
  return axiosClient.post("/logout").then((response) => response);
};

export default AuthRequest;
