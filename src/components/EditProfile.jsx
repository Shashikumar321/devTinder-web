import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills);
  const [photoUrl, setphotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const { emailId } = user;

  const handleSaveProfile = async () => {
    try {
      setError("");
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { emailId, firstName, lastName, age, gender, about, skills, photoUrl },
        { withCredentials: true }
      );

      if (res.status === 200) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setShowToast(true);

        setTimeout(() => {
          setShowToast(false);
        }, 5000);

        dispatch(addUser(res.data.data));
      }
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div>
        <div className="card bg-gray-700 w-96 shadow-sm mb-36">
          <figure>
            <img
              className="w-40 h-40 m-5 rounded-full"
              src={photoUrl}
              alt="User_profile_photo"
            />
          </figure>
          <div className="card-body">
            <form onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="m-1">
                  First Name
                  <input
                    className="input my-2"
                    name="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label className="m-1">
                  Last Name
                  <input
                    className="input my-2"
                    name="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label className="m-1">
                  Age
                  <input
                    className="input my-2"
                    name="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label className="m-1">
                  Gender
                  <input
                    className="input my-2"
                    name="gender"
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label className="m-1">
                  About
                  <input
                    className="input my-2"
                    name="about"
                    type="text"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label className="m-1">
                  Skills
                  <input
                    className="input my-2"
                    name="skills"
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label className="m-1">
                  Photo URL
                  <input
                    className="input my-2"
                    name="photoUrl"
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setphotoUrl(e.target.value)}
                  />
                </label>
              </div>
              <p className="pl-2 text-sm text-red-500">{error}</p>
              <div className="card-actions justify-center mt-10">
                <button
                  className="btn btn-primary bg-green-700 border border-green-600"
                  onClick={handleSaveProfile}
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="mt-18 toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
