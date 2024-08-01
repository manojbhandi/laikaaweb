"use client";
import { enqueueSnackbar } from "notistack";
import { postData } from "../lib/api";
import AddressSaved from "./AddressSaved";
import { fetchFailure, fetchStart, fetchSuccess } from "./slice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { useEffect } from "react";
import { getAddresses, getSavedAddresses } from "../lib/endpoints";

export default function Page() {
  const dispatch = useAppDispatch();
  const { savedAddress } = useAppSelector((state) => state.savedAdresses);
  let USER_DATA = {};
  if (typeof window !== "undefined") {
    USER_DATA = JSON.parse(localStorage.getItem("loginData"));
    // dispatch(loginFetchSuccess({ key, data: USER_DATA }));
  }
  useEffect(() => {
    let key = "savedAddress";
    const headers = {
      "Content-Type": "application/json",
      sessionkey: USER_DATA?.data?.session_key,
    };
    const updateData = async () => {
      dispatch(fetchStart(key));
      const data = {
        user_id: USER_DATA?.data?.userid,
      };
      try {
        const res = await postData(getSavedAddresses, data, headers);
        dispatch(fetchSuccess({ key, data: res?.data }));
      } catch (error) {
        dispatch(fetchFailure({ key, error: error?.message }));
        enqueueSnackbar(error.message, { variant: "error" });
      }
    };
    updateData();
  }, []);
  return (
    <main>
      <div>{<AddressSaved />}</div>
    </main>
  );
}
