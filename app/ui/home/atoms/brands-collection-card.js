import Image from "next/image";
import Link from "next/link";
import { externalImageLoader } from "../../../lib/data";

function BrandCollectionCard(props) {
  const { brandKey, } = props;

  return (
    <div className="cursor-pointer">
      <Link
        href={`brands/${brandKey}`}
      >
        <Image
          className="rounded-lg"
          loader={externalImageLoader}
          src={props.img}
          width={250}
          height={200}
          alt=""
        />
      </Link>
    </div>
  );
}

export default BrandCollectionCard;
