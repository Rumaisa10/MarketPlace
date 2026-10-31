'use client'
import React, { useState } from "react";

const labelClass = "mb-1 block text-sm font-medium text-gray-900";

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

type FieldErrors = Partial<Record<keyof RegisterFormData, string>>;

const emptyForm: RegisterFormData = { name: "", email: "", password: "" };

export default function RegisterForm() {
  const [form, setForm] = useState<RegisterFormData>(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFieldErrors({});
    setFormError(null);
    setSuccess(false);
    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setForm(emptyForm);
        return;
      }

      if (Array.isArray(data.errors)) {
        const mapped: FieldErrors = {};
        for (const err of data.errors) {
          mapped[err.field as keyof RegisterFormData] = err.message;
        }
        setFieldErrors(mapped);
      } else {
        setFormError(data.error ?? "Something went wrong.");
      }
      setForm((prev) => ({ ...prev, password: "" }));
    } catch {
      setFormError("Couldn't reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="mx-auto max-w-xl p-4">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-2xl font-semibold text-gray-900">Register</h2>

        <label htmlFor="name" className={labelClass}>Name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border-2"
        />
        {fieldErrors.name && <p role="alert">{fieldErrors.name}</p>}

        <label htmlFor="email" className={labelClass}>Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          className="border-2"
        />
        {fieldErrors.email && <p role="alert">{fieldErrors.email}</p>}

        <label htmlFor="password" className={labelClass}>Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange}
          className="border-2"
        />
        {fieldErrors.password && <p role="alert">{fieldErrors.password}</p>}

        {formError && <p role="alert">{formError}</p>}
        {success && <p role="status">Account created. You can log in now.</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          {submitting ? "Creating account..." : "Register"}
        </button>
      </form>
    </div>
  );
}