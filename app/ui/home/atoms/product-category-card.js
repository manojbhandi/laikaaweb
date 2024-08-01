
import Image from "next/image";
import Link from "next/link";
import { externalImageLoader } from "../../../lib/data";

export default function ProductCategoryCard(props) {
  const { categoryKey, image, title } = props;
  return (
    <div className="cursor-pointer w-[90px] py-3">
      <Link
        // href='/lipstick-collections/'
        href={`/${categoryKey}`}
      >
        <div>
            <Image
              className="rounded-full border-[2px] border-slate-300"
              loader={externalImageLoader}
              src={image}
              width={100}
              height={100}
              alt=""
            />
        </div>
        <div className="pt-3">
            <p className="text-center text-[13px] font-semibold">{title}</p>
        </div>
      </Link>
    </div>
  );
}
