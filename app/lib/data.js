import { ManageAccounts, ShoppingBag, Wallet } from "@mui/icons-material";
import InventoryIcon from "@mui/icons-material/Inventory";
export const baseUrl = "https://laikaa.in/api/";
export const brands = [
  { brand: "BlackBerry", key: 1 },
  { brand: "Levis", key: 2 },
  { brand: "Nike", key: 3 },
  { brand: "Asics", key: 4 },
  { brand: "Skechers", key: 5 },
];
export const helpArr = [
  { icon: <InventoryIcon />, textContent: "Order Related" },
  { icon: <ShoppingBag />, textContent: "Shopping Related" },
  { icon: <ManageAccounts />, textContent: "Account Related" },
  { icon: <Wallet />, textContent: "Payment Related" },
];
export const brandData = [
  {
    id: 1,
    img: "/brand1.jpg",
  },
  {
    id: 2,
    img: "/brand2.jpg",
  },
  {
    id: 3,
    img: "/brand3.jpg",
  },
  {
    id: 4,
    img: "/brand4.jpg",
  },
  {
    id: 5,
    img: "/brand5.jpg",
  },
  {
    id: 6,
    img: "/brand6.jpg",
  },
  {
    id: 7,
    img: "/brand7.jpg",
  },
  {
    id: 8,
    img: "/brand8.jpg",
  },
];
export const productData = [
  {
    id: 1,
    img: "/product1.png",
    title: "REDCODE",
    desc: "Recode Selfie Matte-6 ML",
    price: "₹ 250.00",
    discount: "₹ 500.00",
  },
  {
    id: 2,
    img: "/product1.png",
    title: "Recode Selfie Matte-6 MLRecode Selfie Matte-6 ML",
    desc: "Recode Selfie Matte-6 MLRecode Selfie Matte-6 ML",
    price: "₹ 250.00",
    discount: "₹ 500.00",
  },
  {
    id: 3,
    img: "/product1.png",
    title: "REDCODE",
    desc: "Recode Selfie Matte-6 ML",
    price: "₹ 250.00",
    discount: "₹ 500.00",
  },
  {
    id: 4,
    img: "/product1.png",
    title: "REDCODE",
    desc: "Recode Selfie Matte-6 ML",
    price: "₹ 250.00",
    discount: "₹ 500.00",
  },
  {
    id: 5,
    img: "/product1.png",
    title: "REDCODE",
    desc: "Recode Selfie Matte-6 ML",
    price: "₹ 250.00",
    discount: "₹ 500.00",
  },
  {
    id: 6,
    img: "/product1.png",
    title: "REDCODE",
    desc: "Recode Selfie Matte-6 ML",
    price: "₹ 250.00",
    discount: "₹ 500.00",
  },
  {
    id: 7,
    img: "/product1.png",
    title: "REDCODE",
    desc: "Recode Selfie Matte-6 ML",
    price: "₹ 250.00",
    discount: "₹ 500.00",
  },
  {
    id: 8,
    img: "/product1.png",
    title: "REDCODE",
    desc: "Recode Selfie Matte-6 ML",
    price: "₹ 250.00",
    discount: "₹ 500.00",
  },
  {
    id: 8,
    img: "/product1.png",
    title: "REDCODE",
    desc: "Recode Selfie Matte-6 ML",
    price: "₹ 250.00",
    discount: "₹ 500.00",
  },
  {
    id: 8,
    img: "/product1.png",
    title: "REDCODE",
    desc: "Recode Selfie Matte-6 ML",
    price: "₹ 250.00",
    discount: "₹ 500.00",
  },
  {
    id: 8,
    img: "/product1.png",
    title: "REDCODE",
    desc: "Recode Selfie Matte-6 ML",
    price: "₹ 250.00",
    discount: "₹ 500.00",
  },
  {
    id: 8,
    img: "/product1.png",
    title: "REDCODE",
    desc: "Recode Selfie Matte-6 ML",
    price: "₹ 250.00",
    discount: "₹ 500.00",
  },
  {
    id: 8,
    img: "/product1.png",
    title: "REDCODE",
    desc: "Recode Selfie Matte-6 ML",
    price: "₹ 250.00",
    discount: "₹ 500.00",
  },
];

export const productData2 = Array.from({ length: 50 }, (_, i) => ({
  img: `/product1.png`,
  title: `Product ${i + 1}`,
  desc: `Description ${i + 1}`,
  price: `$${(i + 1) * 10}`,
  discount: `${(i + 1) * 5}%`,
}));

export const externalImageLoader = ({ src }) => src;

export const categoryKey = Object.freeze({
  lip: { name: "LIPSTICKS", key: "lip" },
  eye: { name: "EYE", key: "eye" },
  body: { name: "BODYCARE", key: "body-care" },
  skin: { name: "SKIN", key: "skin-care" },
  face: { name: "FACE", key: "face" },
  nails: { name: "NAILS", key: "nails" },
  hair: { name: "HAIR", key: "hair-care" },
  makeup: { name: "MAKEUP", key: "makeup" },
  accessories: { name: "ACCESSORIES", key: "accessories" },
});

export const filterKey = Object.freeze({
  brand: "brands",
  category: "catgories",
  price: "prices",
  sort : 'sort'
});
export const priceRanges = Object.freeze([
  { from: 0, to: 499 },
  { from: 500, to: 999 },
  { from: 1000, to: 1499 },
  { from: 1500, to: 1999 },
  { from: 2000, to: 2999 },
  { from: 3000, to: 3999 },
  { from: 4000, to: "Onwards" },
]);

export const sortByArr = Object.freeze([
  { label: "price : Low To High", value: "ASC" },
  { label: "price : High To Low", value: "DESC" },
]);
