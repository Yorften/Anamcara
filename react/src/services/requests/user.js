import axiosClient from "../../axios-client";
import Cookies from 'js-cookie';

const UserRequest = {};

const url = "/user";

UserRequest.getUser = () => {
  const token = Cookies.get('token');
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "json/application",
  };
  return axiosClient.get(url, { headers }).then((response) => response.data);
};

export default UserRequest;
