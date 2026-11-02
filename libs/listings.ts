// libs/listings.ts
import { connectDB } from "@/libs/db";
import { Product as ListingModel } from "@/models/Product";

export type PublicListing = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
};

export async function getListings(): Promise<PublicListing[]> {
  await connectDB();
  const docs = await ListingModel.find().sort({ createdAt: -1 }).limit(24).lean();

  return docs.map((d) => ({
    id: String(d._id),
    title: d.title,
    description: d.description,
    price: d.price,
    category: d.category,
    stock: d.stock,
  }));
}