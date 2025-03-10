import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/requestSlice";

const RequestCard = ({ requestData }) => {
  const dispatch = useDispatch();
  const { fromUserId, _id } = requestData;
  const { firstName, lastName, age, gender, about, skills, photoUrl } =
    fromUserId;

  const handleAcceptReject = async (status, id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`, {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        dispatch(removeRequest(_id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card bg-base-100 w-full md:w-1/3 shadow-sm">
      <ul className="m-4 list bg-gray-700 rounded-box shadow-md">
        <li className="list-row">
          <div>
            <img className="size-20 rounded-box" src={photoUrl} />
          </div>
          <div>
            <p className="text-start text-lg">{firstName + " " + lastName}</p>
            <p className="text-start text-xs">{gender + "•" + age}</p>
            <p className="text-start text-xs">{"about : " + about}</p>
            <p className="text-start text-xs">
              {"skills : " + skills.join(", ")}
            </p>
          </div>
          <button
            className="btn btn-square btn-ghost hover:bg-red-500"
            onClick={() => handleAcceptReject("rejected", _id)}
          >
            <svg
              className="size-[1.2em]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </g>
            </svg>
          </button>
          <button className="btn btn-square btn-ghost hover:bg-green-600"
            onClick={() => handleAcceptReject("accepted", _id)}
            >
            <svg
              className="size-[1.2em]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </g>
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default RequestCard;
