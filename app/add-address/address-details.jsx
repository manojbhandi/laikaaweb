"use client";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import AddNewAddress from "./AddNewAddress";
import AddressCard from "./address-card";
import { postData } from "../lib/api";
import { fetchFailure, fetchStart, fetchSuccess } from "../save-address/slice";
import { enqueueSnackbar } from "notistack";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
  addNewAddress,
  getSavedAddresses,
  updateAddress,
} from "../lib/endpoints";
import { AddressListSkeleton } from "../ui/skeleton";

function AddressDetails() {
  const dispatch = useAppDispatch();
  const { savedAddress } = useAppSelector((state) => state.savedAdresses);
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  let USER_DATA = {};
  if (typeof window !== "undefined") {
    USER_DATA = JSON.parse(localStorage.getItem("loginData"));
    // dispatch(loginFetchSuccess({ key, data: USER_DATA }));
  }

  const callGetSavedAddressAPi = React.useCallback(async () => {
    let key = "savedAddress";
    const headers = {
      "Content-Type": "application/json",
      sessionkey: USER_DATA?.data?.session_key,
    };
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
  }, [dispatch]);
  React.useEffect(() => {
    callGetSavedAddressAPi();
  }, [callGetSavedAddressAPi, dispatch]);

  const callAddNewAddressApi = React.useCallback(
    async (requestData) => {
      const key = "addNewAddress";
      dispatch(fetchStart(key));
      const headers = {
        "Content-Type": "application/json",
        sessionkey: USER_DATA?.data?.session_key,
      };
      try {
        const res = await postData(addNewAddress, requestData, headers);
        dispatch(fetchSuccess({ key, data: res?.data }));
        enqueueSnackbar("Address saved successfully", { variant: "success" });
        callGetSavedAddressAPi();
        return res;
      } catch (error) {
        dispatch(fetchFailure({ key, error: error?.message }));
        enqueueSnackbar(error.message, { variant: "error" });
        return error;
      }
    },
    [dispatch]
  );
  const callEditAddressApi = React.useCallback(
    async (requestData) => {
      const key = "addNewAddress";
      dispatch(fetchStart(key));
      const headers = {
        "Content-Type": "application/json",
        sessionkey: USER_DATA?.data?.session_key,
      };
      try {
        const res = await postData(updateAddress, requestData, headers);
        dispatch(fetchSuccess({ key, data: res?.data }));
        enqueueSnackbar("Address saved successfully", { variant: "success" });
        callGetSavedAddressAPi();
        return res;
      } catch (error) {
        dispatch(fetchFailure({ key, error: error?.message }));
        enqueueSnackbar(error.message, { variant: "error" });
        return error;
      }
    },
    [dispatch]
  );

  if (savedAddress?.loading) {
    return <AddressListSkeleton />;
  }

  return (
    <div className="my-10">
      <div className="container mx-auto px-5">
        <div className="pt-5">
          <h2 className="text-2xl font-bold">
            <span className="underline underline-offset-8 decoration-[#F24E1E]">
              MANAGE
            </span>{" "}
            ADDRESS
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          <div>
            <button
              className="sm:h-[200px] w-[100%] hover:bg-[#e3e3e3] text-[#FE3358] text-xl font-semibold rounded-lg border-4 border-slate-300 border-dashed"
              onClick={toggleDrawer(true)}
            >
              Add New Address
            </button>
          </div>
          {savedAddress?.data?.length > 0 &&
            savedAddress.data.map((item, i) => (
              <AddressCard
                key={i}
                address={item}
                callEditAddressApi={callEditAddressApi}
              />
            ))}
        </div>
      </div>
      <style jsx>
        {`
          .css-1160xiw-MuiPaper-root-MuiDrawer-paper {
            max-width: 95%;
          }
          .css-4t3x6l-MuiPaper-root-MuiDrawer-paper {
            max-width: 90% !important;
            width: 500px;
          }
        `}
      </style>
      <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
        <AddNewAddress
          callAddNewAddressApi={callAddNewAddressApi}
          closeDrawer={toggleDrawer(false)}
        />
      </Drawer>
    </div>
  );
}

export default AddressDetails;
