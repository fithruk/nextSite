import paginationStyles from "./pagination.module.css";
import { AppButton } from "../Button/Button";
import appButtonStyles from "../Button/button.module.css";

interface PaginationProps {
  totalPageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void; //
}

const Pagination: React.FC<PaginationProps> = ({
  totalPageCount,
  currentPage,
  onPageChange,
}) => {
  const maxVisibleButtons = 3;
  const displayedButtons = [];

  const startPage = Math.max(
    1,
    currentPage - Math.floor(maxVisibleButtons / 2)
  );
  const endPage = Math.min(totalPageCount, startPage + maxVisibleButtons - 1);

  for (let i = startPage; i <= endPage; i++) {
    displayedButtons.push(i);
  }

  return (
    <div className={paginationStyles.pagination}>
      <div className={paginationStyles.buttons}>
        {startPage > 1 && (
          <>
            <AppButton
              type="button"
              variant="pagination"
              onClick={() => onPageChange(1)}
            >
              1
            </AppButton>
            {startPage > 2 && (
              <AppButton type="button" variant="pagination" disabled>
                ...
              </AppButton>
            )}
          </>
        )}

        {displayedButtons.map((page) => {
          if (page === currentPage) {
            return (
              <AppButton
                key={page}
                type="button"
                variant="pagination"
                onClick={() => onPageChange(page as number)}
                classNames={appButtonStyles.paginationActive}
              >
                {page}
              </AppButton>
            );
          }
          return (
            <AppButton
              key={page}
              type="button"
              variant="pagination"
              onClick={() => onPageChange(page as number)}
            >
              {page}
            </AppButton>
          );
        })}

        {endPage < totalPageCount && (
          <>
            {endPage < totalPageCount - 1 && (
              <AppButton type="button" variant="pagination" disabled>
                ...
              </AppButton>
            )}
            <AppButton
              type="button"
              variant="pagination"
              onClick={() => onPageChange(totalPageCount as number)}
            >
              {totalPageCount}
            </AppButton>
          </>
        )}
      </div>
    </div>
  );
};

export default Pagination;
