import axiosClient from "../../axios-client";

const AuthRequest = {};

const url = "/auth/discord/callback";

AuthRequest.postAuth = (params) => {

  return axiosClient.post(url, params).then((response) => response.data);
};

export default AuthRequest;
