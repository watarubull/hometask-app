import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../context/AuthProvider";
import { db } from "../service/firebase";
import * as Api from "../service/api";

const GroupInfo = () => {
  let value = useContext(AuthContext);

  const [member, setMember] = useState();
  const [change, setChange] = useState(true);
  const [inputs, setInputs] = useState({});
  const [alertText, setAlertText] = useState("coution!");
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (value[0] === null || value[1] === null) {
      return;
    }
    const q = query(
      collection(db, "users"),
      where("groupId", "==", `${value[0].groupId}`)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let memberElem = [];
      querySnapshot.forEach((doc) => {
        memberElem.push({ name: doc.data().name, id: doc.id });
      });
      setMember(memberElem);
    });
    setInputs({ group: value[1].groupName });
    return () => {
      unsubscribe();
    };
  }, [value]);

  useEffect(() => {
    const URL = window.location.search.substring(1);
    console.log(URL);
  }, []);

  const changeForm = () => {
    setChange(!change);
  };

  const onInputChange = useCallback(
    (event) => {
      setInputs({ ...inputs, [event.target.name]: event.target.value });
    },
    [inputs]
  );

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
    let updateData = {};
    if (inputs.group !== value[1].groupName && inputs.group !== "") {
      updateData = { ...updateData, group: inputs.group };
    }
    console.log(updateData);
    await Api.updateGroupName(updateData, value[1].groupId);
    setChange(!change);
  };

  const checkForm = () => {
    if (inputs.group !== value[0].group) {
      updateForm();
    } else {
      setAlertText("変わってないよ！");
      setAlert(!alert);
    }
  };

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

  const invitation = () => {};

  const groupInfo = () => {
    if (value[0] === null || value[1] === null) {
      return;
    }
    if (!member) {
      return;
    }
    const list = member.map((obj) => {
      return <div key={obj.id}>{obj.name}</div>;
    });
    if (change) {
      return (
        <>
          <dl className="info-list">
            <div className="flex">
              <dt>グループ名</dt>
              <dd>{value[1].groupName}</dd>
              <dd className="change-btn">{btnSet()}</dd>
            </div>
            <div>
              <dt>メンバー</dt>
              <dd>{list}</dd>
            </div>
          </dl>
          <button
            className="btn-invitation"
            type="button"
            onClick={() => {
              invitation();
            }}
          >
            招待を送る
          </button>
        </>
      );
    } else {
      return (
        <>
          <dl className="info-list">
            <div className="flex">
              <dt>グループ名</dt>
              <dd>
                <input
                  type="text"
                  name="group"
                  onChange={onInputChange}
                  value={inputs.group || ""}
                />
              </dd>
              <dd className="change-btn">{btnSet()}</dd>
            </div>
            <div>
              <dt>メンバー</dt>
              <dd>{list}</dd>
            </div>
          </dl>
        </>
      );
    }
  };

  return (
    <>
      <div className="info-box">{groupInfo()}</div>
      <div className={`alert-wrap ${alert ? "open" : ""}`}>{alertSet()}</div>
    </>
  );
};

export default GroupInfo;
