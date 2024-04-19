import axiosClient from "../../axios-client";

const UserRequest = {};

UserRequest.getUser = () => {
  return axiosClient.get("/users/@me").then((response) => response.data);
};

UserRequest.isUserInGuild = () => {
  return axiosClient.get("/users/@me/guild").then((response) => response.data);
};

export default UserRequest;
