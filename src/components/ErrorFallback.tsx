import React from "react";
import { Alert, AlertTitle, Box, Paper, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlineOutlined";

interface ApiErrorFallbackProps {
  title?: string;
}

export const ApiErrorFallback: React.FC<ApiErrorFallbackProps> = ({
  title = "Failed to load data",
}) => {
  return (
    <Box component="div" className="py-10">
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          maxWidth: 480,
          width: "100%",
          p: 2,
          borderColor: "error.light",
          backgroundColor: "error.50",
        }}
      >
        <Alert
          severity="error"
          icon={<ErrorOutlineIcon fontSize="inherit" />}
          sx={{
            alignItems: "center",
            backgroundColor: "transparent",
            p: 0,
            "& .MuiAlert-message": {
              width: "100%",
            },
          }}
        >
          <AlertTitle sx={{ fontWeight: 600 }}>{title}</AlertTitle>
          <Typography variant="body2" color="error.dark">
            {
              "An unexpected error occurred while communicating with the server."
            }
          </Typography>
        </Alert>
      </Paper>
    </Box>
  );
};
