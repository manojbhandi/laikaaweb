import Link from "next/link";
import CartItem from "./cart-item";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { useEffect, useState } from "react";
import { postData } from "@/app/lib/api";
import {
  addItemsToCart,
  getCartItemsList,
  getSavedAddresses,
  removeAItemFromCart,
  removeCartItem,
} from "@/app/lib/endpoints";
import {
  fetchStart as commonFetchStart,
  fetchSuccess as commonFetchSuccess,
} from "@/app/ui/slice";
import {
  fetchStart as adressFetchStart,
  fetchSuccess as addressFetchSuccess,
  fetchFailure as addressFecthFailure,
} from "@/app/save-address/slice";
import { fetchFailure, fetchStart, fetchSuccess } from "./slice";
import { enqueueSnackbar } from "notistack";
import Image from "next/image";
import { callCheckout } from "@/app/lib/api_checkout";
import { useRouter } from "next/navigation";
import { routes } from "@/app/lib/routes";
import { getPrimaryAddress } from "@/app/lib/utils";

export default function CartItems() {
  const router = useRouter();
  const { cartList } = useAppSelector((state) => state.productById);
  const { checkout } = useAppSelector((state) => state.commonSlice);
  const [totalDiscountedValue, setTotalDiscountValue] = useState(0.0);
  const [totalMrp, setTotalMrp] = useState(0.0);
  const [totalPaybleAmount, setTotalPaybleAmount] = useState(0.0);
  const [payMode, setPayMode] = useState("");
  const [gstAmount, setGstAmount] = useState(0.0);
  const [primaryAddress, setPrimaryAddress] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState();

  const dispatch = useAppDispatch();
  let USER_DATA = {};
  if (typeof window !== "undefined") {
    USER_DATA = JSON.parse(localStorage.getItem("loginData"));
  }

  const getCartItems = async () => {
    const key = "cartList";
    const data = {
      user_id: USER_DATA?.data?.userid,
      limit: 0,
    };
    const headers = {
      "Content-Type": "application/json",
      sessionkey: USER_DATA?.data?.session_key,
    };
    dispatch(fetchStart(key));
    try {
      const res = await postData(getCartItemsList, data, headers);

      dispatch(fetchSuccess({ key, data: res?.data }));
    } catch (error) {
      dispatch(fetchFailure({ key, error: error?.message }));
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const callRemoveOneItemFromCart = async (productId, cartId) => {
    const key = "removeOneItemFromCart";
    const data = {
      user_id: USER_DATA?.data.userid,
      product_id: productId,
      cart_id: cartId,
    };
    const headers = {
      "Content-Type": "application/json",
      sessionkey: USER_DATA?.data?.session_key,
    };
    dispatch(fetchStart(key));
    try {
      const res = await postData(removeAItemFromCart, data, headers);

      dispatch(fetchSuccess({ key, data: res?.data }));
      // if(res.code==200){
      //   enqueueSnackbar(res.message, {variant:'success'})
      // }else{
      //   enqueueSnackbar(res.message, {variant:'error'})
      // }
    } catch (error) {
      dispatch(fetchFailure({ key, error: error?.message }));
      enqueueSnackbar(error.message, { variant: "error" });
    }
    getCartItems();
  };

  const callRemoveCartItem = async (productId, cartId) => {
    const key = "removeCartItems";
    const data = {
      user_id: USER_DATA?.data.userid,
      product_id: productId,
      cart_id: cartId,
    };
    const headers = {
      "Content-Type": "application/json",
      sessionkey: USER_DATA?.data?.session_key,
    };
    dispatch(fetchStart(key));
    try {
      const res = await postData(removeCartItem, data, headers);
      dispatch(fetchSuccess({ key, data: res?.data }));
      // if(res.code==200){
      //   enqueueSnackbar(res.message, {variant:'success'})
      // }else{
      //   enqueueSnackbar(res.message, {variant:'error'})
      // }
    } catch (error) {
      dispatch(fetchFailure({ key, error: error?.message }));
      enqueueSnackbar(error.message, { variant: "error" });
    }
    getCartItems();
  };

  const callAddItemToCart = async (productId, quantity) => {
    const key = "addItemsToCart";
    const data = {
      user_id: USER_DATA?.data?.userid,
      product_id: productId,
      qty: quantity,
      price_qty: 0,
      price_unit_name: "",
    };
    const headers = {
      "Content-Type": "application/json",
      sessionkey: USER_DATA?.data?.session_key,
    };
    dispatch(fetchStart(key));
    try {
      const res = await postData(addItemsToCart, data, headers);

      dispatch(fetchSuccess({ key, data: res?.data }));
      // if(res.code==200){
      //   enqueueSnackbar(res.message, {variant:'success'})
      // }else{
      //   enqueueSnackbar(res.message, {variant:'error'})
      // }
    } catch (error) {
      dispatch(fetchFailure({ key, error: error?.message }));
      enqueueSnackbar(error.message, { variant: "error" });
    }
    getCartItems();
  };
  const getAddresses = async () => {
    let key = "savedAddress";
    dispatch(adressFetchStart(key));
    const headers = {
      "Content-Type": "application/json",
      sessionkey: USER_DATA?.data?.session_key,
    };
    const data = {
      user_id: USER_DATA?.data?.userid,
    };
    try {
      const res = await postData(getSavedAddresses, data, headers);
      const pAddress = getPrimaryAddress(res?.data);
      pAddress?.length > 0 && setSelectedAddressId(pAddress[0]?.id);
      setPrimaryAddress(res?.data);
      dispatch(addressFetchSuccess({ key, data: res?.data }));
    } catch (error) {
      dispatch(addressFecthFailure({ key, error: error?.message }));
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  useEffect(() => {
    getCartItems();
    getAddresses();
  }, []);
  useEffect(() => {
    calculateTotalBagValue();
    calculateTotalDiscountedValue();
    calculateGst();
    calcualateTotalPayable();
  }, [dispatch, cartList]);
  function calculateTotalBagValue() {
    if (cartList.data && cartList.data.length > 0) {
      const val = cartList.data.reduce((total, item) => {
        const totalPrice = parseFloat(item.product_price) * item.qty;
        return total + totalPrice;
      }, 0);
      setTotalMrp(parseFloat(val).toFixed(2));
      return val.toFixed(2);
    }
    return "0.00";
  }
  function calculateTotalDiscountedValue() {
    if (cartList.data && cartList.data.length > 0) {
      const val = cartList.data.reduce((total, item) => {
        const totalPrice =
          parseFloat(item.product_price) -
          parseFloat(item.discount_price) * item.qty;
        return total + totalPrice;
      }, 0);
      setTotalDiscountValue(val.toFixed(2));
      return val.toFixed(2);
    }
    return "0.00";
  }
  function calculateGst() {
    const payablePrice = calculateTotalDiscountedValue();
    let gstValue = null;
    if (cartList.data && cartList.data.length > 0) {
      gstValue = (
        payablePrice *
        (parseFloat(cartList.data[0].gst_rate) / 100)
      ).toFixed(2);
      setGstAmount(gstValue);
      return gstValue;
    }
    return "0.00";
  }
  function calcualateTotalPayable() {
    const totalPayable = (
      parseFloat(totalDiscountedValue) + parseFloat(gstAmount)
    ).toFixed(2);
    setTotalPaybleAmount(totalPayable);
  }

  async function proceedToCheckoutApiCall() {
    let cartData = [];
    if (cartList.data?.length > 0) {
      cartData = cartList.data.map((item) => ({
        product_id: item.product_id,
        sale_price: item.product_price - item.discount_price,
        mrp_price: item.product_price,
        sale_unit: item.qty,
        qty: cartList.data.reduce(
          (initialValue, item) => initialValue + parseInt(item.qty),
          0
        ),
        total_mrp_price: totalMrp,
        total_sale_price: totalDiscountedValue,
        discount_amount: totalMrp - totalDiscountedValue,
      }));
    }

    // cartData = {
    //   ...cartData,
    //   qty: cartList.data.reduce(
    //     (initialValue, item) => initialValue + parseInt(item.qty),
    //     0
    //   ),
    //   total_mrp_price: totalMrp,
    //   total_sale_price: totalDiscountedValue,
    //   discount_amount: totalMrp - totalDiscountedValue,
    // };
    let paymentData = {
      qty: cartData.qty,
      paid_amount: totalPaybleAmount,
      discount_amount: totalMrp - totalDiscountedValue,
      gross_amount: totalMrp,
      promo_amount: 0,
      total_discount: totalMrp - totalDiscountedValue,
      promo_code: "",
      pay_mode: "Online",
      address_id: selectedAddressId,
      gst_amount: gstAmount,
      type: "web",
      redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}${routes.userInfo.yourOrders}`,
      payment_info: {
        pay_gateway_name: "instamojo",
        pay_status: "",
        txn_id: "",
      },
    };
    const key = "checkout";
    dispatch(commonFetchStart(key));
    const res = await callCheckout(cartData, paymentData);
    dispatch(commonFetchSuccess({ key, data: res?.data }));
    if (res.code == 200) {
      if (res.data?.payment_response?.length > 0) {
        const redirectUrl =
          res.data.payment_response[0].payment_request.longurl;
        router.push(redirectUrl);
      }
    } else {
      enqueueSnackbar("Internal Server Error", { variant: "error" });
    }
  }

  return (
    <div>
      {cartList.data?.length > 0 ? (
        <div className="">
          <div>
            {cartList.data.map((item, i) => {
              return (
                <CartItem
                  key={i}
                  item={item}
                  callRemoveOneItemFromCart={callRemoveOneItemFromCart}
                  callAddItemToCart={callAddItemToCart}
                  removeCartItem={callRemoveCartItem}
                />
              );
            })}
          </div>
          {/* <div className="p-3 mt-2">
            <div>
              <div className="mb-1">
                <span className="text-sm text-[#F24E1E]">Apply Promocode</span>
              </div>
              <div className="flex items-center justify-between gap-2 ">
                <input className="bg-orange-100 px-2 py-2 w-full focus:outline-none  border-[1px] border-[#F24E1E] rounded "></input>
                <button className="bg-[#F24E1E] px-8 py-2 rounded text-white">
                  Apply
                </button>
              </div>
            </div>
            <div className="flex justify-end mt-1">
              <Link href="#" className="text-[12px] text-[#F24E1E]">
                View Promocode
              </Link>
            </div>
          </div> */}
          <div className="bg-[#F8F8F8] px-3 py-3 my-5">
            <div className="mb-3">
              <p className="text-[#F24E1E] font-bold">ITEM TOTAL</p>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <p className="font-medium text-[14px]">Bag Price:</p>
                <p className="font-medium text-[14px]">&#8377;{totalMrp}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium text-[14px]">Discounted Price:</p>
                <p className="font-medium text-[14px]">
                  &#8377;{totalDiscountedValue}
                </p>
              </div>
              {/* <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <p className="font-medium text-[14px]">Promocode: </p>
                  <div>
                    <span className="text-[11px] text-[#F24E1E]">
                      LAUNCHPROMO{" "}
                    </span>
                    <HighlightOffIcon className="text-[13px] text-[#F24E1E] cursor-pointer" />
                  </div>
                </div>
                <p className="font-medium text-[14px] text-[#F24E1E]">
                  - &#8377;125.00
                </p>
              </div> */}
              <div className="py-3">
                <hr />
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium text-[14px]">Total Price:</p>
                <p className="font-medium text-[14px]">
                  &#8377;{totalDiscountedValue}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium text-[14px]">GST (18%):</p>
                <p className="font-medium text-[14px]">&#8377;{gstAmount}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium text-[14px] text-[#20923F]">
                  Total Payable:
                </p>
                <p className="font-medium text-[14px] text-[#20923F]">
                  &#8377;{totalPaybleAmount}
                </p>
              </div>
            </div>
          </div>
          <div className="px-3 py-10 bg-[#F8F8F8]">
            <div className="flex justify-between items-center mb-5">
              <p className="text-[14px]">SELECT DELIVERY ADDRESS</p>
              {/* <Link href="#" className="text-[12px] bg-[#F24E1E] hover:bg-[#f24f1ed6] px-2 py-1 rounded-full text-[#fff]">Change Address</Link> */}
              <Button className="text-[#F24E1E] font-semibold">
                <Link href="/add-address">Change Address</Link>
              </Button>
            </div>

            {primaryAddress?.length > 0
              ? primaryAddress.map((item, i) => (
                  <div className="flex items-center gap-3 py-1" key={i}>
                    {/* <input
                id="filter-mobile-color-1"
                name="color[]"
                value="beige"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                for="filter-mobile-color-1"
                className="ml-3 min-w-0 flex-1 text-gray-500"
              >
                22/263, Jodhpur Park, Tagore park Road, Kolkata. Pin- 700045
                Landmark: South City Mall
              </label> */}
                    <input
                      id="filter-mobile-color-1"
                      name="color[]"
                      value={item.id}
                      onChange={(e) => setSelectedAddressId(e.target.value)}
                      checked={selectedAddressId === item.id}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />

                    <div className="flex flex-col">
                      <h6 className="text-l font-bold">
                        {item.fullname},&nbsp;
                        <span className="text-l font-normal ">
                          {item.mobile}
                        </span>
                      </h6>
                      <h6 className="text-l ">{item.address1}</h6>
                      <p className="line-clamp-3">
                        <span>{item.address2},</span>{" "}
                        <span>
                          {item.city} - {item.pincode}
                        </span>
                      </p>
                    </div>
                  </div>
                ))
              : null}
          </div>
          <div className="bg-[#F24E1E] px-3 py-4 flex justify-between items-center sticky bottom-0">
            <div>
              <p className="font-medium text-white text-lg">
                &#8377;{totalPaybleAmount}/-
              </p>
              <p className="text-white text-sm font-thin">Payable Amount</p>
            </div>
            <button
              className="py-2 px-8 bg-white rounded-sm text-[#F24E1E]"
              onClick={proceedToCheckoutApiCall}
            >
              Proceed To Pay
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center font-medium h-[75vh]">
          <div>
            <Image src="/icons/cart.gif" width={250} height={250} alt="" />
            <div>
              <h1 className="text-center">Empty Cart</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
