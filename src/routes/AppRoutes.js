import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PFConsolidatedView from "../views/PFConsolidated/PFConsolidated.view";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/pf-ledger" replace />} />
      <Route path="/pf-ledger" element={<PFConsolidatedView />} />
      <Route path="*" element={<Navigate to="/pf-ledger" replace />} />
    </Routes>
  );
}
