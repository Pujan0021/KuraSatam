import { useContext, useRef, useState, useEffect } from "react";
import { FourSquare, ThreeDot } from "react-loading-indicators";
// import LoadingEffect from "../components/LoadingEffect";
import UserContext from "../context/UserContext";
import { FaSignOutAlt, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";
import ChatPage from "../components/ChatPage";
import imageCompression from "browser-image-compression";

const Home = () => {
  const {
    userId,
    userName,
    userImg,
    loading,
    refreshUser,
    setSound,
    userPreferredSound,
  } = useContext(UserContext);

  const [loadingImg, setLoadingImg] = useState(false);
  const muteSound = new Audio("Sounds/mouse-click.mp3");
  muteSound.currentTime = 0;
  const defaultImg = "img/profile.jpg";
  const [selectedImg, setSelectedImg] = useState(null);
  const imgFile = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userImg) {
      setSelectedImg(userImg);
    }
  }, [userImg]);

  const handleFileUpload = async (e) => {
    setLoadingImg(true);
    const file = e.target.files[0];
    if (!file) return;

    const options = { maxSizeMB: 1, maxWidthOrHeight: 800, useWebWorker: true };
    try {
      const compressedFile = await imageCompression(file, options);

      const formData = new FormData();
      formData.append("profileImg", compressedFile);

      const res = await axios.patch(
        `http://localhost:5000/api/${userId}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      setSelectedImg(res.data.user.imgURL);
      toast.success("Profile picture Updated Successfully");

      refreshUser();
    } catch (error) {
      toast.error("Failed to upload image!");
    } finally {
      setLoadingImg(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true },
      );
      toast.success("Logout successfully");
      refreshUser();
      setSound(true);
      navigate("/login");
    } catch {
      toast.error("Logout failed!");
    }
  };

  return (
    <section className="bg-cyan-950 text-white ">
      <div className="container h-screen m-auto flex flex-col justify-center items-center gap-1 w-full ">
        <div className="bg-cyan-900 mx-1 md:mx-3 md:p-2 rounded-2xl w-75 md:w-150 border border-amber-50">
          <div className="flex justify-between items-center px-5">
            <div className="flex justify-between items-center gap-2">
              {!loadingImg ? (
                <>
                  <button
                    className="relative hover:cursor-pointer w-15 h-15 rounded-full flex items-center justify-center transition-all duration-75 ease-in-out"
                    onClick={() => imgFile.current.click()}
                  >
                    <img
                      src={selectedImg ? selectedImg : defaultImg}
                      alt="profile-pic"
                      className="w-13 h-13 rounded-full object-cover"
                    />
                    <div className="absolute bottom-5 opacity-0 hover:opacity-100 left-2 text-sm">
                      <span className="hover:text-black">Change</span>
                    </div>
                  </button>

                  <input
                    type="file"
                    accept="image/*"
                    ref={imgFile}
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </>
              ) : (
                <button className="relative hover:cursor-pointer w-15 h-15 rounded-full text-sm flex items-center justify-center transition-all duration-75 ease-in-out">
                  <FourSquare color="white" size="small" text="" textColor="" />
                </button>
              )}
              <div className="font-semibold">{userName}</div>
            </div>

            <div className="flex gap-5 items-center">
              <FaSignOutAlt
                onClick={handleLogout}
                className="text-xl hover:text-red-600 cursor-pointer"
              />
              {userPreferredSound ? (
                <FaVolumeUp
                  onClick={() => {
                    setSound(false);
                    muteSound.play();
                  }}
                  className="text-xl cursor-pointer transition-all duration-75 ease-in-out"
                />
              ) : (
                <FaVolumeMute
                  onClick={() => {
                    setSound(true);
                    muteSound.play();
                  }}
                  className="text-xl cursor-pointer transition-all duration-75 ease-in-out"
                />
              )}
            </div>
          </div>
        </div>
        <ChatPage />
      </div>
    </section>
  );
};

export default Home;
