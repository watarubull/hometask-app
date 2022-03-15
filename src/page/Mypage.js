import React, { useContext, useEffect, useState } from "react";
import ChildHeader from "../components/ChildHeader";
// import { Link } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import { MypageContext } from "../context/MypageCurrent";

const Mypage = () => {
  // const [pegeTransition, setPageTransition] = useState("default");
  const nowMypage = useContext(MypageContext);

  // useEffect(() => {
  //   console.log(nowMypage.value.mypageCurrent);
  // });

  const changePage = (value) => {
    nowMypage.value.setMypageCurrent(value);
  };

  const defaultPage = () => {
    return (
      <ul className="page-list">
        <li>
          <button type="button" onClick={() => changePage("user")}>
            ユーザー情報
          </button>
        </li>
      </ul>
    );
  };
  if (nowMypage.value.mypageCurrent === "default") {
    return <div className="mypage">{defaultPage()}</div>;
  } else if (nowMypage.value.mypageCurrent === "user") {
    return (
      <div className="mypage">
        <ChildHeader links="default" />
        <UserInfo />
      </div>
    );
  }
  return <div className="mypage">ページ</div>;
};

export default Mypage;
