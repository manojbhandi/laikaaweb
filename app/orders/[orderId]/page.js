import OrderDetailsByOrderId from "./order-details-by-id";

export default function Page({params}) {
  return (
    <main>
      <div>
        <OrderDetailsByOrderId params={params} />
      </div>
    </main>
  );
}
