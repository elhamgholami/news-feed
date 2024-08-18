import { UseFormRegister, FieldValues } from "react-hook-form";

interface InputProps {
  type: string;
  placeholder: string;
  disabled: boolean;
  register: UseFormRegister<FieldValues>;
  registerValue: string;
}

const InputComponent = ({
  type,
  placeholder,
  disabled,
  register,
  registerValue,
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      {...register(registerValue)}
      disabled={disabled}
      className="input-component"
    />
  );
};
export default InputComponent;