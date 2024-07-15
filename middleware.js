import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function signer(payload) {
  const secret = process.env.JWT_Secret;
  if (!secret) {
    throw new Error("JWT Secret not found");
  }

  const token = jwt.sign(
    {
      data: payload,
    },
    secret,
    { expiresIn: "45d" }
  );

  return "Bearer " + token;
}

const verifyToken = async (req, res, next) => {
  const authheader = req.headers.authorization;

  if (!authheader || !authheader.startsWith("Bearer")) {
    return res.status(401).json({
      message: "Authentication error",
    });
  }

  const token = authheader.split(" ")[1];
  const secret = process.env.JWT_Secret;

  if (!secret) {
    console.error("JWT Secret not found");
    throw new Error("JWT Secret not found");
  }

  try {
    const data = jwt.verify(token, secret);
    next();
    return data;
  } catch (error) {
    console.error("Error verifying token:", error.message);
    throw error;
  }
};

// function verifyToken(token) {
//   const secret = process.env.JWT_Secret;
//   if (!secret) {
//     console.error("JWT Secret not found");
//     throw new Error("JWT Secret not found");
//   }

//   try {
//     const data = jwt.verify(token, secret);
//     return data;
//   } catch (error) {
//     console.error("Error verifying token:", error.message);
//     throw error;
//   }
// }

// console.log(signer({ name: "John Doe" }));
// console.log(
//   verifyToken(
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJKb2huIERvZSJ9LCJpYXQiOjE3MjA5MDM3OTEsImV4cCI6MTcyMzQ5NTc5MX0.uXEy4-xc3b5G9tyKLJEM2gpRLPo2Bv2N2cAgvsEEN7M"
//   )
// );

export { signer, verifyToken };
