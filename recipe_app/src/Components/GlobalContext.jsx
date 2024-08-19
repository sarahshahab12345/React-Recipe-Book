import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const GlobalState = createContext(null);
function GlobalContext({ children }) {
  const [searchParam, setsearchParam] = useState("");
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);

  const fetchData = async () => {
    try {
      setloading(true);
      console.log("Fetching data with searchParam:", searchParam);
      let responce = await axios.get(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`

      );
      console.log("API Response:", responce.data.data.recipes);
      setdata(responce.data.data.recipes);
    } catch (e) {
      console.log("Error Fetching Data", e);
      setdata([]);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchData([]);
  }, []);

  return (
    <GlobalState.Provider
      value={{
        searchParam: searchParam,
        setsearchParam: setsearchParam,
        data: data,
        loading: loading,
        fetchData: fetchData,
      }}
    >
      {children}
    </GlobalState.Provider>
  );
}

export default GlobalContext;
