/* eslint-disable indent,linebreak-style,max-len */
import { setAuthorizationToken, setLoginType } from "../libs/set_auth_token.utils";
import { serviceGetProfile } from "../services/index.services";

export const AUTH_USER = "AUTH_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const SET_PROFILE = "SET_PROFILE";
export const GET_PROFILE_INIT = "GET_PROFILE_INIT";

export function actionLoginUser(data,otp=false) {
  return (dispatch) => {
    if (data) {
      const token = data.token;
      const loginType = otp ? data.login_type : "ADMIN"
      localStorage.setItem("jwt_token", token);
      localStorage.setItem("user", JSON.stringify(data));
      setAuthorizationToken(token);
      localStorage.setItem("loginType", loginType);
      setLoginType(loginType)
      dispatch({
        type: AUTH_USER,
        payload: { token: token, name: data.name, id: data.user_id,...data },
      });
    }
  };
}

export function actionLogoutUser() {
  return (dispatch) => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user");
    setAuthorizationToken(false);
    dispatch({ type: LOGOUT_USER });
  };
}

export function actionGetProfile() {
  const request = serviceGetProfile();
  return (dispatch) => {
    dispatch({ type: GET_PROFILE_INIT, payload: null });
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: SET_PROFILE, payload: data.data });
      }
    });
  };
}
