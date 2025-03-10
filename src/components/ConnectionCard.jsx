const ConnectionCard = ({ connectionData }) => {
  const { firstName, lastName, age, gender, about, skills, photoUrl } =
    connectionData;

  return (
    <div className="card bg-base-100 w-full lg:w-1/3 shadow-sm">
      <ul className="m-10 list bg-gray-700 rounded-box shadow-md">
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
        </li>
      </ul>
    </div>
  );
};

export default ConnectionCard;
