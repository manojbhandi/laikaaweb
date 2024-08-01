import { enqueueSnackbar } from "notistack";
import { useAppDispatch } from "./hooks";
import { postData } from "./api";

const { getCartItemsList } = require("./endpoints");

export const callGetCartItemsApi = async () => {
  let USER_DATA;
  if (typeof window !== undefined) {
    USER_DATA = JSON.parse(localStorage.getItem("loginData"));
  }

  const key = "cartList";
  const data = {
    user_id: USER_DATA?.data?.userid,
    limit: 0,
  };
  const headers = {
    "Content-Type": "application/json",
    sessionkey: USER_DATA?.data?.session_key,
  };
  let res = {};
  try {
    return await postData(getCartItemsList, data, headers);
  } catch (error) {
    // dispatch(fetchFailure({ key, error: error?.message }));
    enqueueSnackbar(error.message, { variant: "error" });
    return error;
  }
};
