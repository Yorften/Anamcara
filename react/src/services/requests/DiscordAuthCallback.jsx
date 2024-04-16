import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserRequest from "./user";

export default function DiscordAuthCallback() {
  const navigate = useNavigate();
  const fragmentParams = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = fragmentParams.get("access_token");

  const formData = new FormData();

  formData.append("token", accessToken);

  useEffect(() => {
    const response = UserRequest.getUser(formData);
    response.then((data) => {
        console.log(data);
        navigate('/');
    });
  });
}
