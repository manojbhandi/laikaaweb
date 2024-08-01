
function BillingInfo() {
  return (
    <div className='mt-7'>
        <div className='bg-[#f24f1e2c] py-3 px-3'>
            <p className='text-[#F24E1E]'>BILLING INFORMATION</p>
        </div>
        <div className='mt-5'>
            <p className='font-semibold text-xl mb-3'>Billing Address</p>
            <p className='mb-3'>
                <span className='font-semibold'>Customer Name:</span> Sourav Goswami
            </p>
            <p>
                22/263, Jodhpur Park, Tagore park Road,
                Kolkata. 
            </p>
            <p>
                <span>Pin-</span> 700045
            </p>
            <p>
                <span>Landmark: </span>South City Mall
            </p>
        </div>
        <div>
            <p className='font-semibold text-xl mt-8 mb-5'>Order Summary</p>
            <div className='flex justify-between items-center my-2'>
                <p className='font-semibold'>Bag Price:</p>
                <p>₹ 1,250.00</p>
            </div>
            <div className='flex justify-between items-center my-2'>
                <p className='font-semibold'>Discounted Price:</p>
                <p>₹ 2,500.00</p>
            </div>
            <div className='flex justify-between items-center my-2'>
                <p className='font-semibold'>Promocode: <span className='text-[#F24E1E]'>LAUNCHPROMO</span></p>
                <p className='text-[#F24E1E]'>-₹ 250.00</p>
            </div>
        </div>
        <div className='my-5'>
            <hr />
        </div>
        <div>
            <div className='flex justify-between items-center my-2'>
                <p className='font-semibold'>Total Price:</p>
                <p>₹ 847.46</p>
            </div>
            <div className='flex justify-between items-center my-2'>
                <p className='font-semibold'>GST (18%):</p>
                <p>₹ 152.54</p>
            </div>
            <div className='flex justify-between items-center my-2'>
                <p className='text-[#20923F] font-semibold'>Total Payable:</p>
                <p className='text-[#20923F]'>₹ 152.54</p>
            </div>
        </div>
        <div className='my-3'>
            <div className='flex gap-3 items-center'>
                <p className='text-[#dd0000] font-semibold'>Cancelled</p> 
                <div className='w-[100%]'>
                    <hr />
                </div>
            </div>
            <div className='flex justify-between items-center my-2'>
                <p className='font-semibold'>Refund Completed</p>
                <p className='text-[#20923F]'>₹ 1,000.00</p>
            </div>
        </div>
    </div>
  )
}

export default BillingInfo