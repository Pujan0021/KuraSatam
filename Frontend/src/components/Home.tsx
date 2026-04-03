import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoadingEffect from "./LoadingEffect";

const Home = () => {
  const [userName, setUsername] = useState("Guest");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/profile", {
          method: "GET",
          credentials: "include",
        });
        console.log(res);
        const data = await res.json();
        console.log(data);
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
    <>
      <section className="bg-cyan-950 text-white">
        <div className="container h-screen m-auto flex flex-row justify-center items-center">
          <div className="bg-cyan-900 mx-3 p-5  rounded-2xl">
            {loading ? (
              <LoadingEffect />
            ) : (
              <div className="flex justify-between items-center gap-10 ">
                <div>
                  <img
                    src="/img/profile.jpg"
                    alt="profile-pic"
                    className="rounded-[50%] h-15"
                  />
                </div>
                <div className="font-semibold">{userName}</div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default Home;
