import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import isAuthenticated from "./isAuthenticated";
import Cookies from "js-cookie";

// this would change later on once backend has the authentication
// working.

const withAuth = <P extends { children: React.ReactNode }>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get("ktn");
      const isLoggedIn = isAuthenticated(token as string);
      if (!isLoggedIn) {
        router.push("/auth/login");
        Cookies.remove("ktn");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const wrappedComponent = React.createElement(WrappedComponent, props);
    return wrappedComponent;
  };

  return Wrapper;
};

export default withAuth;
