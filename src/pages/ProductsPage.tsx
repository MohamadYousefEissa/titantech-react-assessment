import { Container } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ProductsPage() {
  const { t } = useTranslation();

  return (
    <Container className="py-10">
      <p>Products</p>
      <div className="h-[200vh]"></div>
    </Container>
  );
}
