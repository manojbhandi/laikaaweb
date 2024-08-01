import Link from "next/link";
import FroudAlert from "../ui/froud-alert";
import LaikaaFeatures from "../ui/laikaa-features";
import HelpCard from "./help-card";
import { helpArr } from "../lib/data";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function Help() {
  return (
    <div className="container mx-auto px-5">
      <div className="mx-auto pt-4 max-w-[100%] w-[800px]">
        <div>
          <h2 className="text-2xl font-bold">
            <span className="underline underline-offset-8 decoration-[#BD00FF]">
              TOPICS
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-4">
          {helpArr.map((item, i) => {
            return (
              <div key={i}>
                <HelpCard textContent={item.textContent} icon={item.icon} />
              </div>
            );
          })}
        </div>
        <div className="mt-4">
          <div>
            <h2 className="text-2xl font-bold">
              <span className="underline underline-offset-8 decoration-[#BD00FF]">
                OTHER&nbsp;&nbsp;
              </span>
              <span>OPTIONS</span>
            </h2>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-3">
              <span>
                <BorderColorIcon />
              </span>
              <span>Write To Us</span>
            </div>
            <Link href="/help/write-to-us">
              <div className="rounded-full border-black border-[1px] w-min ">
                <KeyboardArrowRightIcon />
              </div>
            </Link>
          </div>
        </div>
      </div>
        <div>
          <FroudAlert/>
        </div>
        <div>
          <LaikaaFeatures/>
        </div>
    </div>
  );
}

export default Help;
