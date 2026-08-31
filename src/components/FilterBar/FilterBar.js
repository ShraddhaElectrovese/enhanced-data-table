import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../reducers/dealerReducer";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Search as SearchIcon, Download as DownloadIcon } from "@mui/icons-material";

export default function FilterBar({ activeTab = "consolidated", onTabChange }) {
  const dispatch = useDispatch();
  const [period, setPeriod] = useState("Q1 FY26-27");
  const [region, setRegion] = useState("All");
  const [zone, setZone] = useState("All");
  const [state, setState] = useState("All");
  const [status, setStatus] = useState("All");
  const [product, setProduct] = useState("All");
  const [localSearch, setLocalSearch] = useState("");

  const handleSearch = (value) => {
    setLocalSearch(value);
    dispatch(setSearchTerm(value));
  };

  const handleReset = () => {
    setPeriod("Q1 FY26-27");
    setRegion("All");
    setZone("All");
    setState("All");
    setStatus("All");
    setProduct("All");
    setLocalSearch("");
    dispatch(setSearchTerm(""));
  };

  const selectSx = {
    flex: 1,
    minWidth: 100,
    "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: "0.85rem" },
    "& .MuiInputLabel-root": { fontSize: "0.8rem" },
  };

  return (
    <Box>
      {/* Tabs */}
      <Box sx={{ display: "flex", gap: 0, mb: 2, borderBottom: "2px solid #e0e0e0" }}>
        <Box
          onClick={() => onTabChange && onTabChange("consolidated")}
          sx={{ pb: 1, px: 2, borderBottom: activeTab === "consolidated" ? "3px solid #1a237e" : "none", color: activeTab === "consolidated" ? "#1a237e" : "#666", fontWeight: activeTab === "consolidated" ? 600 : 400, fontSize: "0.9rem", cursor: "pointer" }}
        >
          Consolidated (per dealer)
        </Box>
        <Box
          onClick={() => onTabChange && onTabChange("ledger")}
          sx={{ pb: 1, px: 2, borderBottom: activeTab === "ledger" ? "3px solid #1a237e" : "none", color: activeTab === "ledger" ? "#1a237e" : "#666", fontWeight: activeTab === "ledger" ? 600 : 400, fontSize: "0.9rem", cursor: "pointer", "&:hover": { color: "#333" } }}
        >
          Ledger detail (per scan)
        </Box>
      </Box>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "flex-end", mb: 2 }}>
        <FormControl size="small" sx={selectSx}>
          <InputLabel>Period</InputLabel>
          <Select value={period} label="Period" onChange={(e) => setPeriod(e.target.value)}>
            <MenuItem value="Q1 FY26-27">Q1 FY26-27 (Apr–Jun 2026)</MenuItem>
            <MenuItem value="Jun 2026">Jun 2026</MenuItem>
            <MenuItem value="May 2026">May 2026</MenuItem>
            <MenuItem value="FY25-26">FY25-26 (Full year)</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={selectSx}>
          <InputLabel>Region</InputLabel>
          <Select value={region} label="Region" onChange={(e) => setRegion(e.target.value)}>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="North">North</MenuItem>
            <MenuItem value="South">South</MenuItem>
            <MenuItem value="East">East</MenuItem>
            <MenuItem value="West">West</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={selectSx}>
          <InputLabel>Zone</InputLabel>
          <Select value={zone} label="Zone" onChange={(e) => setZone(e.target.value)}>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Bengaluru">Bengaluru</MenuItem>
            <MenuItem value="Bihar">Bihar</MenuItem>
            <MenuItem value="Chennai">Chennai</MenuItem>
            <MenuItem value="Delhi NCR">Delhi NCR</MenuItem>
            <MenuItem value="Gujarat">Gujarat</MenuItem>
            <MenuItem value="Hyderabad">Hyderabad</MenuItem>
            <MenuItem value="Kolkata">Kolkata</MenuItem>
            <MenuItem value="MP">MP</MenuItem>
            <MenuItem value="Mumbai">Mumbai</MenuItem>
            <MenuItem value="Odisha">Odisha</MenuItem>
            <MenuItem value="Punjab">Punjab</MenuItem>
            <MenuItem value="UP West">UP West</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={selectSx}>
          <InputLabel>State</InputLabel>
          <Select value={state} label="State" onChange={(e) => setState(e.target.value)}>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Bihar">Bihar</MenuItem>
            <MenuItem value="Delhi">Delhi</MenuItem>
            <MenuItem value="Gujarat">Gujarat</MenuItem>
            <MenuItem value="Haryana">Haryana</MenuItem>
            <MenuItem value="Jharkhand">Jharkhand</MenuItem>
            <MenuItem value="Karnataka">Karnataka</MenuItem>
            <MenuItem value="Kerala">Kerala</MenuItem>
            <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
            <MenuItem value="Maharashtra">Maharashtra</MenuItem>
            <MenuItem value="Odisha">Odisha</MenuItem>
            <MenuItem value="Punjab">Punjab</MenuItem>
            <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
            <MenuItem value="Telangana">Telangana</MenuItem>
            <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
            <MenuItem value="West Bengal">West Bengal</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={selectSx}>
          <InputLabel>Status</InputLabel>
          <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="On-hold">On-hold</MenuItem>
            <MenuItem value="Blocked">Blocked</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ ...selectSx, opacity: activeTab === "ledger" ? 0.5 : 1 }} disabled={activeTab === "ledger"}>
          <InputLabel>Product</InputLabel>
          <Select value={product} label="Product" onChange={(e) => setProduct(e.target.value)}>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Inverter Battery IT 150Ah">Inverter Battery IT 150Ah</MenuItem>
            <MenuItem value="Tall Tubular TT 200Ah">Tall Tubular TT 200Ah</MenuItem>
            <MenuItem value="SMF Battery 100Ah">SMF Battery 100Ah</MenuItem>
            <MenuItem value="Inverter 1050VA">Inverter 1050VA</MenuItem>
            <MenuItem value="Solar Panel 335W">Solar Panel 335W</MenuItem>
            <MenuItem value="Solar Inverter 3kW">Solar Inverter 3kW</MenuItem>
            <MenuItem value="Automotive Battery 35Ah">Automotive Battery 35Ah</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Search + Actions */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 2, mb: 1 }}>
        <Box>
          <Typography variant="caption" sx={{ color: "#666", fontSize: "0.75rem", mb: 0.5, display: "block" }}>
            Search dealer / code
          </Typography>
          <TextField
            size="small"
            placeholder="Dealer name or code…"
            value={localSearch}
            onChange={(e) => handleSearch(e.target.value)}
            sx={{ minWidth: 280, "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: "0.85rem" } }}
            slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: "1rem", color: "#999" }} /></InputAdornment> } }}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button variant="outlined" onClick={handleReset} sx={{ textTransform: "none", borderRadius: "8px", px: 3, borderColor: "#ccc", color: "#333", fontWeight: 500, "&:hover": { borderColor: "#999", bgcolor: "#f5f5f5" } }}>
            Reset
          </Button>
          <Button variant="contained" startIcon={<DownloadIcon />} sx={{ textTransform: "none", borderRadius: "8px", px: 3, bgcolor: "#1a237e", fontWeight: 600, "&:hover": { bgcolor: "#283593" } }}>
            Download Excel
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
