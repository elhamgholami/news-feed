import { UseFormRegister, Control } from "react-hook-form";
import Modal from "react-modal";
import MultiSelect from "./multiSelect";
import { useEffect, useState } from "react";
import { useGetSourcesQuery } from "../services/NewsApi";
import "@/app/Search/index.scss"

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
  const [sourcesOptions, setSourcesOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const { data } = useGetSourcesQuery();

  useEffect(() => {
    if (data) {
      setSourcesOptions(
        data.sources.map((source: any) => ({
          value: source.id,
          label: source.name,
        }))
      );
    }
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
    <Modal className="modal" isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="advanced-search">
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
          <button type="submit" disabled={isSubmitting}>
            Search
          </button>
        </form>
        <button onClick={onRequestClose}>Close</button>
      </div>
    </Modal>
  );
};
export default AdvancedSearchModal;
