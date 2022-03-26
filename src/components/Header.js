import React from "react";
import { useAuth } from "../context/AuthProvider";
import { useInfo } from "../context/UserProvider";

const Header = () => {
  const { user } = useAuth();
  const { userPram, groupPram } = useInfo();

  if (!user) {
    return <div>Header サインインしてない！</div>;
  } else {
    console.log(userPram, groupPram);
    return <div>Header サインインしてる！</div>;
  }
};

export default Header;
