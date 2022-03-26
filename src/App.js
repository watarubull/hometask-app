import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
// import Home from "./page/Home";
// import SignUp from "./components/SignUp";
// import SignIn from "./components/SignIn";
// import Mypage from "./page/Mypage";
// import Shopping from "./page/Shopping";
// import ShoppingDone from "./page/ShoppingDone";
// import { MypageCurrent } from "./context/MypageCurrent";
import Test from "./page/Test";
import Other from "./page/Other";
import UserProvider from "./context/UserProvider";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          {/* <MypageCurrent> */}
          <header id="body-header">
            <Header />
          </header>
          <main className="page-main">
            <div className="inner">
              <Routes>
                <Route path="/" element={<Test />} />
                <Route path="/other" element={<Other />} />
                {/* <Route path="/mypage" element={<Mypage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/shoppinglist" element={<Shopping />} />
                <Route path="/donelist" element={<ShoppingDone />} /> */}
              </Routes>
            </div>
          </main>
          {/* </MypageCurrent> */}
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
