import { Schema, model, models } from "mongoose"

const OrderSchema = new Schema({
  line_items: Object,
  firstName: String,
  lastName: String,
  phone: Number,
  communication: String,
  location: String,
}, {
  timestamps: true,
});

export const Order = models?.Order || model('Order', OrderSchema);