import React, { useEffect, useState, useCallback } from "react";
import { useInfo } from "../context/UserProvider";
import { Link } from "react-router-dom";
import * as Api from "../service/api";

const UserInfo = () => {
  const { userPram } = useInfo();

  const [btnChange, setBtnChange] = useState(true);
  const [inputs, setInputs] = useState({});
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("coution!");

  useEffect(() => {
    setInputs({ name: userPram.name });
  }, [userPram]);

  const changeForm = () => {
    setBtnChange(!btnChange);
  };

  const alertSet = () => {
    return (
      <div className="alert-body">
        <div className="alert-inner">
          <p className="alert">{alertText}</p>
          <button className="btn-close" onClick={() => checkForm()}></button>
        </div>
      </div>
    );
  };

  const updateForm = async () => {
    await Api.updateUserName(inputs.name, userPram.uid);
    setBtnChange(!btnChange);
  };

  const checkForm = () => {
    if (inputs.name !== userPram.name && inputs.name !== "") {
      updateForm();
    } else {
      setAlertText("無効な値だよ！");
      setAlert(!alert);
    }
  };

  const btnSet = () => {
    if (btnChange) {
      return (
        <button className="btn-sm" type="button" onClick={() => changeForm()}>
          変更
        </button>
      );
    } else {
      return (
        <>
          <button className="btn-sm" type="button" onClick={() => checkForm()}>
            確定
          </button>
          <button
            className="btn-sm btn-cancel"
            type="button"
            onClick={() => changeForm()}
          ></button>
        </>
      );
    }
  };

  const onInputChange = useCallback(
    (event) => {
      setInputs({ ...inputs, [event.target.name]: event.target.value });
    },
    [inputs]
  );

  const setInfo = () => {
    if (btnChange) {
      return (
        <>
          <dl className="info-list">
            <div className="flex">
              <dt>ユーザー名</dt>
              <dd>{userPram.name}</dd>
              <dd className="change-btn">{btnSet()}</dd>
            </div>
            <div>
              <dt>メールアドレス</dt>
              <dd>{userPram.email}</dd>
            </div>
            <div>
              <dt>パスワード</dt>
              <dd>*********</dd>
            </div>
          </dl>
        </>
      );
    } else {
      return (
        <>
          <dl className="info-list">
            <div className="flex">
              <dt>ユーザー名</dt>
              <dd>
                <input
                  type="text"
                  name="name"
                  onChange={onInputChange}
                  value={inputs.name || ""}
                />
              </dd>
              <dd className="change-btn">{btnSet()}</dd>
            </div>
            <div>
              <dt>メールアドレス</dt>
              <dd>{userPram.email}</dd>
            </div>
            <div>
              <dt>パスワード</dt>
              <dd>{userPram.password}</dd>
            </div>
          </dl>
        </>
      );
    }
  };

  return (
    <div>
      <div className="childheader-wrap">
        <button className="btn-back" type="button">
          <Link to="/mypage">戻る</Link>
        </button>
      </div>
      {setInfo()}
      <div className={`alert-wrap ${alert ? "open" : ""}`}>{alertSet()}</div>
    </div>
  );
};

export default UserInfo;
