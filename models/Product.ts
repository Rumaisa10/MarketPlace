import { Schema, models, model } from "mongoose";

const productSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0.01 },
    category: { type: String, required: true },
    stock: { type: Number, required: true, min: 0, default: 1 },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  },
  { timestamps: true }
);

export const Product = models.Product || model("Product", productSchema);