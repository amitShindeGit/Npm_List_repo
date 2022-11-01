import React, { useEffect, useState } from "react";
import FavoriteList from "../components/FavoriteList";
import NotFound from "../components/NotFound";
import AlertModal from "../components/UI/AlertModal";
import Button from "../components/UI/Button";
import { Link } from "react-router-dom";

const Favorite = () => {
  const [favList, setFavList] = useState([]);
  const [deleteError, setDeleteError] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const deleteHandler = (index) => {
    setDeleteError(true);
    setCurrentIndex(index);
  };

  const confirmDeleteHandler = (confirmVal) => {
    setConfirmDelete(confirmVal);
    const existingLocalStorageNpmList = JSON.parse(
      localStorage.getItem("npmList")
    );
    if (confirmVal) {
      existingLocalStorageNpmList.splice(currentIndex, 1);
      localStorage.setItem(
        "npmList",
        JSON.stringify(existingLocalStorageNpmList)
      );
      setFavList(existingLocalStorageNpmList);
    }
    setDeleteError(false);
  };

  useEffect(() => {
    const existingLocalStorageNpmList = JSON.parse(
      localStorage.getItem("npmList")
    );
    setFavList(existingLocalStorageNpmList);
  }, []);

  return (
    <div className="flex flex-col max-w-5xl mx-auto mt-20 m-10">
      <div className="flex">
        <p className="text-3xl flex-1">Welcome to Favorite NPM Packages</p>
        {favList && favList.length > 0 &&
          <Link to="/">
          <Button text="Add Fav" />
        </Link>}
      </div>
      {favList && favList.length > 0 ? (
        <FavoriteList
          favList={favList}
          deleteHandler={deleteHandler}
          confirmDelete={confirmDelete}
        />
      ) : (
        <NotFound />
      )}
      {deleteError && (
        <AlertModal
          type="confirm"
          label="Are you sure?"
          description="Are you sure you want to delete this favorite npm?"
          confirmDeleteHandler={confirmDeleteHandler}
        />
      )}
    </div>
  );
};

export default Favorite;
