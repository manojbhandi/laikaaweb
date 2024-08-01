"use client";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import BrandCollectionCard from "../atoms/brands-collection-card";
import Link from "next/link";
import Skeleton, { BrandSkeleton, BrandsSkeletonHome,  } from "../../skeleton";

export default function BrandsSection() {
  const { brands, homeData } = useAppSelector((state) => state.home);
  const dispatch = useAppDispatch();

  if (homeData?.loading) {
    return <BrandsSkeletonHome />;
  }
  return (
    <div>
      <div className="brand-collection-card pt-3">
        <div className="container mx-auto px-3">
          <div className="pb-5">
            <h2 className="text-2xl font-semibold">
              <span className="underline u  nderline-offset-8 decoration-purple-400">
                BRANDS &
              </span>{" "}
              COLLECTIONS
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 px-5">
            {homeData.data?.brand_list?.length > 0 &&
              homeData.data.brand_list.slice(0, 5).map((ele, i) => {
                return (
                  <div className="mb-5 block m-auto" key={i}>

                      <BrandCollectionCard
                        brandKey={ele.brandkey}
                        img={ele.logo}
                      />
                    
                  </div>
                );
              })}

            <div className="bg-[#000000] rounded-lg flex justify-center">
              <Link
                href="/brand-collection"
                className="flex justify-center flex-col text-[#fff] text-[22px] font-semibold"
              >
                More Brands
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
