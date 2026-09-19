import GridIcon from "@mui/icons-material/GridOff";
import type { ReactNode } from "react";

export const EmptyFallback = ({
  Icon,
  title,
  description,
}: {
  Icon?: ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="py-10 h-[40vh] flex flex-col gap-4 justify-center items-center text-center">
      {Icon || <GridIcon style={{ fontSize: "50px" }} />}
      <p className="text-xl font-bold">{title}</p>
      <p className="text-muted max-w-lg">{description}</p>
    </div>
  );
};
