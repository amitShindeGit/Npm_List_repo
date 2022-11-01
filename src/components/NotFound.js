import React from "react";
import Button from "./UI/Button";
import { Link } from 'react-router-dom'


const NotFound = () => {
  return (
    <div className="mt-24 flex flex-col justify-center gap-y-3 items-center border-solid border-2 p-32">
      <p>You don't have any favs yet. Please add.</p>
      <Link to='/'> <Button text={"Add Fav"} /></Link>
    </div>
  );
};

export default NotFound;
