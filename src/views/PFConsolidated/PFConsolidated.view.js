import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import SummaryCards from "../../components/SummaryCards/SummaryCards";
import FilterBar from "../../components/FilterBar/FilterBar";
import InfoBar from "../../components/InfoBar/InfoBar";
import DatatableTable from "../../Datatables/Datatable.table";
import LedgerDetailTable from "../../Datatables/LedgerDetail.table";

export default function PFConsolidatedView() {
  const [activeTab, setActiveTab] = useState("consolidated");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <Header />
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden", bgcolor: "#f4f7fa" }}>
        <Sidebar />
        <Box component="main" sx={{ flex: 1, minWidth: 0, overflowX: "hidden", overflowY: "auto" }}>
        <Box sx={{ bgcolor: "#f4f7fa", px: 3, pt: 3, pb: 2 }}>

          <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a237e", fontSize: "1.6rem", mb: 2 }}>
            PF Ledger — Consolidated Report
          </Typography>
          <SummaryCards />
        </Box>
        <Box sx={{ mx: 2, mb: 4, bgcolor: "#fff", borderRadius: 2, border: "1px solid #e8e8e8", overflow: "hidden" }}>
          <Box sx={{ px: 3, pt: 1, pb: 3 }}>
            <FilterBar activeTab={activeTab} onTabChange={setActiveTab} />
            <InfoBar />
            {activeTab === "consolidated" ? <DatatableTable /> : <LedgerDetailTable />}
          </Box>
        </Box>
      </Box>
    </Box>
    </Box>
  );
}
