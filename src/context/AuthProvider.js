import React, { useState, useEffect } from "react";
import { auth } from "../service/firebase";
import { onAuthStateChanged } from "firebase/auth";
import * as Api from "../service/api";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState();
  const [userInfo, setUserInfo] = useState({});

  async function getUser(id) {
    const info = await Api.readUsers(id);
    setUserInfo(info);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // setCurrentUser(user.uid);
        getUser(user.uid);
      } else {
        // setCurrentUser(null);
        setUserInfo(null);
      }
    });
  }, []);

  return (
    // Contextを使用して認証に必要な情報をコンポーネントツリーに流し込む。
    <AuthContext.Provider value={[userInfo]}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
