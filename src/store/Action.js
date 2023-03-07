import React from "react";

const setUser = (payload) => {
  return { type: "SET_USER", payload };
};
export const setEdit = (payload) => {
  return { type: "EDIT", payload };
};
export const search = (payload) => {
  return { type: "SEARCH", payload };
};

export default setUser;
