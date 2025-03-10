import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data.data));

      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data.data));

      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center my-20">
      <div className="card bg-gray-700 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>

          {!isLoginForm && (
            <>
              {" "}
              <fieldset className="fieldset">
                <legend className="fieldset-legend px-1">First Name</legend>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  className="input"
                  required
                  placeholder=""
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend px-1">Last Name</legend>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  className="input"
                  required
                  placeholder=""
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
            </>
          )}

          <fieldset className="fieldset">
            <legend className="fieldset-legend px-1">Email Id</legend>
            <input
              type="email"
              name="email"
              value={emailId}
              className="input"
              required
              placeholder=""
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend px-1">Password</legend>
            <input
              type="password"
              name="password"
              value={password}
              required
              className="input"
              placeholder=""
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>

          <div className="text-red-500">{error}</div>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          {isLoginForm ? (
            <div>
              new to DevTinder?{" "}
              <button className="cursor-pointer font-bold text-[#9a98fb]" onClick={() => setIsLoginForm(false)}>Sign Up</button>
            </div>
          ) : (
            <div>
              already have an account{" "}
              <button className="cursor-pointer font-bold text-[#9a98fb]" onClick={() => setIsLoginForm(true)}>Login</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
