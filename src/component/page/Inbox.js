import React, { useContext } from "react";
import { StoreContext } from "../../store/AppContext";
const Inbox = () => {
  const data = StoreContext();
  console.log(data);
  return <div>inbox </div>;
};

export default Inbox;
