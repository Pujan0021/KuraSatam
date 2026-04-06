import axios from "axios";
import LoadingEffect from "./LoadingEffect";
import MessageInput from "./MessageInput";
import SelectUser from "./SelectUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            withCredentials: true,
          },
        );
        setUser(data.id);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Unauthenticated");
        navigate("/");
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="bg-cyan-900 p-5 rounded-2xl text-white w-95">
      {loading ? (
        <div className="flex items-center justify-center h-60">
          <LoadingEffect />
        </div>
      ) : !id ? (
        <SelectUser />
      ) : (
        <ol className="h-60 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
          {messages && messages.length > 0 ? (
            messages.map((msg) => {
              // console.log(msg.sender, ": sender");
              // console.log(user, ":User");
              // console.log(msg.receiver, " : msg receiver");
              const isMine = msg.sender === user;
              return (
                <li
                  key={msg._id}
                  className={`px-2 py-2 rounded-lg font-semibold text-sm mb-2 w-max shadow-xs
                    ${isMine ? "bg-blue-600 ml-auto" : "bg-gray-800"}
                  `}
                >
                  {msg.text}
                </li>
              );
            })
          ) : (
            <div className="flex justify-center items-center m-auto h-60">
              <p>No messages</p>
            </div>
          )}
        </ol>
      )}
      {id && <MessageInput id={id} />}
    </div>
  );
};

export default MessagePage;
