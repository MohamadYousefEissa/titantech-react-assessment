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
import { useState } from "react";
import { UserSearchInput } from "../components/SearchInput";
import { useSearchForUsersQuery } from "../UsersService";
import { ApiErrorFallback } from "@/components/ErrorFallback";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { RoleChip } from "../components/RoleChip";

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

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const content = () => {
    if (isError)
      return (
        <div className="mt-10">
          <ApiErrorFallback refetch={refetch} />
        </div>
      );

    return (
      <Paper variant="outlined" className="mt-4">
        <TableContainer className="max-h-100 scrollbar-thin">
          <Table aria-label="user table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ borderRadius: "12px 0 0 0" }}>
                  {t("users-page.table.user")}
                </TableCell>
                <TableCell>{t("users-page.table.role")}</TableCell>
                <TableCell>{t("users-page.table.email")}</TableCell>
                <TableCell>{t("users-page.table.phone")}</TableCell>
                <TableCell>{t("users-page.table.age")}</TableCell>
                <TableCell>{t("users-page.table.company")}</TableCell>
                <TableCell>{t("users-page.table.address")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.users.length === 0 && (
                <TableRow>
                  <p className="p-4">{t("users-page.table.no-users")}</p>
                </TableRow>
              )}
              {data?.users.map((user) => (
                <TableRow
                  key={user.id}
                  className="cursor-pointer hover:bg-muted/5 transition-colors duration-200"
                  onClick={() => navigate(`/users/${user.id}`)}
                >
                  <TableCell>
                    <Avatar
                      src={user.image}
                      alt={user.firstName}
                      className="border border-border-muted"
                    />
                    {`${user.firstName} ${user.lastName}`}
                  </TableCell>
                  <TableCell>
                    <RoleChip role={user.role} />
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell>{user.company.name}</TableCell>
                  <TableCell>{`${user.address.address}, ${user.address.city}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          labelRowsPerPage={t("users-page.table.rows-per-page")}
          rowsPerPageOptions={[10, 20, 50]}
          showLastButton
          showFirstButton
          component="div"
          count={data?.total || 0}
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
    <section className="pt-30 pb-10 sm:pb-20">
      <Container>
        <UserSearchInput setInputValue={setSearchValue} />

        {content()}
      </Container>
    </section>
  );
}
