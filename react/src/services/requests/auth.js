import axiosClient from "../../axios-client";

const AuthRequest = {};

const auth = "/auth/discord/callback";

AuthRequest.postAuth = (params) => {
  axiosClient
    .post(auth, params)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};
export default AuthRequest;
