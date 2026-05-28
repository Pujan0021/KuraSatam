import axios from "axios";
import LoadingEffect from "./LoadingEffect";
import MessageInput from "./MessageInput";
import SelectUser from "./SelectUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

interface Message {
  _id: string;
  text: string;
  sender: string;
  receiver: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  messages: Message[];
  loading: boolean;
  id: string;
  currentUserId: string;
}

const MessagePage = ({ messages, loading, id }: Props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<string | null>(null);

  const reloadMessages = useEffect(() => {
    const container = document.getElementById("message-container");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          "https://kurasatam-backend.onrender.com/api/auth/profile",
          {
            withCredentials: true,
          },
        );
        setUser(data.id);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Unauthenticated");
        navigate("/login");
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="bg-cyan-900 p-2 md:p-5 rounded-2xl w-50 text-white md:w-95 border border-amber-50">
      {loading ? (
        <div className="flex items-center justify-center h-60">
          <LoadingEffect />
        </div>
      ) : !id ? (
        <SelectUser />
      ) : (
        <ol
          id="message-container"
          className="h-60 overflow-y-scroll [&::-webkit-scrollbar]:hidden"
        >
          {messages && messages.length > 0 ? (
            messages.map((msg) => {
              const isMine = msg.sender === user;
              return (
                <li
                  key={msg._id}
                  className={`px-1 py-1 text-[10px] md:px-2 md:py-2 rounded-lg md:font-semibold md:text-sm mb-1.5 md:mb-2 w-max shadow-xs
                    ${isMine ? "bg-blue-600 ml-auto" : "bg-gray-800"}
                  `}
                >
                  {msg.text}
                  <sub className="pl-1 text-[4px] md:text-[8px]">
                    {dayjs(msg.createdAt).format("ddd, HH:mm")}
                  </sub>
                </li>
              );
            })
          ) : (
            <div className="flex justify-center items-center m-auto h-60">
              <p>No message</p>
            </div>
          )}
        </ol>
      )}
      {id && <MessageInput id={id} messages={reloadMessages} />}
    </div>
  );
};

export default MessagePage;
