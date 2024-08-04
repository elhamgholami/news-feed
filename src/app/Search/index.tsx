import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "@/app/Search/index.scss";
import z from "zod";
import MultiSelect from "./multiSelect";
import { SearchParams, useGetSourcesQuery } from "../services/NewsApi";

interface Props {
  setSearchQuery: (query: SearchParams) => void;
}

const languageOptions = [
  { value: "ar", label: "Arabic" },
  { value: "de", label: "German" },
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "he", label: "Hebrew" },
  { value: "it", label: "Italian" },
  { value: "nl", label: "Dutch" },
  { value: "no", label: "Norwegian" },
  { value: "pt", label: "Portuguese" },
  { value: "ru", label: "Russian" },
  { value: "sv", label: "Swedish" },
  { value: "ud", label: "Urdu" },
  { value: "zh", label: "Chinese" },
];
const searchInOptions = [
  { value: "title", label: "title" },
  { value: "description", label: "description" },
  { value: "content", label: "content" },
];
const domainOptions = [
  { value: "bbc.co.uk", label: "bbc" },
  { value: "techcrunch.com", label: "techRunch" },
  { value: "engadget.com", label: "engadget" },
];
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
  const { data } = useGetSourcesQuery();
  const [sourcesOptions, setSourcesOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    if (data) {
      setSourcesOptions(
        data.sources.map((source: any) => ({
          value: source.id,
          label: source.name,
        }))
      );
    }
  }, [data]);

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
        {advanceSearchMode && (
          <div className="advanced-search">
            <div className="form-group">
              <label htmlFor="domains">Domains</label>
              <MultiSelect
                control={control}
                options={domainOptions}
                {...register("domains")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="from">From Date</label>
              <input type="datetime-local" id="from" {...register("from")} />
            </div>
            <div className="form-group">
              <label htmlFor="to">To Date</label>
              <input type="datetime-local" id="to" {...register("to")} />
            </div>
            <div className="form-group">
              <label htmlFor="language">Language</label>
              <MultiSelect
                control={control}
                options={languageOptions}
                {...register("languages")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Sources">Sources</label>
              <MultiSelect
                control={control}
                options={sourcesOptions}
                {...register("sources")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="searchIn">Search In</label>
              <MultiSelect
                control={control}
                options={searchInOptions}
                {...register("searchIn")}
              />
            </div>
            <button
              type="submit"
              onClick={() => setAdvanceSearchMode(!advanceSearchMode)}
            >
              Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
