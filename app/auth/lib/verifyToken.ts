import jwt from "jsonwebtoken";

export type jwtPayLoad = {
  userId: string;
  email: string;
};

export async function veriftToken(token: string): Promise<jwtPayLoad> {
  return jwt.verify(token, process.env.JWT_SECRET!) as jwtPayLoad;
}
