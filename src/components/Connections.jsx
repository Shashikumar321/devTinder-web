import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res.data.connections));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections?.length === 0 || !connections) return <h1 className="text-center my-10">No connections found</h1>;

  return connections && (
    <div className="text-center mt-10 mb-30">
      <h1 className="text-bold text-xl">Connections</h1>
      <h3 className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        Your Friends
      </h3>

      {connections.map((connection) => {
        return (
          <ConnectionCard
            key={connection?.firstName}
            connectionData={connection}
          />
        );
      })}
    </div>
  );
};

export default Connections;
