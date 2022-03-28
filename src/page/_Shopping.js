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
import { AuthContext } from "../context/AuthProvider";
import * as Api from "../service/api";
import { Link } from "react-router-dom";

const Shopping = () => {
  const [popup, setPupup] = useState(false);
  const [popupCh, setPupupCh] = useState("add");
  const [doneBtn, setDoneBtn] = useState(false);
  const [inputs, setInputs] = useState({});
  const [itemList, setItemList] = useState("");
  const [checked, setChecked] = useState({});
  const [checkedSwitch, setCheckedSwitch] = useState(false);

  const value = useContext(AuthContext);

  useEffect(() => {
    if (value[0] === null || value[1] === null) {
      return;
    }
    const q = query(
      collection(db, "items"),
      where("groupId", "==", `${value[1].groupId}`),
      where("status", "==", 0)
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
  }, [value]);

  useEffect(() => {
    if (value[0] === null || value[1] === null) {
      return;
    }
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
  }, [checked, value]);

  const checkBtn = (e) => {
    let targetId = e.target.id;
    setChecked({ ...checked, [targetId]: e.target.checked });
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
    if (setting === "add") {
      setPupupCh("add");
    } else if (setting === "update") {
      setPupupCh("update");
    }
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
      await Api.setItems(inputs.itemName, value[1].groupId);
      changePopup();
      setInputs({});
      // getList();
    }
  };

  const popupSet = (setting) => {
    if (setting === "add") {
      return (
        <div className="alert-body">
          <div className="alert-inner list-add">
            <input
              type="text"
              placeholder="品目"
              name="itemName"
              value={inputs.itemName || ""}
              onChange={onInputChange}
            />
            <button className="btn-add" type="button" onClick={() => addList()}>
              追加
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
              上記のアイテムを「買ったよ！」にしますか？
            </p>
            <button
              className={`btn-done ${doneBtn ? "able" : ""}`}
              onClick={() => done()}
            >
              はい
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

  const done = async () => {
    if (checkedSwitch) {
      let sendList = [];
      Object.keys(checked).forEach((obj) => {
        if (checked[obj]) {
          sendList.push(obj);
        }
      });
      console.log(sendList);
      const batch = writeBatch(db);
      sendList.forEach((item) => {
        const sfRef = doc(db, "items", item);
        batch.update(sfRef, {
          status: 1,
        });
      });
      await batch.commit();
      // getList();
      changePopup();
    }
  };

  return (
    <div>
      <div className="childheader-wrap">
        <button className="btn-back" type="button">
          <Link to="/">戻る</Link>
        </button>
      </div>
      <div className="tab-wrap">
        <div className="tab current">お買い物リスト</div>
        <button className="tab" type="button">
          <Link to="/donelist">買ったよリスト</Link>
        </button>
      </div>
      <div className="list-wrap">{setList()}</div>
      <div className="btn-wrap">
        <button className="btn-add" onClick={() => changePopup("add")}>
          追加する
        </button>
        <button
          className={`btn-done ${doneBtn ? "able" : ""}`}
          onClick={() => changePopup("update")}
        >
          買ったよ！
        </button>
      </div>
      <div className={`alert-wrap ${popup ? "open" : ""}`}>
        {popupSet(`${popupCh}`)}
      </div>
    </div>
  );
};

export default Shopping;
