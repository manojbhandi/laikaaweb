"use client";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import ProductsCustomerReview from "./products-customer-review";
import SidebarModal from "../../ui/sidebar/sidebar";
import { useEffect, useRef, useState } from "react";
import CartDetails from "./cart-details";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchFailure, fetchStart, fetchSuccess } from "./slice";
import { postData } from "@/app/lib/api";
import { externalImageLoader } from "@/app/lib/data";
import {
  addItemsToCart,
  getCheckout,
  getProductById,
} from "@/app/lib/endpoints";
import { enqueueSnackbar } from "notistack";
import { Button, Drawer, Skeleton, TextField } from "@mui/material";
import { callGetCartItemsApi } from "@/app/lib/api_cart";
import { openModalLogin } from "@/app/ui/login-form/slice";
import { SingleProduct } from "@/app/ui/skeleton";
import { routes } from "@/app/lib/routes";
import { useRouter } from "next/navigation";
import { handleBrokenImg } from "@/app/lib/utils";

function ProductById(props) {
  const router = useRouter();
  const { id } = props;
  let USER_DATA = {};
  if (typeof window !== "undefined") {
    USER_DATA = JSON.parse(localStorage.getItem("loginData"));
  }

  const dispatch = useAppDispatch();
  const { productById } = useAppSelector((state) => state.productById);
  const { checkout } = useAppSelector((state) => state.commonSlice);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const sidebarRef = useRef(null);
  function handleClickOutSide(event) {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpenSidebar(false);
    }
  }

  const callAddItemToCart = async () => {
    if (typeof window !== "undefined") {
      USER_DATA = JSON.parse(localStorage.getItem("loginData"));
    }
  
    const key = "addItemsToCart";
    const data = {
      user_id: USER_DATA?.data?.userid,
      product_id: id,
      qty: 1,
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
      if (res.code == 200) {
        enqueueSnackbar(res.message, { variant: "success" });
      } else {
        enqueueSnackbar("You must login first", { variant: "warning" });
        dispatch(openModalLogin(true));
      }
    } catch (error) {
      dispatch(fetchFailure({ key, error: error?.message }));
      enqueueSnackbar(error.message, { variant: "error" });
      router.push(routes.somethingWrong);
    }
  };

  const callGetProductById = async () => {
    let key = "productById";
    dispatch(fetchStart(key));
    try {
      let response = {};
      response = await postData(getProductById, {
        product_id: `${id}`,
      });

      if (response.code !== 200) {
        enqueueSnackbar("Something Went Wrong", { variant: "error" });
      }
      dispatch(fetchSuccess({ key, data: response?.data }));
    } catch (e) {
      dispatch(fetchFailure({ key, error: e?.message }));
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  const handleAddToCart = async () => {
    callAddItemToCart();
    const key = "cartList";
    dispatch(fetchStart(key));
    const res = await callGetCartItemsApi();
   
    dispatch(fetchSuccess({ key, data: res?.data }));
  };

  const checkOut = async () => {
    let key = "checkout";
    dispatch(fetchStart(key));
    try {
      let response = {};
      response = await postData(getCheckout, {
        product_id: `${id}`,
      });
      dispatch(fetchSuccess({ key, data: response?.data }));
    } catch (e) {
      dispatch(fetchFailure({ key, error: e?.message }));
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };
  const toggleDrawer = (newOpen) => () => {
    setIsOpenSidebar(newOpen);
  };

  useEffect(() => {
    callGetProductById();
  }, [dispatch]);
  useEffect(() => {
    if (isOpenSidebar) {
      document.addEventListener("mousedown", handleClickOutSide);
    } else {
      document.removeEventListener("mousedown", handleClickOutSide);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [isOpenSidebar]);

  if(productById.loading){
    return(
      <SingleProduct/>
    )
  }

  return (
    <div>
      {productById?.data && (
        <div className="container mx-auto px-5">
          <div className="md:grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="col-span-6 my-5">
              <div>
                <Image
                  loader={externalImageLoader}
                  onError={handleBrokenImg}
                  src={
                    productById.data.image?.length > 0 &&
                    productById.data.image[0]
                  }
                  width={500}
                  height={500}
                  alt=""
                />
              </div>
            </div>
            <div className="col-span-6 my-5">
              <div>
                <div className="mb-2">
                  <h1 className="text-2xl text-[#F24E1E]">
                    {productById.data.product_name}
                  </h1>
                  <p>{productById.data.short_description}</p>
                </div>
                <div className="flex items-center gap-3 my-2">
                  <Rating
                    name="size-small"
                    defaultValue={2.5}
                    value={productById.data.total_star_ratting}
                    precision={0.5}
                    size="small"
                  />
                  <div className="text-[#b1b1b1]">|</div>
                  <p className="mb-0 text-[#535353]">
                    {productById.data.total_star_ratting}/5 ratings
                  </p>
                </div>
                <div className="my-2">
                  <p className="text-[#535353]">
                    {productById.data.product_description}
                  </p>
                </div>
                <div className="flex items-center gap-3 my-2">
                  <div>
                    <p className="text-2xl text-[#F24E1E]">
                      {productById.data.product_price}
                    </p>
                    <p className="text-[#535353]">inclusive of all taxes</p>
                  </div>
                  <div className="w-[1px] h-12 bg-[#F24E1E]"></div>
                  <div>
                    <p className="text-[#535353]">
                      MRP ₹{productById.data.product_price}
                    </p>
                    <p className="text-xl text-[#399E55]">
                      {productById.data.discount_off_inpercent}% Off
                    </p>
                  </div>
                </div>
                <div className="my-5">
                  <hr />
                </div>
                <div className="md:flex justify-between border-2 border-slate-300 rounded pt-3 px-3">
                  <div className="md:flex gap-3 md:text-start text-center pb-3">
                    <div>
                      <Image
                        className="block mx-auto"
                        src="/icons/delivery-parcel.png"
                        width={40}
                        height={40}
                        alt=""
                      />
                    </div>
                    <div>
                      <p className="text-[11px] mb-0">
                        Free Delivery on 999
                        <br />
                        or above purchase
                      </p>
                    </div>
                  </div>
                  <div className="w-[1px] h-10 bg-[#b1b1b1] hidden md:block"></div>
                  <div className="md:flex gap-3 md:text-start text-center pb-3">
                    <div>
                      <Image
                        className="block mx-auto"
                        src="/icons/timer.png"
                        width={30}
                        height={40}
                        alt=""
                      />
                    </div>
                    <div>
                      <p className="text-[11px] mb-0">
                        7 Days return &<br />
                        exchange policy
                      </p>
                    </div>
                  </div>
                  <div className="w-[1px] h-10 bg-[#b1b1b1] hidden md:block"></div>
                  <div className="md:flex gap-3 md:text-start text-center pb-3">
                    <div>
                      <Image
                        className="block mx-auto"
                        src="/icons/hand-money.png"
                        width={40}
                        height={40}
                        alt=""
                      />
                    </div>
                    <div>
                      <p className="text-[11px] mb-0">
                        Cash on Delivery
                        <br />
                        Available
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-5">
                  <div className="pb-3">
                    <p className="font-semibold">Check Delivery</p>
                  </div>
                  <div className="flex gap-3 max-w-[100%]">
                    <TextField
                      id="outlined-basic"
                      label="Pin Code"
                      variant="outlined"
                      size="small"
                    />
                    <button className="bg-[#F24E1E] px-5 text-white rounded hover:bg-[#f24f1ece]">
                      Check
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2">
            <div className="flex gap-3 justify-center">
              <div>
                <Button
                  className="bg-[#F24E1E] text-[#fff] hover:bg-[#f24f1eeb] border-[#F24E1E] px-8 py-2"
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </Button>
              </div>
              <div>
                <Button
                  variant="outlined"
                  className="text-[#F24E1E] border-[#F24E1E] hover:border-[#F24E1E] px-8 py-2 hover:bg-[#F24E1E] hover:text-[#fff]"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
          <div className="pt-5">
            <hr />
          </div>
          <div className="py-5">
            <div className="mb-5">
              <h2 className="font-bold text-xl">PRODUCT DETAILS</h2>
            </div>
            <div>
              <p className="mb-3 text-[#535353]">
                Major cult shades made mini. Ten hues, three textures. The
                iconic product that made M.A.C famous.
              </p>
              <p className="mb-3 text-[#535353]">
                Available in the below shared formulas:
              </p>
              <p className="mb-3 text-[#535353]">
                - Retro Matte: zero-shine matte finish- Matte: the original
                matte finish- Satin: velvet sheen finish
              </p>
              <p className="mb-3 text-[#535353]">
                Country of Origin: Belgium / Canada / Czech Republic / Dominican
                Republic / France / Germany / Italy / Japan / South Korea /
                Mexico / North Macedonia / Poland / Switzerland Major cult
                shades made mini. Ten hues, three textures. The iconic product
                that made M.A.C famous.
              </p>
            </div>
          </div>
          <div className="pb-5">
            <div className="md:flex justify-around border-2 border-slate-300 rounded pt-3 px-3">
              <div className="md:flex gap-3 items-center md:text-start text-center pb-3">
                <div>
                  <Image
                    className="block mx-auto"
                    src="/icons/certificate-badge.png"
                    width={60}
                    height={40}
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-[14px] mb-0">
                    Free Delivery on 999
                    <br />
                    or above purchase
                  </p>
                </div>
              </div>
              <div className="w-[1px] h-12 bg-[#b1b1b1] hidden md:block"></div>
              <div className="md:flex gap-3 items-center md:text-start text-center pb-3">
                <div>
                  <Image
                    className="block mx-auto"
                    src="/icons/security.png"
                    width={60}
                    height={40}
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-[14px] mb-0">
                    7 Days return &<br />
                    exchange policy
                  </p>
                </div>
              </div>
              <div className="w-[1px] h-12 bg-[#b1b1b1] hidden md:block"></div>
              <div className="md:flex gap-3 items-center md:text-start text-center pb-3">
                <div>
                  <Image
                    className="block mx-auto"
                    src="/icons/Vector.png"
                    width={60}
                    height={40}
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-[14px] mb-0">
                    Cash on Delivery
                    <br />
                    Available
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ProductsCustomerReview reviewArr={productById.data.review} />
          </div>
        </div>
      )}
      <div className="absolute">
        <Drawer
          open={isOpenSidebar}
          anchor="right"
          onClose={toggleDrawer(false)}
        >
          <CartDetails close={toggleDrawer(false)} />
        </Drawer>
      </div>
    </div>
  );
}

export default ProductById;
