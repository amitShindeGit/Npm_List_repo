import React from "react";
import FavoriteItem from "./FavoriteItem";

const FavoriteList = ({ favList, deleteHandler, confirmDelete}) => { 

  return (
    <div className="mt-24 flex flex-col justify-center w-full">
      <div className="flex flex-row">
        <div className="flex-1 border-solid border-t-2 border-2 border-b-0 font-medium p-2">
          Package Name
        </div>
        <div className="flex-1 border-solid border-t-2 border-r-2 border-b-0 font-medium p-2">
          Actions
        </div>
      </div>
      {favList && favList.map((it, i) => {
        return (
          <FavoriteItem key={i} name={it.name} index={i} deleteHandler={deleteHandler} confirmDelete={confirmDelete} />
        );
      })}
    </div>
  );
};

export default FavoriteList;
