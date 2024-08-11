// importing needed components from react
import React, { useEffect } from "react";
import Modal from "react-modal";
import { UseFormRegister, Control } from "react-hook-form";
// importing multiselect component
import MultiSelect from "@/app/Search/multiSelect";
// importing needed api service
import { useGetSourcesQuery } from "@/app/services/NewsApi";
//importing styles
import "@/app/Search/styles.scss";
import SubmitButton from "@/app/buttons";

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
  { value: "title", label: "Title" },
  { value: "description", label: "Description" },
  { value: "content", label: "Content" },
];

const domainOptions = [
  { value: "bbc.co.uk", label: "BBC" },
  { value: "techcrunch.com", label: "TechCrunch" },
  { value: "engadget.com", label: "Engadget" },
];

const AdvancedSearchModal = ({
  isOpen,
  onRequestClose,
  register,
  control,
  handleSubmit,
  isSubmitting,
}: AdvancedSearchModalProps) => {
  const { data } = useGetSourcesQuery();
  let sourcesOptions = [{ value: "loading", label: "Not loaded yet" }];
  if (data) {
    sourcesOptions = data.sources.map((source: any) => ({
      value: source.id,
      label: source.name,
    }));
  }

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="advanced-search">
        <button onClick={onRequestClose} className="close-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="50"
            height="50"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="currentColor"
              d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
            />
          </svg>
        </button>
        <form onSubmit={handleSubmit} className="simple-form">
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
          <SubmitButton disabled={isSubmitting}>Search</SubmitButton>
        </form>
      </div>
    </Modal>
  );
};

export default AdvancedSearchModal;
