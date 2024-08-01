import { Inter } from "next/font/google";
import Image from "next/image";
import GlobalSearch from "../ui/global-search";
import Header from "../ui/header";
import NotFound from "./404";
export const inter = Inter({ subsets: ["latin"] });
export default function Layout({ children }) {
  return (
    <div className="">
      {/* <Image
        src="/background1.png"
        layout="fill"
        objectFit="cover"
        quality={100}
        alt="background image"
      /> */}
      <div className="flex justify-center items-center flex-col">
        <Header />
        {/* <GlobalSearch /> */}
        <NotFound />
      </div>
      <div className="">{children}</div>
    </div>
  );
}
