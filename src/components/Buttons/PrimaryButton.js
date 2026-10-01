import React from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { Add, ArrowForward, Lock } from "@mui/icons-material";

const ButtonWrapper = styled(Button, {
  shouldForwardProp: (prop) => !["paddingLR", "paddingTB", "borderRadius"].includes(prop),
})(({ theme, paddingLR, paddingTB, borderRadius }) => ({
  paddingLeft: paddingLR ? theme.spacing(paddingLR) : "",
  paddingRight: paddingLR ? theme.spacing(paddingLR) : "",
  paddingTop: paddingTB ? theme.spacing(paddingTB) : "",
  paddingBottom: paddingTB ? theme.spacing(paddingTB) : "",
  borderRadius:borderRadius ? borderRadius : "",
  backgroundColor:theme?.palette?.primaryButton?.main,
  "&:hover": {
    backgroundColor: theme.palette?.primaryButton?.hover,
  },
  "&:disabled": {
    backgroundColor: theme.palette.primaryButton?.disabled,
    color: theme.palette.primaryButton?.disabled_text,
  },
}));

const PrimaryButton = ({ disabled, paddingLR, paddingTB,borderRadius, children, ...props }) => {
  return (
    <ButtonWrapper
      {...props}
      paddingLR={paddingLR}
      paddingTB={paddingTB}
      borderRadius={borderRadius}
      variant={"contained"}
      disabled={disabled ? true : false}
    >
      {children}
    </ButtonWrapper>
  );
};

const OutlineButtonWrapper = styled(Button)(({ theme, padding , paddingTB, borderRadius}) => ({
  paddingLeft: padding ? theme.spacing(padding) : theme.spacing(4),
  paddingRight: padding ? theme.spacing(padding) : theme.spacing(4),
  paddingTop: paddingTB ? theme.spacing(paddingTB) : "",
  paddingBottom: paddingTB ? theme.spacing(paddingTB) : "",
  borderRadius:borderRadius ? borderRadius : "",
  color:theme?.palette?.primaryButton?.main,
  borderColor:theme?.palette?.primaryButton?.main,
  "&:hover": {
    borderColor:theme?.palette?.primaryButton?.main,
    backgroundColor: theme.palette.secondary.light,
  },
  "&:disabled": {
    backgroundColor: "transparent",
    // color:  theme.palette.primaryButton.disabled_text
  },
}));

const OutlineButton = ({ disabled, padding, children,paddingTB,borderRadius, ...props }) => {
  return (
    <OutlineButtonWrapper
      variant={"outlined"}
      padding={padding}
      paddingTB={paddingTB}
      borderRadius={borderRadius}
      disabled={disabled}
      {...props}
    >
      {children}
    </OutlineButtonWrapper>
  );
};

const ActionButtonWrapper = styled(Button)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  "&:hover": {
    backgroundColor: theme.palette.error.light,
  },
  "&:disabled": {
    backgroundColor: "transparent",
    // color:  theme.palette.primaryButton.disabled_text
  },
}));

const ActionMultiSelectButtonWrapper = styled(Button)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(0),
  paddingBottom: theme.spacing(0),
  backgroundColor: theme.palette.grey[200],
  border: 0,
  color: theme.palette.common.black,
  borderRadius: "20px",
  "&:hover": {
    backgroundColor: theme.palette.error.light,
  },
  "&:disabled": {
    backgroundColor: "transparent",
    // color:  theme.palette.primaryButton.disabled_text
  },
}));
const ActionButton = ({ disabled, children, ...props }) => {
  return (
    <ActionButtonWrapper
      variant={"outlined"}
      color={"error"}
      disabled={disabled}
      {...props}
    >
      {children}
    </ActionButtonWrapper>
  );
};

const ActionMultiSelectButton = ({ disabled, children, ...props }) => {
  return (
    <ActionMultiSelectButtonWrapper
      variant={"outlined"}
      color={"error"}
      disabled={disabled}
      {...props}
    >
      {children}
    </ActionMultiSelectButtonWrapper>
  );
};

const ArrowPrimaryButton = ({ icon, paddingLR, paddingTB, borderRadius ,...props }) => {
  return (
    <PrimaryButton
      {...props}
      paddingLR={paddingLR}
      paddingTB={paddingTB}
      borderRadius={borderRadius}
      endIcon={!icon ? <ArrowForward /> : icon}
    />
  );
};

const ArrowOutlineButton = ({ paddingLR, icon,paddingTB, borderRadius , ...props }) => {
  return (
    <OutlineButton
      {...props}
      padding={paddingLR}
      paddingTB={paddingTB}
      borderRadius={borderRadius}
      endIcon={icon ? icon : <ArrowForward />}
    />
  );
};

const ArrowActionButton = ({ icon, ...props }) => {
  return <ActionButton {...props} endIcon={!icon ? <ArrowForward /> : icon} />;
};

export {
  PrimaryButton,
  OutlineButton,
  ActionButton,
  ArrowPrimaryButton,
  ArrowOutlineButton,
  ArrowActionButton,
  ActionMultiSelectButton,
};
