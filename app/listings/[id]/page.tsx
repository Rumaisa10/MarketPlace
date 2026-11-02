// app/listings/[id]/page.tsx
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { connectDB } from "@/libs/db";
import { Product as ListingModel } from "@/models/Product";
import { auth } from "@/auth";
import DeleteListingButton from "@/app/components/DeleteListingButton";

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

const session = await auth();
const isOwner =
  Boolean(session?.user?.id) && String(listing.owner) === session?.user?.id;

  
  return (
    <div>
  <main className="mx-auto max-w-3xl p-4">
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          {listing.title}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {listing.category}
        </p>
      </div>

      {isOwner && (
        <DeleteListingButton id={String(listing._id)} />
      )}
    </div>

    <p className="my-4 text-2xl font-bold text-gray-900">
      £{listing.price.toFixed(2)}
    </p>

    <div className="border-t border-gray-200 pt-4">
      <h2 className="mb-2 text-lg font-semibold">Description</h2>
      <p className="leading-7 text-gray-700">
        {listing.description}
      </p>
    </div>
  </main>
</div>
  );
}