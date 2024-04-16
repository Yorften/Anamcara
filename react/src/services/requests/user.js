import axiosClient from "../../axios-client";

const UserRequest = {};

const url = "https://discordapp.com/api/users/@me";

UserRequest.getUser = (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };
  return axiosClient.get(url, { headers }).then((response) => response.data);
};
export default UserRequest;
