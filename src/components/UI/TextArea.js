import React from "react";
import AlertModal from "./AlertModal";

const TextArea = ({ label, handleFavoriteText, favoriteTextError, favoriteTextErrorHandler }) => {
  const favoriteTextHandler = (e) => {
    handleFavoriteText(e.target.value);
    if(favoriteTextError === true){
      favoriteTextErrorHandler(false);
    }
  };


  return (
    <>
      <label
        htmlFor="message"
        className="block mb-1 text-medium font-medium text-black "
      >
        {label}
      </label>
      <textarea
        id="message"
        onChange={favoriteTextHandler}
        rows="4"
        className="block p-2.5 w-3/4 text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 "
        placeholder=""
        style={{ border : `${ favoriteTextError ? '1px solid red' : '1px solid black' }` }}
      ></textarea>
      { favoriteTextError &&  <small className="text-red-700">smalllease add text here!</small>}
    </>
  );
};

export default TextArea;
