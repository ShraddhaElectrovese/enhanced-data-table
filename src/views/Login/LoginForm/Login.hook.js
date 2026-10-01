import { useCallback, useRef, useState, useEffect } from "react";
import { serviceLoginUser } from "../../../services/index.services";
import { actionLoginUser } from "../../../actions/Auth.action";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useDispatch, useSelector } from "react-redux";
import { isEmail, validatePassword } from "../../../libs/RegexUtils";
import { useNavigate } from "react-router-dom";

const initialForm = {
  email: "",
  password: "",
  is_remember: true,
};

const useLoginHook = () => {
  const [form, setForm] = useState({ ...initialForm });
  const [showPassword, setShowPassword] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const captchaRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);

  const hideBadge = useCallback(() => {
    const badge = document.querySelector(".grecaptcha-badge");
    if (badge) {
      badge.style.visibility = "hidden";
    }
  }, []);

  const showBadge = useCallback(() => {
    const badge = document.querySelector(".grecaptcha-badge");
    if (badge) {
      badge.style.visibility = "visible";
    }
  }, []);

  useEffect(() => {
    if (!authState?.is_authenticated) {
      setIsLoggedIn(false);
      setForm({ ...initialForm });
      setErrorData({});
      setTimeout(() => {
        captchaRef?.current?.resetCaptcha();
      }, 100);

      showBadge();
    }
  }, [authState?.is_authenticated]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["email", "password"];

    required.forEach((val) => {
      if (!form?.[val]) {
        errors[val] = true;
      } else {
        errors[val] = false;
      }
    });
    if (!isEmail(form?.email)) {
      errors["email"] = true;
    }
    if (form?.password && !validatePassword(form.password)) {
      errors.password = true;
      SnackbarUtils.error(
        "Password must be at least 8 characters and contain uppercase, lowercase, a number, and a special character"
      );
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
    (captchaToken) => {
      setIsSubmitting(true);
      const submitData = { ...form, captcha_token: captchaToken };

      serviceLoginUser(submitData)
        .then((res) => {
          if (!res.error) {
            hideBadge();
            dispatch(actionLoginUser(res?.data));
            setIsLoggedIn(true);
          } else {
            SnackbarUtils.error(res?.message || "Invalid Username/Password");
            setIsLoggedIn(false);
          }
          setIsSubmitting(false);
        })
        .catch((error) => {
          SnackbarUtils.error("Login failed. Please try again.");
          setIsLoggedIn(false);
          setIsSubmitting(false);
        });
    },
    [form, dispatch]
  );
  const handleLoginOtpRoute = useCallback(() => {
    navigate("/loginotp");
  }, [navigate])

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData, form]
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();

    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }

    try {
      const token = await captchaRef?.current?.execute();
      if (!token) {
        SnackbarUtils.error("Please complete the captcha verification");
        return;
      }

      submitToServer(token);
    } catch (error) {
      SnackbarUtils.error("Captcha verification failed. Please try again.");
    }
  }, [checkFormValidation, submitToServer]);

  const handleForgotPassword = () => {
    navigate("/forgot/password");
  };

  return {
    handleSubmit,
    onBlurHandler,
    changeTextData,
    form,
    errorData,
    isSubmitting,
    showPassword,
    togglePasswordVisibility,
    handleForgotPassword,
    handleKeyDown,
    handleLoginOtpRoute,
    captchaRef,
    isLoggedIn,
    authState,
  };
};

export default useLoginHook;
