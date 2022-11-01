import React, { useCallback } from "react";

const TextInput = ({ label, optimisedVersion }) => {
  
  const searchTextHandler = (e) => {    
    optimisedVersion(e.target.value);
  }

  return (
    <>
      <label
        htmlFor="first_name"
        className="block mb-1 font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type="text"
        id="first_name"
        onChange={searchTextHandler}
        className=" border  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder=""
        required
      />
    </>
  );
};

export default TextInput;
