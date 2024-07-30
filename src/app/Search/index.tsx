import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
interface Props {
  setSearchQuery: any;
}
const searchSchema = z.object({
  searchText: z.string().min(1, "Enter something to search!"),
});
type searchSchemaType = z.infer<typeof searchSchema>;

const Search = ({ setSearchQuery }: Props) => {
  const [searchText, setSearchText] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<searchSchemaType>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit: SubmitHandler<searchSchemaType> = (
    data: searchSchemaType
  ) => {
    setSearchQuery(data.searchText);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          value={searchText}
          placeholder="Search for news..."
          {...register("searchText")}
          onChange={(e) => setSearchText(e.target.value)}
          disabled={isSubmitting}
        />
        <button type="submit">Search</button>
        {errors.searchText && !isSubmitting && (
          <p>{errors.searchText.message}</p>
        )}
      </form>
    </div>
  );
};

export default Search;
