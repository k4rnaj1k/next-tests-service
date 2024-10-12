import { nanoid } from "nanoid";
import { headers } from "next/headers";
import redis from "../lib/redis";

export const countUser = async () => {
  const headersList = headers();
  // Get user IP address or generate a unique ID if not available
  const userId =
    headersList.get("x-forwarded-for") ||
    headersList.get("remote-address") ||
    nanoid();

  // Use Redis to store unique user counts
  const userExists = await redis.sismember("uniqueUsers", userId);

  if (!userExists) {
    await redis.sadd("uniqueUsers", userId);
    await redis.incr("userCount");
  }
};
