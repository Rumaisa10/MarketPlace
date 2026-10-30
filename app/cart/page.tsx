// app/my-listings/page.tsx
import MyCart from "../components/CartItems";
export default function Page() {
  return (
    <main className="mx-auto max-w-6xl p-4">
      <h1 className="mb-4 text-2xl font-semibold">My Cart</h1>
      <MyCart />
    </main>
  );
}