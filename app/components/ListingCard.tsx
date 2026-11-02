// app/components/ListingCard.tsx
import Link from "next/link";
import type { PublicListing } from "@/libs/listings";

export default function ListingCard({ listing }: { listing: PublicListing }) {
  return (
    <Link
      href={`/listings/${listing.id}`}
      className="block rounded-xl border border-gray-200 bg-white p-4 hover:shadow-md"
    >
      <h3 className="font-medium">{listing.title}</h3>
      <p className="text-sm text-gray-600">{listing.category}</p>
      <p className="font-semibold">£{listing.price.toFixed(2)}</p>
    </Link>
  );
}