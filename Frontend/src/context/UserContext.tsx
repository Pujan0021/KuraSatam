import { createContext, useEffect, useState } from "react";

interface UserContextType {
  userName: string;
  loading: boolean;
  sound: boolean;
  userPreferredSound: boolean;
  userId: string;
  userImg: string;
  refreshUser: () => void;
  playSound: () => void;
  setSound: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType>({
  userName: "Guest",
  loading: true,
  sound: true,
  userPreferredSound: true,
  userId: null,
  userImg: null,
  refreshUser: () => {},
  playSound: () => {},
  setSound: () => {},
});

const mouseClickSound = new Audio("/Sounds/mouse-click.mp3");

export const Context = ({ children }: { children: React.ReactNode }) => {
  const [sound, setSound] = useState<boolean>(() => {
    const saved = localStorage.getItem("Sound");
    return saved ? JSON.parse(saved) : true;
  });

  const [userName, setUsername] = useState("Guest");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userImg, setUserImg] = useState(null);

  const userPreferredSound = sound;

  useEffect(() => {
    localStorage.setItem("Sound", JSON.stringify(sound));
  }, [sound]);

  const playSound = () => {
    if (sound) {
      mouseClickSound.play();
    }
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setUsername(data.name || "Guest");
      setUserImg(data.imgURL);
      setUserId(data.id);
    } catch (error) {
      console.log(error, "Error occurred fetching user data");
      // toast.error("Error Occurred Fetching User Detail");
      setUsername("Guest");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loading,
        userName,
        refreshUser: fetchUser,
        playSound,
        sound,
        setSound,
        userPreferredSound,
        userId,
        userImg,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
