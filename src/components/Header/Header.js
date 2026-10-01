import React from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { actionLogoutUser } from "../../actions/Auth.action";
import logoImage from "../../assets/CRMAssets/eastman_logo_white@2x.png";

export default function Header() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(actionLogoutUser());
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "#1e4c9a", // A nice corporate blue
        px: 3,
        py: 0.5,
        borderBottom: "4px solid #f5c518",
        color: "#fff",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          component="img"
          src={logoImage}
          alt="Eastman Logo"
          sx={{
            height: 60,
            objectFit: "contain"
          }}
        />
      </Box>

      <Box sx={{ textAlign: "right" }}>
        <Typography sx={{ fontSize: "0.9rem", color: "#fff" }}>
          Signed in as <Box component="span" sx={{ color: "#f5c518", fontWeight: 700 }}>Finance / Audit</Box>
        </Typography>
        <Typography 
          onClick={handleLogout}
          sx={{ 
            fontSize: "0.9rem", 
            color: "rgba(255,255,255,0.85)", 
            cursor: "pointer", 
            textDecoration: "underline",
            mt: 0.2,
            "&:hover": { color: "#fff" }
          }}
        >
          Logout
        </Typography>
      </Box>
    </Box>
  );
}
