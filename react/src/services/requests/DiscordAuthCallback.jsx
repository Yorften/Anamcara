import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthRequest from "./auth";

export default function DiscordAuthCallback() {
  const navigate = useNavigate();
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
  const formData = new FormData();

  formData.append("code", code);

  useEffect(() => {
    const response = AuthRequest.postAuth(formData);
    response.then((data) => {
        console.log(data);
    });
  });
}
