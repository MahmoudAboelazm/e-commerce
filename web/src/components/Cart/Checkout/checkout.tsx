import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Theme,
} from "@material-ui/core";

import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { rootReducer } from "../../../redux-state/configure-store";
import { useStyles } from "./styles";

interface CheckoutProps {
  nextStep: Function;
}

interface IFormInput {
  email: String;
  firstName: String;
  lastName: String;
  country: String;
  town: String;
  address: String;
  apartment: String;
  postcode: String;
  phone: number;
  seName: String;
  gender: String;
}
const Checkout: React.FC<CheckoutProps> = ({ nextStep }) => {
  const classes = useStyles();
  const cartItems = useSelector(
    (state: ReturnType<typeof rootReducer>) => state.cart,
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => {
    data ? nextStep() : "";
  };

  return (
    <>
      <Grid container>
        <Grid xs={12} item md={8}>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <TextField
              {...register("email", { required: true })}
              error={errors.email ? true : false}
              label="Email address *"
              variant="outlined"
              fullWidth
            />
            <div className={classes.formBlock}>
              <TextField
                {...register("firstName", { required: true })}
                error={errors.firstName ? true : false}
                label="First name *"
                variant="outlined"
                fullWidth
              />

              <TextField
                {...register("lastName", { required: true })}
                error={errors.lastName ? true : false}
                label="Last name *"
                variant="outlined"
                fullWidth
              />
            </div>
            <TextField
              {...register("country", { required: true })}
              error={errors.country ? true : false}
              select
              SelectProps={{
                native: true,
              }}
              variant="outlined"
              fullWidth
            >
              <option value="">Country</option>
              <option value="Egypt">Egypt</option>
            </TextField>
            <div className={classes.formBlock}>
              <TextField
                {...register("town", { required: true })}
                error={errors.town ? true : false}
                label="Town / City *"
                variant="outlined"
                fullWidth
              />
              <TextField
                {...register("address", { required: true })}
                error={errors.address ? true : false}
                label="Street address *"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className={classes.formBlock}>
              <TextField
                {...register("postcode", { required: true })}
                error={errors.postcode ? true : false}
                label="Postcode / ZIP *"
                variant="outlined"
                fullWidth
              />

              <TextField
                {...register("phone", { required: true })}
                error={errors.phone ? true : false}
                label="Phone *"
                variant="outlined"
                fullWidth
              />
            </div>
          </form>
        </Grid>
        <Grid xs={12} item md={4}>
          <TableContainer className={classes.table}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>PRODUCT</TableCell>
                  <TableCell align="right">SUBTOTAL</TableCell>
                </TableRow>
              </TableHead>
            </Table>
            {cartItems.list.map((item) => (
              <Table key={item.productId}>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {item.product.title} x {item.count}
                    </TableCell>
                    <TableCell align="right">
                      {item.product.price * item.count}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ))}
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Subtotal</TableCell>
                  <TableCell align="right">{cartItems.total}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Shipping </TableCell>
                  <TableCell align="right">
                    Enter your address to view shipping options.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell align="right">{cartItems.total}</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleSubmit(onSubmit)}
      >
        Payment
      </Button>
    </>
  );
};

export default Checkout;
