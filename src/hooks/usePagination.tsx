import { useState } from "react";

type UsePaginationProps = {
  data: unknown[];
  itemsPerPage: number;
};

type UsePaginationReturn = [
  number,
  number,
  number,
  number,
  (page: number) => void
];

const usePagination = ({
  data,
  itemsPerPage,
}: UsePaginationProps): UsePaginationReturn => {
  const totalPageCount = Math.ceil(data.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const indStart = (currentPage - 1) * itemsPerPage;
  const indEnd = currentPage * itemsPerPage;
  const onOpageChange = (page: number) => {
    setCurrentPage(page);
  };
  return [totalPageCount, currentPage, indStart, indEnd, onOpageChange];
};

export { usePagination };
