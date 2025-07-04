import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Checkbox,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FilterListIcon from "@mui/icons-material/FilterList";
import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from "react";
import { alpha } from "@mui/material/styles";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import ApiService from "@/app/apiService/apiService";
dayjs.extend(utc);

type Order = "asc" | "desc";

type Data = {
  clientName: string;
  date: Date;
  abonementDuration: number;
  dateOfCreation: Date;
};

type CompliteAbonementType = Data;

type TableOfClientsProps = {
  apiService: ApiService;
};

const headCells = [
  { id: "date", label: "Час" },
  { id: "clientName", label: "Клієнт" },
  { id: "abonementDuration", label: "Тривалість", numeric: true },
  { id: "dateOfCreation", label: "Створено" },
];

function getComparator<K extends keyof Data>(
  order: Order,
  orderBy: K
): (a: Data, b: Data) => number {
  return order === "desc"
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const EnhancedTableHead = ({
  onSelectAllClick,
  order,
  orderBy,
  onRequestSort,
  visibleRows,
  selected,
}: {
  numSelected: number;
  order: Order;
  orderBy: string;
  rowCount: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  visibleRows: CompliteAbonementType[];
  selected: string[];
}) => {
  const createSortHandler =
    (property: keyof Data) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const isAllSelected =
    visibleRows.length > 0 &&
    visibleRows.every((row) => selected.includes(row.clientName));

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={
              selected.length > 0 && selected.length < visibleRows.length
            }
            checked={isAllSelected}
            onChange={onSelectAllClick}
            sx={{
              "&.Mui-checked": {
                color: "var(--blue)",
              },
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id as keyof Data)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const EnhancedTableToolbar = ({
  numSelected,
  selected,
  apiService,
  updateClientsAbonementsAfterActivate,
}: {
  numSelected: number;
  selected: string[];
  apiService: ApiService;
  updateClientsAbonementsAfterActivate: (
    newAbonements: CompliteAbonementType[]
  ) => void;
}) => {
  const onActivateWorkoutHandler = async () => {
    console.log("Активировать для:", selected);
    try {
      const { data, status } = await apiService.put<CompliteAbonementType[]>(
        "/admin/updateAbonements",
        {
          names: selected,
        }
      );
      if (status === 200) {
        alert(`Status ${status}`);
        console.log(data);

        updateClientsAbonementsAfterActivate(data);
      }
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <Toolbar
      sx={[
        { pl: { sm: 2 }, pr: { xs: 1, sm: 1 } },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <>
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
          >
            {numSelected} обрано
          </Typography>
          <Tooltip title="Активувати тренування">
            <IconButton onClick={onActivateWorkoutHandler}>
              <AttachMoneyIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <Typography sx={{ flex: "1 1 100%" }} variant="h6">
            Клієнти на сьогодні {dayjs(new Date()).format("DD.MM.YYYY")}
          </Typography>
          <Tooltip title="Фільтр">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
};

const TableOfClients = ({ apiService }: TableOfClientsProps) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("clientName");
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [clientsAbonements, setClientsAbonements] = useState<
    CompliteAbonementType[]
  >([]);

  const handleRequestSort = (_: MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = visibleRows.map((row) => row.clientName);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const updateClientsAbonementsAfterActivate = (
    newAbonements: CompliteAbonementType[]
  ) => {
    setClientsAbonements(newAbonements);
  };

  const handleClick = (_: MouseEvent<unknown>, clientName: string) => {
    const selectedIndex = selected.indexOf(clientName);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, clientName];
    } else {
      newSelected = selected.filter((name) => name !== clientName);
    }
    setSelected(newSelected);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = useMemo(() => {
    return [...clientsAbonements]
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [clientsAbonements, order, orderBy, page, rowsPerPage]);

  useEffect(() => {
    (async () => {
      const { data, status } = await apiService.post<CompliteAbonementType[]>(
        `/admin/getTodayClientsAbonements`,
        { todaysDate: new Date().toISOString() }
      );

      if (status === 200) {
        setClientsAbonements(data);
      }
    })();
  }, []);

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - clientsAbonements.length)
      : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
          apiService={apiService}
          updateClientsAbonementsAfterActivate={
            updateClientsAbonementsAfterActivate
          }
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <EnhancedTableHead
              numSelected={selected.length}
              selected={selected}
              visibleRows={visibleRows}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={clientsAbonements.length}
            />
            <TableBody>
              {visibleRows.map((row) => {
                const isItemSelected = selected.includes(row.clientName);
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.clientName)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.clientName}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        sx={{
                          "&.Mui-checked": {
                            color: "var(--blue)",
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>{dayjs.utc(row.date).format("HH:mm")}</TableCell>
                    <TableCell>{row.clientName}</TableCell>
                    <TableCell align="right">{row.abonementDuration}</TableCell>
                    <TableCell>
                      {new Date(row.dateOfCreation).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={clientsAbonements.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default TableOfClients;
