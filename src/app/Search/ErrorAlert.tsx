import { toast } from "react-toastify";

const ErrorAlert = (message: string) => {
  toast.error(message, {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export default ErrorAlert;