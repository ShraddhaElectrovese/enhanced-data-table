import React from "react";
import styles from "./Style.module.css";
import DashboardSnackbar from "../../../components/Snackbar.component";
import classNames from "classnames";
import logoImage from "../../../assets/CRMAssets/logo_eastman@2x.png";
import loginImage from "../../../assets/CRMAssets/login_image@2x.jpg";
import ShadowBox from "../../../components/ShadowBox/ShadowBox";
import { IconButton, ButtonBase, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useResetPasswordHook from "./ResetPassword.hook";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import { useTheme } from "@mui/material/styles";
import { PrimaryButton } from "../../../components/Buttons/PrimaryButton";

function ResetPassword() {
  const theme = useTheme();
  const {
    handleSubmit,
    onBlurHandler,
    changeTextData,
    form,
    errorData,
    togglePasswordVisibility,
    showPassword,
    handleForgotPassword,
    toggleConfirmPasswordVisibility,
    showConfirmPassword,
  } = useResetPasswordHook();

  return (
    <div className={"login"}>
      <div className={styles.overlay}></div>
      <div className={styles.mainLoginView}></div>
      <div className={styles.container}>
        <div className={styles.leftPane}>
          <ShadowBox className={styles.loginFlex2}>
            <div className={styles.logoImageData}>
              <img src={logoImage} alt="text_data" className={styles.logo} />
            </div>
            <div className={styles.signContainer}>
              <div className={styles.loginHeaderText}>
                <Typography variant="h3">Reset Password</Typography>
              </div>
              <div className={styles.newLine} />
              <div className={styles.formContainer}>
                <div className={styles.formFlexGrouup}>
                  <div className={"formGroup"}>
                    <div style={{ display: "flex", marginTop: "8px" }}>
                      <CustomTextField
                        type={showPassword ? "text" : "password"}
                        isError={errorData?.password}
                        errorText={errorData?.password}
                        label={"  Password"}
                        value={form?.password}
                        onTextChange={(text) => {
                          changeTextData(text, "password");
                        }}
                        onBlur={() => {
                          onBlurHandler("password");
                        }}
                      />

                      <IconButton
                        className={styles.visibleIcon}
                        onClick={togglePasswordVisibility}
                      >
                        {!showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </div>
                  </div>
                </div>
                <div className={styles.formFlexGrouup}>
                  <div className={"formGroup"}>
                    <div style={{ display: "flex", marginTop: "8px" }}>
                      <CustomTextField
                        isError={errorData?.confirm_password}
                        errorText={errorData?.confirm_password}

                        size="small"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirm_password"

                        label="Confirm Password"
                        value={form?.confirm_password}
                        onTextChange={(text) => {
                          changeTextData(text, "confirm_password");
                        }}
                        onBlur={() => {
                          onBlurHandler("confirm_password");
                        }}
                      />
                      <IconButton
                        className={styles.visibleIcon}
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {!showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.logFlex}>
                <div className={classNames(styles.negativeSpacing, "log")}>

                  <PrimaryButton variant={"h6"} onClick={() => handleSubmit()} className={styles.button}>
                    Reset Password & Login
                  </PrimaryButton>

                </div>
              </div>
            </div>
          </ShadowBox>
        </div>
        <div className={styles.rightPane}>
          <img src={loginImage} alt="Login" className={styles.loginImage} />
        </div>
        <DashboardSnackbar />
      </div>
    </div>
  );
}

export default ResetPassword;
