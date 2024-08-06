// importing needed components from react
import { UseFormRegister, Control } from "react-hook-form";
import { useEffect } from "react";
import Modal from "react-modal";
// importing multiselect component
import MultiSelect from "@/app/Search/multiSelect";
// importing needed api service
import { useGetSourcesQuery } from "@/app/services/NewsApi";
//importing styles
import "@/app/Search/styles.scss";

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  register: UseFormRegister<any>;
  control: Control<any>;
  isSubmitting: boolean;
  handleSubmit: any;
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

const AdvancedSearchModal = ({
  isOpen,
  onRequestClose,
  register,
  control,
  handleSubmit,
  isSubmitting,
}: AdvancedSearchModalProps) => {
  // Getting sources
  const { data } = useGetSourcesQuery();
  let sourcesOptions = [{ value: "loading", label: "not loaded yet" }];
  if (data) {
    sourcesOptions = data.sources.map((source: any) => ({
      value: source.id,
      label: source.name,
    }));
  }
  //Adding no scrol while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [data, isOpen]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
      <div className="advanced-search">
        <button onClick={onRequestClose}>Close</button>
        <form onSubmit={handleSubmit}>
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
            disabled={isSubmitting}
            className="simple-button"
          >
            Search
          </button>
        </form>
      </div>
    </Modal>
  );
};
export default AdvancedSearchModal;
