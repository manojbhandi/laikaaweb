import { postData } from "@/app/lib/api";
import { filterKey } from "@/app/lib/data";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { useEffect, useState } from "react";
import { fetchFailure, fetchStart, fetchSuccess } from "../slice";
import { enqueueSnackbar } from "notistack";
import { getAllBrands } from "@/app/lib/endpoints";
import { getUniqueBrands } from "@/app/lib/utils";

export default function Brands(props) {
  const { clearFilter, onChangeFn,setSelectedBrands,selectedBrands } = props;
  // const [selectedBrands, setSelectedBrands] = useState([]);
  const [uniqueBrands, setUniqueBrands] = useState([]);
  const { allBrands } = useAppSelector((state) => state.commonSlice);
  const dispatch = useAppDispatch();
  const fetchAllBrands = async () => {
    let key = "allBrands";

    dispatch(fetchStart(key));
    try {
      const response = await postData(getAllBrands);
      if (response?.data) {
        const allBrands = getUniqueBrands(response.data);
        if (allBrands?.length > 0) {
          setUniqueBrands(allBrands);
        }
      }
      dispatch(fetchSuccess({ key, data: response?.data }));
    } catch (e) {
      dispatch(fetchFailure({ key, error: e?.message }));
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  useEffect(() => {
    fetchAllBrands();
  }, [dispatch]);

  useEffect(() => {
    setSelectedBrands([]);
  }, [clearFilter]);
  const handleCheckboxChange = (e) => {
    const brand = e.target.value;
    const isChecked = e.target.checked;

    let updatedSelectedBrands;
    if (isChecked) {
      updatedSelectedBrands = [...selectedBrands, brand];
    } else {
      updatedSelectedBrands = selectedBrands.filter((b) => b !== brand);
    }
    setSelectedBrands(updatedSelectedBrands);
    // if (onChangeFn) {
    //   onChangeFn(filterKey.brand, updatedSelectedBrands);
    // }
  };

 
  return (
    <div className="flex flex-col gap-2">
      {uniqueBrands?.length > 0
        ? uniqueBrands.map((brand, i) => (
            <div key={i} className="flex justify-between">
              <label>{brand.brand}</label>
              <input
                type="checkbox"
                value={brand.brandkey}
                className="rounded-sm focus:outline-none focus:ring-0"
                onChange={handleCheckboxChange}
                checked={selectedBrands.includes(brand.brandkey)}
              />
            </div>
          ))
        : null}
    </div>
  );
}
