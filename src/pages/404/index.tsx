import Router from "next/router";
import { useEffect } from "react";

const ErrorPage = () => {
  useEffect(() => {
    Router.push("/main");
  }, []);
  return <></>;
};

export default ErrorPage;
