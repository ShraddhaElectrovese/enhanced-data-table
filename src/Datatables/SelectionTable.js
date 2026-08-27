import React, { useState } from "react";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Checkbox } from "@mui/material";

export default function SelectionTable({ columns, data, onSelectionChange }) {
  const [selected, setSelected] = useState([]);

  const handleToggleAll = () => {
    const next = selected.length === data.length ? [] : data.map((r) => r.id ?? r);
    setSelected(next);
    onSelectionChange?.(next);
  };

  const handleToggle = (id) => {
    const next = selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id];
    setSelected(next);
    onSelectionChange?.(next);
  };

  const allChecked = data.length > 0 && selected.length === data.length;
  const indeterminate = selected.length > 0 && selected.length < data.length;

  return (
    <Paper variant="outlined" sx={{ overflow: "auto" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" sx={{ bgcolor: "#1a237e" }}>
              <Checkbox checked={allChecked} indeterminate={indeterminate} onChange={handleToggleAll} sx={{ color: "#fff" }} />
            </TableCell>
            {columns.map((col) => (
              <TableCell key={col.id} align={col.numeric ? "right" : "left"} sx={{ bgcolor: "#1a237e", color: "#fff", fontWeight: 600, fontSize: "0.78rem" }}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => {
            const id = row.id ?? idx;
            return (
              <TableRow key={id} hover selected={selected.includes(id)} onClick={() => handleToggle(id)} sx={{ cursor: "pointer" }}>
                <TableCell padding="checkbox"><Checkbox checked={selected.includes(id)} /></TableCell>
                {columns.map((col) => (
                  <TableCell key={col.id} align={col.numeric ? "right" : "left"}>
                    {col.render ? col.render(row[col.id], row, idx) : row[col.id]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}
