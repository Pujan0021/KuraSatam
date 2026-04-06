import { useContext } from "react";
import LoadingEffect from "../components/LoadingEffect";
import UserContext from "../context/UserContext";
import { FaSignOutAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";
import ChatPage from "../components/ChatPage";

const Home = () => {
  const { loading, userName } = useContext(UserContext);

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true },
      );
      toast.success("Logout successfully");
      navigate("/login");
    } catch {
      toast.error("Logout failed!");
    }
  };

  return (
    <section className="bg-cyan-950 text-white">
      <div className="container h-screen m-auto flex flex-col justify-center items-center gap-1 w-full">
        <div className="bg-cyan-900 mx-3 p-2 rounded-2xl w-150">
          {loading ? (
            <div className="flex items-center justify-center">
              <LoadingEffect />
            </div>
          ) : (
            <div className="flex justify-between items-center px-5">
              <div className="flex justify-between items-center gap-2">
                <img
                  src="/img/profile.jpg"
                  alt="profile-pic"
                  className="rounded-[50%] object-center h-15"
                />
                <div className="font-semibold">{userName}</div>
              </div>
              <FaSignOutAlt
                onClick={handleLogout}
                className="text-2xl hover:text-red-600 cursor-pointer"
              />
            </div>
          )}
        </div>
        <ChatPage />
      </div>
    </section>
  );
};

export default Home;
