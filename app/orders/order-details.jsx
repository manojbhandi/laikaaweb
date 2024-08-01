"use client";
import Image from "next/image";
import Link from "next/link";
import ProfileSidebar from "../ui/profile-sidebar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FroudAlert from "../ui/froud-alert";
import LaikaaFeatures from "../ui/laikaa-features";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { getAllOrders } from "../lib/endpoints";
import { fetchFailure, fetchStart, fetchSuccess } from "./slice";
import { postData } from "../lib/api";
import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { routes } from "../lib/routes";
import { externalImageLoader } from "../lib/data";
import { handleBrokenImg } from "../lib/utils";

function OrderDetails() {
  const { allOrdersPlaced } = useAppSelector((state) => state.ordersPlaced);
  const dispatch = useAppDispatch();
  let USER_DATA = {};
  if (typeof window !== "undefined" && localStorage.getItem("loginData")) {
    USER_DATA = JSON.parse(localStorage.getItem("loginData"));
  }
  const router = useRouter();

  const fetchOrders = useCallback( async()=> {
    const key = "allOrdersPlaced";
    const data = {
      user_id: USER_DATA?.data?.userid,
      status: "",
    };
    const headers = {
      "Content-Type": "application/json",
      sessionkey: USER_DATA?.data?.session_key,
      // "Access-Control-Allow-Headers":
      //   "append,delete,entries,foreach,get,has,keys,set,values,Authorization,sessionkey",
      //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      //   'Access-Control-Allow-Origin':'*'
    };
    dispatch(fetchStart(key));
    try {
      const res = await postData(getAllOrders, data, headers);
      // const processdData = processCartData(res?.data)
      dispatch(fetchSuccess({ key, data: res?.data }));
    } catch (error) {
      dispatch(fetchFailure({ key, error: error?.message }));
      enqueueSnackbar(error.message, { variant: "error" });
      router.push(`${routes.somethingWrong}`);
    }
  },[])

 
  useEffect(() => {
    fetchOrders();
  }, [dispatch, fetchOrders]);
  
  return (
    <div>
      <div className="container mx-auto px-5">
        <div className="md:grid md:grid-cols-8 gap-5">
          <div className="col-span-2">
            <ProfileSidebar />
          </div>
          <div className="col-span-6">
            <div className="mt-5">
              <h2 className="text-2xl font-bold">
                <span className="underline underline-offset-8 decoration-[#BD00FF]">
                  YOUR
                </span>{" "}
                ORDERS
              </h2>
            </div>
            {allOrdersPlaced?.data?.length > 0 &&
              allOrdersPlaced.data.map((ele, i) => {
                return (
                  <div
                    className="md:flex w-[100%] items-center border-b-2 border-slate-300 py-5"
                    key={i}
                  >
                    <div className="p-1 md:w-[180px]">
                      <Image
                        src={`${ele.thumbnail}`}
                        loader={externalImageLoader}
                        onError={handleBrokenImg}
                        width={150}
                        height={100}
                        alt=""
                      />
                    </div>
                    <div className="p-1 md:w-[600px]">
                      <div className="mb-3">
                        <h3 className="text-[#F24E1E] text-xl font-semibold">
                          Order ID: {ele.id}
                        </h3>
                      </div>
                      <div>
                        <p>
                          <span className="font-semibold">Product Name:</span>{" "}
                          {ele.product_name}
                        </p>
                        <p>
                          <span className="font-semibold">Items in Bag:</span>{" "}
                          {ele.total_products}
                        </p>
                      </div>
                      <div>
                        <p>{ele.desc}</p>
                      </div>
                    </div>
                    <div className="p-1 md:w-[180px]">
                      <p className="text-[#F24E1E] text-xl font-semibold mb-0">
                        ₹ {ele.paid_amount}
                      </p>
                    </div>
                    <div className="p-1 md:w-[180px]">
                      <p className="font-semibold">{ele.status}</p>
                    </div>
                    <div className="p-1 md:w-[80px]">
                      <Link
                        href={`/orders/${ele.id}`}
                        className="bg-[#F24E1E] text-white px-2 pb-3 pt-2 rounded-full"
                      >
                        <ArrowForwardIosIcon />
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div>
          <FroudAlert />
          <LaikaaFeatures />
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
