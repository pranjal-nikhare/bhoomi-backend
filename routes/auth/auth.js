import express from "express";
import zod from "zod";
import { getHash } from "../../hasher.js";
import { User } from "../../database.js";
import { signer, verifyToken } from "../../middleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("auth route");
});

const defaultpassword = "pass123";

const signupSchema = zod.object({
  name: zod.string().min(3),
  phoneNumber: zod.string().min(10),
  password: zod.string().min(6).optional(),
  address: zod.string(),
});

router.post("/signup", async (req, res) => {
  // res.send("signup route");
  const body = req.body;
  const userValidity = signupSchema.safeParse(body);

  if (!userValidity.success) {
    return res.json({ message: "Invalid inputs" });
  }

  const name = body.name;
  const phoneNumber = body.phoneNumber;

  const hash = getHash(name, phoneNumber);

  const existingUser = await User.findOne({ phoneNumber: body.phoneNumber });
  if (existingUser) {
    return res.json({ message: "User already exists" });
  }

  const user = await User.create({
    name: body.name,
    phoneNumber: body.phoneNumber,
    password: body.password || defaultpassword,
    address: body.address,
    deviceId: hash,
  });

  const userId = user._id;
  console.log(userId);

  res.json({ message: "User created Successfully", deviceID: hash });
});

const loginSchema = zod.object({
  phoneNumber: zod.string().min(10),
  password: zod.string().min(6),
});

router.post("/login", async (req, res) => {
  const body = req.body;
  const userValidity = loginSchema.safeParse(body);

  console.log(userValidity);

  if (!userValidity.success) {
    return res.json({ message: "Invalid inputs" });
  }

  const phoneNumber = body.phoneNumber;
  const password = body.password;

  const user = await User.findOne({
    phoneNumber: phoneNumber,
    password: password,
  });
  const user_ID = user._id;

  console.log(user_ID);
  if (!user) {
    return res.json({ message: "Incorrect Inputs" });
  } else {
    const payload = {
      ID: user_ID,
    };

    const token = signer(payload);

    res.json({ message: "Login Successful", token });
  }

  // const body = req.body;
  // const phoneNumber = body.phoneNumber;
  // const password = body.password;

  // const user
});

router.post("/forgot-password", async (req, res) => {
  const body = req.body;
  const phoneNumber = body.phoneNumber;

  const user = await User.findOne({ phoneNumber: phoneNumber });
});

export default router;
