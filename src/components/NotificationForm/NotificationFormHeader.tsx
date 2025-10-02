import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { AbonDataTypes, ClientTypes } from "../../Types/types";
import { ChangeEvent, useState, MouseEvent } from "react";

type NotFormHeadTypes = {
  allSiteClients: ClientTypes[];
  onSelectClientForSendNotification: (clientName: string) => void;
  selectedClients: string[];
  allAbonements: AbonDataTypes[];
};

const NotificationFormHeader = ({
  allSiteClients,
  onSelectClientForSendNotification,
  selectedClients,
  allAbonements,
}: NotFormHeadTypes) => {
  const rows = [
    ...allSiteClients.map((cl) => {
      const clientAbonement = allAbonements.find((ab) => ab.name === cl.name);
      return {
        ...cl,
        clientAbonement: clientAbonement?.abonementDuration ?? 0,
      };
    }),
  ].sort((a, b) => a.clientAbonement - b.clientAbonement);
  const [inputValue, setInputValue] = useState<string>("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const onCheckBoxChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    onSelectClientForSendNotification(name);
  };

  return (
    <TableContainer component={Paper}>
      <Typography
        variant="h4"
        color="info"
        sx={{ marginBottom: { xs: "1hv", md: "1rem" } }}
      >
        Type to find client
      </Typography>
      <TextField
        type="text"
        value={inputValue}
        onChange={onChangeHandler}
        sx={{ marginBottom: { xs: "1hv", md: "1rem" } }}
        fullWidth
      />

      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Checked</TableCell>
            <TableCell align="left">№</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Visits remaining</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedRows.map((row, ind) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) => onCheckBoxChange(e, row.name)}
                        checked={selectedClients.includes(row.name)}
                        sx={{
                          "&.Mui-checked": {
                            color: "white",
                            backgroundColor: "var(--blue)",
                          },
                        }}
                      />
                    }
                    label=""
                  />
                </FormGroup>
              </TableCell>
              <TableCell align="left">{page * rowsPerPage + ind + 1}</TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.clientAbonement}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={filteredRows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10]}
      />
    </TableContainer>
  );
};

export default NotificationFormHeader;
