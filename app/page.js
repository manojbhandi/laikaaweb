"use client";
import Copyright from "./ui/copyright";
import Footer from "./ui/footer";
import GlobalSearch from "./ui/global-search";
import Header from "./ui/header";

import MainCarousel from "./ui/home/molecules/main-carousel";
import Product from "./ui/product";

import { enqueueSnackbar, useSnackbar } from "notistack";
import { useEffect } from "react";
import { postData } from "./lib/api";
import { categoryKey } from "./lib/data";
import { getHomeData } from "./lib/endpoints";
import { useAppDispatch, useAppSelector } from "./lib/hooks";
import AccessoriesSection from "./ui/home/molecules/accessories-section";
import BrandsSection from "./ui/home/molecules/brands-section";
import CategoryCollection from "./ui/home/molecules/category-collection";
import DisplayImage from "./ui/home/molecules/display-image";
import ProductCategoryCards from "./ui/home/molecules/product-category-cards";
import ProductsAdvtCarousel from "./ui/home/molecules/products-advt-carousel";
import { fetchFailure, fetchStart, fetchSuccess } from "./ui/home/slice";
import LaikaaFeatures from "./ui/laikaa-features";
import { useRouter } from "next/navigation";
import { routes } from "./lib/routes";
export default function Home() {
  const router = useRouter();
  const { homeData } = useAppSelector((state) => state.home);
  const dispatch = useAppDispatch();
  const key = "homeData";
  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchStart(key));
      try {
        const response = await postData(getHomeData);
        dispatch(fetchSuccess({ key, data: response?.data }));
      } catch (e) {
        enqueueSnackbar(e.message, { variant: "error" });
        dispatch(fetchFailure({ key, error: e?.message }));
        router.push(`${routes.somethingWrong}`)
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <main className="w-full overflow-hidden">
      <Header />
      <div className="w-full">
        <GlobalSearch />
        <ProductCategoryCards />
        <MainCarousel />
        <BrandsSection />
        <Product collectionType={categoryKey.lip.name} />
        <ProductsAdvtCarousel />
        <Product collectionType={categoryKey.hair.name} />
        <Product collectionType={categoryKey.nails.name} />
        <DisplayImage />
        <CategoryCollection />
        <AccessoriesSection />
        <Product collectionType={categoryKey.skin.name} />
        <LaikaaFeatures />
        <Footer />
        <Copyright />
      </div>
    </main>
  );
}
