
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import React from "react";

export default function HelpCard(props){
    const {icon, textContent} = props
    return(
        <div className="rounded-xl flex flex-col border-[1px] border-black p-3 bg-[#F8F8F8] h-[150px]">
            <div className="rounded-full border-black border-[1px] self-end">
                <KeyboardArrowRightIcon/>
            </div>
            <div className="flex justify-center items-center gap-3">
                <span className="text-[#DD0000] text-3xl csr">
                    {React.cloneElement(icon)}
                </span>
                <span>
                    <p className="text-[12px] sm:text-xl">{textContent}</p>
                </span>
            </div>
        </div>
    )
}