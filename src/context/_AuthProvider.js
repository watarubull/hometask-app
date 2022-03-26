import React, { useState, useEffect } from "react";
import { auth } from "../service/firebase";
import { onAuthStateChanged } from "firebase/auth";
import * as Api from "../service/api";
import { db } from "../service/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState();
  const [userInfo, setUserInfo] = useState(null);
  const [groupInfo, setGroupInfo] = useState(null);

  // async function getUser(id) {
  //   const info = await Api.readUsers(id);
  //   const data = {
  //     email: info.userData.email,
  //     name: info.userData.name,
  //     password: info.userData.password,
  //     uid: info.userData.uid,
  //     groupId: info.userData.groupId,
  //     groupName: info.groupData.groupName,
  //   };
  //   setUserInfo(data);
  // }

  useEffect(() => {
    let unsubscribe;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // setCurrentUser(user.uid);
        // getUser(user.uid);
        unsubscribe = onSnapshot(doc(db, "users", user.uid), (doc1) => {
          setUserInfo(doc1.data());
          onSnapshot(doc(db, "group", doc1.data().groupId), (doc2) => {
            setGroupInfo(doc2.data());
          });
        });
      } else {
        // setCurrentUser(null);
        setUserInfo(null);
        setGroupInfo(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // const contextData = () => {
  //   if (userInfo && groupInfo) {
  //     const data = {
  //       email: userInfo.email,
  //       name: userInfo.name,
  //       password: userInfo.password,
  //       uid: userInfo.uid,
  //       groupId: userInfo.groupId,
  //       groupName: groupInfo.groupName,
  //     };
  //     return data;
  //   }
  // };

  return (
    // Contextを使用して認証に必要な情報をコンポーネントツリーに流し込む。
    <AuthContext.Provider value={[userInfo, groupInfo]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
