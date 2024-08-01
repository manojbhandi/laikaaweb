// "use client";
// import useEmblaCarousel from "embla-carousel-react";
// import Autoplay from "embla-carousel-autoplay";
// import { useCallback, useEffect, useState } from "react";
// import UsePrevNextButtons, {
//   NextButton,
//   PrevButton,
// } from "./carouselArrowControls";
// import Image from "next/image";
// import styled from "styled-components";

// const EmblaViewPortCard = styled.div`
//   overflow: ${(props) => props.overflow ?? "hidden"};
// `;
// const EmblaContainerCard = styled.div`
//   display: ${(props) => props.display ?? "flex"};
// `;


// //prveBtn, nextBtn,progressBar, autoPlay, css, imageData, imageContainerCss, emblaViewPort
// export default function EmblaCarouselForCard(props) {
//   const {
//     children,
//     autoplay,
//     isNextBtn,
//     nextBtn,
//     nextBtnStyle,
//     progressBar,
//     isPrevBtn,
//     prevBtn,
//     emblaViewPort,
//     emblaContainer,
//     customCss,
//   } = props;
//   // const emblaOptions = { loop: false };
//   // let emblaPlugins = [Autoplay({ playOnInit: false, delay: 3000 })];
//   let [emblaRef, emblaApi] = [];
//   if (autoplay?.flag) {
//     [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
//       Autoplay({ playOnInit: false, delay: autoplay.delay ?? 3000 }),
//     ]);
//   } else {
//     [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
//   }
//   emblaApi?.plugins()?.autoplay?.play();
//   const [isPlaying, setIsPlaying] = useState(false);
//   const {
//     prevBtnDisabled,
//     nextBtnDisabled,
//     onPrevButtonClick,
//     onNextButtonClick,
//   } = UsePrevNextButtons(emblaApi);

//   const onButtonAutoplayClick = useCallback(
//     (callback) => {
//       const autoplay = emblaApi?.plugins()?.autoplay;
//       if (!autoplay) return;

//       const resetOrStop =
//         autoplay.options.stopOnInteraction === false
//           ? autoplay.reset
//           : autoplay.stop;
//       resetOrStop();
//       callback();
//     },
//     [emblaApi]
//   );

//   // const toggleAutoplay = useCallback(() => {
//   //   const autoplay = emblaApi?.plugins()?.autoplay;
//   //   if (!autoplay) return;

//   //   const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play;
//   //   playOrStop();
//   // }, [emblaApi]);

//   useEffect(() => {
//     const autoplay = emblaApi?.plugins()?.autoplay;
//     if (!autoplay) return;

//     setIsPlaying(autoplay.isPlaying());
//     emblaApi
//       .on("autoplay:play", () => setIsPlaying(true))
//       .on("autoplay:stop", () => setIsPlaying(false))
//       .on("reInit", () => setIsPlaying(autoplay.isPlaying()));
//   }, [emblaApi]);
//   return (
//     <div className="embla w-full relative">
//       {/* embal viewport */}
//       {/* <div className="embla__viewport  overflow-hidden" ref={emblaRef}> */}
//       <EmblaViewPortCard
//         className="embla__viewport"
//         {...emblaViewPort}
//         ref={emblaRef}
//       >
//         <EmblaContainerCard className="embla__container" {...emblaContainer}>
//           {children}
//         </EmblaContainerCard>
//       </EmblaViewPortCard>
//       {/* </div> */}
//       <div className="embla__controls">
//         <div className="embla__buttons">
//           {isPrevBtn && (
//             <PrevButton
//               onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
//               disabled={prevBtnDisabled}
//             />
//           )}
//           {isNextBtn && (
//             <NextButton
//               onClick={() => onButtonAutoplayClick(onNextButtonClick)}
//               disabled={nextBtnDisabled}
//               nextBtnStyle={nextBtnStyle}
//             />
//           )}
//         </div>
//         {/* <button className="embla__play" onClick={toggleAutoplay} type="button">
//           {isPlaying ? "Stop" : "Start"}
//         </button> */}
//       </div>
//     </div>
//   );
// }
