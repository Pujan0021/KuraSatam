import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface UserContextType {
  userName: string;
  loading: boolean;
  refreshUser: () => void;
}

const UserContext = createContext<UserContextType>({
  userName: "Guest",
  loading: true,
  refreshUser: () => {},
});

export const Context = ({ children }: { children: React.ReactNode }) => {
  const [userName, setUsername] = useState("Guest");
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setUsername(data.name || "Guest");
    } catch (error) {
      console.log(error, "Error occured fetching user data");
      toast.error("Error Occured Fetching User Detail");
      setUsername("Guest");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ loading, userName, refreshUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
