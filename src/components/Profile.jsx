import { useSelector } from "react-redux";
import ProfileCard from "./ProfileCard";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return user && (
    <div className="flex justify-center mt-16">
      <ProfileCard user={user}/>
    </div>
  );
};

export default Profile;
