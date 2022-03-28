import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useInfo } from "../context/UserProvider";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { user } = useAuth();
  const { userPram, groupPram } = useInfo();
  const [open, setOpen] = useState(false);
  const navi = useNavigate();

  const slideNav = () => {
    setOpen(!open);
  };

  const logOut = () => {
    signOut(getAuth());
    slideNav();
    navi("/");
  };

  const header = () => {
    if (!user) {
      return (
        <>
          <Link onClick={() => slideNav()} to={`/`}>
            サインイン
          </Link>
        </>
      );
    } else {
      console.log(userPram, groupPram);
      return (
        <>
          <Link onClick={() => slideNav()} to={`/mypage`}>
            マイページ
          </Link>
          <button type="button" onClick={() => logOut()}>
            サインアウト
          </button>
        </>
      );
    }
  };

  return (
    <div className={`head-inner ${open ? "open" : ""}`}>
      <div className="head-bar">
        <h1 className="logo">
          <Link to={`/`}>HOME TASK</Link>
        </h1>
        <button
          type="button"
          className="nav-btn"
          data-target="slide-nav"
          onClick={() => slideNav()}
        ></button>
      </div>
      <div className="slide-nav">{header()}</div>
    </div>
  );
};

export default Header;
