import { Alert, AlertTitle, Box, Paper, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useTranslation } from "react-i18next";

export const ApiErrorFallback = () => {
  const { t } = useTranslation();

  return (
    <Box component="div">
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
          <AlertTitle sx={{ fontWeight: 600 }}>
            {t("errors.main.title")}
          </AlertTitle>
          <Typography variant="body2" color="error.dark">
            {t("errors.main.description")}
          </Typography>
        </Alert>
      </Paper>
    </Box>
  );
};
