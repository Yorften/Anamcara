import axiosClient from "../../axios-client";
import Cookies from "js-cookie";

const UserRequest = {};

const url = "/user";

UserRequest.getUser = () => {
  return axiosClient.get(url).then((response) => response.data);
};

UserRequest.isUserInGuild = () => {};

export default UserRequest;
