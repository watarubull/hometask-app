import React, { useState, useCallback, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import * as Api from "../service/api";

const Shopping = () => {
  const [popup, setPupup] = useState(false);
  const [inputs, setInputs] = useState({});

  const value = useContext(AuthContext);

  const changePopup = () => {
    setPupup(!popup);
  };

  const onInputChange = useCallback(
    (event) => {
      setInputs({ ...inputs, [event.target.name]: event.target.value });
    },
    [inputs]
  );

  const addList = async () => {
    if (inputs.itemName != "") {
      await Api.setItems(inputs.itemName, value[0].groupId);
      changePopup();
    }
  };

  const popupSet = () => {
    return (
      <div className="alert-body">
        <div className="alert-inner list-add">
          <input
            type="text"
            placeholder="品目"
            name="itemName"
            onChange={onInputChange}
          />
          <button type="button" onClick={() => addList()}>
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
  };

  return (
    <div>
      <div className="list">
        <button className="btn-add" onClick={() => changePopup()}>
          追加する
        </button>
      </div>
      <div className={`alert-wrap ${popup ? "open" : ""}`}>{popupSet()}</div>
    </div>
  );
};

export default Shopping;
