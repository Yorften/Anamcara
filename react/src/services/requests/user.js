import fetch from "../../axios-client";

const UserRequest = {};

const user = "/user";

UserRequest.getUser = (params) => {
  return fetch({
    url: user,
    methods: "get",
    params: params,
  });
};
export default UserRequest;
