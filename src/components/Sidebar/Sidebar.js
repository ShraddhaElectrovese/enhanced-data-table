import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Stars as DealerPointsIcon,
  CardGiftcard as RedemptionsIcon,
  AccountBalance as PFLedgerIcon,
  Sync as PaytmIcon,
  Approval as ApprovalsIcon,
  History as AuditLogIcon,
} from "@mui/icons-material";

const navSections = [
  {
    title: "REWARDS",
    items: [
      { label: "Dealer Points", icon: <DealerPointsIcon fontSize="small" />, path: "/dealer-points" },
      { label: "Redemptions", icon: <RedemptionsIcon fontSize="small" />, path: "/redemptions" },
      { label: "PF Ledger —\nConsolidated", icon: <PFLedgerIcon fontSize="small" />, path: "/pf-ledger" },
      { label: "Paytm Reconciliation", icon: <PaytmIcon fontSize="small" />, path: "/paytm" },
    ],
  },
  {
    title: "FINANCE",
    items: [
      { label: "Approvals", icon: <ApprovalsIcon fontSize="small" />, path: "/approvals" },
      { label: "Audit Log", icon: <AuditLogIcon fontSize="small" />, path: "/audit-log" },
    ],
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={{
        width: 240,
        minWidth: 240,
        bgcolor: "#1a1f2e",
        color: "#fff",
        height: "100vh",
        position: "sticky",
        top: 0,
        overflowY: "auto",
      }}
    >
      <Box sx={{ p: 2, pb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#f5c518" }}>
          PowerOne
        </Typography>
      </Box>

      {navSections.map((section, sIdx) => (
        <Box key={section.title}>
          <Typography
            variant="caption"
            sx={{
              px: 2,
              pt: sIdx === 0 ? 1 : 3,
              pb: 1,
              display: "block",
              color: "rgba(255,255,255,0.4)",
              fontWeight: 600,
              letterSpacing: "0.08em",
              fontSize: "0.65rem",
            }}
          >
            {section.title}
          </Typography>
          <List disablePadding>
            {section.items.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton
                    selected={isActive}
                    onClick={() => navigate(item.path)}
                    sx={{
                      py: 1,
                      px: 2,
                      "&.Mui-selected": {
                        bgcolor: "rgba(255,255,255,0.08)",
                        borderLeft: "3px solid #f5c518",
                      },
                      "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 32,
                        color: isActive ? "#f5c518" : "rgba(255,255,255,0.6)",
                      }}
                    >
                      {isActive ? (
                        <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#f5c518" }} />
                      ) : (
                        item.icon
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        sx: {
                          fontSize: "0.82rem",
                          fontWeight: isActive ? 600 : 400,
                          whiteSpace: "pre-line",
                          lineHeight: 1.3,
                          color: isActive ? "#fff" : "rgba(255,255,255,0.75)",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      ))}
    </Box>
  );
}
