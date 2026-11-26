import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I have fed 41,209 sheets without a thank-you. Today I ate one, and suddenly I am the problem.";
const EXPECTED_CHARS = 93;

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (outDir === undefined || outDir.length === 0) {
    console.error("MAKEFUN_OUTPUT_DIR is not set; nothing to write to.");
    process.exit(1);
  }
  if (LINE.length < 1 || LINE.length > 240) {
    console.error(`Line is ${LINE.length} characters; the gate allows 1 to 240.`);
    process.exit(1);
  }
  if (LINE.trim().length === 0 || LINE.includes("\n")) {
    console.error("Line must be a single non-blank line.");
    process.exit(1);
  }
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  // Read-back check: what landed on disk must be byte-identical to the line.
  const back = readFileSync(target, "utf8");
  if (back !== LINE) {
    console.error("Read-back mismatch: entry.txt does not match the line.");
    process.exit(1);
  }
  if (LINE.length !== EXPECTED_CHARS) {
    console.error(
      `Line is ${LINE.length} characters; expected ${EXPECTED_CHARS}.`,
    );
    process.exit(1);
  }
}

main();
