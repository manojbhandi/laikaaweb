import Link from "next/link";
import EmblaCarousel from "./embla-carousel/carousel";
import NextBtn from "./nextbtn";
import ProductsCard from "./products-card";
import { categoryKey, productData } from "../lib/data";
import Sidebar from "./sidebar/sidebar";
import { useAppSelector } from "../lib/hooks";
import { useState } from "react";
import { ProductCollection } from "./skeleton";

const autoplay = {
  flag: false,
  delay: null,
};

const nextBtnStyle = {
  display: "flex",
  $justifyContent: "center",
  $alignItems: "center",
  width: "2rem",
  height: "4rem",
  background: "#F24E1E",
  $borderRadius: "150px 0px 0px 150px",
  position: "absolute",
  left: "",
  top: "8rem",
  right: "0",
  bottom: "220px",
  color: "#FFFF",
};
const prevBtnStyle = {
  display: "flex",
  $justifyContent: "center",
  $alignItems: "center",
  width: "2rem",
  height: "4rem",
  background: "#F24E1E",
  $borderRadius: "150px 150px 0px 0px",
  position: "absolute",
  left: "",
  top: "8rem",
  left: "0",
  bottom: "220px",
  color: "#FFFF",
};
const imageContainer = {
  display: "flex",
  $flexDirection: "row",
  $justifycContent: "center",
  $alignItems: "center",
  width: "100vw",
  height: "20rem",
};
function Product(props) {
  const [prodctArr, setProductArr] = useState([]);
  const { collectionType } = props;
  const { homeData } = useAppSelector((state) => state.home);

  const matchedKey = Object.values(categoryKey).find(
    (item) => item.name == collectionType
  ).key;
  let resArr = [];
  if (homeData.data?.product_and_categoy?.length > 0) {
    resArr = homeData.data?.product_and_categoy.reduce((tempArr, item) => {
      if (matchedKey == item?.category_details?.categorykey) {
        tempArr = item.products;
      }
      // setProductArr(tempArr);
      return tempArr;
    }, []);
  }

  if(homeData.loading){
    return (
      <div className="container mx-auto px-5">
         <div className="py-5">
          <h2 className="text-2xl font-semibold ms-5">
            <span className="underline underline-offset-8 decoration-[#F24E1E]">
              {collectionType}
            </span>{" "}
            COLLECTIONS
          </h2>
        </div>
       <ProductCollection/>
      </div>
    )
  }

  return (
    <div>
      <div className="container mx-auto px-5">
        <div className="py-5">
          <h2 className="text-2xl font-semibold ms-5">
            <span className="underline underline-offset-8 decoration-[#F24E1E]">
              {collectionType}
            </span>{" "}
            COLLECTIONS
          </h2>
        </div>
        <div style={{ width: "100%" }} className="flex relative">
          {/* <Link href='lipstick-collections'><NextBtn/></Link>  */}
          {/* <div className="grid grid-cols-6 md:grid-cols-12 gap-3 px-5"> */}
          <EmblaCarousel
            isCardCarousel={true}
            autoplay={autoplay}
            isNextBtn={true}
            isPrevBtn={true}
            nextBtnStyle={nextBtnStyle}
            prevBtnStyle={prevBtnStyle}
            imageContainer={imageContainer}
          >
            {resArr.map((ele, i) => {
              return (
                <div className="col-span-3 my-5" key={i}>
                  <ProductsCard
                    id={ele.id}
                    img={ele.image}
                    title={ele.product_name}
                    desc={ele.short_description}
                    price={ele.product_price - ele.discount_price}
                    discount={ele.product_price}
                  />
                </div>
              );
            })}
          </EmblaCarousel>
        </div>
      </div>
      <Sidebar />
    </div>
  );
}

export default Product;
