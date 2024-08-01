import { externalImageLoader } from "@/app/lib/data";
import { Rating } from "@mui/material";
import Image from "next/image";

function ProductsCustomerReview(props) {
  const { reviewArr } = props;
  const reviewData = [
    {
      id: 1,
      img: "/icons/account-circle.png",
      name: "Customer Name",
      desc: "Certified Buyer",
      review:
        "Ruby woo just name is enough beautiful lipstick nd ture matte and one i was disappointed with packaging i received it in a normal brown box ??? anyways tnx to Laikka for selling hyped products with trust. Ruby woo just name is enough beautiful lipstick nd ture matte and one i was disappointed with packaging i received it.",
    },
    {
      id: 2,
      img: "/icons/account-circle.png",
      name: "Customer Name",
      desc: "Certified Buyer",
      review:
        "Ruby woo just name is enough beautiful lipstick nd ture matte and one i was disappointed with packaging i received it in a normal brown box ??? anyways tnx to Laikka for selling hyped products with trust. Ruby woo just name is enough beautiful lipstick nd ture matte and one i was disappointed with packaging i received it.",
    },
    {
      id: 3,
      img: "/icons/account-circle.png",
      name: "Customer Name",
      desc: "Certified Buyer",
      review:
        "Ruby woo just name is enough beautiful lipstick nd ture matte and one i was disappointed with packaging i received it in a normal brown box ??? anyways tnx to Laikka for selling hyped products with trust. Ruby woo just name is enough beautiful lipstick nd ture matte and one i was disappointed with packaging i received it.",
    },
    {
      id: 4,
      img: "/icons/account-circle.png",
      name: "Customer Name",
      desc: "Certified Buyer",
      review:
        "Ruby woo just name is enough beautiful lipstick nd ture matte and one i was disappointed with packaging i received it in a normal brown box ??? anyways tnx to Laikka for selling hyped products with trust. Ruby woo just name is enough beautiful lipstick nd ture matte and one i was disappointed with packaging i received it.",
    },
  ];
  return (
    <>
      <div className="mb-5">
        <h2 className="text-xl font-bold">Customer Reviews</h2>
      </div>
      <div className="border-2 border-slate-300 p-5 h-[500px] overflow-y-scroll">
        {reviewArr?.length > 0 &&
          reviewArr.map((ele, i) => {
            return (
              <div
                className="flex items-basline gap-3 border-b-2 border-slate-300 pt-5"
                key={i}
              >
                <div className="w-20">
                  <Image
                    loader={externalImageLoader}
                    src={ele.customer_logo}
                    width={35}
                    height={100}
                    alt="customer image"
                  />
                </div>
                <div>
                  <div className="mb-3">
                    <h2 className="text-[17px] font-semibold">
                      {ele.customer_name}
                    </h2>
                    {/* <p className="text-[12px] text-[#BA011E]">{ele.review}</p> */}
                  </div>
                  <div className="mb-3">
                    <Rating
                      name="size-small"
                      value={ele.star_ratting}
                      defaultValue={2}
                      size="small"
                    />
                  </div>
                  <div className="mb-5">
                    <p>{ele.review}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="py-5">
        <form action="#">
          <div className="mb-3">
            <textarea name="" id="" className="w-[100%] h-[10rem]"></textarea>
          </div>
          <div>
            <button className="bg-[#DD0000] px-[30px] py-[8px] text-[#fff] block m-auto">
              Write a Review
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ProductsCustomerReview;
