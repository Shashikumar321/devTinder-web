import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("sk@gmail.com");
  const [password, setPassword] = useState("Qwerty@123");
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

  return (
    <div className="flex justify-center my-20">
      <div className="card bg-gray-700 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>

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
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
