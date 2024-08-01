"use client"
import CategoryWiseCollectionCard from "../atoms/category-collection-card";
import { useAppSelector } from "@/app/lib/hooks";

function CategoryCollection() {
  const {homeData} = useAppSelector((state)=>state.home)
  return (
    <div className="xl:flex justify-between container mx-auto px-5">
      <CategoryWiseCollectionCard
        collectionType={"SKIN CARE COLLECTIONS"}
        productData={homeData?.data?.product_and_categoy?.[1]}
        categoryKey={homeData?.data?.product_and_categoy?.[1].category_details.categorykey}
        loading = {homeData.loading}
      />
      <CategoryWiseCollectionCard
        collectionType={"LIP CARE COLLECTIONS"}
        productData={homeData?.data?.product_and_categoy?.[0]}
        categoryKey={homeData?.data?.product_and_categoy?.[0].category_details.categorykey}
        loading = {homeData.loading}
      />
    </div>
  );
}

export default CategoryCollection;
