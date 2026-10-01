import React, { useCallback } from "react";
import { TextField, InputAdornment, Typography, useTheme } from "@mui/material";

const CustomTextField = ({
  isError,
  errorText,
  icon,
  label,
  onChange,
  onTextChange,
  inputProps,
  adornText,
  ...rest
}) => {
  const theme = useTheme();

  const handleChange = useCallback(
    (e) => {
      onChange && onChange(e);
      onTextChange && onTextChange(e.target.value);
    },
    [onChange, onTextChange]
  );

  return (
    <TextField
      error={isError}
      helperText={
        errorText ? (
          <Typography
            component="span"
            variant="caption"
            sx={{
              display: "block",
              textAlign: "end",
              color: theme.palette.error.main,
              marginRight: theme.spacing(0),
            }}
          >
            {errorText}
          </Typography>
        ) : undefined
      }
      label={label}
      InputLabelProps={{
        sx: {
          color: theme.palette.text.primary,
        },
      }}
      InputProps={{
        startAdornment: icon ? (
          <InputAdornment position="start">
            <img className={"fieldIcon"} src={icon} alt="icon" />
          </InputAdornment>
        ) : undefined,
        endAdornment: adornText ? (
          <InputAdornment
            position="end"
            sx={{
              backgroundColor: "#f5f5f5",
              color: theme.palette.text.primary,
              borderLeftWidth: "1px",
              borderLeftColor: theme.palette.grey[300],
              borderLeftStyle: "solid",
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              maxHeight: "100%",
              minWidth: "4em",
              padding: "0 8px",
            }}
          >
            {adornText}
          </InputAdornment>
        ) : undefined,
        ...(inputProps ? inputProps : {}),
        sx: {
          overflow: "hidden",
          color: theme.palette.text.primary,
          "& .MuiInputBase-input": {
            color: theme.palette.text.primary,
          },
        },
      }}
      onChange={handleChange}
      variant={"outlined"}
      size={"small"}
      fullWidth
      {...rest}
    />
  );
};

export default CustomTextField;
