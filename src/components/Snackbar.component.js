import React, { Component } from "react";
import PropTypes from "prop-types";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { amber, green, grey } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import SnackbarContent from "@mui/material/SnackbarContent";
import WarningIcon from "@mui/icons-material/Warning";
import { Snackbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EventEmitter from "../libs/Events.utils";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
  none: InfoIcon,
};

function MySnackbarContentWrapper(props) {
  const theme = useTheme();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  const getBackgroundColor = () => {
    switch (variant) {
      case "success":
        return green[600];
      case "error":
        return theme.palette.error.dark;
      case "info":
        return theme.palette.primary.main;
      case "warning":
        return amber[700];
      case "none":
      default:
        return grey[800];
    }
  };

  return (
    <SnackbarContent
      className={className}
      aria-describedby="client-snackbar"
      sx={{ backgroundColor: getBackgroundColor() }}
      message={
        <span
          id="client-snackbar"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Icon
            sx={{ opacity: 0.9, marginRight: 1, fontSize: 20 }}
          />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["error", "info", "success", "warning", "none"]).isRequired,
};

class DashboardSnackbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbar: false,
      message: "",
      variant: "none",
    };
    this._handleError = this._handleError.bind(this);
    this._handleSnackBarClose = this._handleSnackBarClose.bind(this);
  }

  _handleError(t) {
    const data = t;
    data.type = data.type ? data.type : "none";
    this.setState({
      snackbar: true,
      message: data.error,
      variant: data.type,
    });
  }
  
  _handleSnackBarClose() {
    this.setState({
      snackbar: false,
    });
  }

  componentDidMount() {
    EventEmitter.subscribe(EventEmitter.SHOW_SNACKBAR, this._handleError);
  }

  componentWillUnmount() {
    EventEmitter.unsubscribe(EventEmitter.SHOW_SNACKBAR);
  }

  render() {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={this.state.snackbar}
        message={this.state.message}
        autoHideDuration={4000}
        onClose={this._handleSnackBarClose}
      >
        <div>
          <MySnackbarContentWrapper
            onClose={this._handleSnackBarClose}
            variant={this.state.variant}
            message={this.state.message}
          />
        </div>
      </Snackbar>
    );
  }
}

export default DashboardSnackbar;
