import Skeleton from "@mui/material/Skeleton";
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function Skeletons() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm h-28`}
    >
      <div className="cursor-pointer w-[90px] py-3">
        <div className="rounded-full border-[2px] border-slate-300 h-[#100px]"></div>
        <div className="pt-3">
          <p className="text-center text-[13px] font-semibold h-10"></p>
        </div>
      </div>
    </div>
  );
}

export function BrandsSectionSkeleton() {
  return (
    <div className="brand-collection-card pt-3">
      <div className="container mx-auto px-3">
        <div className="pb-5">
          <h2 className="text-2xl font-semibold">
            <span className="underline underline-offset-8 decoration-purple-400">
              BRANDS &
            </span>{" "}
            COLLECTIONS
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-5 px-5">
          {[...Array(6)].map((_, i) => (
            <div className="mb-5 flex justify-center" key={i}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                className="max-w-[100%] w-[200px]"
                height={200}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className="cursor-pointer p-3">
      <Skeleton variant="circular" width={80} height={80} />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
    </div>
  );
}

export function ProductCollection() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 mx-5 mb-5">
      {[...Array(6)].map((_, i) => {
        return (
          <div className=" px-2" key={i}>
            <Skeleton animation="wave" variant="rectangular" height={180} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" width={50} sx={{ fontSize: "1rem" }} />
          </div>
        );
      })}
    </div>
  );
}

export function SkincareLipcare() {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-5">
        {/* <div className="flex flex-wrap flex-row my-5"> */}
        {[...Array(6)].map((_, i) => {
          return (
            <div className=" px-2" key={i}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                className="max-w-[100%]"
                width={200}
                height={180}
              />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="text" width={50} sx={{ fontSize: "1rem" }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function BrandsSkeletonHome() {
  return <BrandsSectionSkeleton />;
}
export function ProductsSkeletonHome() {
  return (
    <div className="flex justify-between p-4">
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
    </div>
  );
}

/* brand-collection */

export function BrandCollectionPage() {
  return (
    <div className="container mx-auto px-3">
      <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2">
        {[...Array(12)].map((_, i) => {
          return (
            <div className="my-5 mx-3" key={i}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                className="max-w-[100%] w-[200px]"
                height={200}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AddressCardSkeleton() {
  return (
    <div className="p-3 border-2 border-slate-300 rounded-lg flex justify-between flex-col">
      <div className="mb-5">
        <Skeleton animation="wave" variant="text" width="60%" height={30} />
      </div>
      <div className="flex gap-3 items-center">
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={20}
          height={20}
        />
        <div className="flex flex-col w-full px-4">
          <Skeleton
            animation="wave"
            variant="text"
            height={25}
            width="100%"
            className="px-[12rem]"
          />
          <Skeleton animation="wave" variant="text" width="100%" height={25} />
          <Skeleton animation="wave" variant="text" width="100%" height={20} />
        </div>
      </div>
      <div className="flex gap-2 justify-end items-center py-3">
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={60}
          height={35}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={80}
          height={35}
        />
      </div>
    </div>
  );
}

/* export const AddressListSkeleton = () => {
  return (
    <div className="my-8 p-4 flex flex-col justify-center">
      <div className="pt-5 mb-5 flex justify-start">
        <Skeleton animation="wave" variant="text" width="20%" height={40} />
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        {[...Array(6)].map((_, i) => (
          <AddressCardSkeleton />
        ))}
      </div>
    </div>
  );
};
 */

/* product by id page */

export function ProductById(){
  return(
    <div className="sm:grid sm:grid-cols-6 px-3 py-8">
      <div className="col-span-2 lg:col-span-1  hidden sm:block">
        <Skeleton animation="wave" variant="rectangular" className='max-w-[80%] mb-3' height={40} />
        <Skeleton animation="wave" variant="rectangular" className='max-w-[80%] mb-3' height={40} />
        <Skeleton animation="wave" variant="rectangular" className='max-w-[80%] border-b-[1px] border-[#a4a4a4]' height={40} />
        <Skeleton animation="wave" variant="rectangular" className='max-w-[80%] border-b-[1px] border-[#a4a4a4]' height={40} />
        <Skeleton animation="wave" variant="rectangular" className='max-w-[80%] border-b-[1px] border-[#a4a4a4]' height={40} />
        <Skeleton animation="wave" variant="rectangular" className='max-w-[80%] border-b-[1px] border-[#a4a4a4]' height={40} />
        <Skeleton animation="wave" variant="rectangular" className='max-w-[80%] border-b-[1px] border-[#a4a4a4]' height={40} />
        <Skeleton animation="wave" variant="rectangular" className='max-w-[80%]' height={40} />
      </div>
      <div className="col-span-4 lg:col-span-5 ">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
          {[...Array(10)].map((_, i) => {
              return (
                <div className="p-1 " key={i}>
                  <Skeleton animation="wave" variant="rectangular" className='max-w-[100%]' height={180} />
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  <Skeleton variant="text" width={50} sx={{ fontSize: '1rem' }} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export const AddressListSkeleton = () => {
  return (
    <div className="my-8 p-4 flex flex-col container mx-auto">
      <div className="pt-5 mb-5 flex ">
        <Skeleton animation="wave" variant="text" width="20%" height={40} />
      </div>
      <div className="flex flex-row flex-wrap gap-4 justify-center">
        {[...Array(6)].map((_, i) => (
          <AddressCardSkeleton
            key={i}
          />
        ))}
      </div>
    </div>
  );
};


/* single product */

export function SingleProduct(){
  return(
    <div>
     
          <div className="container mx-auto px-5">
            <div className="md:grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="col-span-6 my-5">
                <Skeleton animation="wave" variant="rectangular" className='max-w-[80%] mb-3' height={500} />
              </div>
              <div className="col-span-6 my-5">
                <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" className="w-[100px]" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton animation="wave" variant="rectangular" className='max-w-[100%] mb-3' height={100} />
                <Skeleton variant="text" className="w-[150px]" sx={{ fontSize: '1rem' }} />
                <Skeleton animation="wave" variant="rectangular" className='max-w-[30%] mb-3' height={40} />
              </div>
            </div>
          </div>

      </div>
  )
}