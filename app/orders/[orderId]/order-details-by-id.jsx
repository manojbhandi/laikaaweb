"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import BillingInfo from "./atoms/billing-info";
import PastOrderInfo from "./atoms/past-order-info";
import LaikaaFeatures from "@/app/ui/laikaa-features";
import FroudAlert from "@/app/ui/froud-alert";
import { fetchFailure, fetchStart, fetchSuccess } from "../slice";
import {
  cancelOrderById,
  getOrderDetailsByOrdersId,
} from "@/app/lib/endpoints";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { postData } from "@/app/lib/api";
import { enqueueSnackbar } from "notistack";
import { Button } from "@mui/material";

function OrderDetailsByOrderId({ params }) {
  const dispatch = useAppDispatch();

  const { orderDetailsById, cancelOrder } = useAppSelector(
    (state) => state.ordersPlaced
  );
  let USER_DATA;
  if (typeof window !== "undefined" && localStorage.getItem("loginData")) {
    USER_DATA = JSON.parse(localStorage.getItem("loginData"));
  }
  async function callCancelOrderById() {
    const key = "cancelOrder";
    dispatch(fetchStart(key));
    try {
      const header = {
        sessionkey: USER_DATA?.data?.session_key,
      };
      let response = {};
      response = await postData(
        cancelOrderById,
        {
          user_id: USER_DATA?.data?.userid,
          order_id: params.orderId,
          remarks:" "
        },
        header
      );
      if (response.code == 200) {
        enqueueSnackbar(response.message, { variant: "success" });
      }else{
        enqueueSnackbar(`${response.message ? response.message : "Something Went Wrong"}`, { variant: "error" });
      }
      dispatch(fetchSuccess({ key, data: response?.data }));
    } catch (e) {
      dispatch(fetchFailure({ key, error: e?.message }));
      enqueueSnackbar(e.message, { variant: "error" });
    }
  }
  async function fetchProduct() {
    const key = "orderDetailsById";
    dispatch(fetchStart(key));
    try {
      const header = {
        sessionkey: USER_DATA?.data?.session_key,
      };
      let response = {};
      response = await postData(
        getOrderDetailsByOrdersId,
        {
          user_id: USER_DATA?.data?.userid,
          order_id: params.orderId,
        },
        header
      );
      if (response.code !== 200) {
        enqueueSnackbar("Something Went Wrong", { variant: "error" });
      }
      dispatch(fetchSuccess({ key, data: response?.data }));
    } catch (e) {
      dispatch(fetchFailure({ key, error: e?.message }));
      enqueueSnackbar(e.message, { variant: "error" });
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [dispatch]);

  return (
    <div>
      <div className="container mx-auto px-5">
        <div className="my-5">
          <h2 className="text-2xl font-bold">
            <span className="underline underline-offset-8 decoration-[#BD00FF]">
              PAST
            </span>{" "}
            ORDERS
          </h2>
        </div>
        <div>
          <PastOrderInfo itemList={orderDetailsById?.data?.item_list}  cancelOrder={callCancelOrderById}/>
        </div>
        <div className="my-10">
          <button className="block m-auto border-2 border-slate-400 py-3 px-5 hover:bg-[#b1b1b13a]">
            WRITE A REVIEW
          </button>
        </div>
        <div>
          <BillingInfo
            paymentDetails={orderDetailsById?.data?.payment_details}
            address={orderDetailsById?.data?.address}
            orderDetails={orderDetailsById?.data?.order_details}
            callCancelOrderApi={cancelOrderById}
          />
        </div>
        <div className="bg-[#7877771a] p-3 mt-5 flex justify-center gap-3">
          <Button variant="contained" className="block border-2 border-slate-400 py-2 px-5 ">
            NEED HELP?
          </Button>
          <Button onClick={callCancelOrderById} variant="contained" color="error" className="block border-2 border-slate-400 py-2 px-5">
            Cancel
          </Button>
        </div>
        <div>
          <FroudAlert />
        </div>
        <div className="">
          <LaikaaFeatures />
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsByOrderId;
