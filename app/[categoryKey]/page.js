"use client";
import { useEffect, useState } from "react";
import { postData } from "../lib/api";
import { getAllProducts, getAllProductsByCategoryKey } from "../lib/endpoints";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import ProductsCard from "../ui/products-card";
import { fetchFailure, fetchStart, fetchSuccess } from "./slice";
import Filters from "../ui/filter";
import { enqueueSnackbar } from "notistack";
import { getPriceIntervals, getUniqueBrands } from "../lib/utils";
import { Skeleton } from "@mui/material";

function Category({ params }) {
  const [uniqueBrands, setUniqueBrands] = useState([]);
  const [priceIntervals, setPriceIntervals] = useState([]);
  const { categoryKey } = params;
  const dispatch = useAppDispatch();

  const { productsByCategeory } = useAppSelector(
    (state) => state.productsByCat
  );
  const fetchData = async (customData = {}, sortData = {}) => {
    let key = "productsByCategeory";

    const data = {
      filter: {
        ...customData,
        categorykey: [categoryKey],
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
    fetchData();
  }, [dispatch]);

  // if (productsByCategeory?.loading) {
  //   return (
  //     <div className="sm:grid sm:grid-cols-6 px-3 py-8">
  //       <div className="col-span-2 lg:col-span-1  hidden sm:block">
  //         <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
  //         <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
  //       </div>
  //       <div className="col-span-4 lg:col-span-5 ">
  //         <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
  //           {[...Array(10)].map((_, i) => {
  //             return (
  //               <div className="p-1 " key={i}>
  //                 <Skeleton
  //                   animation="wave"
  //                   variant="rectangular"
  //                   className="max-w-[100%]"
  //                   height={180}
  //                 />
  //                 <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
  //                 <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
  //                 <Skeleton
  //                   variant="text"
  //                   width={50}
  //                   sx={{ fontSize: "1rem" }}
  //                 />
  //               </div>
  //             );
  //           })}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="sm:grid sm:grid-cols-6 px-3 py-8">
      <div className="col-span-2 lg:col-span-1  hidden sm:block">
        <Filters
          brands={uniqueBrands}
          hideCategory={true}
          priceIntervals={priceIntervals}
          fetchData={fetchData}
        />
      </div>
      <div className="col-span-4 lg:col-span-5 ">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
          {productsByCategeory.data?.length > 0 ? (
            productsByCategeory.data.map((ele, i) => {
              return (
                <div className="p-1 " key={i}>
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
            })
          ) : (
            <div>No Products Found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Category;
