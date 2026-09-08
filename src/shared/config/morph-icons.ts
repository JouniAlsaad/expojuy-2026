import type { IconNode } from "morphicons/react";

export const menuIcon: IconNode = [
  ["line", { x1: "4", x2: "20", y1: "6", y2: "6" }],
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12" }],
  ["line", { x1: "4", x2: "20", y1: "18", y2: "18" }],
];

export const closeIcon: IconNode = [
  ["path", { d: "M18 6 6 18" }],
  ["path", { d: "M6 6l12 12" }],
];

export const homeIcon: IconNode = [
  ["path", { d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }],
  ["polyline", { points: "9 22 9 12 15 12 15 22" }],
];
