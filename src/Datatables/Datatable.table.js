import React, { useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { selectSortedDealers, selectFilteredDealers, selectTotals } from "../reducers/dealerReducer";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Box } from "@mui/material";

const headCells = [
  { id: "id", label: "#", numeric: true },
  { id: "code", label: "Dealer Code", numeric: false },
  { id: "name", label: "Dealer Name", numeric: false },
  { id: "region", label: "Region", numeric: false },
  { id: "zone", label: "Zone", numeric: false },
  { id: "state", label: "State", numeric: false },
  { id: "distributor", label: "Distributor", numeric: false },
  { id: "scans", label: "Scans", numeric: true },
  { id: "openingPts", label: "Opening Pts", numeric: true },
  { id: "earnedPts", label: "Earned Pts", numeric: true },
  { id: "redeemedPts", label: "Redeemed Pts", numeric: true },
  { id: "closingPts", label: "Closing Pts", numeric: true },
  { id: "closingPayable", label: "Closing ₹ (Payable)", numeric: true },
  { id: "redeemedAmt", label: "Redeemed ₹", numeric: true },
  { id: "lastRedemption", label: "Last Redemption", numeric: false },
  { id: "mode", label: "Mode", numeric: false },
];

const colWidths = [50, 110, 200, 100, 120, 150, 150, 60, 100, 100, 110, 100, 140, 110, 130, 100];

const formatNum = (n) => n.toLocaleString("en-IN");

const getClosingPts = (d) => d.openingPts + d.earnedPts - d.redeemedPts;

