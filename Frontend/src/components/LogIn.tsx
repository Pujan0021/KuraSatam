import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmitBtn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }
    const formData = { email, password };
    try {
      await axios.post("http://localhost:5000/api/auth/signin", formData);
      toast.success("Login Successfully");
      navigate("/");
    } catch (error) {
      console.log(e, "Error submitting data");
      toast.error("Login Failed");
    }
  };

  return (
    <section className=" bg-cyan-950 text-white">
      <div className="container h-screen m-auto flex flex-row justify-center items-center">
        <div className="bg-cyan-900 mx-3 p-5  rounded-2xl ">
          <h2 className="font-bold text-2xl my-5 px-4 py-2">
            Log in to your account
          </h2>
          <form action="" onSubmit={handleSubmitBtn}>
            <label className="block mt-5" htmlFor="email">
              Email address
            </label>
            <input
              className="block w-full bg-white mt-3 px-2 text-black"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password" className="block mt-5">
              Password
            </label>
            <input
              className="block w-full text-black bg-white mt-3 px-2"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              className="bg-blue-700 w-full mt-8 rounded-sm  text-white px-4 py-1 font-semibold"
              type="submit"
              value="Login"
            />
          </form>
          <div className="flex flex-row justify-center gap-4 mt-5 text-sm ">
            <p>Don't have an Account?</p>
            <p>
              <Link
                className="hover:text-red-500 underline underline-offset-4"
                to="/signup"
              >
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
