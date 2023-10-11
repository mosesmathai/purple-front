import {model, Schema, models} from "mongoose";

const UpdateSchema = new Schema({
  title: String,
  message: String,
}, {
  timestamps: true,
});

export const Update = models?.Update || model('Update', UpdateSchema)