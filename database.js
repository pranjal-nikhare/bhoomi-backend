import mongoose from "mongoose";
import dotenv from "dotenv";
// import crypto from "crypto";
import { getHash } from "./hasher.js";
// import { type } from "os";

dotenv.config();

const DB_URL = process.env.Mongo_URL;

// console.log(DB_URL);

// const hashSize = 12;
// function createFixedSizeHash(str1, str2) {
//   size = hashSize;
//   const hash = crypto.createHash("sha256");
//   hash.update(str1 + str2);
//   const hashedString = hash.digest("hex");
//   return hashedString.slice(0, size);
// }

try {
  mongoose
    .connect(DB_URL)
    .then(() => console.log("Database connected successfully"));
} catch (error) {
  console.log("Error in connecting to database", error);
}

//create a UUID for a user
// const name = "John Doe";
// const phoneNumber = "123-456-7890";
// const uuid = createUUID(name, phoneNumber);
// console.log(uuid);

// const NAMESPACE = uuidv5.DNS;
// function createUUID(name, phoneNumber) {
//   const data = name + phoneNumber;
//   return uuidv5(data, NAMESPACE);
// }

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  deviceId: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);

// module.exports = { User };
// module.exports = { User };
export { User };
