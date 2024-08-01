"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CartDetails from "../product/[id]/cart-details";
import { Badge, Button, Drawer } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { openModalLogin } from "./login-form/slice";
import LoginModal from "./login-form/login-modal";
import SignupModal from "./login-form/signup-modal";
import { brands } from "../lib/data";
import { fetchFailure, fetchStart, fetchSuccess } from "./slice";
import { fetchSuccess as cartListFetchSuccess } from "../product/[id]/slice";
import { postData } from "../lib/api";
import { getAllProducts } from "../lib/endpoints";
import { enqueueSnackbar } from "notistack";
import { redirect, useRouter } from "next/navigation";
import { callGetCartItemsApi } from "../lib/api_cart";

export default function GlobalSearch() {
  const [searchText, setSearchText] = useState({ prodName: "", id: null });
  const [suggestions, setSuggestions] = useState([]);
  const [userData, setUserData] = useState();
  const dispatch = useAppDispatch();
  const suggestionBoxRef = useRef(null);
  const { searchRes } = useAppSelector((state) => state.commonSlice);
  const { cartList } = useAppSelector((state) => state.productById);
  const handleSetTrue = () => {
    dispatch(openModalLogin(true));
  };

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const handleClickOutside = (event) => {
    if (
      suggestionBoxRef.current &&
      !suggestionBoxRef.current.contains(event.target)
    ) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleDrawer = (newOpen) => () => {
    setIsOpenSidebar(newOpen);
  };

  const handleAddToCart = async () => {
    // callAddItemToCart();
    const key = "cartList";
    // dispatch(fetchStart(key));
    const res = await callGetCartItemsApi();
    
    dispatch(cartListFetchSuccess({ key, data: res?.data }));
  };
  useEffect(()=>{
    handleAddToCart();
  },[dispatch])
  async function fetchSearchResults() {
    let key = "searchRes";
    dispatch(fetchStart(key));
    const data = {
      searchTerms: searchText.prodName,
      page: 1,
      limit: 100,
    };
    try {
      const res = await postData(getAllProducts, data);

      dispatch(fetchSuccess({ key, data: res?.data }));
    } catch (e) {
      dispatch(fetchFailure({ key, error: e.message }));
      enqueueSnackbar(e.message, { variant: "error" });
    }
  }
  useEffect(() => {
    fetchSearchResults();
  }, [searchText]);
  function searchTermChangeHandler(value) {
    setSearchText((prevValue) => ({ ...prevValue, prodName: value }));
    if (value.length >= 0) {
      const filteredSuggestions =
        searchRes.data?.length > 0 &&
        searchRes.data
          .map((item) => ({
            prod_name: item.product_name,
            id: item.id,
          }))
          .filter((item) => {
            const regex = new RegExp(value, "gi");
            return regex.test(item.prod_name);
          });
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }

  const redirectToProductSearched = () => {
    if (searchText.id) {
      redirect(`/product/${searchText.id}`);
    }
  };

  const handleSuggestionClick = (value) => {
    setSearchText((prevValue) => ({ prodName: value.prod_name, id: value.id }));
    setSuggestions([]);
  };

  const { login } = useAppSelector((state) => state.authModal);

  let USER_DATA = {};
  useEffect(() => {
    USER_DATA = JSON.parse(localStorage.getItem("loginData"));
    setUserData(USER_DATA);
  }, [login]);
  

  return (
    <div className="relative">
      <div className="flex justify-between items-center w-full px-3 py-6 border-b-[1px] border-slate-300">
        <div>
          <Link href="/">
            <Image
              src="/laikaa-logo.png"
              width="100"
              height="20"
              alt="laikaa-logo"
            />
          </Link>
        </div>
        <div className="relative font-light md:w-1/2">
          <div className="hidden cursor-text md:flex justify-between font-light relative  ">
            <input
              id="global-search"
              name="global-search"
              type="text"
              placeholder="Search on Laikaa"
              value={searchText.prodName}
              className="w-full h-10 bg-slate-200 rounded-lg p-3"
              onChange={(e) => {
                searchTermChangeHandler(e.target.value);
              }}
              // onFocus={() => {
              //   setSuggestions(brands);
              // }}
              // onBlur={() => {
              //   setTimeout(() => {
              //     setSuggestions([]);
              //   }, 100);
              // }}
            />

            <button
              onClick={redirectToProductSearched}
              className="rounded-e-lg h-10  bg-black text-white flex justify-between items-center p-2 gap-2 absolute right-0"
            >
              <Image
                src="/icon-search.png"
                width="20"
                height="20"
                alt="search-icon"
                quality={100}
              />
              {/* <span>Search</span> */}
            </button>
          </div>
          {suggestions?.length > 0 && (
            <div
              ref={suggestionBoxRef}
              className=" z-40 w-full p-1 pb-2 md:flex rounded flex-col justify-between font-light absolute bg-slate-100  h-fit "
            >
              {suggestions.slice(0, 10).map((item, i) => (
                <Link  key={i} href={`/product/${item.id}`}>
                  <div
                    className="py-1 cursor-pointer z-[1000] hover:bg-red-500 rounded p-2"
                    key={"" + item.prod_name + i}
                    onClick={() => handleSuggestionClick(item)}
                  >
                    {item.prod_name}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-5">
          {
            userData?.data.is_logged_in == 1 ?  
            <Button className="text-black">
              <Link href="/personal-info">
                <div className="flex items-center gap-2">
                  <Image
                    src="/icon-user-profile.png"
                    height="20"
                    width="20"
                    quality={100}
                    alt="user-profile-icon"
                  />
                  <span>{userData?.data.fullname.split(' ')[0]}</span>
                </div>
              </Link>
            </Button> :
           <Button className="flex items-center gap-1" variant="" onClick={handleSetTrue}>
              <Image
                src="/icon-user-profile.png"
                height="20"
                width="20"
                quality={100}
                alt="user-profile-icon"
              /> <span>Login</span>
            </Button>
          }
          

          <Button
            variant=""
            className="flex items-center gap-1"
            role="button"
            onClick={() => setIsOpenSidebar(!isOpenSidebar)}
            key="isAuthModalOpen"
          >
            
                <Image
                  src="/icon-shopping-cart.png"
                  height="20"
                  width="20"
                  quality={100}
                  alt="shopping-cart-icon"
                />
            <Badge 
              badgeContent={cartList.data?.length} 
              color="primary" 
            >
              <span>Cart</span>
            </Badge>
          </Button>
          <div>
            <LoginModal />
            <SignupModal />
          </div>
        </div>
      </div>
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
