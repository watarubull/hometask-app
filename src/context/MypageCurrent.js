import React, { useState } from "react";

export const MypageContext = React.createContext();

export const MypageCurrent = ({ children }) => {
  const [mypageCurrent, setMypageCurrent] = useState("default");
  const value = {
    mypageCurrent,
    setMypageCurrent,
  };

  return (
    <MypageContext.Provider value={{ value }}>
      {children}
    </MypageContext.Provider>
  );
};

export default MypageCurrent;
