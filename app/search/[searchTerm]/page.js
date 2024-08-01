"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchFailure, fetchStart, fetchSuccess } from "./slice";
import { postData } from "@/app/lib/api";
import { getAllProductsByBrandKey } from "@/app/lib/endpoints";
import ProductsCard from "@/app/ui/products-card";
import { enqueueSnackbar } from "notistack";

function ProductsBySearchTerm({ params }) {
  const { searchTerm } = params;
  
  const dispatch = useAppDispatch();

  const {getProductById} = useAppSelector((state) => state.globalSearch);
  useEffect(() => {
    let key = "getProductById";
    const fetchData = async () => {
      dispatch(fetchStart(key));
      try {
        let response = {};
        response = await postData(getProductById, {
          product_id: `${searchTerm}`,
        });
        dispatch(fetchSuccess({ key, data: response?.data }));
      } catch (e) {
        dispatch(fetchFailure({ key, error: e?.message }));
        enqueueSnackbar(e.message,{ variant: 'error' })
      }
    };
    fetchData();
  }, [dispatch]);
  return (
    <div className="flex flex-wrap gap-2 md:gap-3 w-full items-center justify-center">
      {/* <div className="grid grid-cols-6 gap-4 w-full"> */}
      {/* {productsByBrand.data?.length > 0 &&
        productsByBrand.data.map((ele, i) => {
          return (
            <div className="p-1" key={i}>
              <ProductsCard
                id={ele.id}
                img={ele.image}
                title={ele.product_name}
                desc={ele.short_description}
                price={ele.product_price}
                discount={ele.discount_price}
              />
            </div>
          );
        })} */}
    </div>
  );
}

export default ProductsBySearchTerm;
