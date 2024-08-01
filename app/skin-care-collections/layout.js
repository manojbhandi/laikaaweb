import Image from "next/image";
import GlobalSearch from "../ui/global-search";
import Header from "../ui/header";
import { Inter } from "next/font/google";
import Footer from "../ui/footer";
import Copyright from "../ui/copyright";
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
      <div className="flex flex-col">
        <Header />
        <GlobalSearch />
      </div>
      <div className="">{children}</div>
      <div>
        <Footer />
        <Copyright />
      </div>
    </div>
  );
}