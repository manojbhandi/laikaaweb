"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchFailure, fetchStart, fetchSuccess } from "../[id]/slice";
import { postData } from "@/app/lib/api";
import { getAllProductsByBrandKey } from "@/app/lib/endpoints";
import ProductsCard from "@/app/ui/products-card";

function ProductById({ params }) {
  const { brandKey } = params;
  const dispatch = useAppDispatch();

  const { productById } = useAppSelector((state) => state.productById);
  useEffect(() => {
    let key = "productById";
    const fetchData = async () => {
      dispatch(fetchStart(key));
      try {
        let response = {};
        response = await postData(getAllProductsByBrandKey, {
          brandkey: `${brandKey}`,
        });
        dispatch(fetchSuccess({ key, data: response?.data }));
      } catch (e) {
        dispatch(fetchFailure({ key, error: e?.message }));
      }
    };
    fetchData();
  }, [dispatch]);
  return (
    <div className="flex flex-wrap gap-2 md:gap-3 w-full items-center justify-center">
      {/* <div className="grid grid-cols-6 gap-4 w-full"> */}
      {productById.data?.length > 0 &&
        productById.data.map((ele, i) => {
          return (
            <div className="p-1" key={i}>
              <ProductsCard
                img={ele.image}
                title={`Lipstick - ${i + 1}`}
                desc={ele.desc}
                price={ele.price}
                discount={ele.discount}
              />
            </div>
          );
        })}
    </div>
  );
}

export default ProductById;
