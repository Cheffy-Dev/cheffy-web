import React, { useEffect } from "react";
import PredictionsOnInputChange from "../../auto-complete";

const LocationSearch = ({ context }) => {
  useEffect(() => {
    console.log(context.search);
  }, [context.search]);

  return (
    <div className="w-1/4 lg:w-1/6">
      <PredictionsOnInputChange
        searchValue={context.search}
        setSearchValue={context.setSearch}
      />
    </div>
  );
};

export default LocationSearch;
