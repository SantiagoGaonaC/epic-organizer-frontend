import React from "react";

const UserComponent: React.FC = () => {
  const userDataString = localStorage.getItem("user");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const firstName = userData?.firstname || "";

  return <p>{firstName}</p>;
};

export default UserComponent;
