import { ReactElement } from "react";
import { Typography } from "../Typography/Typography";
import tableStyles from "./table.module.css";

type TableTypes = {
  columsTitles: string[];
  tableData: any[];
  children?: ReactElement;
};

const Table = ({ columsTitles, tableData, children }: TableTypes) => {
  return (
    <table className={tableStyles.table}>
      <thead className={tableStyles.header}>
        <tr className={tableStyles.row}>
          {columsTitles.map((ct) => (
            <th key={ct} className={tableStyles.item}>
              <Typography type="span">{ct}</Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={tableStyles.tableBody}>
        {tableData.map((data) => (
          <th key={data} className={tableStyles.item}>
            <Typography type="span">{data}</Typography>
          </th>
        ))}
        <th className={tableStyles.item}>{children}</th>
      </tbody>
    </table>
  );
};

export default Table;
