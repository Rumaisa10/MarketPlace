import { auth } from "@/auth";
import { connectDB } from "@/libs/db";
import { Product } from "@/models/Product";
import { sellSchema } from "@/libs/authSchema";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Please log in" }, { status: 401 });
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
    const listing = await Product.create({
      ...parsed.data,
      owner: session.user.id,
    });

    return Response.json(
      {
        id: String(listing._id),
        title: listing.title,
        description: listing.description,
        price: listing.price,
        category: listing.category,
        stock: listing.stock,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Create listing error:", err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}