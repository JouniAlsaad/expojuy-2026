import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(process.cwd(), "src");
const EXTENSIONS = [".ts", ".tsx"];

const PREFIXES = [
  "bg",
  "text",
  "font",
  "leading",
  "tracking",
  "p",
  "px",
  "py",
  "pt",
  "pb",
  "pl",
  "pr",
  "m",
  "mx",
  "my",
  "mt",
  "mb",
  "ml",
  "mr",
  "w",
  "h",
  "min-w",
  "min-h",
  "max-w",
  "max-h",
  "gap",
  "space-x",
  "space-y",
  "rounded",
  "border",
  "top",
  "left",
  "right",
  "bottom",
  "inset",
  "z",
  "grid-cols",
  "grid-rows",
  "col-span",
  "row-span",
  "shadow",
  "opacity",
  "scale",
  "rotate",
  "translate-x",
  "translate-y",
  "duration",
  "delay",
  "basis",
  "order",
  "fill",
  "stroke",
];

const ARBITRARY = new RegExp(`\\b(?:${PREFIXES.join("|")})-\\[[^\\]]+\\]`, "g");

const collectFiles = (dir) => {
  const entries = readdirSync(dir);
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...collectFiles(full));
      continue;
    }
    if (EXTENSIONS.some((ext) => full.endsWith(ext))) {
      files.push(full);
    }
  }
  return files;
};

const violations = [];
for (const file of collectFiles(ROOT)) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, index) => {
    const matches = line.match(ARBITRARY);
    if (matches) {
      violations.push({ file, line: index + 1, matches });
    }
  });
}

if (violations.length > 0) {
  console.error("Tailwind arbitrary values are forbidden (single source of truth: tokens.css).");
  for (const violation of violations) {
    console.error(`  ${violation.file}:${violation.line}  ${violation.matches.join(", ")}`);
  }
  console.error("Add the value as a token in src/design-system/tokens.css, then use its utility.");
  process.exit(1);
}

console.log("check:styles OK — no Tailwind arbitrary values found.");
