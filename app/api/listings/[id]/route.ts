
import mongoose from "mongoose";
import { auth } from "@/auth";
import { connectDB } from "@/libs/db";
import { Product as ListingModel } from "@/models/Product";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Please log in" }, { status: 401 });
  }

  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return Response.json({ error: "Invalid listing id" }, { status: 400 });
  }

  try {
    await connectDB();

    const deleted = await ListingModel.findOneAndDelete({
      _id: id,
      owner: session.user.id,
    });

    if (!deleted) {
      return Response.json({ error: "Listing not found" }, { status: 404 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Delete listing error:", err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}