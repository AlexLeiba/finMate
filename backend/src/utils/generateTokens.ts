import jwt from "jsonwebtoken";
import type { ObjectId } from "mongodb";
import { tokenPayloadSchema } from "../schemas/auth";
import { ACCESS_TOKEN_EXPIRES_AT, REFRESH_TOKEN_EXPIRES_AT } from "../config/token";
function generateAccessToken(userId: ObjectId, userEmail: string) {
  return jwt.sign(
    {
      userId: userId,
      email: userEmail,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: ACCESS_TOKEN_EXPIRES_AT,
    }
  );
}
function decodeAccessToken(accessToken: string) {
  const validatedToken = tokenPayloadSchema.parse(
    jwt.verify(accessToken, process.env.JWT_SECRET as string)
  );

  return validatedToken;
}
function generateRefreshToken(userId: ObjectId, userEmail: string) {
  return jwt.sign({ userId, email: userEmail }, process.env.JWT_SECRET || "", {
    expiresIn: REFRESH_TOKEN_EXPIRES_AT,
  });
}
function decodeRefreshToken(refreshToken: string) {
  const validatedToken = tokenPayloadSchema.parse(
    jwt.verify(refreshToken, process.env.JWT_SECRET || "")
  );
  return validatedToken;
}

export { generateAccessToken, generateRefreshToken, decodeRefreshToken, decodeAccessToken };
