export const dateFormat = (date) => {
  return date?.split("T")[0].replaceAll("-", ".");
};

export const commaThousand = (num) => {
  return num?.toLocaleString("ko-KR");
};
