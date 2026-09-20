import React, { forwardRef, useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Avatar,
} from "@mui/material";
import { TableVirtuoso, type TableComponents } from "react-virtuoso";
import { UserSearchInput } from "../components/SearchInput";
import { useSearchForUsersQuery } from "../UsersService";
import { ApiErrorFallback } from "@/components/ErrorFallback";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { RoleChip } from "../components/RoleChip";
import { parentVariants, variants } from "@/utils/motion";
import { motion } from "motion/react";
import type { UserDetails } from "@/@types/user";

export default function UsersPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const { data, isError, refetch } = useSearchForUsersQuery({
    search: searchValue,
    limit: rowsPerPage,
    skip: page > 1 ? (page - 1) * rowsPerPage : undefined,
  });

  useEffect(() => {
    setTimeout(() => {
      setPage(1);
    });
  }, [searchValue]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const fixedHeaderContent = () => (
    <TableRow className="bg-background-default">
      <TableCell>{t("users-page.table.user")}</TableCell>
      <TableCell>{t("users-page.table.role")}</TableCell>
      <TableCell>{t("users-page.table.email")}</TableCell>
      <TableCell>{t("users-page.table.phone")}</TableCell>
      <TableCell>{t("users-page.table.age")}</TableCell>
      <TableCell>{t("users-page.table.company")}</TableCell>
      <TableCell>{t("users-page.table.address")}</TableCell>
    </TableRow>
  );

  const rowContent = (_index: number, user: UserDetails) => (
    <>
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar
            src={user.image}
            alt={user.firstName}
            className="border border-border-muted"
          />
          {`${user.firstName} ${user.lastName}`}
        </div>
      </TableCell>
      <TableCell>
        <RoleChip role={user.role} />
      </TableCell>
      <TableCell className="wrap-anywhere">{user.email}</TableCell>
      <TableCell className="wrap-anywhere">{user.phone}</TableCell>
      <TableCell>{user.age}</TableCell>
      <TableCell>{user.company?.name}</TableCell>
      <TableCell>{`${user.address?.address}, ${user.address?.city}`}</TableCell>
    </>
  );

  const content = () => {
    if (isError) {
      return (
        <div className="mt-10">
          <ApiErrorFallback refetch={refetch} />
        </div>
      );
    }

    if (!data) return;

    const users = data.users || [];

    return (
      <Paper variant="outlined" className="mt-4">
        {users.length === 0 ? (
          <div className="p-4 text-center">
            {t("users-page.table.no-users")}
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <TableVirtuoso
              style={{ height: 400 }}
              data={users}
              components={{
                ...virtuosoComponents,
                TableRow: (props) => {
                  const index = props["data-index"];
                  const user = users[index];
                  return (
                    <TableRow
                      {...props}
                      className="cursor-pointer hover:bg-muted/5 bg-background-default transition-colors duration-200"
                      onClick={() => user && navigate(`/users/${user.id}`)}
                    />
                  );
                },
              }}
              fixedHeaderContent={fixedHeaderContent}
              itemContent={rowContent}
            />
          </div>
        )}

        <TablePagination
          labelRowsPerPage={t("users-page.table.rows-per-page")}
          rowsPerPageOptions={[
            10,
            20,
            50,
            { value: data.total || 0, label: t("users-page.table.all") },
          ]}
          showLastButton
          showFirstButton
          component="div"
          count={data.total || 0}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          slotProps={{
            actions:
              i18n.dir() === "rtl"
                ? {
                    nextButton: { style: { rotate: "180deg" } },
                    previousButton: { style: { rotate: "180deg" } },
                    firstButton: { style: { rotate: "180deg" } },
                    lastButton: { style: { rotate: "180deg" } },
                  }
                : undefined,
          }}
        />
      </Paper>
    );
  };

  return (
    <section className="pt-30 pb-10">
      <title>{t("meta.withTitle", { text: t("header.links.users") })}</title>

      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={parentVariants}
        >
          <motion.div variants={variants}>
            <UserSearchInput setInputValue={setSearchValue} />
          </motion.div>
          <motion.div variants={variants}>{content()}</motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

const virtuosoComponents: TableComponents = {
  Scroller: forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      className="min-w-5xl"
      style={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead: forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow: TableRow,
  TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};
