import { useCallback, useState, useEffect } from "react";
import { serviceResetPassword } from "../../../services/index.services";
import { actionLoginUser } from "../../../actions/Auth.action";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useDispatch } from "react-redux";
import { isEmail, validatePassword } from "../../../libs/RegexUtils";
import { useLocation, useNavigate } from "react-router-dom";

const initialForm = {
  password: "",
  confirm_password: "",
};
const useResetPasswordHook = () => {
  const [form, setForm] = useState({ ...initialForm });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const getQueryParams = (search) => {
    return new URLSearchParams(search);
  };
  const queryParams = getQueryParams(location.search);
  const tokenData = queryParams.get("token");


  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["password", "confirm_password"];

    required.forEach((val) => {
      if (!form?.[val]) {
        errors[val] = true;
      } else {
        errors[val] = false;
      }
    });
    if (!form?.password) {
      SnackbarUtils.error("New password field cannot be empty");
    } else {
    
        if (!validatePassword(form.password)) {
        errors.password = true;
        SnackbarUtils.error(
          "Password must be at least 8 characters and contain uppercase, lowercase, a number, and a special character"
        );
      }
    }
    if (
      form.confirm_password &&
      form?.password &&
      form.password !== form.confirm_password
    ) {
      errors.confirm_password = true;
      SnackbarUtils.error("Password doesn't match");
    }

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      t[fieldName] = text;
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  const submitToServer = useCallback(
    (status) => {
      setIsSubmitting(true);
      serviceResetPassword({
        password: form?.password,
        confirm_password: form?.confirm_password,
        token:tokenData
      }).then((res) => {
        if (!res.error) {
          navigate("/login");
        SnackbarUtils.success("Password Changed Successfully");
        setForm({
          ...initialForm
        })
        } else {
          SnackbarUtils.error(res.message);
        }
        setIsSubmitting(false);
      });
    },
    [form, isSubmitting, setIsSubmitting]
  );

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const handleSubmit = useCallback(
    async (status) => {
      const errors = checkFormValidation();
     
      
      if (Object.keys(errors)?.length > 0 ) {
       
        setErrorData(errors);
        return true;
      }
      submitToServer(status);
    },
    [checkFormValidation, setErrorData, form, submitToServer]
  );

 

  return {
    handleSubmit,
    onBlurHandler,
    changeTextData,
    form,
    errorData,
    isSubmitting,
    showPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    showConfirmPassword
  };
};

export default useResetPasswordHook;
