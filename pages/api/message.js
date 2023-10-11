import { mongooseConnect } from "@/lib/mongoose";
import { Message } from "@/models/Message";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.json('should be a POST request');
    return;
  }

  const {fullName, phone, communication, message,} = req.body;
  await mongooseConnect();

  const orderDoc = await Message.create({
    fullName,phone,communication,message
  });
  res.json(orderDoc);
}