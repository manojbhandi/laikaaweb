import Image from "next/image";
import Link from "next/link";

export default function Copyright() {
  return (
    <div className="flex items-center flex-col gap-1 w-full bg-gradient-to-r from-[#F24E1E] to-[#DD1B73] ... py-2 px-20 text-white text-sm font-normal text-nowrap">
      <div className="md:flex justify-between ">
        <div className="flex items-center gap-1 px-5 border-e cursor-pointer">
          <Link href="/term-and-condition"> Terms & Conditions</Link>
        </div>
        <div className="flex items-center gap-1 px-5 border-e cursor-pointer">
          <Link href="/not-found"> Shipping Policy</Link>
        </div>
        <div className="flex items-center gap-1 px-5 border-e cursor-pointer">
          <Link href="/refund-and-cancellation"> Cancellation Policy</Link>
        </div>
        <div className="flex items-center gap-1 px-5 border-e cursor-pointer">
          <Link href="/privacy-policy"> Privacy Policy</Link>
        </div>
        <div className="flex items-center gap-1 px-5 border-e cursor-pointer">
          <Link href="/refund-and-cancellation"> Refund Policy</Link>
        </div>
      </div>
      <div >
        <span className="text-xs" >Copyright@Laikaa Cosmetics 2024</span></div>
    </div>
  );
}
