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
  name: string;
  date: Date;
  abonementDuration: number;
  dateOfCreation: Date;
  dateOfLastActivation: Date;
};

type CompliteAbonementType = Data;

type TableOfClientsProps = {
  apiService: ApiService;
};

const headCells = [
  { id: "date", label: "Час" },
  { id: "name", label: "Клієнт" },
  { id: "abonementDuration", label: "Залишилось занять", numeric: true },
  { id: "dateOfCreation", label: "Створено" },
  { id: "editedToday", label: "Треніровка була списана" },
];

function getComparator<K extends keyof Data>(
  order: Order,
  orderBy: K
): (a: Data, b: Data) => number {
  return order === "desc"
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const normalizeName = (name: string): string =>
  name
    .toLowerCase()
    .trim()
    .split(/\s+/) // разбиваем по пробелам (включая лишние)
    .sort()
    .join(" ");

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
    visibleRows.every((row) => selected.includes(row.name));

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
        const normalizeNameArray = data.map((ab) => ({
          ...ab,
          name: normalizeName(ab.name),
        }));

        updateClientsAbonementsAfterActivate(normalizeNameArray);
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
  const [orderBy, setOrderBy] = useState<keyof Data>("name");
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
      const newSelected = visibleRows.map((row) => row.name);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const updateClientsAbonementsAfterActivate = (
    newAbonements: CompliteAbonementType[]
  ) => {
    setClientsAbonements((data) => {
      return data.map((ab) => {
        const newData = newAbonements.find((abon) => abon.name === ab.name);
        if (!newData) return ab; // если не нашли — вернём как есть
        return {
          ...newData,
          date: ab.date,
        };
      });
    });
  };

  const handleClick = (_: MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, name];
    } else {
      newSelected = selected.filter((name) => name !== name);
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
        const normalizeNameArray = data.map((ab) => ({
          ...ab,
          name: normalizeName(ab.name),
        }));
        setClientsAbonements(normalizeNameArray);
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
                const isItemSelected = selected.includes(row.name);

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
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
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">{row.abonementDuration}</TableCell>
                    <TableCell>
                      {dayjs(row.dateOfCreation).format("DD.MM.YYYY")}
                    </TableCell>
                    <TableCell align="right">
                      {row.dateOfLastActivation
                        ? dayjs(row.dateOfLastActivation).format("DD.MM.YYYY")
                        : "Тренування ще не було"}
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
