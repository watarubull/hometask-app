import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
// import Home from "./page/Home";
// import SignUp from "./components/SignUp";
// import SignIn from "./components/SignIn";
import Mypage from "./page/Mypage";
import Shopping from "./page/Shopping";
import ShoppingDone from "./page/ShoppingDone";
// import { MypageCurrent } from "./context/MypageCurrent";
import Test from "./page/Test";
import Other from "./page/Other";
import UserProvider from "./context/UserProvider";
import Home from "./page/Home";
import UserInfo from "./page/UserInfo";
import GroupInfo from "./page/GroupInfo";
import JoinGroup from "./page/JoinGroup";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <header id="body-header">
            <Header />
          </header>
          <main className="page-main">
            <div className="inner">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/other" element={<Other />} />
                <Route path="/shoppinglist" element={<Shopping />} />
                <Route path="/donelist" element={<ShoppingDone />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/mypage/userinfo" element={<UserInfo />} />
                <Route path="/mypage/groupinfo" element={<GroupInfo />} />
                <Route path="/joingroup" element={<JoinGroup />} />
              </Routes>
            </div>
          </main>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
