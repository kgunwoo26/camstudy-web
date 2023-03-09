import { NextApiRequest, NextApiResponse } from "next";
import {
  acceptFriendRequest,
  getFriendRequests,
} from "@/controller/friend.controller";

export default async function friendRequestHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "PUT":
      await acceptFriendRequest(req, res);
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
