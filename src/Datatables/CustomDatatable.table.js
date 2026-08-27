import React, { useState, useRef, useCallback } from "react";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Box } from "@mui/material";

export default function CustomDatatable({ columns, data }) {
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  const bodyRef = useRef(null);
  const headerRef = useRef(null);
  const syncing = useRef(false);

  const syncScroll = useCallback((source) => (e) => {
    if (syncing.current) return;
    syncing.current = true;
    const sl = e.currentTarget.scrollLeft;
    if (source === "body" && headerRef.current) headerRef.current.scrollLeft = sl;
    else if (source === "header" && bodyRef.current) bodyRef.current.scrollLeft = sl;
    requestAnimationFrame(() => { syncing.current = false; });
  }, []);

  const handleSort = (col) => {
    const dir = orderBy === col && order === "asc" ? "desc" : "asc";
    setOrderBy(col);
    setOrder(dir);
  };

  const sorted = [...data].sort((a, b) => {
    if (!orderBy) return 0;
    return order === "asc" ? (a[orderBy] > b[orderBy] ? 1 : -1) : (a[orderBy] < b[orderBy] ? 1 : -1);
  });

  return (
    <Paper variant="outlined" sx={{ borderRadius: 1, overflow: "hidden", height: 520, display: "flex", flexDirection: "column" }}>
      <Box ref={headerRef} onScroll={syncScroll("header")} sx={{ overflow: "hidden", flexShrink: 0 }}>
        <Table size="small" sx={{ tableLayout: "fixed", minWidth: "unset" }}>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.id} align={col.numeric ? "right" : "left"} sx={{ width: col.width, bgcolor: "#1a237e", color: "#fff", fontWeight: 600, fontSize: "0.78rem", whiteSpace: "nowrap" }}>
                  <TableSortLabel active={orderBy === col.id} direction={orderBy === col.id ? order : "asc"} onClick={() => handleSort(col.id)} sx={{ color: "#fff", "&.MuiTableSortLabel-root.Mui-active": { color: "#f5c518" } }}>
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </Box>
      <Box ref={bodyRef} onScroll={syncScroll("body")} sx={{ flex: 1, overflow: "auto" }}>
        <Table size="small" sx={{ tableLayout: "fixed", minWidth: "unset" }}>
          <TableBody>
            {sorted.map((row, idx) => (
              <TableRow key={row.id ?? idx} hover>
                {columns.map((col) => (
                  <TableCell key={col.id} align={col.numeric ? "right" : "left"} sx={{ width: col.width, fontSize: "0.8rem" }}>
                    {col.render ? col.render(row[col.id], row, idx) : row[col.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
}
