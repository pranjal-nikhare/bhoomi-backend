import crypto from "crypto";
// import { get } from "http";

const size = 12;

function getHash(str1, str2) {
  const hash = crypto.createHash("sha256");
  hash.update(str1 + str2);
  const hashedString = hash.digest("hex");
  return hashedString.slice(0, size);
}

export { getHash };
// export default getHash;

// const str1 = "gllo worlw efvoin";
// const str2 = "Worl1d0";
// const hashSize = 10;
// console.log(getHash(str1, str2));

// const fixedSizeHash = getHash(str1, str2, hashSize);

// console.log(`Fixed size hash: ${fixedSizeHash}`);
