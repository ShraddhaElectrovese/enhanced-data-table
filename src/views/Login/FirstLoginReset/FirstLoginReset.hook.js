import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { serviceFirstLoginResetPassword, serviceResetPassword } from "../../../services/index.services";

const useFirstLoginResetHook = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [errorData, setErrorData] = useState({});
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  console.log(form, "fommmhhh")
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const changeTextData = useCallback((text, name) => {
    setForm((prev) => ({ ...prev, [name]: text }));
    setErrorData((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const togglePasswordVisibility = useCallback((name) => {
    setShowPassword((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }, []);

  const validate = useCallback(() => {
    const errors = {};

    if (!form.current_password) {
      errors.current_password = "Current password is required";
      SnackbarUtils.error("Current password is required");
    }

    if (!form.new_password) {
      errors.new_password = "New password is required";
      SnackbarUtils.error("New password is required");
    }

    if (!form.confirm_password) {
      errors.confirm_password = "Confirm password is required";
      SnackbarUtils.error("Confirm password is required");
    }

    if (
      form.new_password &&
      form.confirm_password &&
      form.new_password !== form.confirm_password
    ) {
      errors.confirm_password = "Passwords do not match";
      SnackbarUtils.error("Passwords do not match");
    }

    return errors;
  }, [form]);

  const handleSubmit = useCallback(async () => {
    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await serviceFirstLoginResetPassword({
        current_password: form.current_password,
        password: form.new_password,
        confirm_password: form.confirm_password,
      });

      if (!res.error) {
        SnackbarUtils.success("Password changed successfully");
       setIsSuccess(true);
      }
      else {
        SnackbarUtils.error(res.message);
      }
    } catch (error) {
      SnackbarUtils.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }, [form, validate, navigate]);

  const handleLoginRedirect = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return {
    form,
    errorData,
    showPassword,
    isSubmitting,
    changeTextData,
    togglePasswordVisibility,
    handleSubmit,
    isSuccess,
    handleLoginRedirect
  };
};

export default useFirstLoginResetHook;