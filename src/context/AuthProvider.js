import React, {useState, useEffect} from "react";
import { auth } from "../service/firebase";
import { onAuthStateChanged } from "firebase/auth";


export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const userName = "igarashi";
  useEffect(() => {
    onAuthStateChanged(auth,(user) => {
      if (user) {
        setCurrentUser(user);
        console.log(user);
      }else{
        setCurrentUser(null);
      }
  });
  }, []);

  if(!currentUser){
    return null;
  }

  return (
    // Contextを使用して認証に必要な情報をコンポーネントツリーに流し込む。
    <AuthContext.Provider value={{currentUser,userName}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
