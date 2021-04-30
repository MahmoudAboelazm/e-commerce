import { createStyles, makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { useRouter } from "next/dist/client/router";
import React from "react";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

interface PaginationProps {
  count: number;
  currentPage: number;
  productsQuantity: number;
}

const PaginationRounded: React.FC<PaginationProps> = ({
  count,
  currentPage,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const handleChange = (
    event: React.ChangeEvent<unknown>,
    pageNumber: number,
  ) => {
    if (currentPage === pageNumber) return;
    router.push({
      query: {
        ...router.query,
        page: pageNumber,
      },
    });
  };

  return (
    <div className={classes.root}>
      <Pagination
        count={count}
        shape="rounded"
        page={currentPage}
        onChange={handleChange}
      />
    </div>
  );
};
export default PaginationRounded;
