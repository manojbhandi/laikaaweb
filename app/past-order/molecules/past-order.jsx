import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LaikaaFeatures from '../../ui/laikaa-features'
import FroudAlert from '../../ui/froud-alert'
import BillingInfo from '../atoms/billing-info'
import PastOrderInfo from '../atoms/past-order-info'

function PastOrder() {
  return (
    <div>
        <div className="container mx-auto px-5">
            <div className='my-5'>
                <h2 className='text-2xl font-bold'><span className='underline underline-offset-8 decoration-[#BD00FF]'>PAST</span> ORDERS</h2>
            </div>
            <div>
                <PastOrderInfo/>
            </div>
            <div className='my-10'>
                <button className='block m-auto border-2 border-slate-400 py-3 px-5 hover:bg-[#b1b1b13a]'>WRITE A REVIEW</button>
            </div>
            <div>
                <BillingInfo/>
            </div>
            <div className='bg-[#7877771a] p-3 mt-5'>
                <button className='block m-auto border-2 border-slate-400 py-2 px-5 hover:bg-[#b1b1b13a]'>NEED HELP?</button>
            </div>
           <div>
                <FroudAlert/>
           </div>
            <div className=''>
                <LaikaaFeatures/>
            </div>
        </div>
    </div>
  )
}

export default PastOrder