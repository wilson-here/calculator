import {
  add,
  subtract,
  multiply,
  divide,
  equals,
  decimal,
  clear,
} from "../utils/eventHandlers";

export const numbers = [
  { value: 0, id: "zero" },
  { value: 1, id: "one" },
  { value: 2, id: "two" },
  { value: 3, id: "three" },
  { value: 4, id: "four" },
  { value: 5, id: "five" },
  { value: 6, id: "six" },
  { value: 7, id: "seven" },
  { value: 8, id: "eight" },
  { value: 9, id: "nine" },
];

export const manipulators = [
  { value: "+", id: "add", cb: add },
  { value: "-", id: "subtract", cb: subtract },
  { value: "x", id: "multiply", cb: multiply },
  { value: "/", id: "divide", cb: divide },
  { value: "=", id: "equals", cb: equals },
  { value: ".", id: "decimal", cb: decimal },
  { value: "AC", id: "clear", cb: clear },
];
