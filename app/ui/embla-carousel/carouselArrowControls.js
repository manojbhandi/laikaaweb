import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

export default function UsePrevNextButtons(emblaApi, onBtnClick) {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev()
    
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext()
    // if (onBtnClick){
    //   alert("e")
    //   onBtnClick(emblaApi);
    // }
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);
  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
}

const PrevBtn = styled.div`
  display: ${(props) => props.display ? props.display : "flex"};
  justify-content: ${(props) => props.justifyContent ?? "center"};
  align-items: ${(props) => props.alignItems ?? "center"};
  width: ${(props) => props.width ?? "2rem"};
  height: ${(props) => props.height ?? "2rem"};
  background: ${(props) => props.background ?? "#ff0000"};
  border-radius: ${(props) => props.borderRadius ?? "0px 150px 150px 0px"};
  position: ${(props) => props.position ?? "absolute"};
  left: ${(props) => props.left ?? "0"};
  top: ${(props) => props.top ?? "11rem"};
  right: ${(props) => props.right ?? ""};
  bottom: ${(props) => props.bottom ?? ""};
  color: #FFFF;
  cursor: pointer;
`;
const NextBtn = styled.div`
  display: ${(props) => props.display ? props.display : "flex"};
  justify-content: ${(props) => props.justifyContent ?? "center"};
  align-items: ${(props) => props.alignItems ?? "center"};
  width: ${(props) => props.width ?? "2rem"};
  height: ${(props) => props.height ?? "2rem"};
  background: ${(props) => props.background ?? "#ff0000"};
  border-radius: ${(props) => props.borderRadius ?? "150px 0px 0px 150px"};
  position: ${(props) => props.position ?? "absolute"};
  left: ${(props) => props.left ?? ""};
  top: ${(props) => props.top ?? "11rem"};
  right: ${(props) => props.right ?? "0"};
  bottom: ${(props) => props.bottom ?? ""};
  color: #FFFF;
  cursor: pointer;
`;

export function PrevButton(props) {
  const { children,prevBtnStyle, isPrevBtn, onClick, ...restProps } =  props ;
  return (
    <PrevBtn onClick={onClick} {...prevBtnStyle}>
      {/* <ArrowForwardIosOutlined /> */}
      <WestIcon></WestIcon>
    </PrevBtn>
  );
}
export function NextButton(props) {
  const { children, nextBtnStyle, onClick ,...restProps } = props;

  return (
    <NextBtn onClick={onClick} {...nextBtnStyle}>
      {/* <ArrowForwardIosOutlined /> */}
      <EastIcon/>
    </NextBtn>
  );
}
