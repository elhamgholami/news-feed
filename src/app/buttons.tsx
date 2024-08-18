import { ReactNode } from "react";

interface buttonProps {
  onClick?: () => void;
  children?: ReactNode;
  disabled?: boolean;
}

const SubmitButton = ({ onClick, children, disabled }: buttonProps) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="simple-button"
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
