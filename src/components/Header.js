import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

const Header = () => {
  const value = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const slideNav = () => {
    setOpen(!open);
  };

  const logOut = () => {
    signOut(getAuth());
    slideNav();
  };

  const header = () => {
    if (value[0] === null) {
      return (
        <>
          <Link onClick={() => slideNav()} to={`/signin`}>
            サインイン
          </Link>
        </>
      );
    } else {
      return (
        <>
          <div>{value[0].group}</div>
          <div>{value[0].name}</div>
          <div>
            <Link onClick={() => slideNav()} to={`/mypage`}>
              マイページ
            </Link>
          </div>
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
        >
          ボタン
        </button>
      </div>
      <div className="slide-nav">{header()}</div>
    </div>
  );
};

export default Header;
