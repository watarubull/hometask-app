import React, { useCallback, useState } from "react";
import * as Api from "../service/api";
import { auth } from "../service/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import shortid from "shortid";

const JoinUp = (prop) => {
  const [inputs, setInputs] = useState({});

  const register = async () => {
    await createUserWithEmailAndPassword(auth, inputs.mail01, inputs.password);
    const user01 = auth.currentUser.uid;
    // await createUserWithEmailAndPassword(auth,inputs.mail02,inputs.password);
    // const user02 = auth.currentUser.uid;
    Api.addUsers(inputs, prop.data.groupId, user01);
  };

  const onInputChange = useCallback(
    (event) => {
      setInputs({ ...inputs, [event.target.name]: event.target.value });
    },
    [inputs]
  );

  const setInfo = () => {
    return (
      <>
        <div className="join-area">
          <p className="message">
            {prop.data.userName}さんから
            <br />
            グループへの招待が届きました！
          </p>
          <div className="join-inner">
            <dl className="input-area">
              <dt className="title">グループ名</dt>
              <dd className="item">{prop.data.groupName}</dd>
              <dt className="title">あなたのユーザー名</dt>
              <dd className="item">
                <input
                  name="name01"
                  type="text"
                  placeholder="名前"
                  onChange={onInputChange}
                  value={inputs.name01 || ""}
                />
              </dd>
              <dt className="title">あなたのメールアドレス</dt>
              <dd className="item">
                <input
                  name="mail01"
                  type="email"
                  placeholder="メールアドレス"
                  onChange={onInputChange}
                  value={inputs.mail01 || ""}
                />
              </dd>
              <dt className="title">パスワード</dt>
              <dd className="item">
                <input
                  name="password"
                  type="password"
                  placeholder="共通パスワード"
                  onChange={onInputChange}
                  value={inputs.password || ""}
                />
              </dd>
            </dl>
            <p className="submit">
              <button type="button" onClick={() => register()}>
                登録
              </button>
            </p>
          </div>
        </div>
      </>
    );
  };

  return <div>{setInfo()}</div>;
};

export default JoinUp;
