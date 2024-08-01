import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function PastOrderInfo() {
  return (
    <div className='sm:grid grid-cols-3 mt-10'>
        <div className='sm:flex items-start gap-2 col-span-2'>
            <div className='sm:w-[25rem] mb-3'>
                <Image src="/img/product-details.jpg" width={150} height={100} alt=''/>
            </div>
            <div>
                <p className='text-[#F24E1E] text-xl font-semibold mb-3'>Order ID: #78464748557</p>
                <p>This is a demo product name which has been sold</p>
                <p className='text-sm text-[#b1b1b1]'>Major cult shades made mini. Ten hues, three textures. The iconic product that made M.A.C famous Major cult shades made mini. Ten hues, three textures. The iconic product that made M.A.C famous.</p>
            </div>
        </div>
        <div className='mt-5'>
            <Link href="#" className='flex gap-2 justify-end items-center'>
                Download Invoice <Image src="/icons/file-download.png" width={50} height={100} alt=''/>
            </Link>
        </div>
    </div>
  )
}

export default PastOrderInfo