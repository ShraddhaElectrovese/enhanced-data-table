import React from "react";
import styles from "./Style.module.css";
import { Typography, IconButton } from "@mui/material";
import { Visibility, VisibilityOff, CheckCircle } from "@mui/icons-material";

import logoImage from "../../../assets/CRMAssets/eastman_logo_white@2x.png";
import loginBg from "../../../assets/CRMAssets/new_login_image@2x.jpg";
import successLogo from "../../../assets/img/ic_success@2x.png";

import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import { PrimaryButton } from "../../../components/Buttons/PrimaryButton";
import DashboardSnackbar from "../../../components/Snackbar.component";
import useFirstLoginResetHook from "./FirstLoginReset.hook";

function FirstLoginResetView() {
  const {
    form,
    errorData,
    showPassword,
    isSubmitting,
    isSuccess,
    changeTextData,
    togglePasswordVisibility,
    handleSubmit,
    handleLoginRedirect,
  } = useFirstLoginResetHook();

  const renderResetForm = () => (
    <>
      <Typography className={styles.heading}>
        First Login - Reset Password
      </Typography>
      <div className={styles.underline} />
      <Typography className={styles.subHeading}>
        You need to reset your password because this is first time you are signing in
      </Typography>
      <div className={styles.form}>
        <div className={styles.passwordField}>
          <CustomTextField
            dark
            type={showPassword.current ? "text" : "password"}
            label="Enter Current Password"
            value={form.current_password}
            isError={errorData.current_password}
            // errorText={errorData.current_password}
            onTextChange={(text) => changeTextData(text, "current_password")}
          />
          <IconButton
            className={styles.eyeIcon}
            onClick={() => togglePasswordVisibility("current")}
          >
            {showPassword.current ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </div>

        <div className={styles.passwordField}>
          <CustomTextField
            dark
            type={showPassword.new ? "text" : "password"}
            label="Set New Password"
            value={form.new_password}
            isError={errorData.new_password}
            // errorText={errorData.new_password}
            onTextChange={(text) => changeTextData(text, "new_password")}
          />
          <IconButton
            className={styles.eyeIcon}
            onClick={() => togglePasswordVisibility("new")}
          >
            {showPassword.new ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </div>

        <div className={styles.passwordField}>
          <CustomTextField
            dark
            type={showPassword.confirm ? "text" : "password"}
            label="Re-Enter New Password"
            value={form.confirm_password}
            isError={errorData.confirm_password}
            // errorText={errorData.confirm_password}
            onTextChange={(text) => changeTextData(text, "confirm_password")}
          />
          <IconButton
            className={styles.eyeIcon}
            onClick={() => togglePasswordVisibility("confirm")}
          >
            {showPassword.confirm ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </div>

        <PrimaryButton
          className={styles.submitBtn}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </PrimaryButton>
      </div>
    </>
  );

  const renderSuccessView = () => (
    <div className={styles.successContainer}>
      <div className={styles.successIconContainer}>
        <img height={100} src={successLogo} alt="Eastman" />
      </div>

      <Typography className={styles.heading}>
        Password Updated Successfully
      </Typography>
      <Typography className={styles.subHeading}>
        You can now access your account securely, please login with your new password
      </Typography>

      <PrimaryButton
        className={styles.submitBtn}
        onClick={handleLoginRedirect}
        fullWidth
      >
        Login with Updated Password
      </PrimaryButton>
    </div>
  );

  return (
    <div
      className={styles.loginRoot}
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className={styles.overlay} />

      <div className={styles.card}>
        <img src={logoImage} alt="Eastman" className={styles.logo} />

        {isSuccess ? renderSuccessView() : renderResetForm()}
      </div>

      <DashboardSnackbar />
    </div>
  );
}

export default FirstLoginResetView;
