"use client";
import { validateSellForm } from "@/libs/validateListing";
import { ValidationErrors } from "@/libs/validateListing";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/libs/productFilter";

export type SellFormData = {
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
};

const emptyForm: SellFormData = {
  title: "",
  description: "",
  price: 0,
  category: "",
  stock: 0,
};

const labelClass = "mb-1 block text-sm font-medium text-gray-900";

export default function SellForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [form, setForm] = useState<SellFormData>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    setSuccess(false);

    const validationErrors = validateSellForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.status === 401) {
        router.push("/login");
        return;
      }

      if (res.ok) {
        setSuccess(true);
        setForm(emptyForm);
        setErrors({});
        return;
      }

      if (Array.isArray(data.errors)) {
        const mapped: ValidationErrors = {};
        for (const err of data.errors) {
          mapped[err.field as keyof SellFormData] = err.message;
        }
        setErrors(mapped);
      } else {
        setFormError(data.error ?? "Something went wrong.");
      }
    } catch {
      setFormError("Couldn't reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl p-4">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-2xl font-semibold text-gray-900">Sell a Product</h2>

        <label htmlFor="title" className={labelClass}>
          Product Title
        </label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="border-2"
        />
        {errors.title && <p role="alert">{errors.title}</p>}

        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          className="border-2"
          onChange={handleChange}
        />
        {errors.description && <p role="alert">{errors.description}</p>}

        <label htmlFor="price" className={labelClass}>
          Price (£)
        </label>
        <input
          id="price"
          name="price"
          type="number"
          min="1"
          step="1"
          value={form.price || ""}
          className="border-2"
          onChange={handleChange}
        />
        {errors.price && <p role="alert">{errors.price}</p>}

        <label htmlFor="category" className={labelClass}>
          Category
        </label>
        <select
          id="category"
          name="category"
          value={form.category}
          className="border-2"
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.category && <p role="alert">{errors.category}</p>}

        <label htmlFor="stock" className={labelClass}>
          Stock Quantity
        </label>
        <input
          id="stock"
          name="stock"
          type="number"
          min="0"
          step="1"
          value={form.stock}
          className="border-2"
          onChange={handleChange}
        />
        {errors.stock && <p role="alert">{errors.stock}</p>}

        {formError && <p role="alert">{formError}</p>}
        {success && <p role="status">Listing saved.</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          {submitting ? "Saving..." : "List Product"}
        </button>
      </form>
    </div>
  );
}