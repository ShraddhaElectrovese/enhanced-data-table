import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { selectFilteredDealers } from "../../reducers/dealerReducer";

export default function InfoBar() {
  const filtered = useSelector(selectFilteredDealers);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: { xs: 1, sm: 2 }, py: 1.5, fontSize: "0.8rem", color: "#555", borderTop: "1px solid #e8e8e8", mt: 1 }}>
      <Typography variant="body2" component="span" sx={{ fontSize: "0.8rem" }}>
        Showing <Box component="span" sx={{ fontWeight: 700 }}>{filtered.length}</Box> dealers
      </Typography>
      <Typography variant="body2" component="span" sx={{ fontSize: "0.8rem", color: "#999" }}>·</Typography>
      <Typography variant="body2" component="span" sx={{ fontSize: "0.8rem" }}>
        Report ID <Box component="span" sx={{ fontWeight: 700, color: "#1a237e" }}>PF-LEDGER/CR45</Box>
      </Typography>
      <Typography variant="body2" component="span" sx={{ fontSize: "0.8rem", color: "#999" }}>·</Typography>
      <Typography variant="body2" component="span" sx={{ fontSize: "0.8rem" }}>
        Prepared by <Box component="span" sx={{ fontWeight: 700 }}>System (PowerOne)</Box>
      </Typography>
      <Typography variant="body2" component="span" sx={{ fontSize: "0.8rem", color: "#999" }}>·</Typography>
      <Typography variant="body2" component="span" sx={{ fontSize: "0.8rem" }}>
        Review <Box component="span" sx={{ fontWeight: 700 }}>Finance</Box>
      </Typography>
      <Typography variant="body2" component="span" sx={{ fontSize: "0.8rem", color: "#999" }}>·</Typography>
      <Typography variant="body2" component="span" sx={{ fontSize: "0.8rem" }}>
        Approval <Box component="span" sx={{ fontWeight: 700, bgcolor: "#fff3e0", color: "#e65100", px: 0.8, py: 0.1, borderRadius: "4px", fontSize: "0.78rem" }}>Pending</Box>
      </Typography>
      <Typography variant="body2" component="span" sx={{ fontSize: "0.8rem", color: "#999" }}>·</Typography>
      <Typography variant="body2" component="span" sx={{ fontSize: "0.8rem" }}>
        Point value <Box component="span" sx={{ fontWeight: 700 }}>₹1.00 / point</Box>
      </Typography>
    </Box>
  );
}
