import { useEffect } from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import UserRequest from "../services/requests/user";

function Welcome() {
  useDocumentTitle("Welcome");

  useEffect(() => {
    const user = UserRequest.getUser();
  }, []);

  return <></>;
}

export default Welcome;
