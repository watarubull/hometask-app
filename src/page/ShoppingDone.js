import React, { useState, useCallback, useContext, useEffect } from "react";
import {
  writeBatch,
  doc,
  getDocs,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../service/firebase";
import { useInfo } from "../context/UserProvider";
import * as Api from "../service/api";
import { Link } from "react-router-dom";

const ShoppingDone = () => {
  const { groupPram } = useInfo();

  const [popup, setPupup] = useState(false);
  const [popupCh, setPupupCh] = useState("add");
  const [doneBtn, setDoneBtn] = useState(false);
  const [inputs, setInputs] = useState({});
  const [itemList, setItemList] = useState("");
  const [checked, setChecked] = useState({});
  const [checkedSwitch, setCheckedSwitch] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, "items"),
      where("groupId", "==", `${groupPram.groupId}`),
      where("status", "==", 1)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsElem = [];
      querySnapshot.forEach((doc) => {
        itemsElem.push({ id: doc.id, data: doc.data() });
      });
      setItemList(itemsElem);
    });
    return () => {
      unsubscribe();
    };
  }, [groupPram]);

  useEffect(() => {
    function checkList() {
      const search = Object.keys(checked).some(
        (item) => checked[item] === true
      );
      if (search) {
        setCheckedSwitch(true);
        setDoneBtn(true);
      } else {
        setCheckedSwitch(false);
        setDoneBtn(false);
      }
    }
    checkList();
  }, [checked]);

  const checkBtn = (e) => {
    setChecked({ ...checked, [e.target.id]: e.target.checked });
  };

  const setList = () => {
    if (itemList.length > 0) {
      const list = itemList.map((item, index) => {
        return (
          <div key={item.id} id={item.id}>
            <label>
              {item.data.itemName}
              <input
                type="checkbox"
                name={item.id}
                id={item.id}
                onChange={(e) => checkBtn(e)}
                defaultChecked={false}
              ></input>
            </label>
          </div>
        );
      });
      return <div className="item-list list">{list}</div>;
    } else {
      return;
    }
  };

  const changePopup = (setting) => {
    setPupupCh(setting);
    setPupup(!popup);
  };

  const onInputChange = useCallback(
    (event) => {
      setInputs({ ...inputs, [event.target.name]: event.target.value });
    },
    [inputs]
  );

  const addList = async () => {
    if (inputs.itemName !== "") {
      await Api.setItems(inputs.itemName, groupPram.groupId);
      changePopup();
      // getList();
    }
  };

  const done = async () => {
    if (checkedSwitch) {
      let sendList = [];
      Object.keys(checked).forEach((obj) => {
        if (checked[obj]) {
          sendList.push(obj);
        }
      });
      const batch = writeBatch(db);
      sendList.forEach((item) => {
        const sfRef = doc(db, "items", item);
        batch.update(sfRef, {
          status: 0,
        });
      });
      await batch.commit();
      changePopup();
    }
  };

  const deleat = async () => {
    if (checkedSwitch) {
      let deleatList = [];
      Object.keys(checked).forEach((obj) => {
        if (checked[obj]) {
          deleatList.push(obj);
        }
      });
      const batch = writeBatch(db);
      deleatList.forEach((item) => {
        const sfRef = doc(db, "items", item);
        batch.update(sfRef, {
          status: 2,
        });
      });
      await batch.commit();
      changePopup();
    }
  };

  const popupSet = (setting) => {
    if (setting === "add") {
      return (
        <div className="alert-body">
          <div className="alert-inner list-add">
            <input
              type="text"
              placeholder="??????"
              name="itemName"
              onChange={onInputChange}
            />
            <button className="btn-add" type="button" onClick={() => addList()}>
              ??????
            </button>
            <button
              type="button"
              className="btn-close"
              onClick={() => changePopup()}
            ></button>
          </div>
        </div>
      );
    } else if (setting === "update") {
      const setItems = [];
      Object.keys(checked).forEach((elm) => {
        if (checked[elm]) {
          itemList.forEach((item) => {
            if (elm === item.id) {
              setItems.push(item.data.itemName);
            }
          });
        }
      });
      const showItems = setItems.map((item) => {
        return (
          <div className="list-item" key={item}>
            {item}
          </div>
        );
      });

      return (
        <div className="alert-body">
          <div className="alert-inner list-add">
            {showItems}
            <p className="permission">
              ?????????????????????????????????????????????????????????????????????
            </p>
            <button
              className={`btn-done ${doneBtn ? "able" : ""}`}
              onClick={() => done()}
            >
              ??????
            </button>
            <button
              type="button"
              className="btn-close"
              onClick={() => changePopup()}
            ></button>
          </div>
        </div>
      );
    } else if (setting === "deleate") {
      const setItems = [];
      Object.keys(checked).forEach((elm) => {
        if (checked[elm]) {
          itemList.forEach((item) => {
            if (elm === item.id) {
              setItems.push(item.data.itemName);
            }
          });
        }
      });
      const showItems = setItems.map((item) => {
        return (
          <div className="list-item" key={item}>
            {item}
          </div>
        );
      });
      return (
        <div className="alert-body">
          <div className="alert-inner list-add">
            {showItems}
            <p className="permission">?????????????????????????????????????????????</p>
            <button
              className={`btn-done ${doneBtn ? "able" : ""}`}
              onClick={() => deleat()}
            >
              ??????
            </button>
            <button
              type="button"
              className="btn-close"
              onClick={() => changePopup()}
            ></button>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="childheader-wrap">
        <button className="btn-back" type="button">
          <Link to="/">??????</Link>
        </button>
      </div>
      <div className="tab-wrap">
        <button className="tab" type="button">
          <Link to="/shoppinglist">?????????????????????</Link>
        </button>
        <div className="tab current">?????????????????????</div>
      </div>
      <div className="list-wrap">{setList()}</div>
      <div className="btn-wrap">
        <button
          className={`btn-deleat ${doneBtn ? "able" : ""}`}
          onClick={() => changePopup("deleate")}
        >
          ?????????????????????
        </button>
        <button
          className={`btn-done ${doneBtn ? "able" : ""}`}
          onClick={() => changePopup("update")}
        >
          ???????????????????????????
        </button>
      </div>
      <div className={`alert-wrap ${popup ? "open" : ""}`}>
        {popupSet(`${popupCh}`)}
      </div>
    </div>
  );
};

export default ShoppingDone;
