import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.ACCESS_SECRET,
    { expiresIn: "24h" }
  );
};
