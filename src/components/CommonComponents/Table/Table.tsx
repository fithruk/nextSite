import { ReactNode } from "react";
import { Typography } from "../Typography/Typography";
import tableStyles from "./table.module.css";
import { UserExercisesSet } from "@/types/types";

type TableTypes = {
  columsTitles: string[];
  tableData: UserExercisesSet[];
  renderRemoveControllButton?: () => ReactNode;
  renderAddNewSetControll?: () => ReactNode;
};

const Table = ({
  columsTitles,
  tableData,
  renderAddNewSetControll,
  renderRemoveControllButton,
}: TableTypes) => {
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
        {tableData.map((data, ind) => (
          <tr key={ind} className={tableStyles.row}>
            <th className={tableStyles.item}>
              <Typography type="span">{data.weightOfload}</Typography>
            </th>
            <th className={tableStyles.item}>
              <Typography type="span">{data.numberOfReps}</Typography>
            </th>
            {renderRemoveControllButton && renderRemoveControllButton()}
          </tr>
        ))}

        {renderAddNewSetControll && renderAddNewSetControll()}
      </tbody>
    </table>
  );
};

export default Table;
