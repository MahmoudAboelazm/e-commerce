import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { rootReducer } from "../../../redux-state/configure-store";
import { useStyles } from "../styles";

export const Filter = () => {
  const orderByPrice = useSelector(
    (state: ReturnType<typeof rootReducer>) => state.products.orderByPrice,
  );
  const classes = useStyles();
  const router = useRouter();
  let sorting = orderByPrice || "default";

  const [open, setOpen] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    let value =
      event.target.value === "DESC" || event.target.value === "ASC"
        ? event.target.value
        : null;
    router.push({
      query: {
        ...router.query,
        p: value,
      },
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Filter</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={sorting}
          onChange={handleChange}
        >
          <MenuItem value={"default"}>
            <em>Default sorting</em>
          </MenuItem>
          <MenuItem value={"ASC"}>Sort by price: low to high</MenuItem>
          <MenuItem value={"DESC"}>Sort by price: high to low</MenuItem>
          <MenuItem value={"latest"}>Sort by latest</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
