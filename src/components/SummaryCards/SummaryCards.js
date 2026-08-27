import React from "react";
import { useSelector } from "react-redux";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { CheckCircle as CheckIcon } from "@mui/icons-material";
import { selectTotals, selectFilteredDealers } from "../../reducers/dealerReducer";

const cards = [
  { label: "DEALERS IN VIEW", key: "count", subtitle: "across all regions" },
  { label: "CLOSING POINTS BALANCE", key: "closingPts", subtitle: "redeemable points", highlight: true },
  { label: "FUND LIABILITY (CLOSING)", key: "closingPts", prefix: "₹", subtitle: "payable to dealers", highlight: true },
  { label: "REDEEMED THIS PERIOD", key: "redeemedPts", prefix: "₹", subtitle: "paid / in payout", highlight: true },
  { label: "RECONCILIATION", key: "reconciliation", subtitle: "Opening + Earned – Redeemed\n= Closing", green: true },
];

export default function SummaryCards() {
  const totals = useSelector(selectTotals);
  const filtered = useSelector(selectFilteredDealers);

  const renderValue = (card) => {
    if (card.key === "count") return filtered.length;
    if (card.key === "reconciliation") {
      return (
        <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, bgcolor: "#e8f5e9", color: "#2e7d32", px: 1.5, py: 0.4, borderRadius: "6px", fontSize: "0.9rem", fontWeight: 600 }}>
          <CheckIcon sx={{ fontSize: "1rem" }} />
          Balanced
        </Box>
      );
    }
    return (card.prefix || "") + totals[card.key].toLocaleString("en-IN");
  };

  return (
    <Box sx={{ display: "flex", gap: 0, mb: 3, overflowX: "auto" }}>
      {cards.map((card) => (
        <Card
          key={card.label}
          variant="outlined"
          sx={{
            flex: "1 1 0",
            minWidth: 180,
            borderRadius: 2,
            border: "1px solid #e8e8e8",
            boxShadow: "none",
            bgcolor: "#fff",
          }}
        >
          <CardContent sx={{ py: 1.5, px: 2, "&:last-child": { pb: 1.5 } }}>
            <Typography
              variant="caption"
              sx={{
                color: "#888",
                fontWeight: 500,
                letterSpacing: "0.08em",
                fontSize: "0.68rem",
                display: "block",
                mb: 0.5,
                textTransform: "uppercase",
              }}
            >
              {card.label}
            </Typography>
            <Box sx={{ minHeight: 28, display: "flex", alignItems: "center" }}>
              {card.key === "reconciliation" ? (
                renderValue(card)
              ) : (
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: card.highlight ? "#1a237e" : "#1a1a1a",
                    fontSize: card.prefix ? "1.5rem" : "1.6rem",
                    lineHeight: 1.2,
                  }}
                >
                  {renderValue(card)}
                </Typography>
              )}
            </Box>
            {card.subtitle && (
              <Typography
                variant="body2"
                sx={{ color: "#aaa", fontSize: "0.72rem", mt: 0.4, whiteSpace: "pre-line", lineHeight: 1.3 }}
              >
                {card.subtitle}
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
