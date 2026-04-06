import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatPage from "./components/ChatPage";
import { Context } from "./context/UserContext";

const App = () => {
  return (
    <>
      <Context>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" />
      </Context>
    </>
  );
};

export default App;
