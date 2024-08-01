"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "../lib/routes";
import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import InventoryIcon from '@mui/icons-material/Inventory';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import DescriptionIcon from '@mui/icons-material/Description';
import PolicyIcon from '@mui/icons-material/Policy';

function ProfileSidebar() {
  const pathName = usePathname();
  const router = useRouter()

  const logout = () =>{
    localStorage.clear()
    router.push('/')
  }

  
  return (
    <div className="bg-[#f6f6f6b5] py-1 px-3 my-5 rounded-lg border-[1px] border-slate-300">
      <ul className="leading-[3rem]">
        <li className={`border-b-[1px] border-slate-300 `}>
          <Link
            href="/personal-info"
            className={`hover:bg-slate-300 block w-[100%] my-1 px-3 rounded-lg ${pathName == routes.userInfo.personalInfo ? "active" : ''}`}
          >
            <PersonIcon className="text-[20px] me-2"/> Personal Information
          </Link>
        </li>
        <li className={`border-b-[1px] border-slate-300 `}>
          <Link
            href="/save-address"
            className={`hover:bg-slate-300 block w-[100%] my-1 px-3 rounded-lg ${pathName == routes.userInfo.saveAddress ? "active" : ''}`}
          >
           <BookmarkIcon className="text-[20px] me-2"/> Saved Addresses
          </Link>
        </li>
        <li className={`border-b-[1px] border-slate-300 `}>
          <Link
            href="/orders"
            className={`hover:bg-slate-300 block w-[100%] my-1 px-3 rounded-lg ${pathName == routes.userInfo.yourOrder ? "active" : ''}`}
          >
           <InventoryIcon className="text-[20px] me-2"/> Your Orders
          </Link>
        </li>
        <li className={`border-b-[1px] border-slate-300 `}>
          <Link
            href="/privacy-policy"
            className={`hover:bg-slate-300 block w-[100%] my-1 px-3 rounded-lg ${pathName == routes.userInfo.privacyPolicy ? "active" : ''}`}
          >
           <PrivacyTipIcon className="text-[20px] me-2"/> Privacy Policy
          </Link>
        </li>
        <li className={`border-b-[1px] border-slate-300 `}>
          <Link
            href="/term-and-condition"
            className={`hover:bg-slate-300 block w-[100%] my-1 px-3 rounded-lg ${pathName == routes.userInfo.termAndCondition ? "active" : ''}`}
          >
           <DescriptionIcon className="text-[20px] me-2"/> Terms & Conditions
          </Link>
        </li>
        <li className={`border-b-[1px] border-slate-300 `}>
          <Link
            href="/refund-and-cancellation"
            className={`hover:bg-slate-300 block w-[100%] my-1 px-3 rounded-lg ${pathName == routes.userInfo.refundAndCancellation ? "active" : ''}`}
          >
           <PolicyIcon className="text-[20px] me-2"/> Refund & Cancellation Policy
          </Link>
        </li>
        <li>
          <Button className="text-[#000000] my-1 px-3" onClick={logout}><LogoutIcon className="text-[20px] me-2"/> Logout</Button>
        </li>
      </ul>
    </div>
  );
}

export default ProfileSidebar;
