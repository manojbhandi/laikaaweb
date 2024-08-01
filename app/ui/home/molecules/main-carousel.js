import { useAppSelector } from "@/app/lib/hooks";
import EmblaCarousel from "../../embla-carousel/carousel";
import { useEffect, useState } from "react";

export default function MainCarousel() {
  const { homeData } = useAppSelector((state) => state.home);
  const [imageArr, setImageArr] = useState([]);
  useEffect(() => {
    let resArr = [];
    if (homeData.data?.slider_list?.length > 0) {
      resArr = homeData.data?.slider_list.map((item) => item.image_url);
    }
    setImageArr(resArr);
  }, []);


  const emblaViewPort = {
    overflow: "hidden",
  };
  const emblaContainer = {
    display: "flex",
  };
  const imageContainer = {
    display: "flex",
    $justifycContent: "center",
    $alignItems: "center",
    width: "100vw",
    height: "20rem",
  };
  const autoplay = {
    flag: true,
    delay: 2000,
  };

  return (
    // <div></div>
    <EmblaCarousel
      isImageCarousel={true}
      emblaViewPort={emblaViewPort}
      emblaContainer={emblaContainer}
      imageContainer={imageContainer}
      imageDataArr={imageArr}
      autoplay={autoplay}
      isNextBtn={false}
    />
  );
}
