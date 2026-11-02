// app/my-listings/page.tsx
import { auth } from "@/auth";

import { redirect } from "next/navigation";
import { getMyListings } from "@/libs/listings";
import Link from "next/link";
import ListingCard from "../components/ListingCard";
export default async function MyListingsPage() {
  
  const session = await auth()
  if(!session?.user?.id) redirect('/login')
    
  const listings = await getMyListings(session.user.id)

   if (listings.length === 0) {
    return (
      <main className="mx-auto max-w-6xl p-4">
        <p>You havent listed anything yet.</p>
        <Link href="/sellForm" className="underline">Sell an item</Link>
      </main>
    );
  }
  return (
     <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {listings.map((l) => (
        <ListingCard key={l.id} listing={l}></ListingCard>

      ))}
    </ul>
  );
}