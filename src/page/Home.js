import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import JoinUp from "../components/JoinUp";

const Home = () => {
  const { user } = useAuth();
  const [tabChange, setTabChange] = useState(true);
  const [addGroup, setAddGroup] = useState();

  useEffect(() => {
    let URL = window.location.search.substring(1);
    URL = decodeURI(URL);
    let prams = {};
    if (URL !== "") {
      console.log("aru");
      setAddGroup(true);
      URL.split("&").forEach((pram) => {
        const temp = pram.split("=");
        prams = { ...prams, [temp[0]]: temp[1] };
      });
      setAddGroup(prams);
      console.log(prams);
    } else {
      setAddGroup(false);
    }
  }, []);

  if (!user && addGroup) {
    return <JoinUp data={addGroup} />;
  }

  if (!user) {
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
  } else {
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
  }
};

export default Home;
