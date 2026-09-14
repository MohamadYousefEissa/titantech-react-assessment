import { Container } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <Container className="py-10">
      <p>Home</p>
      <div className="h-[200vh]"></div>
    </Container>
  );
}
