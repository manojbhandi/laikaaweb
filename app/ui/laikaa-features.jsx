import Image from 'next/image'
import React from 'react'

function LaikaaFeatures() {
  return (
    <div>
        <div className="container mx-auto px-5 py-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 px-5">
                <div className="col-span-3 my-5">
                    <div className='flex items-center gap-3 '>
                        <div>
                            <Image src="/icons/shipping.png" width={70} height={70} alt='' />
                        </div>
                        <div>
                            <p className='mb-1 font-semibold'>Free Shipping</p>
                            <hr/>
                            <p className='mt-1'>On Orders Above ₹299</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 my-5">
                    <div className='flex items-center gap-3 '>
                        <div>
                            <Image src="/icons/return.png" width={70} height={70} alt='' />
                        </div>
                        <div>
                            <p className='mb-1 font-semibold'>Easy Returns</p>
                            <hr/>
                            <p className='mt-1'>15-Day Return Policy</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 my-5">
                    <div className='flex items-center gap-3 '>
                        <div>
                            <Image src="/icons/certified.png" width={70} height={70} alt='' />
                        </div>
                        <div>
                            <p className='mb-1 font-semibold'>100% Authentic</p>
                            <hr/>
                            <p className='mt-1'>Products Sourced Directly</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 my-5">
                    <div className='flex items-center gap-3 '>
                        <div>
                            <Image src="/icons/brand.png" width={70} height={70} alt='' />
                        </div>
                        <div>
                            <p className='mb-1 font-semibold'>100+ BRANDS</p>
                            <hr/>
                            <p className='mt-1'>1.2 Lakh+ Products</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LaikaaFeatures