import { East } from "@mui/icons-material";

export default function AccessoriesCard() {
  return (
    <div className="w-full p-2 ">
      <div className="bg-slate-500 w-[30rem] h-72 rounded-lg "></div>
      <div className="flex justify-between items-center mt-1 p-2">
        <div>
          <h2 className="font-semibold">Up to 70% Off</h2>
          <p>All Things Beyond Beauty</p>
        </div>
        <button className="bg-slate-50 rounded-full font-medium text-pink-500  border-2 border-pink-300 p-1 px-2 left-8 bottom-8">
          Shop Now
          <East />
        </button>
      </div>
    </div>
  );
}
