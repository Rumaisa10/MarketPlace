
'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteListingButton({ id }: { id: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setError(null);
    setDeleting(true);

    try {
      const res = await fetch(`/api/listings/${id}`, { method: "DELETE" });

      if (res.status === 401) {
        router.push("/login");
        return;
      }

      if (!res.ok) {
        setError("Couldn't delete this listing. Please try again.");
        return;
      }

      router.push("/my-listings");
      router.refresh();
    } catch {
      setError("Couldn't reach the server. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  if (!confirming) {
    return (
      <button type="button" onClick={() => setConfirming(true)}>
        Delete
      </button>
    );
  }

  return (
    <div
  role="alertdialog"
  aria-label="Confirm delete"
  className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
>
  <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
    <div className="mb-5">
      <h2 className="text-lg font-semibold text-gray-900">
        Delete listing?
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        Are you sure you want to delete this listing? This action cannot be undone.
      </p>
    </div>

    <div className="flex justify-end gap-3">
      <button
        type="button"
        onClick={() => setConfirming(false)}
        disabled={deleting}
        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Cancel
      </button>

      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {deleting ? "Deleting..." : "Yes, delete"}
      </button>
    </div>

    {error && (
      <p role="alert" className="mt-4 text-sm text-red-600">
        {error}
      </p>
    )}
  </div>
</div>
  );
}