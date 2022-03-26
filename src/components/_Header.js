import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const value = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navi = useNavigate();

  useEffect(() => {
    if (value[0] === null || value[1] === null) {
      return navi("/");
    }
  }, [navi, value]);

  const slideNav = () => {
    setOpen(!open);
  };

  const logOut = () => {
    signOut(getAuth());
    slideNav();
  };

  const header = () => {
    if (value[0] === null || value[1] === null) {
      return (
        <>
          <Link onClick={() => slideNav()} to={`/`}>
            サインイン
          </Link>
        </>
      );
    } else {
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