export default function DatatableTable({ searchTerm }) {
  const sortedDealers = useSelector(selectSortedDealers);
  const filteredDealers = useSelector(selectFilteredDealers);
  const totals = useSelector(selectTotals);

  const bodyRef = useRef(null);
  const headerRef = useRef(null);
  const syncing = useRef(false);

  const syncScroll = useCallback((source) => (e) => {
    if (syncing.current) return;
    syncing.current = true;
    const scrollLeft = e.currentTarget.scrollLeft;
    if (source === "body" && headerRef.current) {
      headerRef.current.scrollLeft = scrollLeft;
    } else if (source === "header" && bodyRef.current) {
      bodyRef.current.scrollLeft = scrollLeft;
    }
    requestAnimationFrame(() => { syncing.current = false; });
  }, []);

  const ColGroup = () => (
    <colgroup>
      {colWidths.map((w, i) => <col key={i} style={{ width: w }} />)}
    </colgroup>
  );

  const totalClosing = totals.closingPts;
  const totalRedeemedAmt = totals.redeemedPts;

  return (
    <Paper variant="outlined" sx={{ borderRadius: 1, overflow: "hidden", height: 520, display: "flex", flexDirection: "column" }}>
      {/* FIXED HEADER */}
      <Box ref={headerRef} onScroll={syncScroll("header")} sx={{ overflow: "hidden", flexShrink: 0 }}>
        <Table size="small" sx={{ tableLayout: "fixed", minWidth: "unset" }}>
          <ColGroup />
          <TableHead>
            <TableRow>
              {headCells.map((cell) => (
                <TableCell
                  key={cell.id}
                  align={cell.numeric ? "right" : "left"}
                  sx={{ bgcolor: "#1a237e", color: "#fff", fontWeight: 600, fontSize: "0.78rem", whiteSpace: "nowrap", borderBottom: "2px solid #0d1547", py: 1.2, px: 1.5 }}
                >
                  {cell.id === "id" ? cell.label : (
                    <TableSortLabel sx={{ color: "#fff", justifyContent: "center", "&.MuiTableSortLabel-root": { color: "#fff" }, "&.MuiTableSortLabel-root.Mui-active": { color: "#f5c518" }, "& .MuiTableSortLabel-icon": { color: "#fff !important" }, "&.MuiTableSortLabel-root.Mui-active .MuiTableSortLabel-icon": { color: "#f5c518 !important" } }}>
                      {cell.label}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </Box>

      {/* SCROLLABLE BODY */}
      <Box ref={bodyRef} onScroll={syncScroll("body")} sx={{ flex: 1, overflow: "auto" }}>
        <Table size="small" sx={{ tableLayout: "fixed", minWidth: "unset" }}>
          <ColGroup />
          <TableBody>
            {sortedDealers.map((row) => {
              const closing = getClosingPts(row);
              return (
                <TableRow key={row.id} hover sx={{ "&:nth-of-type(odd)": { bgcolor: "#fafafa" }, "&:hover": { bgcolor: "#f0f4ff" }, cursor: "pointer" }}>
                  <TableCell align="right" sx={{ fontSize: "0.8rem", py: 1, px: 1.5 }}>{row.id}</TableCell>
                  <TableCell sx={{ fontSize: "0.8rem", fontWeight: 500, fontFamily: "monospace", py: 1, px: 1.5 }}>{row.code}</TableCell>
                  <TableCell sx={{ fontSize: "0.8rem", fontWeight: 500, py: 1, px: 1.5 }}>{row.name}</TableCell>
                  <TableCell sx={{ fontSize: "0.8rem", py: 1, px: 1.5 }}>{row.region}</TableCell>
                  <TableCell sx={{ fontSize: "0.8rem", py: 1, px: 1.5 }}>{row.zone}</TableCell>
                  <TableCell sx={{ fontSize: "0.8rem", py: 1, px: 1.5 }}>{row.state}</TableCell>
                  <TableCell sx={{ fontSize: "0.8rem", py: 1, px: 1.5 }}>{row.distributor}</TableCell>
                  <TableCell align="right" sx={{ fontSize: "0.8rem", py: 1, px: 1.5 }}>{row.scans}</TableCell>
                  <TableCell align="right" sx={{ fontSize: "0.8rem", py: 1, px: 1.5 }}>{formatNum(row.openingPts)}</TableCell>
                  <TableCell align="right" sx={{ fontSize: "0.8rem", py: 1, px: 1.5 }}>{formatNum(row.earnedPts)}</TableCell>
                  <TableCell align="right" sx={{ fontSize: "0.8rem", py: 1, px: 1.5 }}>{formatNum(row.redeemedPts)}</TableCell>
                  <TableCell align="right" sx={{ fontSize: "0.8rem", fontWeight: 600, py: 1, px: 1.5, color: closing === 0 ? "#999" : "#1a237e" }}>
                    {closing === 0 ? "—" : formatNum(closing)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: "0.8rem", fontWeight: 600, py: 1, px: 1.5, color: closing === 0 ? "#999" : "#1a237e" }}>
                    {closing === 0 ? "—" : "₹" + formatNum(closing)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: "0.8rem", py: 1, px: 1.5, color: row.redeemedPts === 0 ? "#999" : "#1a237e", whiteSpace: "nowrap" }}>
                    {row.redeemedPts === 0 ? "—" : "₹" + formatNum(row.redeemedPts)}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "0.8rem", py: 1, px: 1.5, color: row.lastRedemption === "—" ? "#999" : "inherit", whiteSpace: "nowrap" }}>
                    {row.lastRedemption}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "0.8rem", py: 1, px: 1.5, color: row.mode === "—" ? "#999" : "inherit", whiteSpace: "nowrap" }}>
                    {row.mode}
                  </TableCell>
                </TableRow>
              );
            })}

            {/* TOTAL ROW */}
            <TableRow sx={{ bgcolor: "#f0f4ff", position: "sticky", bottom: 0, zIndex: 2 }}>
              <TableCell colSpan={7} sx={{ fontSize: "0.82rem", fontWeight: 700, py: 1.5, px: 1.5, borderTop: "2px solid #1a237e", borderBottom: "none", bgcolor: "#f0f4ff" }}>
                TOTAL — {filteredDealers.length} dealers
              </TableCell>
              <TableCell align="right" sx={{ fontSize: "0.82rem", fontWeight: 700, py: 1.5, px: 1.5, borderTop: "2px solid #1a237e", borderBottom: "none", bgcolor: "#f0f4ff" }}>{totals.scans}</TableCell>
              <TableCell align="right" sx={{ fontSize: "0.82rem", fontWeight: 700, py: 1.5, px: 1.5, borderTop: "2px solid #1a237e", borderBottom: "none", bgcolor: "#f0f4ff" }}>{formatNum(totals.openingPts)}</TableCell>
              <TableCell align="right" sx={{ fontSize: "0.82rem", fontWeight: 700, py: 1.5, px: 1.5, borderTop: "2px solid #1a237e", borderBottom: "none", bgcolor: "#f0f4ff" }}>{formatNum(totals.earnedPts)}</TableCell>
              <TableCell align="right" sx={{ fontSize: "0.82rem", fontWeight: 700, py: 1.5, px: 1.5, borderTop: "2px solid #1a237e", borderBottom: "none", bgcolor: "#f0f4ff" }}>{formatNum(totals.redeemedPts)}</TableCell>
              <TableCell align="right" sx={{ fontSize: "0.82rem", fontWeight: 700, py: 1.5, px: 1.5, borderTop: "2px solid #1a237e", borderBottom: "none", bgcolor: "#f0f4ff" }}>{formatNum(totalClosing)}</TableCell>
              <TableCell align="right" sx={{ fontSize: "0.82rem", fontWeight: 700, py: 1.5, px: 1.5, borderTop: "2px solid #1a237e", borderBottom: "none", bgcolor: "#f0f4ff" }}>₹{formatNum(totalClosing)}</TableCell>
              <TableCell align="right" sx={{ fontSize: "0.82rem", fontWeight: 700, py: 1.5, px: 1.5, borderTop: "2px solid #1a237e", borderBottom: "none", bgcolor: "#f0f4ff" }}>₹{formatNum(totalRedeemedAmt)}</TableCell>
              <TableCell sx={{ borderTop: "2px solid #1a237e", borderBottom: "none", bgcolor: "#f0f4ff" }} />
              <TableCell sx={{ borderTop: "2px solid #1a237e", borderBottom: "none", bgcolor: "#f0f4ff" }} />
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
}
