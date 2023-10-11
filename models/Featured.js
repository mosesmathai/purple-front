import { Schema, model, models } from "mongoose"

const FeaturedSchema = new Schema({
  name: String,
  value: Object,
}, {
  timestamps: true,
});

export const Featured = models?.Featured || model('Featured', FeaturedSchema);