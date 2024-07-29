import React, { Dispatch, SetStateAction, useState } from "react";
import { useSearchArticlesQuery } from "@/services/api";

interface Props {
  
  setQ:any;

}

const Search = ({ setQ }: Props) => {
  const [query, setQuery] = useState("");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
   setQ(query)
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for news..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;
