import React, { useContext } from "react";
import foodImg from '../assets/food.png'
import { GlobalState } from "./GlobalContext";
import Cards from "./Cards";

function Home() {
  const { data, loading } = useContext(GlobalState);

  return (
    <div className="p-4">
      {loading ? (
        <h1 className="text-2xl font-bold text-center">Loading Please wait...</h1>
      ) : data && data.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((e) => (
            <Cards data={e} key={e.id} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen text-center">
         <img
            src={foodImg} 
            alt="Default"
            className="w-3/4 md:w-1/2 lg:w-1/2 mb-6 rounded-lg"
          />
          <h1 className="text-3xl font-bold mb-4">Welcome to Recipe Finder</h1>
          <p className="text-lg text-gray-600">
            Discover amazing recipes and culinary inspiration. Start by searching for your favorite dishes or ingredients!
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
