import { notFound, redirect } from "next/navigation";
import mongoose from "mongoose";
import { auth } from "@/auth";
import { connectDB } from "@/libs/db";
import { Product as ListingModel } from "@/models/Product";
import SellForm from "@/app/components/SellForm";

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) notFound();

  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  await connectDB();
  const listing = await ListingModel.findOne({
    _id: id,
    owner: session.user.id,
  }).lean();
  if (!listing) notFound();

  return (
    <SellForm
      listingId={id}
      initialValues={{
        title: listing.title,
        description: listing.description,
        price: listing.price,
        category: listing.category,
        stock: listing.stock,
      }}
    />
  );
}