import { externalImageLoader } from "@/app/lib/data";
import { Button } from "@mui/material";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';

export default function CartItem(props) {


  const { item, callRemoveOneItemFromCart, callAddItemToCart, removeCartItem} = props;
  return (
    <div className="p-3 pb-3 border-b-[1px] border-black border-dotted">
      <div className="sm:flex justify-between items-start   w-full">
        <div>
          <Image
            loader={externalImageLoader}
            src={item?.image}
            height={100}
            width={100}
            alt="product-image"
            quality={100}
          />
        </div>

        <div className="flex justify-center flex-col">
          <div className="text-[#F24E1E]">
            <span>Recode</span>
          </div>
          <div>
            <p className="leading-3 text-base">
              {item.product_name.slice(0, 30)}
            </p>
          </div>
          <div>
            <p className="text-[#F24E1E] text-base font-medium">
              &#8377;{item.product_price - item.discount_price}
            </p>
          </div>
          <div className="flex sm:justify-between gap-3">
            <p className="text-xs">MRP &#8377;{item.product_price}</p>
            <span className="w-[1.5px] h-[15px] bg-[#F24E1E]"></span>
            <p className="text-xs text-green-500">
              {(item.discount_price / item.product_price) * 100 > 0
                ? `${(item.discount_price / item.product_price) * 100} % Off`
                : null}
            </p>
          </div>
        </div>

        <div>
          <div className="mb-1">
            <span className="text-sm font-medium">QTY</span>
          </div>
          <div className="mb-1">
            <button className="flex items-center cursor-default bg-orange-100 gap-3 rounded-xl px-2 border-[1px] border-[#F24E1E]">
              <p className="text-[#F24E1E] cursor-pointer" onClick={()=>callRemoveOneItemFromCart(item.product_id, item.cart_id)}>-</p>
              <p className="text-sm font-medium">{item.qty}</p>
              <p className="text-[#F24E1E] cursor-pointer " onClick={()=>callAddItemToCart(item.product_id, 1)}>+</p>
            </button>
          </div>
          <div>
            <p className="font-semibold">
              ₹ {parseFloat((item.product_price - item.discount_price) * item.qty).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <div>
        <Button className="text-[#F24E1E] font-bold block ms-auto" onClick={()=>removeCartItem(item.product_id, item.cart_id)}>
          <CloseIcon/> Remove
        </Button>
      </div>
    </div>
  );
}
