import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import SummaryCards from "../../components/SummaryCards/SummaryCards";
import FilterBar from "../../components/FilterBar/FilterBar";
import InfoBar from "../../components/InfoBar/InfoBar";
import DatatableTable from "../../Datatables/Datatable.table";
import LedgerDetailTable from "../../Datatables/LedgerDetail.table";

export default function PFConsolidatedView() {
  const [activeTab, setActiveTab] = useState("consolidated");

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Sidebar />
      <Box component="main" sx={{ flex: 1, minWidth: 0, overflowX: "hidden" }}>
        <Box sx={{ bgcolor: "#f5f5f5", px: 4, pt: 3, pb: 2 }}>
          <Typography variant="body2" sx={{ color: "#1a237e", fontSize: "0.8rem", mb: 1 }}>
            Rewards / Partner Fund / Consolidated Ledger
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a237e", fontSize: "1.6rem", mb: 2 }}>
            PF Ledger — Consolidated Report
          </Typography>
          <SummaryCards />
        </Box>
        <Box sx={{ bgcolor: "#fff", px: 4, py: 3 }}>
          <FilterBar activeTab={activeTab} onTabChange={setActiveTab} />
          <InfoBar />
          {activeTab === "consolidated" ? <DatatableTable /> : <LedgerDetailTable />}
        </Box>
      </Box>
    </Box>
  );
}
