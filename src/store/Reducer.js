export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "EDIT":
      return { ...state, edit: action.payload };
    case "SEARCH":
      return { ...state, search: action.payload };
    default:
      console.log("default");
  }
};
