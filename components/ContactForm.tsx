"use client";

import { FormEvent, useState } from "react";
import { Button } from "./ui/Button";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const endpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT || "/api/contact";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await res.json().catch(() => null);

      if (!res.ok || (resData && resData.success === false)) {
        throw new Error(
          resData?.error || resData?.message || "An error occurred while sending your message."
        );
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to send message.";
      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center fade-in" role="status" aria-live="polite">
        <p className="headline-sm mb-4">Thank you</p>
        <p className="text-on-surface-variant">
          Your message has been received. I&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {errorMessage && (
        <div className="p-4 rounded border border-red-500/20 bg-red-500/10 text-red-600 text-sm">
          {errorMessage}
        </div>
      )}

      <div>
        <label htmlFor="name" className="label-caps text-neutral mb-2 block">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="input-field"
        />
      </div>

      <div>
        <label htmlFor="email" className="label-caps text-neutral mb-2 block">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="input-field"
        />
      </div>

      <div>
        <label htmlFor="message" className="label-caps text-neutral mb-2 block">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="input-field resize-none"
        />
      </div>

      <Button
        type="submit"
        isLoading={isSubmitting}
        className="w-full md:w-auto"
      >
        Send Message
      </Button>
    </form>
  );
}

