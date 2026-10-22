"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto max-w-6xl p-4">
      <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h1 className="text-lg font-semibold text-red-900">
          Couldnt load products
        </h1>
        <p className="mt-1 text-sm text-red-800">
          Something went wrong. Please try again.
        </p>
        <button
          onClick={reset}
          className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Try again
        </button>
      </div>
    </main>
  );
}