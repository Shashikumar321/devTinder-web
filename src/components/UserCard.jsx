import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ feed }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, photoUrl, about, skills, age, gender, _id } =
    feed;

  const handleSendRequest = async (status, id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        dispatch(removeUserFromFeed(id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card bg-gray-700 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="user" />
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-center">
          {firstName + " " + lastName}
        </h2>
        <p>{"age : " + age}</p>
        <p>{"gender : " + gender}</p>
        <p>{"skills : " + skills.join(", ")}</p>
        <p>{"about : " + about}</p>

        <div className="card-actions justify-center pt-10">
          <button
            className="btn btn-primary mr-6 bg-red-700 border border-red-600"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary bg-green-700 border border-green-600"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
