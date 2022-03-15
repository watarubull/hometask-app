import React, { useContext } from "react";

import { MypageContext } from "../context/MypageCurrent";

const ChildHeader = (prop) => {
  const nowMypage = useContext(MypageContext);

  const pageBack = () => {
    nowMypage.value.setMypageCurrent(prop.links);
  };

  return (
    <div className="childheader-wrap">
      <button className="btn-back" type="button" onClick={() => pageBack()}>
        戻る
      </button>
    </div>
  );
};

export default ChildHeader;
