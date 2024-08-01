"use client"
import * as React from 'react';
import Image from "next/image";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartItems from "./cart-items";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


export default function CartDetails(props){
    
    return(
        <div className=" text-black">
            <div className="flex justify-between px-3 py-5 ">
                <Image
                    src='/laikaa-logo.png'
                    width="100"
                    height="50"
                    alt="laikaa-logo"
                    quality={100}
                />
                 <IconButton onClick={props.close}>
                    <CloseIcon/>
                </IconButton>
            </div>
            <div className="border-t-2 border-dotted border-slate-300 px-3 pb-1 pt-4">
                <p className="text-[18px]"><span className="underline underline-offset-8 decoration-[#BD00FF]">YOUR</span> CART</p>
            </div>
            <div>
                <CartItems/>
            </div>
        </div>
    )
}