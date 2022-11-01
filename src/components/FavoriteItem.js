import React, { useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

const FavoriteItem = ({ name, index, deleteHandler }) => {
  const onDeleteHandler = () => {
    deleteHandler(index);
  };

  return (
    <div className="flex flex-row last:border-b-2">
      <div className="flex-1 border-solid border-2 border-t-2 border-b-0 p-2">
        {name}
      </div>

      <div className="flex-1 border-solid border-t-2 border-y-2 border-r-2 border-b-0 p-2">
        <TrashIcon
          onClick={onDeleteHandler}
          className="h-6 w-6 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default FavoriteItem;
