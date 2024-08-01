import Image from "next/image";

export default function NotFound(){
    return(
        <div>
            <Image
                src='/image-404.png'
                height="700"
                width="700"
                quality={100}
                alt="404-not-found-image"
            />
        </div>
    )
}