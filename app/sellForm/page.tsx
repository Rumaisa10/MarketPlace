
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import SellForm from "../components/SellForm";

export default async function SellPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div>
      <SellForm />
    </div>
  );
}