// app/my-listings/page.tsx
import MyListings from "../components/MyListing";
export default function MyListingsPage() {
  return (
    <main className="mx-auto max-w-6xl p-4">
      <h1 className="mb-4 text-2xl font-semibold">My listings</h1>
      <MyListings />
    </main>
  );
}