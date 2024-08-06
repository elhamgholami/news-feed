// importing needed components from react
import React from "react";
import { Controller, Control, FieldValues } from "react-hook-form";
import Select from "react-select";

interface ControlInput {
  control: Control<FieldValues>;
  name: string;
  options: { value: string; label: string }[];
}

const MultiSelect = ({ control, name, options }: ControlInput) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          isMulti
          options={options}
          classNamePrefix="react-select"
          value={field.value}
        />
      )}
    />
  );
};

export default MultiSelect;
