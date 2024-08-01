import { Sidebar } from "flowbite-react";
import ProductById from "./product-by-id";

export default function Page({params}) {
  return (
    <main>
      <div>
        <ProductById
          id={params.id}
        />
      </div>
    </main>
  );
}
