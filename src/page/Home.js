import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const Home = () => {
  const value = useContext(AuthContext);

  const btnSign = () => {
    if (!value[0]) {
      return <>サインインしてない</>;
    }
    return (
      <>
        <Link to={`/shoppinglist`}>お買い物リスト</Link>
      </>
    );
  };

  return <>{btnSign()}</>;
};

export default Home;
