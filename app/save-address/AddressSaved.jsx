
import HomeIcon from "@mui/icons-material/Home";
import FroudAlert from "../ui/froud-alert";
import LaikaaFeatures from "../ui/laikaa-features";
import ProfileSidebar from "../ui/profile-sidebar"
import { Button } from '@mui/material';
import Link from 'next/link';

function AddressSaved() {

   
  return (
    <div>
        <div className="container mx-auto px-5">
            <div className="md:grid md:grid-cols-8 gap-5">
                <div className="col-span-2">
                    <ProfileSidebar/>
                </div>
                <div className="col-span-6">
                    <div className="mt-5 flex justify-between items-center">
                        <h2 className="text-2xl font-bold"><span className="underline underline-offset-8 decoration-[#BD00FF]">Saved</span> Address</h2>
                        <Link href="/add-address">
                            <Button className="text-[#F24E1E] font-semibold">+ Add Address</Button>
                        </Link>
                    </div>
                    <div className="flex sm:items-center gap-3 bg-[#F4F4F4] p-2 mt-5">
                        <span className="p-3 w-[50px] h-[50px] rounded-sm bg-[#F24E1E] text-white">
                            <HomeIcon />
                        </span>
                        <span>
                            <p className="text-[#F24E1E]">Delivery Address</p>
                            <p className="text-sm">22/263, Jodhpur Park, Tagore Oark Road, Pin- 700045, Landamrk: South City Mall</p>
                        </span>
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
    </div>
  )
}

export default AddressSaved