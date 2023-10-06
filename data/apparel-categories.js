const top = [
  "T-shirt",
  "Shirt",
  "Polo Shirt",
  "Singlet",
  "Hoodie",
  "Sweater",
  "Blouse",
  "Long Sleeve Shirt",
];

const bottom = ["Pants", "Jeans", "Shorts", "Sweatpants", "Skirt"];

const outerwear = ["Jacket", "Suit"];

const overall = ["Jumpsuit", "Romper", "Dress"];

const all = [...top, ...bottom, ...outerwear, ...overall];

export const order = ["Top", "Bottom", "Outerwear", "Overall"];
export const allSub = all.sort((a, b) => a.localeCompare(b));
export const topSub = top.sort((a, b) => a.localeCompare(b));
export const bottomSub = bottom.sort((a, b) => a.localeCompare(b));
export const outerwearSub = outerwear.sort((a, b) => a.localeCompare(b));
export const overallSub = overall.sort((a, b) => a.localeCompare(b));
