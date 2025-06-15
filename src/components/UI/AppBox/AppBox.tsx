"use client";
import { Box, styled } from "@mui/material";

const AppBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: "1rem",
  height: "100%",
  borderRadius: "1rem",
}));

export { AppBox };
