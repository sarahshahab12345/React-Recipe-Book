import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { stringify } from "postcss";

export const GlobalState = createContext(null);
function GlobalContext({ children }) {
  const [searchParam, setsearchParam] = useState("");
  const [data, setdata] = useState([]);
  const [favourites, setfavourites] = useState([]);
  const [loading, setloading] = useState(false);

  const addFavourites = (item) => {
    let fav = [...favourites];

    const existingItemIndex = fav.findIndex((e) => e.id === item.id);

    if (existingItemIndex !== -1) {
      fav.splice(existingItemIndex, 1);
    } else {
      fav.push(item);
    }

    localStorage.setItem("favourites", JSON.stringify(fav));
    setfavourites([...fav]);
  };

  useEffect(() => {
    let fav = JSON.parse(localStorage.getItem("favourites"));
    if (fav) {
      setfavourites([...fav]);
    }
  }, []);

  const fetchData = async () => {
    try {
      setloading(true);
      console.log("Fetching data with searchParam:", searchParam);
      let response = await axios.get(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      console.log("API Response:", response.data.data.recipes);
      setdata(response.data.data.recipes);
    } catch (e) {
      console.log("Error Fetching Data", e);
      setdata([]);
    } finally {
      setloading(false);
    }
  };

  // useEffect(() => {
  //   fetchData([]);
  // }, []);

  return (
    <GlobalState.Provider
      value={{
        searchParam: searchParam,
        setsearchParam: setsearchParam,
        data: data,
        loading: loading,
        fetchData: fetchData,
        addFavourites: addFavourites,
        favourites: favourites,
      }}
    >
      {children}
    </GlobalState.Provider>
  );
}

export default GlobalContext;
