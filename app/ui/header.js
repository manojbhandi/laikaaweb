import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex flex-wrap items-center justify-center md:justify-between w-full bg-gradient-to-r from-[#F24E1E] to-[#DD1B73] ... py-1 md:px-36 text-white">
      <div className="hidden md:block font-normal text-l text-nowrap">Get Amazing Deals on Every Products Upto 30% OFF</div>
      <div className="md:hidden font-normal text-l text-nowrap">Get Amazing Deals </div>
      <div className="flex items-center justify-center md:justify-between">
        <div className="flex items-center gap-1 px-5 border-e cursor-pointer  text-l text-nowrap">
          <Image
            src="/icon-get-app.png"
            alt="help-icon"
             width="25"
            height="37"
            quality={100}
          />
          <Link href="not-found"> Get App</Link>
        </div>
        
        <div className="flex items-center gap-1 px-5 border-e cursor-pointer  text-l text-nowrap w-fit">
          <Image
            src="/icon-gift-cards.png"
            alt="gift-card-icon"
            width="25"
            height="37"
            quality={100}
          />
          <Link href="not-found ">Gift Cards</Link>
        </div>
        <div className="flex items-center  gap-1 px-5  cursor-pointer text-l text-nowrap">
          <Image
            src="/icon-help.png"
            alt="help-icon"
             width="25"
            height="37"
            quality={100}
          />
          <Link href="not-found "> Help</Link >
        </div>
      </div>
    </div>
  );
}
