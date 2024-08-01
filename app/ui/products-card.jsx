import Image from "next/image";
import Link from "next/link";
import { externalImageLoader } from "../lib/data";
import { handleBrokenImg } from "../lib/utils";

function ProductsCard(props) {
  const {id} = props;

  
  
  return (
    <Link
      href={`/product/${id}`}
    >
      <div className="border-2 drop-shadow p-2 max-w-[95%] w-[210px] block mx-auto">
        <div>
          <Image onError={handleBrokenImg} loader={externalImageLoader} src={props.img} width={300} height={100} alt="" />
        </div>
        <div className="py-1">
          <div>
            <h6 className="text-[#F24E1E] font-semibold mb-0 line-clamp-2 h-11">
              {props.title}
            </h6>
          </div>
          <div className="mb-3">
            <p className="line-clamp-1">{props.desc}</p>
          </div>
          <div className="flex gap-3 ">
            <p className="text-xs text-[#F24E1E] font-semibold">
              {props.price}
            </p>
            <p className="text-xs line-through">{props.discount}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductsCard;
