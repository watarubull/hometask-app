import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const Home = () => {
  const value = useContext(AuthContext);
  const [tabChange, setTabChange] = useState(true);

  const btnSign = () => {
    if (value[0] === null || value[1] === null) {
      return (
        <>
          <div className="tab-wrap">
            <button
              type="button"
              onClick={() => {
                tabChange || setTabChange(!tabChange);
              }}
              className={tabChange ? "tab current" : "tab"}
            >
              サインイン
            </button>
            <button
              type="button"
              onClick={() => {
                !tabChange || setTabChange(!tabChange);
              }}
              className={!tabChange ? "tab current" : "tab"}
            >
              新規登録
            </button>
          </div>
          <div className="list-wrap">
            <div className="list-inner">
              {tabChange ? <SignIn /> : <SignUp />}
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        <div className="home-list">
          <div className="list-item">
            <Link to={`/shoppinglist`}>お買い物リスト</Link>
          </div>
          <div className="list-item">
            <Link to={`/donelist`}>買ったよリスト</Link>
          </div>
        </div>
      </>
    );
  };

  return <>{btnSign()}</>;
};

export default Home;
