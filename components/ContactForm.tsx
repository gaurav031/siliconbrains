"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormValues } from "@/lib/validation";
import { Loader2, CheckCircle2, Send } from "lucide-react";

const collaborationTypes = [
  { value: "RESEARCH", label: "Research" },
  { value: "COMMERCIAL", label: "Commercial" },
  { value: "SPEAKING", label: "Speaking" },
  { value: "WORKSHOP", label: "Workshop" },
  { value: "INVESTMENT", label: "Investment" },
  { value: "INTERNSHIP", label: "Internship" },
];

const inputClass =
  "w-full bg-white/5 border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)] transition-colors";

export default function ContactForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { collaborationType: "RESEARCH" },
  });

  async function onSubmit(values: ContactFormValues) {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.message || "Something went wrong. Please try again.");
        return;
      }
      setSuccess(true);
      reset();
    } catch {
      setServerError("Network error. Please try again.");
    }
  }

  if (success) {
    return (
      <div className="glass rounded-2xl p-10 text-center">
        <CheckCircle2 className="w-12 h-12 text-[var(--color-cyan)] mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Message Sent</h3>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">
          Thanks for reaching out — our team will get back to you shortly.
        </p>
        <button onClick={() => setSuccess(false)} className="btn-secondary">
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-2xl p-8 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Name *</label>
          <input {...register("name")} className={inputClass} placeholder="Jane Doe" />
          {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Company</label>
          <input {...register("company")} className={inputClass} placeholder="Acme Aerospace" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Email *</label>
          <input {...register("email")} type="email" className={inputClass} placeholder="jane@company.com" />
          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Country</label>
          <input {...register("country")} className={inputClass} placeholder="India" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-1.5 block">Collaboration Type *</label>
        <select {...register("collaborationType")} className={inputClass}>
          {collaborationTypes.map((c) => (
            <option key={c.value} value={c.value} className="bg-[#0a0e1a]">
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium mb-1.5 block">Subject *</label>
        <input {...register("subject")} className={inputClass} placeholder="Research collaboration inquiry" />
        {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject.message}</p>}
      </div>

      <div>
        <label className="text-sm font-medium mb-1.5 block">Message *</label>
        <textarea {...register("message")} rows={5} className={inputClass} placeholder="Tell us about your project or collaboration idea..." />
        {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
      </div>

      {serverError && <p className="text-sm text-red-400">{serverError}</p>}

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto justify-center">
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
