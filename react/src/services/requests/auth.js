import axiosClient from "../../axios-client";
import Cookies from "js-cookie";

const AuthRequest = {};

AuthRequest.postAuth = (params) => {
  return axiosClient
    .post("/auth/discord/callback", params)
    .then((response) => response.data);
};

AuthRequest.logout = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axiosClient
    .post("/logout", {}, { headers })
    .then((response) => response);
};

export default AuthRequest;
