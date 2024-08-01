"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import UsePrevNextButtons, {
  NextButton,
  PrevButton,
} from "./carouselArrowControls";
import Image from "next/image";
import styled from "styled-components";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { externalImageLoader } from "../../lib/data";


const EmblaViewPort = styled.div`
  overflow: ${(props) => props.overflow ?? "hidden"};
`;
const EmblaContainer = styled.div`
  display: ${(props) => props.display ?? "flex"};
  justify-content: ${(props) => props.$justifyContent ?? "center"};
  align-items: ${(props) => props.$alignItems ?? "center"};
  gap: ${(props) => props.gap ?? ""};
  user-select: ${(props) => props.$userSelect ?? "none"}
`;
const ImageContainer = styled.div`
  display: ${(props) => props.display ?? "flex"};
  justify-content: ${(props) => props.$justifyContent ?? "center"};
  align-items: ${(props) => props.$alignItems ?? "center"};
  width: ${(props) => props.width ?? "100vw"};
  height: ${(props) => props.height ?? "20rem"};
  flex-direction: ${(props) => props.flexDirection ?? "row"};
`;

//prveBtn, nextBtn,progressBar, autoPlay, css, imageData, imageContainerCss, emblaViewPort
export default function EmblaCarousel(props) {
  const {
    isImageCarousel,
    imageDataArr,
    isCardCarousel,
    children, //react-node
    autoplay,
    isNextBtn,
    nextBtnStyle,
    progressBar,
    isPrevBtn,
    prevBtnStyle,
    emblaViewPort,
    emblaContainer,
    imageContainer,
    customCss,
  } = props;

  // const emblaOptions = { loop: false };
  // let emblaPlugins = [Autoplay({ playOnInit: false, delay: 3000 })];

  let emblaObj = {};
  if (autoplay.flag) {
    emblaObj = { playOnInit: true, delay: autoplay.delay ?? 3000 };
  } else {
    emblaObj = { playOnInit: false };
  }

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [
    Autoplay(emblaObj),
  ]);

  // emblaApi?.plugins()?.autoplay?.play();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = UsePrevNextButtons(emblaApi);

  const onButtonAutoplayClick = useCallback(
    (callback) => {
      const autoplay = emblaApi?.plugins()?.autoplay;
      if (!autoplay) return;

      const resetOrStop =
        autoplay.options.stopOnInteraction === false
          ? autoplay.reset
          : autoplay.stop;
      resetOrStop();
      callback();
    },
    [emblaApi]
  );

  // const toggleAutoplay = useCallback(() => {
  //   const autoplay = emblaApi?.plugins()?.autoplay;
  //   if (!autoplay) return;

  //   const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play;
  //   playOrStop();
  // }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      setIsInitialized(true);
    }
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    setIsPlaying(autoplay.isPlaying());
    emblaApi
      .on("autoplay:play", () => setIsPlaying(true))
      .on("autoplay:stop", () => setIsPlaying(false))
      .on("reInit", () => setIsPlaying(autoplay.isPlaying()));
  }, [emblaApi]);

  return (
    <div
      className={clsx("embla w-full", {
        relative: isNextBtn == true,
        hidden: isInitialized != true,
      })}
    >
      {/* embal viewport */}
      {/* <div className="embla__viewport  overflow-hidden" ref={emblaRef}> */}
      <EmblaViewPort
        className={clsx("embla__viewport")}
        {...emblaViewPort}
        ref={emblaRef}
      >
        <EmblaContainer className="embla__container" {...emblaContainer}>
          {isImageCarousel &&
            imageDataArr.map((image, i) => (
              <div key={i}>
                {/* image container */}
                <ImageContainer {...imageContainer} key={i}>
                  {/* <div className="flex items-center justify-center w-screen h-80"> */}
                  <Image
                    src={image}
                    loader={externalImageLoader}
                    width="0"
                    height="0"
                    sizes="100vw"
                    style={{width:'100%'}}
                    alt="carousel Image"
                  />
                </ImageContainer>
              </div>
            ))}
          {isCardCarousel && children}
        </EmblaContainer>
      </EmblaViewPort>
      {/* </div> */}
      <div className="embla__controls">
        <div className="embla__buttons">
          {isPrevBtn && (
            <PrevButton
              onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
              disabled={prevBtnDisabled}
              prevBtnStyle={prevBtnStyle}
            />
          )}
          {isNextBtn ? (
            <NextButton
              onClick={() => onButtonAutoplayClick(onNextButtonClick)}
              disabled={nextBtnDisabled}
              nextBtnStyle={nextBtnStyle}
            />
          ) : null}
        </div>
        {/* <button className="embla__play" onClick={toggleAutoplay} type="button">
          {isPlaying ? "Stop" : "Start"}
        </button> */}
      </div>
    </div>
  );
}
