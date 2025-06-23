import jwt from "jsonwebtoken";

const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

export async function getUserFromToken(token: string) {
 
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new Error("Missing or invalid Authorization header");
    }
    const token = authHeader.split(" ")[1];
    if (!token) throw new Error("Invalid token");
    const decoded = jwt.verify(token, SUPABASE_JWT_SECRET);

    const userId = decoded.sub;
    return userId;
  } catch (error) {
    console.error("Token verification error:", error);
    throw new Error("Invalid token");
  }
}
