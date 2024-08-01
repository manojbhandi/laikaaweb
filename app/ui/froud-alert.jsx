import Image from 'next/image'
import React from 'react'

function FroudAlert() {
  return (
    <div className='text-center bg-[#ffeded71] mt-5 py-10 rounded-xl'>
      <div className='flex justify-center items-center gap-5 mb-3 px-3'>
        <Image src="/icons/info-circle.png" width={30} height={30} alt=''/>
        <p className='text-2xl font-bold'> Please Be Careful Of Fraudulent Calls & SMSes!</p>
        <Image src="/icons/info-circle.png" width={30} height={30} alt=''/>
      </div>
        <p><b>Laikaa Cosmetics</b> will never call you with offers pertaining to free gifts or prizes or asked for payments through links.</p>
    </div>
  )
}

export default FroudAlert