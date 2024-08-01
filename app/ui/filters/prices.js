import { postData } from "@/app/lib/api";
import { filterKey, priceRanges } from "@/app/lib/data";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { useEffect, useState } from "react";
import { fetchFailure, fetchStart, fetchSuccess } from "../slice";
import { enqueueSnackbar } from "notistack";
import { getAllBrands } from "@/app/lib/endpoints";
import {
  deepEqualObj,
  getMaxMinArrFromPriceRangeArrObj,
  getUniqueBrands,
  includesObject,
} from "@/app/lib/utils";

export default function Price(props) {
  const { onChangeFn, clearFilter, selectedPriceArr, setSelectedPriceArr } =
    props;
  // const [selectedPrices, setSelectedPrices] = useState([]);
  const { allBrands } = useAppSelector((state) => state.commonSlice);

  const handleCheckboxChange = (e) => {
    const priceRangeValue = JSON.parse(e.target.value);
    const isChecked = e.target.checked;
    let updatedSelectedPrices;
    if (isChecked) {
      updatedSelectedPrices = [...selectedPriceArr, priceRangeValue];
    } else {
      updatedSelectedPrices = selectedPriceArr.filter(
        (p) => !deepEqualObj(p, priceRangeValue)
      );
    }
    setSelectedPriceArr(updatedSelectedPrices);
    const updatedSelectedPriceValues = getMaxMinArrFromPriceRangeArrObj(
      updatedSelectedPrices
    );

    if (onChangeFn) {
      onChangeFn(filterKey.price, updatedSelectedPriceValues);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {priceRanges?.length > 0
        ? priceRanges.map((priceRange, i) => (
            <div key={i} className="flex justify-between">
              <label>
                {priceRange?.from} - {priceRange?.to}
              </label>
              <input
                type="checkbox"
                value={JSON.stringify(priceRange)}
                className="rounded-sm focus:outline-none focus:ring-0"
                onChange={handleCheckboxChange}
                checked={includesObject(selectedPriceArr, priceRange)}
              />
            </div>
          ))
        : null}
    </div>
  );
}
