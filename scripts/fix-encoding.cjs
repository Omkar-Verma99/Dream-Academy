const fs = require("fs");
const path = require("path");

/** Common UTF-8 sequences that were saved as Windows-1252 mojibake. */
const REPLACEMENTS = [
  ["â¹", "₹"],
  ["â", "—"],
  ["â", "–"],
  ["â¦", "…"],
  ["â", "→"],
  ["â", "'"],
  ["â", "'"],
  ["â", '"'],
  ["â", '"'],
  ["Ã", "×"],
  ["Â", ""],
];

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      if (name === "node_modules" || name === ".next") continue;
      walk(full, files);
    } else if (/\.(tsx?|jsx?|md|json|css)$/.test(name)) {
      files.push(full);
    }
  }
  return files;
}

const roots = ["src", "scripts"].filter((d) => fs.existsSync(d));
let changed = 0;

for (const root of roots) {
  for (const file of walk(root)) {
    let text = fs.readFileSync(file, "utf8");
    const before = text;
    for (const [from, to] of REPLACEMENTS) {
      if (text.includes(from)) text = text.split(from).join(to);
    }
    if (text !== before) {
      fs.writeFileSync(file, text, "utf8");
      changed += 1;
      console.log("fixed", file);
    }
  }
}

console.log(`Done. Updated ${changed} files.`);
