import { productData2 } from "../lib/data";
import ProductsCard from "../ui/products-card";

export default function DisplayCollections() {
  return (
    <div className="flex flex-wrap gap-2 md:gap-3 w-full items-center justify-center">
    {/* <div className="grid grid-cols-6 gap-4 w-full"> */}
      {productData2.map((ele, i) => {
        return (
          <div className="p-1" key={i}>
            <ProductsCard
                 id={11}
                img={ele.img}
                title={`Lipstick - ${i+1}`}
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
