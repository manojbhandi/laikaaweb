"use client";
import { useAppSelector } from "@/app/lib/hooks";
import EmblaCarousel from "../../embla-carousel/carousel";
import ProductCategoryCard from "../atoms/product-category-card";
import { Suspense } from "react";
import Skeleton, { ProductsSkeletonHome } from "../../skeleton";

const emblaContainer = {
  display: "flex",
  $justifyContent: "space-around",
  $alignItems: "flex-end",
  gap: "1rem",
  $userSelect: "none",
};
const autoplay = {
  flag: false,
  delay: null,
};
export default function ProductCategoryCards() {
  const { homeData } = useAppSelector((state) => state.home);
if(homeData?.loading){
  return(
    <ProductsSkeletonHome/>
  )
}

  return (
    // <Suspense fallback={<ProductsSkeletonHome/>}>
    <div>
      <EmblaCarousel
        isCardCarousel={true}
        autoplay={autoplay}
        isNextBtn={false}
        isPrevBtn={false}
        emblaContainer={emblaContainer}
        //  nextBtnStyle={nextBtnStyle}
        //  prevBtnStyle={prevBtnStyle}
        //  imageContainer={imageContainer}
      >
        {homeData.data?.category_list?.length > 0 &&
          homeData.data?.category_list.map((cat, i) => (
            <div key={i}>
              {/* <Suspense fallback={<Skeleton />}> */}
                <ProductCategoryCard
                  categoryKey={cat.categorykey}
                  image={cat.logo}
                  title={cat.category}
                />
              {/* </Suspense> */}
            </div>
          ))}
      </EmblaCarousel>
    </div>
    // </Suspense>
  );
}
