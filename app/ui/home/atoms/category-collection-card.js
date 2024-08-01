import Link from "next/link";
import ProductsCard from "../../products-card";
/* import Sidebar from "../../sidebar/sidebar"; */
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { SkincareLipcare } from "../../skeleton";

export default function CategoryWiseCollectionCard(props) {
  const { collectionType, productData, categoryKey,loading } = props;
  if(loading){
    return (
      <div className="py-5">
        <div className="flex justify-between px-5 py-5">
          <h2 className="text-2xl font-semibold">
            <span className="underline underline-offset-8 decoration-[#BD00FF]">
              {collectionType
                .substring(0, collectionType.indexOf("CARE") - 1)
                .toUpperCase()}
            </span>
            CARE COLLECTIONS
          </h2>
          <div
            className="bg-[#F24E1E] text-white px-2 pb-2 pt-2 rounded-full"
          >
            <ArrowForwardIosIcon />
          </div>
        </div>
        <SkincareLipcare/>
      </div>
    )
  }
  
  return (
    <div className="py-5">
      <div className="flex justify-between px-5 py-5">
        <h2 className="text-2xl font-semibold">
          <span className="underline underline-offset-8 decoration-[#BD00FF]">
            {collectionType
              .substring(0, collectionType.indexOf("CARE") - 1)
              .toUpperCase()}
          </span>
          CARE COLLECTIONS
        </h2>
        <Link
          href={`/${categoryKey}`}
          className="bg-[#F24E1E] text-white px-2 pb-2 pt-2 rounded-full"
        >
          <ArrowForwardIosIcon />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-5">
        {/* <div className="flex flex-wrap flex-row my-5"> */}
        {productData?.products?.slice(0, 6).map((ele, i) => {
          return (
            <div className=" px-2" key={i}>
              <ProductsCard
                id={ele.id}
                img={ele.image}
                title={ele.product_name}
                desc={ele.product_description}
                price={ele.product_price}
                discount={ele.discount_price}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
