import React, { useState, useEffect } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplateNoReload,
} from "react-simple-captcha";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import styles from "./Style.module.css";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton } from "@mui/material";
import { ArrowPrimaryButton } from "../../../components/Buttons/PrimaryButton";

const CaptchaComponent = ({ handleSubmit }) => {
  const [captchaInput, setCaptchaInput] = useState("");
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleChange = (value) => {
    setCaptchaInput(value);
  };

  const handleReload = () => {
    loadCaptchaEnginge(6);
    setCaptchaInput("");
  };

  return (
    <div>
      <div className={styles.captchaWrap}>
        <LoadCanvasTemplateNoReload />
        <IconButton onClick={handleReload}>
          <RefreshIcon fontSize={"small"} />
        </IconButton>
      </div>

      <CustomTextField
        label={"Enter the text in image"}
        value={captchaInput}
        onTextChange={(text) => {
          handleChange(text);
        }}
      />
      <div className={styles.loginAction}>
        <ArrowPrimaryButton
          variant={"h6"}
          onClick={() => handleSubmit(captchaInput)}
        >
          LOGIN
        </ArrowPrimaryButton>
      </div>
    </div>
  );
};

export default CaptchaComponent;
