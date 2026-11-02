import Link from "next/link";
import { auth } from "@/auth";
import LogoutButton from "./LogoutButton";
export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b">
      <Link href="/" className="text-2xl font-bold">
        MarketPlace
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <Link href="/favourites" className="hover:text-blue-600">Favourites</Link>
        <Link href="/cart" className="hover:text-blue-600">Cart</Link>
        {session && (
          <>
            <Link href="/sell" className="hover:text-blue-600">Sell</Link>
            <Link href="/my-listings" className="hover:text-blue-600">My listings</Link>
          </>
        )}
      </div>

      {session ? (
        <div className="flex items-center gap-4">
          <span className="text-sm">{session.user?.name}</span>
          <LogoutButton />
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link href="/register" className="hover:text-blue-600">Register</Link>
          <Link
            href="/login"
            className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}