import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const Home = () => {
  const value = useContext(AuthContext);

  const btnSign = () => {
    if (!value[0]) {
      return <>サインインしてない</>;
    }
    return <>サインインしてる</>;
  };

  return (
    <>
      <div>Home</div>
      {btnSign()}
    </>
  );
};

export default Home;
