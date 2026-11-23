// Make the Judge Smile — one line about a small good thing that happened today.
// Writes the line deterministically to /output/entry.txt (1-200 chars, no newline).
// The line aims at the judge's brief in order: on-subject, warmth (a year of
// being ignored turns into affection), surprise (the headbutt), one concrete
// detail (ankle, gate, purring), fresh wording (no greeting-card phrasing).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "My neighbour's cat, who has ignored me for a year, headbutted my ankle this morning, then waited purring by the gate until I opened it for her.";

// The gate counts Unicode code points: 1-200, and the text must not be only whitespace.
const length = [...LINE].length;
if (length < 1 || length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry is ${length} code points, outside 1-200`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Verify the write round-trips byte for byte, so a silent partial write can never pass.
if (readFileSync("/output/entry.txt", "utf8") !== LINE) {
  throw new Error("entry.txt does not match the line");
}
