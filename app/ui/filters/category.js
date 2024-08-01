import { postData } from "@/app/lib/api";
import { filterKey } from "@/app/lib/data";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { useEffect, useState } from "react";
import { fetchFailure, fetchStart, fetchSuccess } from "../slice";
import { enqueueSnackbar } from "notistack";
import { getAllCategories } from "@/app/lib/endpoints";

export default function Category(props) {
  const { onChangeFn, clearFilter, selectedCategories, setSelectedCategories  } = props;
  // const [selectedCategories, setSelectedCategories] = useState([]);
  const { allBrands, allCategories } = useAppSelector(
    (state) => state.commonSlice
  );
  const dispatch = useAppDispatch();
  const fetchAllCategories = async () => {
    let key = "allCategories";

    dispatch(fetchStart(key));
    try {
      const response = await postData(getAllCategories);
      if (response?.data) {
        // const allBrands = getUniqueBrands(response.data);
        // if (allBrands?.length > 0) {
        //   setUniqueBrands(allBrands);
        // }
      }
      dispatch(fetchSuccess({ key, data: response?.data }));
    } catch (e) {
      dispatch(fetchFailure({ key, error: e?.message }));
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, [dispatch]);
  useEffect(() => {
    setSelectedCategories([]);
  }, [clearFilter]);
  const handleCheckboxChange = (e) => {
    const brand = e.target.value;
    const isChecked = e.target.checked;

    let updatedSelectedCategories;
    if (isChecked) {
      updatedSelectedCategories = [...selectedCategories, brand];
    } else {
      updatedSelectedCategories = selectedCategories.filter((b) => b !== brand);
    }
    setSelectedCategories(updatedSelectedCategories);
    // if (onChangeFn) {
    //   onChangeFn(filterKey.category, updatedSelectedCategories);
    // }
  };

  return (
    <div className="flex flex-col gap-2">
      {allCategories?.data?.length > 0
        ? allCategories.data.map((cat, i) => (
            <div key={i} className="flex justify-between">
              <label>{cat.category}</label>
              <input
                type="checkbox"
                value={cat.categorykey}
                className="rounded-sm focus:outline-none focus:ring-0"
                onChange={handleCheckboxChange}
                checked={selectedCategories.includes(cat.categorykey)}
              />
            </div>
          ))
        : null}
    </div>
  );
}
