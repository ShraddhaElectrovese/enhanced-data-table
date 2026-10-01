import React from "react";
import styles from "./Style.module.css";
import { Typography, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import logoImage from "../../../assets/CRMAssets/eastman_logo_white@2x.png";
import loginBg from "../../../assets/CRMAssets/new_login_image@2x.jpg";

import useLoginHook from "./Login.hook";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import { PrimaryButton } from "../../../components/Buttons/PrimaryButton";
import GoogleCaptchaComponent from "../component/GoogleCaptcha.component";
import DashboardSnackbar from "../../../components/Snackbar.component";
import Constants from "../../../config/constants";

function LoginView() {
  const {
    handleSubmit,
    onBlurHandler,
    changeTextData,
    form,
    errorData,
    togglePasswordVisibility,
    showPassword,
    handleForgotPassword,
    handleKeyDown,
    captchaRef,
    authState,
    handleLoginOtpRoute
  } = useLoginHook();

  return (
    <div
      className={styles.loginRoot}
      style={{ backgroundImage: `url(${loginBg})` }}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.overlay} />

      <div className={styles.card}>
        {/* LOGO */}
        <img src={logoImage} alt="Eastman" className={styles.logo} />

        {/* TITLE */}
        <Typography className={styles.heading}>
          Login to PowerONE Admin
        </Typography>

        <div className={styles.underline} />

        {/* FORM */}
        <div className={styles.form}>
          <CustomTextField
            dark
            label="Email Address"
            value={form?.email}
            isError={errorData?.email}
            errorText={errorData?.email}
            onTextChange={(text) => changeTextData(text, "email")}
            onBlur={() => onBlurHandler("email")}
          />

          <div className={styles.passwordField}>
            <CustomTextField
              dark
              type={showPassword ? "text" : "password"}
              label="Password"
              value={form?.password}
              isError={errorData?.password}
              errorText={errorData?.password}
              onTextChange={(text) => changeTextData(text, "password")}
              onBlur={() => onBlurHandler("password")}
            />
            <IconButton
              className={styles.eyeIcon}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </div>

          <Typography
            className={styles.forgot}
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </Typography>

          <GoogleCaptchaComponent
            ref={captchaRef}
            siteKey={Constants.GOOGLE_CAPTCHA_KEY}
            isVisible={!authState?.is_authenticated}
          />

          <PrimaryButton
            className={styles.loginBtn}
            onClick={handleSubmit}
          >
            Login
          </PrimaryButton>
        </div>
        <div className={`${styles.formFlexGrouup} ${styles.loginotp}`}>
          <Typography
            variant={"body1"}
            color={"secondary"}
            sx={{ mr: 1, color:"#E47237"}}
            onClick={handleLoginOtpRoute}
          >
            Login with mobile
          </Typography>
        </div>
      </div>

      <DashboardSnackbar />
    </div>
  );
}

export default LoginView;
