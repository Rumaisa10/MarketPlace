// app/listings/[id]/page.tsx
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { connectDB } from "@/libs/db";
import { Product as ListingModel } from "@/models/Product";

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) notFound();

  await connectDB();
  const listing = await ListingModel.findById(id).lean();
  if (!listing) notFound();

  return (
    <main className="mx-auto max-w-3xl p-4">
      <h1 className="text-2xl font-semibold">{listing.title}</h1>
      <p className="text-gray-600">{listing.category}</p>
      <p className="my-2 text-xl font-semibold">£{listing.price.toFixed(2)}</p>
      <p>{listing.description}</p>
    </main>
  );
}