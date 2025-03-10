import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "../components/UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if(!feedData) return;

  if(feedData?.length <= 0 ) return (<h1 className="text-center my-20">No new users found!</h1>)

  return feedData && (
    <div className="flex justify-center mt-20 mb-40">
        <UserCard feed={feedData[0]}/>
    </div>
  );
};

export default Feed;
