import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Other = () => {
  const { user } = useAuth();
  const navi = useNavigate();

  useEffect(() => {
    if (!user) {
      return navi("/");
    }
  }, [navi, user]);
  return <div>Other</div>;
};

export default Other;
