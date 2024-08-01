import { enqueueSnackbar } from "notistack";
import { useAppDispatch } from "./hooks";
import { postData } from "./api";

const { getCartItemsList, getCheckout } = require("./endpoints");

export const callCheckout = async (cartData, paymentData) => {
  let USER_DATA;
  if (typeof window !== undefined) {
    USER_DATA = JSON.parse(localStorage.getItem("loginData"));
  }

  const data = {
    cart: [...cartData],
    ...paymentData,
    user_id: USER_DATA?.data?.userid,
  };
  const headers = {
    "Content-Type": "application/json",
    sessionkey: USER_DATA?.data?.session_key,
  };
  let res = {};
  try {
    return (res = await postData(getCheckout, data, headers));
  } catch (error) {
    // dispatch(fetchFailure({ key, error: error?.message }));
    enqueueSnackbar(error.message, { variant: "error" });
    return error;
  }
};
