import React, { useContext, useState, useCallback, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import * as Api from "../service/api";

const UserInfo = () => {
  let value = useContext(AuthContext);
  const [change, setChange] = useState(true);
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("coution!");
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    setInputs({
      name: value[0].name,
      email: value[0].email,
      password: value[0].password,
    });
  }, [value]);

  async function getUser(id) {
    const info = await Api.readUsers(id);
    setInputs(info);
    value[0] = info;
  }

  const changeForm = () => {
    setChange(!change);
  };

  const checkForm = () => {
    if (inputs.name !== value[0].name) {
      updateForm();
    } else {
      setAlertText("変わってないよ！");
      setAlert(!alert);
    }
  };

  const updateForm = async () => {
    let updateData = {};
    if (inputs.name !== value[0].name && inputs.name !== "") {
      updateData = { ...updateData, name: inputs.name };
    }
    await Api.updateUserName(updateData, value[0].uid);
    getUser(value[0].uid);
    setChange(!change);
  };

  const onInputChange = useCallback(
    (event) => {
      setInputs({ ...inputs, [event.target.name]: event.target.value });
    },
    [inputs]
  );

  const btnSet = () => {
    if (change) {
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

  const myInfo = () => {
    if (change) {
      return (
        <>
          <dl className="info-list">
            <div className="flex">
              <dt>ユーザー名</dt>
              <dd>{inputs.name}</dd>
              <dd className="change-btn">{btnSet()}</dd>
            </div>
            <div>
              <dt>メールアドレス</dt>
              <dd>{inputs.email}</dd>
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
              <dd>{inputs.email}</dd>
            </div>
            <div>
              <dt>パスワード</dt>
              <dd>{inputs.password}</dd>
            </div>
          </dl>
        </>
      );
    }
  };

  return (
    <>
      <div className="info-box">{myInfo()}</div>
      <div className={`alert-wrap ${alert ? "open" : ""}`}>{alertSet()}</div>
    </>
  );
};

export default UserInfo;
