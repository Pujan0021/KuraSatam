// import { useParams } from "react-router";
import MessagePage from "./MessagePage";
import UsersList from "./UsersList";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Message {
  _id: string;
  text: string;
  receiver: string;
  createdAt: string;
  updatedAt: string;
}

interface Friend {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const ChatPage = () => {
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [id, setId] = useState<string | null>(null);

  const fetchMessages = async (chatId: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get<Message[]>(
        `http://localhost:5000/api/message/${chatId}`,
        { withCredentials: true },
      );
      setMessages(data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error fetching messages");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const { data } = await axios.get<Friend[]>(
        "http://localhost:5000/api/users",
        { withCredentials: true },
      );
      setFriends(data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error fetching users");
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (id) fetchMessages(id);
  }, [id]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleProfileClick = (id: string): void => {
    setId(id);
  };

  return (
    <div className="flex justify-center w-150 p-0 m-0">
      <UsersList
        friends={friends}
        loading={loadingUsers}
        handleProfileClick={handleProfileClick}
      />
      <MessagePage messages={messages} loading={loading} id={id} />
    </div>
  );
};

export default ChatPage;
