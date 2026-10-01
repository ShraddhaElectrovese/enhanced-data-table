import React from "react";
import styles from "./Style.module.css";
import { Typography } from "@mui/material";
import logoImage from "../../../assets/CRMAssets/eastman_logo_white@2x.png";
import loginBg from "../../../assets/CRMAssets/new_login_image@2x.jpg";

import useForgotPasswordHook from "./ForgotPassword.hook";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import { PrimaryButton } from "../../../components/Buttons/PrimaryButton";
import DashboardSnackbar from "../../../components/Snackbar.component";
import classNames from "classnames";

function ForgotPassword() {
  const {
    handleSubmit,
    onBlurHandler,
    changeTextData,
    form,
    errorData,
  } = useForgotPasswordHook();

  return (
    <div
      className={styles.forgotRoot}
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className={styles.overlay} />

      <div className={styles.card}>
        <img src={logoImage} alt="Eastman" className={styles.logo} />

        <Typography className={styles.heading}>
          Forgot Password
        </Typography>

        <div className={styles.underline} />

        <Typography className={styles.subText}>
          Enter registered email address to receive password reset link
        </Typography>

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
          <div className={styles.inlineAction}>
            <Typography
              className={styles.sendLinkText}
              onClick={handleSubmit}
            >
              Send Link
            </Typography>
          </div>
        </div>
        <PrimaryButton
          className={styles.actionBtn}
          onClick={handleSubmit}
        >
          Send Link
        </PrimaryButton>
        <div className={`${styles.formFlexGrouup} ${styles.help}`}>

          <Typography variant={"body1"} color={"secondary"} sx={{ mt: 2,cursor:"pointer" }} style={{ textDecoration: 'underline' }}>
            Need Help with Password? Contact Admin
          </Typography>

        </div>

      </div>

      <DashboardSnackbar />
    </div>
  );
}

export default ForgotPassword;
