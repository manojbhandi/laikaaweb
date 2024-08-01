"use client"
import Accordian from "../ui/accordian/accordian";
import Filters from "../ui/filter";
import DisplayCollections from "./display-collections";

export default function Page() {
  return (
    <main className="flex gap-2 w-full border mt-8 p-3">
      <div className="col-span-1 hidden md:flex">
        <Filters/>
      </div>
      <div className="col-span-3">
        <DisplayCollections/>
      </div>
    </main>
  );
}
