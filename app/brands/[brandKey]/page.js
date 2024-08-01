"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchFailure, fetchStart, fetchSuccess } from "./slice";
import { postData } from "@/app/lib/api";
import { getAllProducts, getAllProductsByBrandKey } from "@/app/lib/endpoints";
import ProductsCard from "@/app/ui/products-card";
import { enqueueSnackbar } from "notistack";
import Filters from '../../ui/filter'
import { ProductById } from "@/app/ui/skeleton";

function ProductsByBrandKey({ params }) {
  const { brandKey } = params;
  const dispatch = useAppDispatch();

  const { productsByBrand } = useAppSelector((state) => state.productsByBrand);
  const fetchData = async (customData = {}, sortData = {}) => {
    let key = "productsByBrand";

    const data = {
      filter: {
        ...customData,
        brandkey: [brandKey],
        // categorykey: selectedCategories,
        // product_price: selectedPriceRange
      },
      sort: {
        ...sortData,
      },
      page: 1,
      limit: 100,
    };
    dispatch(fetchStart(key));
    try {
      const response = await postData(getAllProducts, data);
      
      dispatch(fetchSuccess({ key, data: response?.data }));
    } catch (e) {
      dispatch(fetchFailure({ key, error: e?.message }));
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  useEffect(() => {
    let key = "productsByBrand";
    // const fetchData = async () => {
      
    //   dispatch(fetchStart(key));
    //   try {
    //     let response = {};
    //     response = await postData(getAllProducts, {
    //       brandkey: `${brandKey}`,
    //     });
    //     dispatch(fetchSuccess({ key, data: response?.data }));
    //   } catch (e) {
    //     dispatch(fetchFailure({ key, error: e?.message }));
    //     enqueueSnackbar(e.message, { variant: "error" });
    //   }
    // };
    fetchData();
  }, [dispatch, brandKey]);

 /*  if(productsByBrand.loading){
    return(
      <ProductById/>
    )
  } */
  return (
    <div className="sm:grid sm:grid-cols-6 px-3 py-8">
      <div className="col-span-2 lg:col-span-1  hidden sm:block">
        <Filters
          // brands={uniqueBrands}
          hideBrands={true}
          // priceIntervals={priceIntervals}
          fetchData={fetchData}
        />
      </div>
      <div className="col-span-4 lg:col-span-5 ">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
          {/* <div className="grid grid-cols-6 gap-4 w-full"> */}
          {productsByBrand.data?.length > 0 &&
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
            })}
        </div>
      </div>
    </div>
  );
}

export default ProductsByBrandKey;
