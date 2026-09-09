import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(process.cwd(), "src");
const SCAN_EXTENSIONS = [".ts", ".tsx", ".css", ".json"];
const TOKENS_SOURCE = "src/design-system/tokens.css";

const ARBITRARY_PREFIXES = [
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

const COLOR_PREFIXES = [
  "bg",
  "text",
  "border",
  "ring-offset",
  "ring",
  "fill",
  "stroke",
  "from",
  "via",
  "to",
  "divide",
  "outline",
  "decoration",
  "accent",
  "caret",
  "placeholder",
];

const CORE_PALETTES = [
  "white",
  "black",
  "slate",
  "gray",
  "zinc",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
];

const ARBITRARY = new RegExp(`\\b(?:${ARBITRARY_PREFIXES.join("|")})-\\[[^\\]]+\\]`, "g");
const HEX = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b/g;
const COLOR_FUNCTION = /\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color-mix)\(/g;
const CORE_COLOR = new RegExp(
  `\\b(?:${COLOR_PREFIXES.join("|")})-(?:${CORE_PALETTES.join("|")})(?:-(?:50|100|200|300|400|500|600|700|800|900|950))?\\b`,
  "g",
);

const CHECKS = [
  {
    label: "arbitrary value",
    regex: ARBITRARY,
    extensions: [".ts", ".tsx", ".css"],
    skipTokens: false,
  },
  {
    label: "hex color",
    regex: HEX,
    extensions: [".ts", ".tsx", ".css", ".json"],
    skipTokens: true,
  },
  {
    label: "color function",
    regex: COLOR_FUNCTION,
    extensions: [".ts", ".tsx", ".css", ".json"],
    skipTokens: true,
  },
  {
    label: "core Tailwind color",
    regex: CORE_COLOR,
    extensions: [".ts", ".tsx", ".css"],
    skipTokens: false,
  },
];

const toPosix = (value) => value.split("\\").join("/");

const collectFiles = (dir) => {
  const entries = readdirSync(dir);
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...collectFiles(full));
      continue;
    }
    if (SCAN_EXTENSIONS.some((ext) => full.endsWith(ext))) {
      files.push(full);
    }
  }
  return files;
};

const violations = [];
for (const file of collectFiles(ROOT)) {
  const isTokensSource = toPosix(file).endsWith(TOKENS_SOURCE);
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, index) => {
    for (const check of CHECKS) {
      if (check.skipTokens && isTokensSource) {
        continue;
      }
      if (!check.extensions.some((ext) => file.endsWith(ext))) {
        continue;
      }
      const matches = line.match(check.regex);
      if (matches) {
        violations.push({ file, line: index + 1, label: check.label, matches });
      }
    }
  });
}

if (violations.length > 0) {
  console.error(
    "Design-system guard failed (single source of truth: src/design-system/tokens.css).",
  );
  for (const violation of violations) {
    console.error(
      `  ${violation.file}:${violation.line}  [${violation.label}] ${violation.matches.join(", ")}`,
    );
  }
  console.error(
    "Add the value as a token in src/design-system/tokens.css, then consume it (utility class or var()).",
  );
  process.exit(1);
}

console.log("check:styles OK — no hardcoded colors or Tailwind arbitrary values found.");
