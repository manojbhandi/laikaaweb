function BillingInfo(props) {
  const { paymentDetails, address, orderDetails, callCancelOrderApi } = props;
  if (address) {
    return (
      <div className="mt-7">
        <div className="bg-[#f24f1e2c] py-3 px-3">
          <p className="text-[#F24E1E]">BILLING INFORMATION</p>
        </div>
        <div className="mt-5">
          <p className="font-semibold text-xl mb-3">Billing Address</p>
          <p className="mb-3">
            <span className="font-semibold">Customer Name:</span>
            {address?.fullname}
          </p>
          <p>
            {address.address1},{address.address2},{address.city}
          </p>
          <p>
            <span>Pin-</span> {address.pincode}
          </p>
          <p>
            <span>Landmark: </span>South City Mall
          </p>
        </div>
        <div>
          <p className="font-semibold text-xl mt-8 mb-5">Order Summary</p>
          <div className="flex justify-between items-center my-2">
            <p className="font-semibold">Bag Price:</p>
            <p>₹ {orderDetails.gross_amount}</p>
          </div>
          <div className="flex justify-between items-center my-2">
            <p className="font-semibold">Discounted Price:</p>
            <p>₹ {orderDetails.discount_amount}</p>
          </div>
          <div className="flex justify-between items-center my-2">
            {/* <p className='font-semibold'>Promocode: <span className='text-[#F24E1E]'>LAUNCHPROMO</span></p>
                <p className='text-[#F24E1E]'>-₹ 250.00</p> */}
          </div>
        </div>
        <div className="my-5">
          <hr />
        </div>
        <div>
          <div className="flex justify-between items-center my-2">
            <p className="font-semibold">Total Price:</p>
            <p>₹{orderDetails.gross_amount - orderDetails.discount_amount}</p>
          </div>
          <div className="flex justify-between items-center my-2">
            <p className="font-semibold">GST (18%):</p>
            <p>₹ {orderDetails.gst_amount}</p>
          </div>
          <div className="flex justify-between items-center my-2">
            <p className="text-[#20923F] font-semibold">Total Payable:</p>
            <p className="text-[#20923F]">₹ {orderDetails.paid_amount}</p>
          </div>
        </div>
        <div className="my-3">
          <div className="flex gap-3 items-center">
            <p className="text-[#dd0000] font-semibold">Cancelled</p>
            <div className="w-[100%]">
              <hr />
            </div>
          </div>
          <div className="flex justify-between items-center my-2">
            <p className="font-semibold">Refund Completed</p>
            <p className="text-[#20923F]">₹ 1,000.00</p>
          </div>
        </div>
      </div>
    );
  }
}

export default BillingInfo;
