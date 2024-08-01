"use client";
import { externalImageLoader } from "@/app/lib/data";
import { handleBrokenImg } from "@/app/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function PastOrderInfo(props) {
  const { itemList, cancelOrder } = props;
  return (
    <>
      {itemList?.length > 0
        ? itemList.map((item, index) => (
            <div key={index} className="sm:grid grid-cols-3 mt-10">
              <div className="sm:flex items-start gap-2 col-span-2">
                <div className="sm:w-[25rem] mb-3">
                  <Image
                    src={`${item.image}`}
                    loader={externalImageLoader}
                    onError={handleBrokenImg}
                    width={150}
                    height={100}
                    alt="product"
                  />
                </div>
                <div>
                  <p className="text-[#F24E1E] text-xl font-semibold mb-3">
                    Order ID: #78464748557
                  </p>
                  <p>{item.created_date}</p>
                  <p>{item.product_name}</p>
                  <p className="text-sm text-[#b1b1b1]">
                    {item.total_sale_price}
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <Link href="#" className="flex gap-2 justify-end items-center">
                  Download Invoice{" "}
                  <Image
                    src="/icons/file-download.png"
                    width={50}
                    height={100}
                    alt=""
                  />
                </Link>
              </div>
            </div>
          ))
        : null}
    </>
  );
}

export default PastOrderInfo;
