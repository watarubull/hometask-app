import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useInfo } from "../context/UserProvider";
import { db } from "../service/firebase";
import * as Api from "../service/api";
// import { init, emailjs } from "emailjs-com";

const GroupInfo = () => {
  const { userPram, groupPram } = useInfo();

  const [member, setMember] = useState();
  const [change, setChange] = useState(true);
  const [inputs, setInputs] = useState({});
  const [alertText, setAlertText] = useState("coution!");
  const [alert, setAlert] = useState(false);
  const [alartSwitch, setAlartSwitch] = useState();

  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("groupId", "==", `${groupPram.groupId}`)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let memberElem = [];
      querySnapshot.forEach((doc) => {
        memberElem.push({ name: doc.data().name, id: doc.id });
      });
      setMember(memberElem);
    });
    return () => {
      unsubscribe();
    };
  }, [groupPram]);

  useEffect(() => {
    setInputs({ group: groupPram.groupName });
  }, [groupPram]);

  const changeForm = () => {
    setChange(!change);
  };

  const onInputChange = useCallback(
    (event) => {
      setInputs({ ...inputs, [event.target.name]: event.target.value });
    },
    [inputs]
  );

  const alertSet = (setting) => {
    if (setting === "check") {
      return (
        <div className="alert-body">
          <div className="alert-inner">
            <p className="alert">{alertText}</p>
            <button className="btn-close" onClick={() => changeForm()}></button>
          </div>
        </div>
      );
    } else if (setting === "invitation") {
      const nowURL = window.location.href;
      const homeURL = nowURL.split(window.location.pathname).join("");
      let sendURL =
        homeURL +
        `?groupId=${groupPram.groupId}&groupName=${groupPram.groupName}&userId=${userPram.uid}&userName=${userPram.name}`;
      sendURL = encodeURIComponent(sendURL);
      const subject = `?subject=${encodeURIComponent(
        "[ Home Task ] ?????????????????????????????????????????????"
      )}`;
      const body = `&body=${encodeURIComponent(
        "??????????????????Home Task???????????????"
      )}${userPram.name}${encodeURIComponent(
        "??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"
      )}`;
      return (
        <div className="alert-body">
          <div className="alert-inner send-invitation">
            <input
              type="text"
              name="mail"
              onChange={onInputChange}
              value={inputs.mail || ""}
            />
            <a
              target="_blank"
              href={`mailto:${inputs.mail || ""}${subject}${body}${sendURL}`}
              rel="noreferrer"
            >
              ????????????????????????????????????????????????
            </a>
            <button
              className="btn-close"
              onClick={() => setAlert(!alert)}
            ></button>
          </div>
        </div>
      );
    }
  };

  const updateForm = async () => {
    await Api.updateGroupName(inputs.group, groupPram.groupId);
    setChange(!change);
  };

  const checkForm = () => {
    if (inputs.group !== groupPram.group && inputs.group !== "") {
      updateForm();
    } else {
      setAlartSwitch("check");
      setAlertText("?????????????????????");
      setAlert(!alert);
    }
  };

  const setInvitation = () => {
    setAlartSwitch("invitation");
    setAlert(!alert);
  };

  const btnSet = () => {
    if (change) {
      return (
        <button className="btn-sm" type="button" onClick={() => changeForm()}>
          ??????
        </button>
      );
    } else {
      return (
        <>
          <button className="btn-sm" type="button" onClick={() => checkForm()}>
            ??????
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

  const setInfo = () => {
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
              <dt>???????????????</dt>
              <dd>{groupPram.groupName}</dd>
              <dd className="change-btn">{btnSet()}</dd>
            </div>
            <div>
              <dt>????????????</dt>
              <dd>{list || ""}</dd>
            </div>
          </dl>
        </>
      );
    } else {
      return (
        <>
          <dl className="info-list">
            <div className="flex">
              <dt>???????????????</dt>
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
              <dt>????????????</dt>
              <dd>{list || ""}</dd>
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
          <Link to="/mypage">??????</Link>
        </button>
      </div>
      {setInfo()}
      <button
        className="btn-invitation"
        type="button"
        onClick={() => {
          setInvitation();
        }}
      >
        ???????????????
      </button>
      <div className={`alert-wrap ${alert ? "open" : ""}`}>
        {alertSet(alartSwitch)}
      </div>
    </div>
  );
};

export default GroupInfo;
