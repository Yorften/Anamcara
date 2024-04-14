import { useEffect } from "react";
import AuthRequest from "./auth";
import axiosClient from "../../axios-client";

export default function DiscordAuthCallback() {
  const fragmentParams = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = fragmentParams.get("access_token");

  const formData = new FormData();

  formData.append("token", accessToken);


  useEffect(() => {
    // const response = AuthRequest.postAuth(accessToken);
    // console.log(response);
     axiosClient
       .post("/auth/discord/callback", formData)
       .then(({ data }) => {
         console.log(data);
       })
       .catch((err) => {
         console.log(err);
       });
  });
}
