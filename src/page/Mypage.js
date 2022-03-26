import React, { useContext, useEffect, useState } from "react";
import ChildHeader from "../components/ChildHeader";
import GroupInfo from "../components/GroupInfo";
// import { Link } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import { MypageContext } from "../context/MypageCurrent";
import * as Api from "../service/api";

const Mypage = () => {
  // const [pegeTransition, setPageTransition] = useState("default");
  const nowMypage = useContext(MypageContext);

  const changePage = (value) => {
    nowMypage.value.setMypageCurrent(value);
  };

  const defaultPage = () => {
    return (
      <ul className="home-list">
        <li className="list-item">
          <button type="button" onClick={() => changePage("user")}>
            ユーザー情報
          </button>
        </li>
        <li className="list-item">
          <button type="button" onClick={() => changePage("group")}>
            グループ情報
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
  } else if (nowMypage.value.mypageCurrent === "group") {
    return (
      <div className="mypage">
        <ChildHeader links="default" />
        <GroupInfo />
      </div>
    );
  }
  return <div className="mypage">ページ</div>;
};

export default Mypage;
