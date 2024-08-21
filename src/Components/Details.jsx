import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "./GlobalContext";
import axios from "axios";

function Details() {
  const { addFavourites, favourites } = useContext(GlobalState); 
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (recipeId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
      );
      setData(response.data.data.recipe);
    } catch (e) {
      console.log("Error Fetching Data:", e);
      setData({});
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 bg-white rounded-lg ">
        {/* Image Section */}
        <div className="row-start-2 lg:row-start-auto flex justify-center items-center">
          <div className="h-96 w-full overflow-hidden rounded-xl group">
            <img
              className="w-full h-full object-cover block group-hover:scale-110 transition-transform duration-300 ease-in-out"
              src={data.image_url}
              alt={data.title || "Recipe Image"}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold text-gray-800">
            {data.title}
          </h1>
          <p className="mt-2 text-lg text-gray-600">{data.publisher}</p>

          <h2 className="text-2xl font-semibold mt-4 mb-2 text-gray-700">
            Ingredients
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {data.ingredients &&
              data.ingredients.map((ing, index) => (
                <li key={index} className="text-lg">
                  {`${ing.quantity || ""} ${ing.unit || ""} ${ing.description}`}
                </li>
              ))}
          </ul>

          <div className="mt-4">
            <p className="text-lg font-semibold text-gray-700">
              <span className="font-bold">Cooking time:</span>{" "}
              {data.cooking_time} minutes
            </p>
            <p className="text-lg font-semibold text-gray-700">
              <span className="font-bold">Servings:</span> {data.servings}{" "}
              People
            </p>
          </div>

          <div className="flex gap-4 mt-6">
            <a
              href={data.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 transition duration-300 ease-in-out text-white py-3 px-6 rounded-lg shadow"
            >
              View Original Recipe
            </a>

            <button
              onClick={() => addFavourites(data)}
              className="bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out text-white py-3 px-6 rounded-lg shadow"
            >
              {Array.isArray(favourites) &&
              favourites.some((e) => e.id === data.id)
                ? "Remove From Favourites"
                : "Add To Favourites"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
