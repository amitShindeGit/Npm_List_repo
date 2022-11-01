import React, { useCallback, useEffect, useState } from "react";
import NpmList from "../components/NpmList";
import Button from "../components/UI/Button";
import TextArea from "../components/UI/TextArea";
import TextInput from "../components/UI/TextInput";
import NpmService from "../services/get-npm";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // States
  const [npmList, setNpmList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [favoriteText, setFavoriteText] = useState("");
  const [favoriteTextError, setFavoriteTextError] = useState(false);
  const [radioValue, setRadioValue] = useState("");
  const [radioError, setRadioError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // getting all npm list from api
    const getNpmPackages = async () => {
      const npmPackageList = await NpmService.fetchNpmPackages();
      setNpmList(npmPackageList.data.results);
    };
    getNpmPackages();
  }, []);
  

  // search text handler 
  const handleSearchText = (typedText) => {
    const newList =  npmList.filter(
      (list) => list.package.name.includes(typedText.toLowerCase()) && list
    );
      
    setSearchText(typedText.toLowerCase());
    setSearchList(typedText ? newList : []);
  };

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
        handleSearchText={handleSearchText}
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
