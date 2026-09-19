import { Alert, AlertTitle, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

export const ApiErrorFallback = ({ refetch }: { refetch: () => void }) => {
  const { t } = useTranslation();

  return (
    <Alert severity="error" variant="outlined" sx={{ padding: "18px" }}>
      <AlertTitle sx={{ fontWeight: 600 }}>{t("errors.main.title")}</AlertTitle>
      <p>{t("errors.main.description")}</p>

      <div className="mt-4">
        <Button
          variant="outlined"
          sx={{ color: "error.light", borderColor: "error.light" }}
          onClick={refetch}
        >
          {t("errors.main.retry")}
        </Button>
      </div>
    </Alert>
  );
};
