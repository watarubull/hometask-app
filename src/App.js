import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./page/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Mypage from "./page/Mypage";
import { MypageCurrent } from "./context/MypageCurrent";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MypageCurrent>
          <header id="body-header">
            <Header />
          </header>
          <main className="page-main">
            <div className="inner">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
              </Routes>
            </div>
          </main>
        </MypageCurrent>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
