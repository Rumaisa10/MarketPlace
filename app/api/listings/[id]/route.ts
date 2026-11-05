
import mongoose from "mongoose";
import { auth } from "@/auth";
import { connectDB } from "@/libs/db";
import { Product as ListingModel } from "@/models/Product";
import { sellSchema } from "@/libs/authSchema";


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
export async function PATCH(
  request: Request,
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

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = sellSchema.safeParse(body);
  if (!parsed.success) {
    const errors = parsed.error.issues.map((i) => ({
      field: i.path.join("."),
      message: i.message,
    }));
    return Response.json({ errors }, { status: 400 });
  }

  try {
    await connectDB();

    const updated = await ListingModel.findOneAndUpdate(
      { _id: id, owner: session.user.id },
      parsed.data,
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return Response.json({ error: "Listing not found" }, { status: 404 });
    }

    return Response.json({
      id: String(updated._id),
      title: updated.title,
      description: updated.description,
      price: updated.price,
      category: updated.category,
      stock: updated.stock,
    });
  } catch (err) {
    console.error("Update listing error:", err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
