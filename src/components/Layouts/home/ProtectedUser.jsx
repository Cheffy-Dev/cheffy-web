import { Skeleton } from "antd";
import { useSession } from "next-auth/client";
import Router from "next/router";
import React from "react";

const ProtectedUser = (WrappedComponent) => (props) => {
  const [session, loading] = useSession();

  if (loading) return <Skeleton />;
  if (!(session && session.role === "user")) {
    Router.push("/food/login");
    return <p>Access Denied</p>;
  }
  return <WrappedComponent session={session} />;
};

export { ProtectedUser };
