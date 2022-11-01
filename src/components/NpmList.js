import React from "react";
import NpmItem from "./NpmItem";
import AlertModal from "./UI/AlertModal";

const NpmList = ({ npmList, radioValueHandler, radioError, radioErrorHandler }) => {
  return (
    <form action="" className="my-8">
      <p>Results:</p>
        <ul className=" gap-y-1.5 py-4 max-h-28 max-w-sm overflow-scroll my-3">
        {npmList.map((item, i) => {
          return <NpmItem key={i} item={item} radioValueHandler={radioValueHandler} radioError={radioError} />;
        })}
      </ul>
      { radioError && <AlertModal label="Npm not selected" description="Please select atleast one npm from the list to save it as your favorite." type="error" radioErrorHandler={radioErrorHandler} />}
    </form>
  );
};

export default NpmList;
