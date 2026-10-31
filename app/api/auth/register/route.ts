// app/api/auth/register/route.ts
import bcrypt from "bcrypt";
import { connectDB } from "@/libs/db";
import { User } from "@/models/Users";
import { registerSchema } from "@/libs/authSchema";


export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    const errors = parsed.error.issues.map((i) => ({
      field: i.path.join("."),
      message: i.message,
    }));
    return Response.json({ errors }, { status: 400 });
  }

  const { name, email, password } = parsed.data;

  try {
    await connectDB();
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });

    return Response.json(
      { id: String(user._id), name: user.name, email: user.email },
      { status: 201 }
    );
  } catch (err: any) {
    if (err?.code === 11000) {
      return Response.json({ error: "Email already registered" }, { status: 409 });
    }
    console.error("Register error:", err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}