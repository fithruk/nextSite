import {
  Box,
  FormControlLabel,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";

import { visuallyHidden } from "@mui/utils";

import dayjs from "dayjs";

export interface AllTimeClientsData {
  name: string;
  id: string;
  workoutDates: string[];
  workoutsAmount: number;
}

type Order = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator<Key extends keyof AllTimeClientsData>(
  order: Order,
  orderBy: Key
): (a: AllTimeClientsData, b: AllTimeClientsData) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof AllTimeClientsData;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  { id: "name", numeric: false, disablePadding: true, label: "Name" },
  {
    id: "workoutsAmount",
    numeric: true,
    disablePadding: false,
    label: "Workouts Amount",
  },
  {
    id: "workoutDates",
    numeric: false,
    disablePadding: false,
    label: "Dates Of Workouts",
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof AllTimeClientsData
  ) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof AllTimeClientsData) =>
    (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id && (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function AllTimeClientsTable({
  allTimeClients,
}: {
  allTimeClients: AllTimeClientsData[];
}) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] =
    useState<keyof AllTimeClientsData>("workoutsAmount");
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof AllTimeClientsData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const visibleRows = useMemo(
    () =>
      [...allTimeClients]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [allTimeClients, order, orderBy, page, rowsPerPage]
  );

  const emptyRows = Math.max(
    0,
    (1 + page) * rowsPerPage - allTimeClients.length
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Typography sx={{ p: 2 }} variant="h6" component="div">
          Клієнти за весь час ({allTimeClients.length})
        </Typography>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size={dense ? "small" : "medium"}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell component="th" scope="row" padding="normal">
                    <Typography color="info">{row.name}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography color="info">{row.workoutsAmount}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    {row.workoutDates?.length > 0
                      ? row.workoutDates
                          .map((date) => dayjs(date).format("DD.MM"))
                          .join(", ")
                      : "—"}
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={3} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[25, 50, 75]}
          component="div"
          count={allTimeClients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
