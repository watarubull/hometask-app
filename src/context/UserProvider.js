import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../service/firebase";
import { useAuth } from "./AuthProvider";

const UserContext = React.createContext();

export const useInfo = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const { user } = useAuth();

  const [userPram, setUserPram] = useState("");
  const [groupPram, setGroupPram] = useState("");
  const [loading, setLoading] = useState(true);

  const value = {
    userPram,
    groupPram,
    loading,
  };

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(doc(db, "users", user.uid), (userDoc) => {
        setUserPram(userDoc.data());
        onSnapshot(doc(db, "group", userDoc.data().groupId), (groupDoc) => {
          setGroupPram(groupDoc.data());
          setLoading(false);
        });
      });
      return () => {
        unsubscribe();
      };
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export default UserProvider;
