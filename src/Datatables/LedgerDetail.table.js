import React, { useRef, useCallback, useMemo, useState } from "react";
import scanData from "./scanData";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Box, Chip } from "@mui/material";

const headCells = [
  { id: "scanDate", label: "Scan / Txn Date", numeric: false },
  { id: "dealerCode", label: "Dealer Code", numeric: false },
  { id: "dealerName", label: "Dealer Name", numeric: false },
  { id: "region", label: "Region", numeric: false },
  { id: "state", label: "State", numeric: false },
  { id: "sku", label: "SKU", numeric: false },
  { id: "product", label: "Product", numeric: false },
  { id: "qty", label: "Qty", numeric: true },
  { id: "entryType", label: "Entry Type", numeric: false },
  { id: "points", label: "Points", numeric: true },
  { id: "value", label: "Value", numeric: true },
];

const colWidths = [110, 100, 160, 90, 130, 80, 150, 60, 110, 80, 90];

const formatNum = (n) => n.toLocaleString("en-IN");

export default function LedgerDetailTable() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("scanDate");
  const bodyRef = useRef(null);
  const headerRef = useRef(null);
  const syncing = useRef(false);

  const sorted = useMemo(() => {
    return [...scanData].sort((a, b) => {
      const aVal = a[orderBy];
      const bVal = b[orderBy];
      if (order === "asc") return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });
  }, [order, orderBy]);

  const totals = useMemo(() => {
    return scanData.reduce(
      (acc, d) => ({
        qty: acc.qty + d.qty,
        points: acc.points + d.points,
        value: acc.value + d.value,
      }),
      { qty: 0, points: 0, value: 0 }
    );
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const syncScroll = useCallback((source) => (e) => {
    if (syncing.current) return;
    syncing.current = true;
    const sl = e.currentTarget.scrollLeft;
    if (source === "body" && headerRef.current) headerRef.current.scrollLeft = sl;
    else if (source === "header" && bodyRef.current) bodyRef.current.scrollLeft = sl;
    requestAnimationFrame(() => { syncing.current = false; });
  }, []);

  const ColGroup = () => (
    <colgroup>
      {colWidths.map((w, i) => <col key={i} style={{ width: w }} />)}
    </colgroup>
  );

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
                    align={cell.id === "qty" ? "center" : cell.numeric ? "right" : "left"}
                    sx={{ bgcolor: "#1a237e", color: "#fff", fontWeight: 600, fontSize: "0.78rem", whiteSpace: "nowrap", borderBottom: "2px solid #0d1547", py: 1.2, px: 1.5 }}
                  >
                    <TableSortLabel
                      active={orderBy === cell.id}
                      direction={orderBy === cell.id ? order : "asc"}
                      onClick={() => handleRequestSort(cell.id)}
                      sx={{ color: "#fff", justifyContent: "center", "&.MuiTableSortLabel-root": { color: "#fff" }, "&.MuiTableSortLabel-root.Mui-active": { color: "#f5c518" }, "& .MuiTableSortLabel-icon": { color: "#fff !important" }, "&.MuiTableSortLabel-root.Mui-active .MuiTableSortLabel-icon": { color: "#f5c518 !important" } }}
                    >
                      {cell.label}
                    </TableSortLabel>
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
              {sorted.map((row) => (
                <TableRow key={row.id} hover sx={{ "&:nth-of-type(odd)": { bgcolor: "#fafafa" }, "&:hover": { bgcolor: "#f0f4ff" }, cursor: "pointer" }}>
                  <TableCell sx={{ fontSize: "0.8rem", py: 1, px: 1.5, whiteSpace: "nowrap" }}>{row.scanDate}</TableCell>
                  <TableCell sx={{ fontSize: "0.8rem", fontWeight: 500, fontFamily: "monospace", py: 1, px: 1.5 }}>{row.dealerCode}</TableCell>
                  <TableCell sx={{ fontSize: "0.8rem", fontWeight: 500, py: 1, px: 1.5 }}>{row.dealerName}</TableCell>
                  <TableCell sx={{ fontSize: "0.8rem", py: 1, px: 1.5 }}>{row.region}</TableCell>
                  <TableCell sx={{ fontSize: "0.8rem", py: 1, px: 1.5 }}>{row.state}</TableCell>
                  <TableCell sx={{ fontSize: "0.8rem", py: 1, px: 1.5, fontFamily: "monospace" }}>{row.sku}</TableCell>
                  <TableCell sx={{ fontSize: "0.8rem", py: 1, px: 1.5, whiteSpace: "nowrap" }}>{row.product}</TableCell>
                  <TableCell align="center" sx={{ fontSize: "0.8rem", py: 1, px: 1.5 }}>{row.qty}</TableCell>
                  <TableCell sx={{ fontSize: "0.8rem", py: 1, px: 1.5, textAlign: "center" }}>
                    <Chip label={row.entryType} size="small" sx={{ bgcolor: "#e8f5e9", color: "#2e7d32", fontSize: "0.7rem", fontWeight: 500, height: 24 }} />
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: "0.8rem", fontWeight: 600, py: 1, px: 1.5, color: "#2e7d32" }}>
                    +{formatNum(row.points)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: "0.8rem", py: 1, px: 1.5, color: "#2e7d32" }}>
                    +₹{formatNum(row.value)}
                  </TableCell>
                </TableRow>
              ))}

              {/* TOTAL row */}
              <TableRow sx={{ bgcolor: "#f0f4ff", position: "sticky", bottom: 0, zIndex: 2 }}>
                <TableCell colSpan={7} sx={{ fontSize: "0.82rem", fontWeight: 700, py: 1.5, px: 1.5, borderTop: "2px solid #1a237e", borderBottom: "none", bgcolor: "#f0f4ff" }}>
                  TOTAL — {scanData.length} scans
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "0.82rem", fontWeight: 700, py: 1.5, px: 1.5, borderTop: "2px solid #1a237e", borderBottom: "none", bgcolor: "#f0f4ff" }}>{totals.qty}</TableCell>
                <TableCell sx={{ borderTop: "2px solid #1a237e", borderBottom: "none", bgcolor: "#f0f4ff" }} />
                <TableCell align="right" sx={{ fontSize: "0.82rem", fontWeight: 700, py: 1.5, px: 1.5, borderTop: "2px solid #1a237e", borderBottom: "none", bgcolor: "#f0f4ff", color: "#2e7d32" }}>+{formatNum(totals.points)}</TableCell>
                <TableCell align="right" sx={{ fontSize: "0.82rem", fontWeight: 700, py: 1.5, px: 1.5, borderTop: "2px solid #1a237e", borderBottom: "none", bgcolor: "#f0f4ff", color: "#2e7d32" }}>+₹{formatNum(totals.value)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Paper>
  );
}
