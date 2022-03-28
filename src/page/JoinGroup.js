import React, { useEffect, useState } from "react";

const JoinGroup = () => {
  const [addGroup, setAddGroup] = useState();

  useEffect(() => {
    const URL = window.location.search.substring(1);
    let prams = {};

    URL.split("&").forEach((pram) => {
      const temp = pram.split("=");
      prams = { ...prams, [temp[0]]: temp[1] };
    });
    setAddGroup(prams);
    console.log(prams);
  }, []);

  return <div>JoinGroup</div>;
};

export default JoinGroup;
