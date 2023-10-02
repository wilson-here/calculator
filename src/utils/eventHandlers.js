export const handleClick = (e, cur, cb) => {
  const numInStr = cur.toString() + e.target.textContent;
  const numInNum = parseInt(numInStr);
  cb(numInNum);
};

export const add = (result) => {
  result = 0;
};
export const subtract = (result) => {
  result = 0;
};
export const multiply = (result) => {
  result = 0;
};
export const divide = (result) => {
  result = 0;
};
export const equals = (result) => {
  result = 0;
};
export const decimal = (result) => {
  result = 0;
};
export const clear = (cb) => {
  cb(0);
};
