import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
const UserContext = createContext({ userName: "Guest", loading: true });

export const Context = ({ children }: { children: React.ReactNode }) => {
  const [userName, setUsername] = useState("Guest");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
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
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ loading, userName }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
