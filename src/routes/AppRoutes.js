import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PFConsolidatedView from "../views/PFConsolidated/PFConsolidated.view";
import LoginView from "../views/Login/LoginForm/Login.view";

import ForgotPasswordView from "../views/Login/ForgotPassword/ForgotPassword.view";
import ResetPasswordView from "../views/Login/ResetPassword/ResetPassword.view";
import FirstLoginResetView from "../views/Login/FirstLoginReset/FirstLoginReset.view";

export default function AppRoutes() {
  const { is_authenticated } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/login" element={is_authenticated ? <Navigate to="/pf-ledger" replace /> : <LoginView />} />
      <Route path="/forgot/password" element={<ForgotPasswordView />} />
      <Route path="/reset/password" element={<ResetPasswordView />} />
      <Route path="/first-login-reset" element={<FirstLoginResetView />} />
      <Route path="/" element={<Navigate to="/pf-ledger" replace />} />
      <Route path="/pf-ledger" element={is_authenticated ? <PFConsolidatedView /> : <Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/pf-ledger" replace />} />
    </Routes>
  );
}
