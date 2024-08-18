// importing needed components from react
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
// importing Zod
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
// importing Modal component
import AdvancedSearchModal from "./advancedSearchModal";
// importing needed type
import { SearchParams } from "@/app/services/NewsApi";
import "@/app/Search/styles.scss";
import ErrorAlert from "./ErrorAlert";
import SubmitButton from "../buttons";
import InputComponent from "../../../inputs";

interface Props {
  setSearchQuery: (query: SearchParams) => void;
}
// adding zod
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

//adding Z needed type
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
    mode: "onSubmit",
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
      ErrorAlert(
        "Please specify at least one search parameter: query, sources, or domains."
      );
      return;
    }
    setSearchQuery(searchParams);
  };

  return (
    <div>
      <div className="simple-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputComponent
            type="text"
            placeholder="Search for news..."
            register={register}
            registerValue="searchText"
            disabled={isSubmitting}
          />
          <SubmitButton>Search</SubmitButton>
          {errors.searchText && !isSubmitting && <p>{errors.root?.message}</p>}
          <button
            onClick={() => setAdvanceSearchMode(!advanceSearchMode)}
            className="advanced-search-button"
            type="button"
          >
            Advanced Search
          </button>
        </form>
      </div>
      {advanceSearchMode && (
        <AdvancedSearchModal
          isOpen={advanceSearchMode}
          onRequestClose={() => setAdvanceSearchMode(false)}
          register={register}
          control={control}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit(onSubmit)}
        />
      )}
    </div>
  );
};

export default Search;
