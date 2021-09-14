import React from "react";
import { GiCompass, GiDiamondHard, GiStabbedNote } from "react-icons/gi";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
export const links = [
  {
    id: 1,
    text: "home",
    url: "/",
  },
  {
    id: 2,
    text: "about",
    url: "/about",
  },
  {
    id: 3,
    text: "products",
    url: "/products",
  },
];

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: "mission",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: "vision",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: "history",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
];

export const products_url = "https://course-api.com/react-store-products";

export const single_product_url = `https://course-api.com/react-store-single-product?id=`;

const hs = <BsStarHalf />;
const es = <BsStar />;
const fs = <BsStarFill />;

export const star_icons = {
  1: [hs, es, es, es, es],
  2: [fs, es, es, es, es],
  3: [fs, hs, es, es, es],
  4: [fs, fs, es, es, es],
  5: [fs, fs, hs, es, es],
  6: [fs, fs, fs, es, es],
  7: [fs, fs, fs, hs, es],
  8: [fs, fs, fs, fs, es],
  9: [fs, fs, fs, fs, hs],
  10: [fs, fs, fs, fs, fs],
};
