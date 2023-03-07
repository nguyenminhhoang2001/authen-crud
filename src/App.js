import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import SignInSide from "./component/Login";
import Inbox from "./component/page/Inbox";
import SendEmail from "./component/page/SendEmail";
import Starred from "./component/page/Starred";
import SignUp from "./component/SignUp";
function App() {
  return (
    <div className="App">
      <>
        <Routes>
          <Route path="signup" element={<SignUp />}></Route>
          <Route path="/" element={<SignInSide />}></Route>
          <Route path="home" element={<Home />}>
            <Route path="inbox" element={<Inbox />}></Route>
            <Route path="starred" element={<Starred />}></Route>
            <Route path="sendemail" element={<SendEmail />}></Route>
          </Route>
        </Routes>
      </>
    </div>
  );
}

export default App;
