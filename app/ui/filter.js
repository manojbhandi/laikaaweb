import { enqueueSnackbar } from "notistack";
import { postData } from "../lib/api";
import { getAllProducts } from "../lib/endpoints";
import Accordion from "./accordian/accordian";
import Brands from "./filters/brands";
import { fetchFailure, fetchSuccess } from "./slice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import React, { useEffect, useState } from "react";
import { filterKey } from "../lib/data";
import Price from "./filters/prices";
import SortBy from "./filters/sort-by";
import Category from "./filters/category";
// import PropTypes from 'prop-types';
// Filters.propTypes = {
//   title: PropTypes.string.isRequired,
//   brands: PropTypes.arrayOf(
//       PropTypes.shape({
//           brand: PropTypes.string.isRequired,
//           brandkey: PropTypes.string.isRequired
//       })
//   ).isRequired,
//   hideCategory: PropTypes.bool.isRequired
// };
function Filters(props) {
  const { hideCategory = false, hideBrands = false, fetchData } = props;
  const { searchRes } = useAppSelector((state) => state.commonSlice);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [selectedPriceArr, setSelectedPriceArr] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSortType, setSelectedSortType] = useState("");
  const [clearFilter, setClearFilter] = useState(false);
  // const dispatch = useAppDispatch();
  // async function fetchSearchResults() {
  //   let key = "searchRes";
  //   dispatch(fetchStart(key));
  //   const data = {
  //     searchTerms: searchText.prodName,
  //     page: 1,
  //     limit: 100,
  //   };
  //   try {
  //     const res = await postData(getAllProducts, data);

  //     dispatch(fetchSuccess({ key, data: res?.data }));
  //   } catch (e) {
  //     dispatch(fetchFailure({ key, error: e.message }));
  //     enqueueSnackbar(e.message, { variant: "error" });
  //   }
  // }

  const handleFilterChange = (filterType, values) => {
    switch (filterType) {
      // case filterKey.brand:
      //   // setSelectedBrands(values);
      //   break;
      case filterKey.price:
        setSelectedPriceRange(values);
        break;
      // case filterKey.sort:
      //   setSelectedSortType(values);
      // case filterKey.category:
      //   setSelectedCategories(values);
      //   break;
      default:
        break;
    }
    // applyFilters()
  };

  useEffect(() => {
    applyFilters();
  }, [
    selectedBrands,
    selectedCategories,
    selectedPriceRange,
    selectedSortType,
  ]);
  const applyFilters = () => {
    const data = {
      brandkey: selectedBrands,
      categorykey: selectedCategories,
      product_price: selectedPriceRange,
    };
    const sortData = {
      product_price: selectedSortType,
    };
    fetchData(data, sortData);
  };
  const clearAllFilters = () => {
    setSelectedPriceArr([]);
    setSelectedPriceRange([])
    setSelectedBrands([]);
    setSelectedCategories([])
    setSelectedSortType("0")
    fetchData();
  };
  return (
    <div>
      <div className="bg-gray-100 w-56 rounded-lg p-3 text-sm font-medium text-left text-gray-900 flex justify-between mb-4">
        <span>Filters Applied</span>
        <span
          className="text-xs text-red-600 cursor-pointer"
          onClick={clearAllFilters}
        >
          Clear All
        </span>
      </div>
      <div className="mb-3">
        <Accordion title="Sort By :">
          <SortBy
            setSelectedSortType={setSelectedSortType}
            selectedSortType={selectedSortType}
            onChangeFn={handleFilterChange}
          />
        </Accordion>
      </div>
      {hideBrands ? null : (
        <Accordion title="Brands">
          <Brands
            clearFilter={clearFilter}
            setSelectedBrands={setSelectedBrands}
            selectedBrands={selectedBrands}
            onChangeFn={handleFilterChange}
          />
        </Accordion>
      )}

      <Accordion title="Price">
        <Price
          clearFilter={clearFilter}
          setSelectedPriceArr={setSelectedPriceArr}
          selectedPriceArr={selectedPriceArr}
          onChangeFn={handleFilterChange}
        />
      </Accordion>
      {hideCategory ? null : (
        <Accordion title="Category">
          <Category
            clearFilter={clearFilter}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            onChangeFn={handleFilterChange}
          />
        </Accordion>
      )}
      {/* <Accordion title="Discount">
        <Brands />
      </Accordion>
      <Accordion title="Avg Customer Rating">
        <Brands />
      </Accordion>
      <Accordion title="Benefits">
        <Brands />
      </Accordion>
      <Accordion title="Color">
        <Brands />
      </Accordion>
      <Accordion title="Pack Size">
        <Brands />
      </Accordion> */}
    </div>
  );
}
export default React.memo(Filters);
