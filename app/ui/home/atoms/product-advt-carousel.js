import East from "@mui/icons-material/East";

export default function ProductAdvtCarousel(props) {
    const {newLaunch} = props;
  return (
    <div className="max-w-[95%] w-96 h-96 rounded-lg bg-slate-600 p-2 m-2 relative">
      <button className="absolute bg-slate-50 rounded-full font-medium text-pink-500 border-0 p-1 px-2 left-8 bottom-8">
        Shop Now
        <East />
      </button>
      <button className="absolute bg-slate-200 rounded-t-xl  font-medium  p-1 px-2 border-2 border-white bottom-0 right-8">New Launch</button>
    </div>
  );
}
