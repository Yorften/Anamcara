import { useEffect } from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import UserRequest from "../services/requests/user";
import Hero from "../components/layouts/default/Hero";
import Gvg from "../components/layouts/default/Gvg";
import Recruiting from "../components/layouts/default/Recruiting";

function Welcome() {
  useDocumentTitle("Welcome");

  // useEffect(() => {
  //   const user = UserRequest.getUser();
  // }, []);

  return (
    <>
      <Gvg />
    </>
  );
}

export default Welcome;
