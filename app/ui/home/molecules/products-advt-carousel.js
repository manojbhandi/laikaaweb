import EmblaCarousel from "../../embla-carousel/carousel";
import ProductAdvtCarousel from "../atoms/product-advt-carousel";

export default function ProductsAdvtCarousel() {
  const autoplay = {
    flag: false,
    delay: null,
  };
  const nextBtnStyle = {
    display: "flex",
    $justifyContent: "center",
    $alignItems: "center",
    width: "2rem",
    height: "4rem",
    background: "#F24E1E",
    $borderRadius: "150px 0px 0px 150px",
    position: "absolute",
    left: "",
    top: "8rem",
    right: "0",
    bottom: "220px",
    color:'#FFFF'
  };
  const prevBtnStyle = {
    display: "flex",
    $justifyContent: "center",
    $alignItems: "center",
    width: "2rem",
    height: "4rem",
    background: "#F24E1E",
    $borderRadius: "150px 150px 0px 0px",
    position: "absolute",
    left: "",
    top: "8rem",
    left: "0",
    bottom: "220px",
    color:'#FFFF'
  };
  return (
    <div style={{ width: "100%" }} className="flex container mx-auto">
      <EmblaCarousel
        isCardCarousel={true}
        autoplay={autoplay}
        isNextBtn={true}
        isPrevBtn={true}
        nextBtnStyle={nextBtnStyle}
        prevBtnStyle={prevBtnStyle}
        // imageContainer={imageContainer}
      >
        {
            [1,2,3,4,6,7].map((item,i)=>(
              <div key={i}>
                <ProductAdvtCarousel/>
              </div>
            ))
        }
      </EmblaCarousel>
    </div>
  );
}
