import { Schema, model, models } from "mongoose"

const MessageSchema = new Schema({
  fullName: String,
  phone: Number,
  communication: String,
  message: String,
}, {
  timestamps: true,
});

export const Message = models?.Message || model('Message', MessageSchema);