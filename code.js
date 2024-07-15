// const crypto = require('crypto');
import * as crypto from "crypto";

function createFixedSizeHash(str1, str2, size) {
  const hash = crypto.createHash("sha256");
  hash.update(str1 + str2);
  const hashedString = hash.digest("hex");
  return hashedString.slice(0, size); // Truncate to desired size
}

// Example usage:
const str1 = "Hello";
const str2 = "World2";
const hashSize = 12;

const fixedSizeHash = createFixedSizeHash(str1, str2, hashSize);
console.log(`Fixed size hash: ${fixedSizeHash}`);
