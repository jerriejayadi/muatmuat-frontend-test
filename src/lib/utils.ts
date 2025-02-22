export const IMAGE_LIST = ["/images/products-1.jpeg", "/images/products-2.jpg"];

export const randomImage = () => {
  return IMAGE_LIST[Math.floor(Math.random() * IMAGE_LIST.length)];
};
