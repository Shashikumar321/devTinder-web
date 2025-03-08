import { useState } from "react";
import EditProfile from "./EditProfile";

const UserCard = ({ user }) => {
  const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);

  const handleOnClick = () => {
    setIsEditProfileVisible(true);
  }

  const { firstName, lastName, photoUrl, about, skills, age, gender } = user;
  return !isEditProfileVisible ? (
    <div className="card bg-gray-700 w-96 shadow-sm mb-20">
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
            className="btn btn-primary mr-6 bg-amber-600 border border-amber-600"
            onClick={handleOnClick}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  ) : (
    <EditProfile user={user} />
  );
};

export default UserCard;
