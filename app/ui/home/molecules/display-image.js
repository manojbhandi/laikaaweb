import Image from "next/image";

export default function DisplayImage() {
  return (
    <div className="container mx-auto px-5">
      <div className="flex gap-2 p-1">
        <Image
            src="/image-makeup.jpg"
            width="0"
            height="0"
            quality={100}
            sizes="100vw"
            style={{width:'50%'}}
            alt="makeup image"
        />
        <Image
            src="/image-makeup.jpg"
            width="0"
            height="0"
            quality={100}
            sizes="100vw"
            style={{width:'50%'}}
            alt="makeup image"
        />
      </div>
    </div>
  );
}
