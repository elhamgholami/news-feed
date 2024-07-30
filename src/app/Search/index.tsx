import React, { Dispatch, SetStateAction, useState } from "react";
import { useSearchArticlesQuery } from "@/app/services/NewsApi";

interface Props {
  
  setSearchQuery:any;

}

const Search = ({ setSearchQuery }: Props) => {
  const [searchText, setSearchText] = useState("");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchText)
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search for news..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;
