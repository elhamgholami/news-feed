import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "@/app/Search/index.scss";
import z from "zod";
import { SearchParams } from "../services/NewsApi";
import AdvancedSearchModal from "./advancedSearchModal";

interface Props {
  setSearchQuery: (query: SearchParams) => void;
}

const searchSchema = z.object({
  searchText: z.string().optional(),
  languages: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .optional(),
  sources: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  searchIn: z.string().optional(),
  domains: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .optional(),
});

type searchSchemaType = z.infer<typeof searchSchema>;

const Search = ({ setSearchQuery }: Props) => {
  const [advanceSearchMode, setAdvanceSearchMode] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit: SubmitHandler<searchSchemaType> = (data) => {
    const searchParams: SearchParams = {};
    if (data.searchText) searchParams.q = data.searchText;
    if (data.searchIn) searchParams.searchIn = data.searchIn;
    if (data.from) searchParams.from = data.from;
    if (data.to) searchParams.to = data.to;
    if (data.languages)
      searchParams.language = data.languages
        .map((lang) => lang.value)
        .join(",");
    if (data.sources)
      searchParams.sources = data.sources
        .map((source) => source.value)
        .join(",");
    if (data.domains)
      searchParams.domains = data.domains
        .map((domain) => domain.value)
        .join(",");
    if (
      !data.searchText &&
      (!data.sources || data.sources.length === 0) &&
      !searchParams.q &&
      !searchParams.domains
    ) {
      alert(
        "Please specify at least one search parameter: quert, sources, or domains."
      );
      return;
    }
    setSearchQuery(searchParams);
    console.log("this is query", searchParams);
  };

  return (
    <div>
      <div className="simple-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Search for news..."
            {...register("searchText")}
            disabled={isSubmitting}
          />
          <button type="submit">Search</button>
          {errors.searchText && !isSubmitting && <p>{errors.root?.message}</p>}
        </form>
        <button onClick={() => setAdvanceSearchMode(!advanceSearchMode)}>
          Advanced Search
        </button>
      </div>
      <AdvancedSearchModal
        isOpen={advanceSearchMode}
        onRequestClose={() => setAdvanceSearchMode(false)}
        register={register}
        control={control}
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default Search;
