import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import LoadingEffect from "../components/LoadingEffect";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmitBtn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    const formData = { name, email, password };
    try {
      await axios.post("http://localhost:5000/api/auth/signup", formData);
      toast.success("Account created Successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Error creating an account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className=" bg-cyan-950 text-white">
      <div className="container h-screen m-auto flex flex-row justify-center items-center">
        <div className="bg-cyan-900 mx-3 p-5  rounded-2xl ">
          <h2 className="font-bold text-2xl my-5 px-4 py-2">
            Sign in to your account
          </h2>
          <form action="" onSubmit={handleSubmitBtn}>
            <label className="block mt-5" htmlFor="name">
              Name
              <input
                className="block w-full bg-white mt-3 px-2 py-0.5 text-black"
                type="name"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label className="block mt-5" htmlFor="email">
              Email address
              <input
                className="block w-full bg-white mt-3 px-2 py-0.5 text-black"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label htmlFor="password" className="block mt-5">
              Password
              <input
                className="block w-full text-black bg-white mt-3 px-2 py-0.5"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {!loading ? (
              <input
                className="bg-blue-700 w-full mt-8 rounded-sm  hover:cursor-pointer text-white px-4 py-1 font-semibold"
                type="submit"
                value="SignUp"
              />
            ) : (
              <div className="flex justify-center  mt-8  bg-blue-700 w-full px-4 py-2.5  rounded-sm">
                <LoadingEffect />
              </div>
            )}
          </form>
          <div className="flex flex-row justify-center gap-4 mt-5 text-sm ">
            <p>Already have an Account?</p>
            <p>
              <Link
                className="hover:text-red-500 underline underline-offset-4"
                to="/login"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
