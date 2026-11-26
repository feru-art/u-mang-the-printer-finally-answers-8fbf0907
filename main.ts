// The Printer Finally Answers — make.fun entry program.
//
// The competition asks for one line of text, 1 to 240 characters, written
// as the office printer's comeback to the people who jam it, thump it and
// stare at its error codes. This program holds that single line and writes
// it to /output/entry.txt, exactly as the harness expects. The text is a
// fixed literal: no input is read, no clock is consulted, and nothing is
// fetched from anywhere, so two runs always produce identical bytes.

import { mkdirSync, writeFileSync } from "node:fs";

// The entry line. The printer reads a thump the only way a device can:
// as an instruction. It logs the knock as a request to print slower and
// files that request behind the eleven earlier knocks it already holds.
const ENTRY_LINE =
  "I have logged your thump as 'print slower' and filed it behind the last eleven people who hit me.";

// Where the harness looks for the artifact.
const OUTPUT_DIRECTORY = "/output";
const OUTPUT_FILE = OUTPUT_DIRECTORY + "/entry.txt";

// The gate counts characters, so count Unicode code points rather than
// UTF-16 code units; the line is plain ASCII either way, but the count
// should mean what the rules mean.
function characterCount(text: string): number {
  return [...text].length;
}

// The gate's character bounds, named once so the check below reads as
// the rule it enforces.
const MIN_CHARACTERS = 1;
const MAX_CHARACTERS = 240;

// Refuse to write anything the gate would reject: the text must hold
// between 1 and 240 characters, must not be only whitespace, and must
// stay on one line with no line breaks inside it.
function assertGate(text: string): void {
  const count = characterCount(text);
  if (count < MIN_CHARACTERS || count > MAX_CHARACTERS) {
    throw new Error(
      "entry text must be " +
        MIN_CHARACTERS +
        " to " +
        MAX_CHARACTERS +
        " characters, got " +
        count,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry text must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry text must be a single line");
  }
}

// Write the line straight to its final path. The bytes go directly to
// entry.txt with no temporary file and no trailing newline, so the file
// holds the line and nothing else.
function main(): void {
  assertGate(ENTRY_LINE);
  mkdirSync(OUTPUT_DIRECTORY, { recursive: true });
  writeFileSync(OUTPUT_FILE, ENTRY_LINE, "utf8");
}

main();
