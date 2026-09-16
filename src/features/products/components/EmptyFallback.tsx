import GridIcon from "@mui/icons-material/GridOff";
import { useTranslation } from "react-i18next";

export const ProductsEmptyFallback = () => {
  const { t } = useTranslation();

  return (
    <div className="py-10 h-[40vh] flex flex-col gap-4 justify-center items-center text-center">
      <GridIcon style={{ fontSize: "50px" }} />
      <p className="text-xl font-bold">{t("empty.products.title")}</p>
      <p className="text-muted max-w-lg">{t("empty.products.description")}</p>
    </div>
  );
};
