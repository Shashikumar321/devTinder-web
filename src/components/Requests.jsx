import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";
import RequestCard from "./RequestCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (requests?.length === 0 || !requests) return <h1 className="text-center my-10">No requests found</h1>;

  return (
    <div className="text-center my-20">
      <h1 className="text-bold text-xl">Requests</h1>
      <h3 className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        People who are interested in you
      </h3>

      {requests.map((request) => {
        return (
          <RequestCard
            key={request._id}
            requestData={request}
          />
        );
      })}
    </div>
  );
};

export default Requests;
