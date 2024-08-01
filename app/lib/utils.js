import { priceRanges } from "./data";

function checkValidPhoneNo(phoneNumber) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber);
}

function isValidEmail(text) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(text);
}

function getPriceIntervals(data, intervalSize) {
  const prices = data.map((product) => parseInt(product.product_price, 10));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const intervals = [];
  for (
    let i = Math.floor(minPrice / intervalSize) * intervalSize;
    i <= maxPrice;
    i += intervalSize
  ) {
    intervals.push({
      min: i,
      max: i + intervalSize - 1,
    });
  }

  return intervals;
}
function getUniqueBrands(data) {
  const brandMap = new Map();
  data.forEach((product) => {
    if (!brandMap.has(product.brand)) {
      brandMap.set(product.brand, product.brandkey);
    }
  });

  return Array.from(brandMap, ([brand, brandkey]) => ({ brand, brandkey }));
}
function deepEqualObj(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }

  if (
    obj1 == null ||
    obj2 == null ||
    typeof obj1 !== "object" ||
    typeof obj2 !== "object"
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqualObj(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}
function includesObject(array, obj) {
  for (let item of array) {
    if (deepEqualObj(item, obj)) {
      return true;
    }
  }
  return false;
}
function getMaxMinArrFromPriceRangeArrObj(updatedSelectedPrices) {
  let updatedSelectedPriceValues = updatedSelectedPrices.flatMap((item) =>
    Object.values(item)
  );
  const numericValues = updatedSelectedPriceValues.filter(
    (value) => typeof value === "number"
  );
  const hasOnwards = updatedSelectedPriceValues.includes(priceRanges[priceRanges.length -1].to);
  if(hasOnwards){
    const idexOfHasOnwards = updatedSelectedPriceValues.indexOf(priceRanges[priceRanges.length -1].to);
    updatedSelectedPriceValues.splice(idexOfHasOnwards,1)
  }
  const min = 
    updatedSelectedPriceValues.length > 0
      ? Math.min(...updatedSelectedPriceValues)
      : 0;
  const max = hasOnwards
    ? 10000
    : numericValues.length > 0
    ? Math.max(...numericValues)
    : 10000;
  updatedSelectedPriceValues = [min, max];
  return updatedSelectedPriceValues;
}

const handleBrokenImg = (e) =>{
  e.target.src = "/no-photo.png";
  e.target.alt = "image not found";
}

const getPrimaryAddress = (addressArr) => {
  return addressArr.filter((address)=>(address.is_primary == 1))
}
export {
  isValidEmail,
  checkValidPhoneNo,
  getPriceIntervals,
  getUniqueBrands,
  deepEqualObj,
  includesObject,
  getMaxMinArrFromPriceRangeArrObj,
  handleBrokenImg,
  getPrimaryAddress
};
