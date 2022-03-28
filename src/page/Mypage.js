import React from "react";
import { Link } from "react-router-dom";

const Mypage = () => {
  return (
    <ul className="home-list">
      <li className="list-item">
        <Link to="/mypage/userinfo">ユーザー情報</Link>
      </li>
      <li className="list-item">
        <Link to="/mypage/groupinfo">グループ情報</Link>
      </li>
    </ul>
  );
};

export default Mypage;
