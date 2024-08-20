import React, { useContext } from 'react';
import { GlobalState } from './GlobalContext';
import Cards from './Cards';

function favourites() {
  let { favourites } = useContext(GlobalState);
  return (
    <div>
      {favourites && favourites.length ? (
        <div className="mx-4 flex align-middle justify-between flex-wrap gap-4">
          {favourites.map((e) => {
            return <Cards data={e} key={e.id} />;
          })}
        </div>
      ) : (
        <h1 className="text-2xl font-bold text-center text-red-800">
          No items found in favourites
        </h1>
      )}
    </div>
  );
}

export default favourites;
