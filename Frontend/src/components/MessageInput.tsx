import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaPaperPlane } from "react-icons/fa";
import LoadingEffect from "./LoadingEffect";
import UserContext from "../context/UserContext";

interface Props {
  id: string;
}

const MessageInput = ({ id }: Props) => {
  const { sound } = useContext(UserContext);
  console.log(sound);
  const mouseClickSound = new Audio("/Sounds/notification.mp3");
  mouseClickSound.currentTime = 0;
  const key1 = new Audio("/Sounds/keystroke1.mp3");
  const key2 = new Audio("/Sounds/keystroke2.mp3");
  const key3 = new Audio("/Sounds/keystroke3.mp3");
  const key4 = new Audio("/Sounds/keystroke4.mp3");

  const audioList = [key1, key2, key3, key4];

  audioList.forEach((audio) => {
    audio.load();
  });

  const [loading, setLoading] = useState(false);
  const [sendMessage, setSendMessage] = useState<string>("");

  const handleSendMessage = async () => {
    if (!sendMessage.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `http://localhost:5000/api/sendMessage/${id}`,
        { text: sendMessage },
        { withCredentials: true },
      );
      {
        sound ? mouseClickSound.play() : null;
      }
      setSendMessage("");
      toast.success("Message sent successfully");
    } catch (error: any) {
      setSendMessage("");
      toast.error(error.response?.data?.message || "Error sending message");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const playSound = () => {
    const randomSound = Math.floor(Math.random() * audioList.length);
    audioList[randomSound].currentTime = 0;
    sound ? audioList[randomSound].play() : null;
  };

  return (
    <div className="flex justify-between items-center float-end rounded-sm w-full">
      <input
        type="text"
        className="bg-white p-1 rounded-sm text-black w-35 md:w-70 focus:outline-none pl-2"
        onChange={(e) => {
          (setSendMessage(e.target.value), playSound());
        }}
        value={sendMessage}
        onKeyDown={(e) => (e.key == "Enter" ? handleSendMessage() : null)}
      />
      {loading ? (
        <LoadingEffect />
      ) : (
        <FaPaperPlane
          className="hover:cursor-pointer mx-1 md:mx-5"
          onClick={handleSendMessage}
        />
      )}
    </div>
  );
};

export default MessageInput;
