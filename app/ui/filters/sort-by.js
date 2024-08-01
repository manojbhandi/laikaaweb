import { postData } from "@/app/lib/api";
import { filterKey, sortByArr } from "@/app/lib/data";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { useEffect, useState } from "react";
import { fetchFailure, fetchStart, fetchSuccess } from "../slice";
import { enqueueSnackbar } from "notistack";
import { getAllBrands } from "@/app/lib/endpoints";
import { deepEqualObj, getUniqueBrands, includesObject } from "@/app/lib/utils";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function SortBy(props) {
  const { brands, onChangeFn, setSelectedSortType,selectedSortType } = props;
  // const [selectedSortType, setSelectedSortType] = useState();
  const { allBrands } = useAppSelector((state) => state.commonSlice);
  const dispatch = useAppDispatch();

  const handleCheckboxChange = (e) => {
    const sortType = e.target.value;

    setSelectedSortType(sortType);
    if (onChangeFn) {
      onChangeFn(filterKey.sort, sortType);
    }
  };

  useEffect(() => {
    console.log(selectedSortType, "selectedSortType");
  }, [selectedSortType]);
  console.log(selectedSortType);
  return (
    <div className="flex flex-col gap-2">
      <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
        {/* <InputLabel id="demo-select-small-label">SortBy:</InputLabel> */}
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={selectedSortType}
          defaultValue="0"
          //   label="Sort By"
          onChange={handleCheckboxChange}
        >
          <MenuItem value="0">
            <em>None</em>
          </MenuItem>
          {sortByArr?.length > 0
            ? sortByArr.map((sortType, i) => (
                <MenuItem key={i} value={sortType.value}>{sortType.label}</MenuItem>
              ))
            : null}
        </Select>
      </FormControl>
    </div>
  );
}
