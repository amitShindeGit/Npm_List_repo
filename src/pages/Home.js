import React, { useCallback, useEffect, useState } from "react";
import NpmList from "../components/NpmList";
import Button from "../components/UI/Button";
import TextArea from "../components/UI/TextArea";
import TextInput from "../components/UI/TextInput";
import NpmService from "../services/get-npm";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // States
  const [searchText, setSearchText] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [favoriteText, setFavoriteText] = useState("");
  const [favoriteTextError, setFavoriteTextError] = useState(false);
  const [radioValue, setRadioValue] = useState("");
  const [radioError, setRadioError] = useState(false);
  const navigate = useNavigate();
  
  //Dobouncing
  function debounce(fn, delay) {
    let timer;
    return function () {
      let context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    };
  }


  // search text handler 
  const handleSearchText =async (typedText) => {
    const npmPackageList = await NpmService.fetchNpmPackages();
    setSearchText(typedText.toLowerCase());
    const newList =  npmPackageList.data.results.filter(
      (list) => list.package.name.includes(typedText.toLowerCase()) && list
    );
    setSearchList(typedText ? newList : []);
  };

  const optimisedVersion = useCallback(debounce(handleSearchText,500), [])


  // favorite textarea handler 
  const handleFavoriteText = (favText) => {
    setFavoriteText(favText);
  };

  // radio value handler 
  const radioValueHandler = (radioVal) => {
    setRadioValue(radioVal);
  };

  // radio not selected error handler 
  const radioErrorHandler = () => {
    setRadioError(false);
  };

  // favorite text area error handler 
  const favoriteTextErrorHandler = () => {
    setFavoriteTextError(false);
  };

  const onSubmitHandler = () => {
    // Input Validations
    if (!radioValue && !favoriteText) {
      setRadioError(true);
      setFavoriteTextError(true);
    } else if (!radioValue && favoriteText) {
      setRadioError(true);
      setFavoriteTextError(false);
    } else if (radioValue && !favoriteText) {
      setRadioError(false);
      setFavoriteTextError(true);
    } else {
      // Adding list to localStorage
      if (!localStorage.getItem("npmList")) {
        localStorage.setItem("npmList", JSON.stringify([{ name: radioValue }]));
      } else {
        const existingLocalStorageNpmList = JSON.parse(
          localStorage.getItem("npmList")
        );
        const alreadyExists = existingLocalStorageNpmList.some(
          (list) => list.name === radioValue
        );
        if (!alreadyExists) {
          existingLocalStorageNpmList.push({ name: radioValue });
          localStorage.setItem(
            "npmList",
            JSON.stringify(existingLocalStorageNpmList)
          );
        }
      }
      navigate("/favorite");
    }
  };

  return (
    <div className="flex flex-col max-w-5xl mx-auto  m-10">
      <TextInput
        label={"Search for NPM Packages"}
        optimisedVersion={optimisedVersion}
      />
      {/* length>0, if want to hide label  */}
      {searchList && (
        <NpmList
          npmList={searchList}
          radioValueHandler={radioValueHandler}
          radioError={radioError}
          radioErrorHandler={radioErrorHandler}
        />
      )}
      <div className="relative">
        <TextArea
          label={"Why is this your fav?"}
          handleFavoriteText={handleFavoriteText}
          favoriteTextError={favoriteTextError}
          favoriteTextErrorHandler={favoriteTextErrorHandler}
        />
        <div className="absolute right-56 mr-3 mt-4">
          <Button submitHandler={onSubmitHandler} text={"Submit"} />
        </div>
      </div>
    </div>
  );
};

export default Home;
