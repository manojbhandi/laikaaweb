'use client'
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Successfull() {
    const router = useRouter();
  return (
    <div>
      <div className="flex items-center justify-center p-3">
        <h2 className="text-2xl font-semibold ms-5">
          <span className="underline underline-offset-8 decoration-[#F24E1E]">
            ORDER
          </span>{" "}
          PLACED SUCCEFULLY!
        </h2>
      </div>
      <div className="flex items-center justify-center">
        <Image
          src={"/image-order-status-success.png"}
          width={600}
          height={1000}
          alt=""
          className="p-4"
        />
      </div>
      <div className="flex justify-center gap-10 mt-5">
        <Button className="bg-[#FE3358] text-white rounded p-1 px-14 hover:bg-[#FE3358]" onClick={()=>{router.push('/order-details')}}>Go To Orders</Button>
        <Button className=" border-[#FE3358] border-2  text-[#FE3358] rounded p-1 px-14">Need Help</Button>
      </div>
    </div>
  );
}

export default Successfull;
